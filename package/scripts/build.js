const { resolve } = require('path');
const { execSync } = require('node:child_process');
const { build } = require('esbuild');
const paths = require('../../paths');

/* try {
  execSync(`eslint --ext .ts,.tsx ${paths.appSrc}`, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
} catch (e) {
  process.exit(1);
} */

try {
  execSync(`tsc -p tsconfig.build.json --outDir ${paths.packageOutput}`, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
} catch (e) {
  process.exit(1);
}

(async () => {
  await build({
    //entryNames: '[dir]/[name]',
    entryPoints: [
      resolve(paths.packageSource, '**/*'),
    ],
    minify: true,
    outdir: paths.packageOutput,
  });

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
