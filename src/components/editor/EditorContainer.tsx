'use client';
import { Button } from '@/components/ui/button';
import { MDXEditorMethods } from '@mdxeditor/editor';
import dynamic from 'next/dynamic';
import { Suspense, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false,
});

export default function EditorContainer() {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [markdown, setMarkdown] = useState('');
  const [tempMarkdown, setTempMarkdown] = useLocalStorage('temp-markdown', '');
  console.log(
    '🚀 ~ file: EditorContainer.tsx:18 ~ EditorContainer ~ tempMarkdown:',
    tempMarkdown,
  );
  const handleChange = (markdown: string) => {
    console.log(
      '🚀 ~ file: EditorContainer.tsx:24 ~ handleChange ~ markdown:',
      markdown,
    );
    setMarkdown(markdown);
  };

  const handelMarkdown = () => {
    setTempMarkdown(markdown);
    editorRef.current?.setMarkdown('');
  };

  return (
    <div className="h-[70vh]">
      <Suspense fallback={null}>
        <Editor
          markdown={markdown}
          onChange={handleChange}
          editorRef={editorRef}
        />
      </Suspense>
      <Button className="w-full" onClick={handelMarkdown}>
        Save
      </Button>
    </div>
  );
}
