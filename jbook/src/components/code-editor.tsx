import { useRef } from 'react'
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react'
import Highlighter from 'monaco-jsx-highlighter'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

import './code-editor.css'
import './syntax.css'

interface CodeEditorProps {
  initialValue: string
  onChange: OnChange
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()
  const highlighterRef = useRef<any>()
  const disableHighlightRef = useRef<any>()

  const babelParse = (code: string) =>
    parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    })

  const onEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    const highlighter = new Highlighter(monaco, babelParse, traverse, editor)

    highlighterRef.current = highlighter

    const disable = highlighter.highLightOnDidChangeModelContent(
      100,
      () => {},
      () => {},
      undefined,
      () => {}
    )

    disableHighlightRef.current = disable

    highlighter.addJSXCommentCommand()
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

  const handleChange: OnChange = (value, ev) => {
    onChange(value, ev)
    disableHighlightRef.current()

    highlighterRef.current.highLightOnDidChangeModelContent(
      100,
      () => {},
      () => {},
      undefined,
      () => {}
    )
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
        onChange={handleChange}
        onMount={onEditorDidMount}
        value={initialValue}
        theme="vs-dark"
        language="javascript"
        height="100%"
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
