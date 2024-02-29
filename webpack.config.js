const { resolve } = require('path');
const { cpSync, existsSync, readdirSync, rmSync } = require('fs');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ts = require('typescript');
const app = require('./package.json');
const paths = require('./paths.js');
const isDevServer = Boolean(process.env.WEBPACK_SERVE);
const devServerPort = process.env.DEV_SERVER_PORT ?? 3000;

module.exports = env => {
  const { production } = env ?? {};
  const isProductionBuild = Boolean(production);

  // noinspection WebpackConfigHighlighting
  return {
    devServer: {
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        webSocketURL: 'auto://0.0.0.0:0/ws',
      },
      compress: true,
      open: true,
      port: devServerPort,
      static: {
        directory: paths.appOutput,
      },
    },
    devtool: !isProductionBuild && 'source-map',
    entry: isDevServer
      ? paths.appBootEntry
      : {
        'helpers': resolve(paths.appSrc, 'infrastructure/helpers'),
      },
    externals: !isDevServer ? {
      react: 'react',
      reactDOM: 'react-dom',
    } : {},
    infrastructureLogging: {
      level: 'none',
    },
    mode: isProductionBuild ? 'production' : 'development',
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
      ],
    },
    optimization: {
      minimize: isProductionBuild,
    },
    output: {
      /* filename: ({ chunk }) => {
        return chunk.name === 'index'
          ? '[name].js'
          : '[name]/index.js';
      }, */
      library: {
        name: app.name,
        type: 'umd',
      },
      path: paths.appOutput,
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        failOnError: true,
        overrideConfig: {
          rules: isProductionBuild ? {
            'no-console': 'error',
            'no-debugger': 'error',
          } : {},
        },
      }),
      isDevServer
        ? new ForkTsCheckerWebpackPlugin({
          async: isDevServer,
        })
        : {
          apply: compiler => {
            compiler.hooks.beforeCompile.tapAsync('Copy type declarations', (_, callback) => {
              cpSync(
                resolve(paths.appSrc, 'app/declarations'),
                paths.appOutput,
                { recursive: true },
              );

              /*const files = glob.sync(resolve(paths.appSrc, '**!/!*{.ts,.tsx}'), {
                ignore: [paths.appHome]
              });

              const compilerOptions = {
                allowJs: true,
                declaration: true,
                declarationDir: paths.appOutput,
                emitDeclarationOnly: true,
              };

              const host = ts.createCompilerHost(compilerOptions);
              const program = ts.createProgram(files, compilerOptions, host);
              const emitResult = program.emit();

              if (emitResult.emitSkipped)
                compilation.errors.push('type errors');*/
              try {
                /* execSync(`tsc --project tsconfig.build.json --outDir ${paths.appOutput}`, {
                  cwd: process.cwd(),
                  stdio: 'inherit',
                }); */

                callback();
              } catch (e) {
                callback('Declarations generating failed');
              }
            });
          },
        },
      {
        apply: compiler => {
          compiler.hooks.shouldEmit.tap('Check errors', compilation => {
            return !compilation.getStats().hasErrors();
          });
        },
      },
      !isDevServer && {
        apply: compiler => {
          compiler.hooks.environment.tap('Clear old build', () => {
            if (existsSync(paths.appOutput)) {
              readdirSync(paths.appOutput).forEach(baseName => {
                const path = resolve(paths.appOutput, baseName);

                rmSync(path, { recursive: true });
              });
            }
          });
        },
      },
      isDevServer && new HtmlWebpackPlugin({
        template: resolve(paths.appStatic, 'templates/webpack-index.html'),
        title: app.name,
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    stats: {
      colors: true,
      modules: false,
    },
  };
};
