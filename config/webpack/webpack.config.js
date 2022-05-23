const { resolve, basename } = require('path');
const { existsSync, readdirSync, rmSync, copyFileSync } = require('fs');
const ts = require('typescript');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('../paths.js');

const appName = process.env.APP_PUBLIC_NAME || '';
const devServerPort = process.env.DEV_SERVER_PORT || 3000;
const devServerPortForwarded = process.env.DEV_SERVER_PORT_FORWARDED || 3000;

module.exports = webpackEnv => {
  const isDevelopmentBuild = webpackEnv.startsWith('dev');
  const isDevServer = webpackEnv === 'dev-server';
  const isProductionBuild = webpackEnv.startsWith('production');

  return {
    mode: isProductionBuild ? 'production' : isDevelopmentBuild && 'development',
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
          include: paths.appSrc,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              //'@babel/plugin-transform-runtime'
            ],
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
            'no-debugger': isDevelopmentBuild ? 'off' : 'error'
          }
        },
        failOnError: true
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false
      }),
      {
        apply: compiler => {
          compiler.hooks.shouldEmit.tap('Plugin', (compilation) => {
            return !compilation.getStats().hasErrors();
          });
        }
      },
      {
        apply: compiler => {
          compiler.hooks.environment.tap('Plugin', () => {
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
          compiler.hooks.environment.tap('Plugin', () => {
            if (existsSync(paths.appBuild))
              copyFileSync(paths.appPackageJson, resolve(paths.appBuild, basename(paths.appPackageJson)));
          });
        }
      },
      !isDevServer && {
        apply: compiler => {
          compiler.hooks.done.tap('Plugin', () => {
            setTimeout(() => {
              const files = [paths.appMain].concat(
                readdirSync(paths.appTypes)
                  .map(basename => resolve(paths.appTypes, basename))
              );
              const compilerOptions = {
                allowJs: true,
                declaration: true,
                emitDeclarationOnly: true,
                declarationDir: paths.appBuild
              };
              const host = ts.createCompilerHost(compilerOptions);
              const program = ts.createProgram(files, compilerOptions, host);

              program.emit();
            }, 0);
          });
        }
      },
      isDevServer && new HtmlWebpackPlugin({
        title: appName,
        template: paths.appHtml
      })
    ].filter(Boolean),
    stats: {
      colors: true,
      modules: false
    },
    devServer: {
      static: {
        directory: paths.appBuild,
      },
      compress: true,
      port: devServerPort,
      client: {
        webSocketURL: {
          port: devServerPortForwarded,
        },
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    ...isDevelopmentBuild ? {
      devtool: 'cheap-module-source-map'
    } : {},
    infrastructureLogging: {
      level: 'none',
    },
  };
};
