const { execSync } = require('node:child_process');
const { resolve } = require('path');
const { build } = require('esbuild');
const { globSync } = require('glob');
const ts = require('typescript');
const { typecheckPlugin } = require('@jgoz/esbuild-plugin-typecheck');
const paths = require('../paths');
const tsConfig = require('../tsconfig.build.json');

try {
  execSync(`eslint --ext .ts,.tsx ${paths.appSrc}`, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
} catch (e) {
  process.exit(1);
}

try {
  execSync(`tsc --project tsconfig.build.json --outDir ${paths.appOutput}`, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
} catch (e) {
  process.exit(1);
}

// TODO билд есть смысл запускать сразу через tsc, esbuild использовать только для запуска dev-сервера
(async () => {
  /*await build({
    //entryNames: '[dir]/[name]',
    entryPoints: [resolve(paths.appSrc, 'inputs')],
    minify: true,
    outdir: paths.appOutput,
    plugins: [
      typecheckPlugin({
        build: true,
        buildMode: 'write-output',
        configFile: resolve(process.cwd(), 'tsconfig.build.json'),
      }),
    ],
  });*/

  /*const files = globSync(resolve(paths.appSrc, 'inputs/masked-input/index.tsx'));

  const compilerOptions = {
    declaration: true,
    declarationDir: paths.appOutput,
    emitDeclarationOnly: true,
  };

  const host = ts.createCompilerHost(compilerOptions);
  const program = ts.createProgram(files, compilerOptions, host);

  program.emit();*/
})();
