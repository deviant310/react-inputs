import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, parse } from "path";

import react from "@vitejs/plugin-react-swc";

import ts from "typescript/lib/tsserverlibrary";
import { defineConfig, Plugin } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    target: "es2020",
    emptyOutDir: false,
    lib: {
      entry: {
        "select-input/index": resolve("src/select-input"),
        "masked-input/index": resolve("src/masked-input"),
        "number-input/index": resolve("src/number-input"),
      },
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
    },
    sourcemap: command === "serve",
  },
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath:
          command === "build" ? "./tsconfig.build.json" : "./tsconfig.json",
      },
      eslint: {
        lintCommand: `eslint ./src`,
        useFlatConfig: true,
      },
    }),
    command === "build" && declarations(),
  ],
}));

async function declarations(): Promise<Plugin> {
  const entries = [
    [resolve("src/masked-input/index.ts"), "masked-input/index.d.ts"],
    [resolve("src/select-input/index.ts"), "select-input/index.d.ts"],
    [resolve("src/number-input/index.ts"), "number-input/index.d.ts"],
  ].map(([source, output]) => ({
    source,
    output,
  }));

  async function buildDeclarationsForFiles({
    source,
    output,
  }: {
    source: string;
    output: string;
  }) {
    const compilerOptions: ts.CompilerOptions = {
      declaration: true,
      emitDeclarationOnly: true,
      removeComments: true,
      jsx: 4,
      moduleResolution: 2,
    };

    const files = [source, resolve("src/react-memo.d.ts")];

    const host = ts.createCompilerHost(compilerOptions);
    const program = ts.createProgram(files, compilerOptions, host);

    function splitImportsAndCode(sourceFile: ts.SourceFile): [string, string] {
      let importsAndExports = "";
      let remainingCode = "";

      sourceFile.statements.forEach(node => {
        const nodeText = node.getFullText(sourceFile);

        if (
          ts.isImportDeclaration(node) ||
          ts.isExportDeclaration(node) ||
          ts.isExportAssignment(node)
        ) {
          if (
            "moduleSpecifier" in node &&
            node.moduleSpecifier &&
            "text" in node.moduleSpecifier
          ) {
            const resolved = ts.resolveModuleName(
              node.moduleSpecifier.text as string,
              sourceFile.fileName,
              compilerOptions,
              ts.sys,
            );

            if (
              resolved.resolvedModule?.resolvedFileName?.includes(
                "node_modules",
              )
            )
              importsAndExports += nodeText;
          }
        } else {
          remainingCode += nodeText;
        }
      });

      return [importsAndExports.trim(), remainingCode.trim()];
    }

    const collectedFiles = new Set<string>();

    function collectFiles(file: ts.SourceFile) {
      if (file.fileName.includes("node_modules")) return;
      if (collectedFiles.has(file.fileName)) return;

      collectedFiles.add(file.fileName);

      ts.forEachChild(file, node => {
        if (
          (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
          node.moduleSpecifier
        ) {
          const importPath = (node.moduleSpecifier as ts.StringLiteral).text;
          const resolved = ts.resolveModuleName(
            importPath,
            file.fileName,
            compilerOptions,
            ts.sys,
          );
          if (resolved.resolvedModule?.resolvedFileName) {
            const importedFile = program.getSourceFile(
              resolved.resolvedModule.resolvedFileName,
            );

            if (importedFile) collectFiles(importedFile);
          }
        }
      });
    }

    program.getRootFileNames().forEach(path => {
      const sourceFile = program.getSourceFile(path);

      if (!sourceFile) return;

      collectFiles(sourceFile);
    });

    const importsSet = new Set<string>();
    const contentsSet = new Set<string>();

    const tasksQueue = Array.from(collectedFiles).map(file => {
      return new Promise<void>(resolve => {
        const sourceFile = program.getSourceFile(file);

        if (sourceFile?.isDeclarationFile) resolve();

        program.emit(
          sourceFile,
          (fileName, content) => {
            const sourceFile = ts.createSourceFile(
              fileName,
              content,
              ts.ScriptTarget.ESNext,
              true,
              ts.ScriptKind.TS,
            );

            const [imp, cnt] = splitImportsAndCode(sourceFile);

            importsSet.add(imp);
            contentsSet.add(cnt);

            resolve();
          },
          undefined,
          true,
        );
      });
    });

    await Promise.all(tasksQueue);

    const mergedContent = Array.from(importsSet)
      .concat(Array.from(contentsSet))
      .filter(Boolean)
      .join("\n\n");

    const outputFile = resolve("dist", output);
    const { dir: outputDir } = parse(outputFile);

    if (!existsSync(outputDir)) mkdirSync(outputDir);

    writeFileSync(outputFile, mergedContent);
  }

  return {
    name: "declarations",
    buildStart() {
      console.log("starting building declarations...");

      const tasksQueue = entries.map(buildDeclarationsForFiles);

      Promise.all(tasksQueue).then(() => {
        console.log("declarations builded!");
      });
    },
  };
}
