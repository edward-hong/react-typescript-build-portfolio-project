import { useRef } from 'react'
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
  initialValue: string
  onChange: OnChange
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: OnMount = editor => {
    editorRef.current = editor
  }

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue()

    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: false,
      singleQuote: true,
    })

    editorRef.current.setValue(formatted)
  }

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        onChange={onChange}
        onMount={onEditorDidMount}
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
          tabSize: 2,
        }}
      />
    </div>
  )
}

export default CodeEditor
