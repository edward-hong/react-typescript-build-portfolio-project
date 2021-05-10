import { useState, useEffect } from 'react'

import CodeEditor from './code-editor'
import Resizable from './resizable'
import Preview from './preview'
import { bundler } from '../bundler'
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')

  const { updateCell } = useActions()

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content)

      setCode(output.code)
      setErr(output.err)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [cell.content])

  return (
    <div>
      <Resizable direction="vertical">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue={cell.content}
              onChange={value => {
                if (value) {
                  updateCell(cell.id, value)
                }
              }}
            />
          </Resizable>
          <Preview code={code} err={err} />
        </div>
      </Resizable>
    </div>
  )
}

export default CodeCell
