import { useState, useEffect } from 'react'

import CodeEditor from './code-editor'
import Resizable from './resizable'
import Preview from './preview'
import bundler from '../bundler'

const CodeCell = () => {
  const [input, setInput] = useState<string | undefined>('')
  const [code, setCode] = useState('')

  useEffect(() => {
    setTimeout(async () => {
      const output = await bundler(input)

      setCode(output)
    }, 1000)
  }, [input])

  return (
    <div>
      <Resizable direction="vertical">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue="const a = 1;"
              onChange={value => setInput(value)}
            />
          </Resizable>
          <Preview code={code} />
        </div>
      </Resizable>
    </div>
  )
}

export default CodeCell
