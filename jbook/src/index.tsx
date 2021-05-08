import 'bulmaswatch/superhero/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import CodeEditor from './components/code-editor'
import Preview from './components/preview'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

const App = () => {
  const [input, setInput] = useState<string | undefined>('')
  const [code, setCode] = useState('')

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.11.20/esbuild.wasm',
    })
  }

  useEffect(() => {
    startService()
  }, [])

  const onClick = async () => {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    })

    setCode(result.outputFiles[0].text)
  }

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={value => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
