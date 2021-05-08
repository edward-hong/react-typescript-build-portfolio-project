import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { useState } from 'react'
import ReactDOM from 'react-dom'

import CodeEditor from './components/code-editor'
import Preview from './components/preview'
import bundler from './bundler'

const App = () => {
  const [input, setInput] = useState<string | undefined>('')
  const [code, setCode] = useState('')

  const onClick = async () => {
    const output = await bundler(input)

    setCode(output)
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
