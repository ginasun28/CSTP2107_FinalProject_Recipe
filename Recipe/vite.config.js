import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            '@': path.resolve(__dirname, 'src'), // 添加一个别名，方便导入模块时使用
        },
    },
})