import { useRef } from 'react'
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

import './code-editor.css'

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

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: false,
        singleQuote: true,
      })
      .replace(/\n$/, '')

    editorRef.current.setValue(formatted)
  }

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
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
