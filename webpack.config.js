const { resolve, basename, dirname } = require('path');
const { existsSync, readdirSync, rmSync, copyFileSync, writeFileSync, mkdirSync } = require('fs');
const ts = require('typescript');
const glob = require('glob');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TypeDoc = require('typedoc');
const paths = require('./paths.js');
const { name: appName } = require(paths.appPackageJson);

const isDevServer = Boolean(process.env.WEBPACK_SERVE);

const devServerPort = process.env.DEV_SERVER_PORT ??
  (console.log('DEV_SERVER_PORT env var is required!') || process.exit());

module.exports = function (mode = 'development') {
  const isDevelopmentBuild = mode === 'development';

  const isProductionBuild = mode === 'production';

  // noinspection WebpackConfigHighlighting
  return {
    mode: isProductionBuild ? 'production' : 'development',
    entry: isDevServer ? paths.appIndex : paths.appMain,
    output: {
      filename: 'index.js',
      path: paths.appBuild,
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    optimization: {
      minimize: isProductionBuild,
    },
    externals: {
      ...!isDevServer ? {
        react: 'react'
      } : {}
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            compact: isProductionBuild
          },
        },
      ]
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['ts', 'tsx'],
        overrideConfig: {
          rules: {
            'no-debugger': isDevelopmentBuild ? 'off' : 'error',
            'no-console': isDevelopmentBuild ? 'off' : 'error',
          }
        },
        failOnError: true
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configOverwrite: {
            exclude: !isDevServer
              ? [paths.appIndex]
              : []
          }
        }
      }),
      {
        apply: compiler => {
          compiler.hooks.shouldEmit.tap('Check errors', (compilation) => {
            return !compilation.getStats().hasErrors();
          });
        }
      },
      {
        apply: compiler => {
          compiler.hooks.environment.tap('Clear old build', () => {
            if (existsSync(paths.appBuild)) {
              readdirSync(paths.appBuild).forEach(baseName => {
                const path = resolve(paths.appBuild, baseName);

                rmSync(path, { recursive: true });
              });
            }
          });
        }
      },
      {
        apply: compiler => {
          compiler.hooks.done.tap('Copy package.json', () => {
            if (existsSync(paths.appBuild)) {
              const newPackageJsonPath = resolve(paths.appBuild, basename(paths.appPackageJson));

              copyFileSync(paths.appPackageJson, newPackageJsonPath);
            }
          });
        }
      },
      !isDevServer && {
        apply: compiler => {
          compiler.hooks.done.tap('Emit declaration files', () => {
            setTimeout(() => {
              const files = glob.sync(resolve(paths.appSrc, '**/*{.ts,.tsx}'), {
                ignore: [paths.appIndex]
              });

              const compilerOptions = {
                allowJs: true,
                declaration: true,
                emitDeclarationOnly: true,
                declarationDir: paths.appBuild,
              };

              const host = ts.createCompilerHost(compilerOptions);

              host.writeFile = (fileName, data, writeByteOrderMark, onError, sourceFileObject) => {
                const filePath = sourceFileObject[0].fileName === paths.appMain
                  ? resolve(paths.appBuild, 'index.d.ts')
                  : fileName;

                const fileDir = dirname(filePath);

                if (!existsSync(fileDir))
                  mkdirSync(fileDir, { recursive: true });

                writeFileSync(filePath, data);
              };

              const program = ts.createProgram(files, compilerOptions, host);

              program.emit();
            }, 0);
          });
        }
      },
      isDevServer && {
        apply: compiler => {
          compiler.hooks.done.tap('Generate documentation', () => {
            setTimeout(async () => {
              const app = new TypeDoc.Application();

              app.options.addReader(new TypeDoc.TSConfigReader());
              app.options.addReader(new TypeDoc.TypeDocReader());

              app.bootstrap({
                entryPoints: [paths.appMain]
              });

              const project = app.convert();

              if (project) {
                await app.generateDocs(project, paths.appDocs);
              }
            }, 0);
          });
        }
      },
      isDevServer && new HtmlWebpackPlugin({
        title: appName,
        template: paths.appHtml
      }),
    ].filter(Boolean),
    stats: {
      colors: true,
      modules: false
    },
    ...isDevelopmentBuild ? {
      devtool: 'cheap-module-source-map'
    } : {},
    devServer: {
      static: {
        directory: paths.appBuild,
      },
      compress: true,
      port: devServerPort,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      open: true
    },
    infrastructureLogging: {
      level: 'none',
    },
  };
};
