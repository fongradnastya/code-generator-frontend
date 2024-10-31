import { memo, type FC, useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useSelector } from 'react-redux';
import { selectIsDrawerOpen } from 'src/store/drawer/selectors';
import { type editor } from 'monaco-editor';

import files from '../../utils/sourceFiles';

import styles from './EditorPage.module.css';

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

  const open = useSelector(selectIsDrawerOpen);

  return (
    <main className={`${styles.layout} ${open ? styles.layoutOpen : ''}`}>
      <div className={styles.buttons}>
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
      </div>
      {file && (
        <Editor
          height="85vh"
          theme="vs-light"
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
          onMount={handleEditorDidMount}
        />
      )}
    </main>
  );
};

/** Editor page component. */
export const EditorPage = memo(EditorPageComponent);
