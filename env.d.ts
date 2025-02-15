/// <reference types="vite/client" />

export interface ImportMetaEnv{
    VITE_SERVER_URL: string
}

declare module 'vue-router' {
    interface RouteMeta {
        isLogin?: boolean
        isAdmin?: boolean
        isTourist?: boolean
        title?: string
    }
}