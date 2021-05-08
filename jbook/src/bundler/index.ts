import * as esbuild from 'esbuild-wasm'

import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin'
import { fetchPlugin } from '../plugins/fetch-plugin'

let isInitialized = false

const bundler = async (rawCode: string | undefined) => {
  if (!isInitialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.11.20/esbuild.wasm',
    })

    isInitialized = true
  }

  const result = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  })

  return result.outputFiles[0].text
}

export default bundler
