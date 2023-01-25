// import path from 'path-browserify'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import ViteRequireContext from '@originjs/vite-plugin-require-context'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  return defineConfig({
    resolve: {
      alias: {
        '@': `${path.resolve(__dirname, 'src')}`
      },
      dedupe: ['vue'],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },

    css: {
      // show position, line, file of class css when inspect browser
      devSourcemap: true
    },

    plugins: [
      vue(),
      Components({
        // resolvers: [ElementUiResolver()],
        resolvers: [],
        dirs: ['src/components/', 'src/layout/', 'src/view/'],
        extensions: ['vue', 'md'],
        dts: 'src/components.d.ts'
      }),
      AutoImport({
        resolvers: [ElementUiResolver()],
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core'],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        dts: 'src/auto-imports.d.ts'
      }),
      ViteRequireContext(),
      viteCommonjs()
    ],

    server: {
      port: 3333
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  })
}
