import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import type {ImportMetaEnv} from "./env";

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  let env:Record<keyof ImportMetaEnv,string> = loadEnv(mode,process.cwd())
  console.log(env,env.VITE_SERVER_URL)
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server:{
      host:'0.0.0.0',
      port:80,
      proxy:{
        '/api':{
          target:env.VITE_SERVER_URL,
          changeOrigin:true
        },
        '/upload':{
          target:env.VITE_SERVER_URL,
        }
      }
    }
  }
})
