require('dotenv').config();

const { resolve } = require('path');
const { existsSync, readdirSync, rmSync } = require('fs');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ts = require('typescript');
const glob = require('glob');
const app = require('./package.json');
const paths = require('./paths');
const isDevServer = Boolean(process.env.WEBPACK_SERVE);
const devServerPort = process.env.DEV_SERVER_PORT ?? 3000;

module.exports = ({ production }) => {
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
        directory: paths.appBuild,
      }
    },
    devtool: !isProductionBuild && 'source-map',
    entry: isDevServer ? paths.appIndex : paths.appMain,
    externals: {
      ...!isDevServer ? {
        react: 'react'
      } : {}
    },
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
      libraryTarget: 'umd',
      path: paths.appBuild
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['ts', 'tsx'],
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
              ? [paths.appIndex]
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
            if (existsSync(paths.appBuild)) {
              readdirSync(paths.appBuild).forEach(baseName => {
                const path = resolve(paths.appBuild, baseName);

                rmSync(path, { recursive: true });
              });
            }
          });
        }
      },
      !isDevServer && {
        apply: compiler => {
          compiler.hooks.done.tap('Build declarations bundle', () => {
            setTimeout(() => {
              const files = glob.sync(resolve(paths.appSrc, '**/*{.ts,.tsx}'), {
                ignore: [paths.appIndex]
              });

              const compilerOptions = {
                allowJs: true,
                declaration: true,
                declarationDir: paths.appBuild,
                emitDeclarationOnly: true,
              };

              const host = ts.createCompilerHost(compilerOptions);
              const program = ts.createProgram(files, compilerOptions, host);

              program.emit();
            }, 0);
          });
        }
      },
      isDevServer && new HtmlWebpackPlugin({
        template: paths.appHtml,
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
