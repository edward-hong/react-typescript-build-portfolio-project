import MonacoEditor from '@monaco-editor/react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string | undefined): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const handleChange = (
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ): void => {
    onChange(value)
  }
  return (
    <MonacoEditor
      onChange={handleChange}
      value={initialValue}
      theme="vs-dark"
      language="javascript"
      height="500px"
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}

export default CodeEditor
