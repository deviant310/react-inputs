import { resolve, basename } from 'path';
import { existsSync, readdirSync, rmSync, copyFileSync, writeFileSync } from 'fs';
import ts from 'typescript';
import glob from 'glob';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import paths from '../paths.js';

const appName = process.env.APP_PUBLIC_NAME || '';
const devServerPort = process.env.DEV_SERVER_PORT || 3000;
const devServerPortForwarded = process.env.DEV_SERVER_PORT_FORWARDED || 3000;

export default function (webpackEnv) {
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
      ...isProductionBuild ? {
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
          compiler.hooks.done.tap('Plugin', () => {
            if (existsSync(paths.appBuild))
              copyFileSync(paths.appPackageJson, resolve(paths.appBuild, basename(paths.appPackageJson)));
          });
        }
      },
      isProductionBuild && {
        apply: compiler => {
          compiler.hooks.done.tap('Plugin', () => {
            const files = glob.sync(resolve(paths.appSrc, '**/*{.ts,.tsx}'), {
              ignore: [paths.appIndex, paths.appTest]
            });
            const compilerOptions = {
              allowJs: true,
              declaration: true,
              emitDeclarationOnly: true,
            };
            const host = ts.createCompilerHost(compilerOptions);

            host.writeFile = (fileName, data, writeByteOrderMark, onError, sourceFileObject) => {
              if (sourceFileObject[0].fileName === paths.appMain) {
                writeFileSync(resolve(paths.appBuild, 'index.d.ts'), data);
              }
            };

            const program = ts.createProgram(files, compilerOptions, host);

            program.emit();
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
      assets: false,
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
}
