require('dotenv').config();

const { resolve } = require('path');
const { existsSync, readdirSync, rmSync } = require('fs');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ts = require('typescript');
const glob = require('glob');
const app = require('./package.json');
const paths = require('./paths.js');
const isDevServer = Boolean(process.env.WEBPACK_SERVE);
const devServerPort = process.env.DEV_SERVER_PORT ?? 3000;

const entries = {
  'masked-field': resolve(paths.appSrc, 'masked-field'),
  'number-field': resolve(paths.appSrc, 'number-field'),
  'select-field': resolve(paths.appSrc, 'select-field'),
  'text-field': resolve(paths.appSrc, 'text-field')
};

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
      },
      compress: true,
      open: true,
      port: devServerPort,
      static: {
        directory: paths.appOutput,
      }
    },
    devtool: !isProductionBuild && 'source-map',
    entry: isDevServer ? paths.appHome : {
      'index': paths.appMain,
      ...entries,
    },
    externals: !isDevServer ? [
      {
        react: 'react',
      },
      function ({ context, contextInfo, request }, callback) {
        const moduleIsExternal = contextInfo.issuer && Object
          .values(entries)
          .includes(
            resolve(context, request)
          );

        if (moduleIsExternal)
          return callback(null, request);

        callback();
      },
    ] : [],
    infrastructureLogging: {
      level: 'none',
    },
    mode: isProductionBuild ? 'production' : 'development',
    module: {
      rules: [
        {
          loader: 'babel-loader',
          options: {
            cacheCompression: false,
            cacheDirectory: true,
            compact: isProductionBuild
          },
          test: /\.(ts|tsx|js|jsx)$/,
        },
      ]
    },
    optimization: {
      minimize: isProductionBuild,
    },
    output: {
      filename: ({ chunk }) => (
        chunk.name === 'index'
          ? '[name].js'
          : '[name]/index.js'
      ),
      libraryTarget: 'umd',
      path: paths.appOutput
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        failOnError: true,
        overrideConfig: {
          rules: {
            'no-console': isProductionBuild ? 'error' : 'off',
            'no-debugger': isProductionBuild ? 'error' : 'off',
          }
        }
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configOverwrite: {
            exclude: !isDevServer
              ? [paths.appHome]
              : []
          }
        }
      }),
      {
        apply: compiler => {
          compiler.hooks.shouldEmit.tap('Check errors', compilation => {
            return !compilation.getStats().hasErrors();
          });
        }
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
        }
      },
      !isDevServer && {
        apply: compiler => {
          compiler.hooks.done.tap('Build declarations bundle', () => {
            const files = glob.sync(resolve(paths.appSrc, '**/*{.ts,.tsx}'), {
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

            program.emit();
          });
        }
      },
      isDevServer && new HtmlWebpackPlugin({
        template: paths.appHtmlTemplate,
        title: app.name
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    stats: {
      colors: true,
      modules: false
    },
  };
};
