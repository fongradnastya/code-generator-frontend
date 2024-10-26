import { memo, type FC, useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { type editor } from 'monaco-editor';

import files from '../../utils/sourceFiles';

const EditorPageComponent: FC = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [fileName, setFileName] = useState('script.js');

  const file = files.find(f => f.name === fileName);

  useEffect(() => {
    editorRef.current?.focus();
  }, [file]);

  const handleEditorDidMount = (myEditor: editor.IStandaloneCodeEditor) => {
    editorRef.current = myEditor;
  };

  return (
    <>
      <button
        disabled={fileName === 'script.js'}
        onClick={() => setFileName('script.js')}
      >
        script.js
      </button>
      <button
        disabled={fileName === 'style.css'}
        onClick={() => setFileName('style.css')}
      >
        style.css
      </button>
      <button
        disabled={fileName === 'index.html'}
        onClick={() => setFileName('index.html')}
      >
        index.html
      </button>
      {file && (
        <Editor
          height="80vh"
          theme="vs-dark"
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
          onMount={handleEditorDidMount}
        />
      )}
    </>
  );
};

/** Editor page component. */
export const EditorPage = memo(EditorPageComponent);
