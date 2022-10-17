import { createVitePlugins } from './config/vite/plugins';
import { resolve } from 'path';
import { ConfigEnv, UserConfigExport } from 'vite';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default function ({ command }: ConfigEnv): UserConfigExport {
  const isProduction = command === 'build';
  const root = process.cwd();

  return {
    root,
    base: isProduction ? './' : '/',
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      host: true,
      hmr: true,
      // https: true,
      // proxy: {
      //   '/': {
      //     target: 'http://192.168.101.79:8087',
      //     changeOrigin: true,
      //   },
      // },
    },
    plugins: createVitePlugins(isProduction),
    css: {
      preprocessorOptions: {
        scss: {
          // 配置 nutui 全局 scss 变量
          additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`,
        },
      },
    },
  };
}
