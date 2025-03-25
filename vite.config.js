import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            include: ['**/*.jsx', '**/*.js', 'node_modules/react-lazy-load-image-component/**/*.js']
        })
    ],
    base: './',
    esbuild: {
        jsx: 'transform',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment'
    },
    build: {
        commonjsOptions: {
            include: [/node_modules/]
        }
    },
    optimizeDeps: {
        include: [
            'buffer',
            'process',
            'react-lazy-load-image-component',
        ],
        esbuildOptions: {
            loader: {
                '.js': 'jsx'
            }
        }
    },
    define: {
        'process.env': {},
        Buffer: 'globalThis.Buffer', // o 'self.Buffer' dependiendo del entorno
    },
})
