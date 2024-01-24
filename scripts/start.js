const { join, parse, resolve } = require('path');
const { readFileSync } = require('fs');
const { createServer } = require('http');
const EventEmitter = require('events');
const esbuild = require('esbuild');
const { ESLint } = require('eslint');
const { typecheckPlugin } = require('@jgoz/esbuild-plugin-typecheck');
const handlebars = require('handlebars');
const paths = require('../paths');
const { name: projectName } = require('../package.json');
const compilerEventEmitter = new EventEmitter();
const bootEntryPath = resolve(paths.appSrc, 'bootstrap/app.tsx');

handlebars.registerHelper('switch', function (value, options) {
  this.switchValue = value;

  return options.fn(this);
});

handlebars.registerHelper('case', function (value, options) {
  if (value === this.switchValue)
    return options.fn(this);
});

const templateInput = readFileSync(
  resolve(paths.appStatic, 'templates/esbuild-index.hbs'),
).toString();

const liveReloadHtml = readFileSync(
  resolve(paths.appStatic, 'templates/esbuild-live-reload.html'),
).toString();

const handlebarsTemplate = handlebars.compile(templateInput);
const pathToScript = `/${parse(bootEntryPath).name}.js`;

let outputFiles = [];

const errors = {
  eslint: [],
  typescript: [],
};

(async () => {
  const ctx = await esbuild.context({
    bundle: true,
    entryPoints: [bootEntryPath],
    outdir: paths.appOutput,
    plugins: [
      typecheckPlugin({
        watch: true,
      }),
      {
        name: 'eslint',
        setup (build) {
          build.onStart(async () => {
            const eslint = new ESLint({
              cache: true,
              extensions: ['.ts', '.tsx'],
            });

            const results = await eslint.lintFiles(resolve(paths.appSrc, '**/*'));
            const stylishFormatter = await eslint.loadFormatter('stylish');
            const logMessage = stylishFormatter.format(results);

            console.log(logMessage);

            errors.eslint = results.some(({ errorCount }) => errorCount > 0)
              ? results.filter(({ errorCount, warningCount }) => errorCount > 0 || warningCount > 0)
              : [];
          });
        },
      },
      {
        name: 'on-build-end',
        setup (build) {
          build.onEnd(result => {
            outputFiles = result.outputFiles;

            compilerEventEmitter.emit('buildEnd');
          });
        },
      },
    ],
    sourcemap: true,
    write: false,
  });

  await ctx.watch();

  createServer((req, res) => {
    switch (req.url) {
      case '/': {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(
          handlebarsTemplate({
            errors: Object.values(errors).some(({ length }) => length)
              ? errors
              : undefined,
            pathToScript,
            title: projectName,
          }) + liveReloadHtml,
        );

        return;
      }

      case pathToScript: {
        res.writeHead(200, {
          'Content-Type': 'application/javascript',
        });

        res.end(
          outputFiles
            .find(({ path }) => path === join(paths.appOutput, pathToScript))
            ?.text,
        );

        return;
      }

      case `${pathToScript}.map`: {
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
        });

        res.end(
          outputFiles
            .find(({ path }) => path === join(paths.appOutput, `${pathToScript}.map`))
            ?.text,
        );

        return;
      }

      case '/ds': {
        res.writeHead(200, {
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Content-Type': 'text/event-stream',
        });

        compilerEventEmitter
          .removeAllListeners('buildEnd')
          .on('buildEnd', () => {
            res.write(`id: ${(new Date()).toLocaleTimeString()}\nevent: buildEnd\ndata: {}\n\n`);
          });

        res.write('');

        return;
      }
    }
  }).listen(3000);
})();
