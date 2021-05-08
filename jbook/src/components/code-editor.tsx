import MonacoEditor, { OnChange } from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
  onChange: OnChange
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  return (
    <MonacoEditor
      onChange={onChange}
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
  )
}

export default CodeEditor
