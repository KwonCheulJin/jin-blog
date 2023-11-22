'use client';

import { imageUploadHandler } from '@/lib/imageUploader';
import {
  MDXEditor,
  MDXEditorMethods,
  markdownShortcutPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
} from '@mdxeditor/editor';
import { useTheme } from 'next-themes';
interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  onChange: (markdown: string) => void;
}

export default function Editor({ markdown, onChange, editorRef }: EditorProps) {
  const { theme } = useTheme();
  return (
    <MDXEditor
      className={`${
        theme === 'dark' ? 'dark-theme dark-editor' : 'light-theme'
      } h-full w-full overflow-y-scroll rounded-sm border border-black dark:border-gray-100`}
      contentEditableClassName="prose dark:prose-invert max-w-full py-4 px-8"
      onChange={onChange}
      markdown={markdown}
      ref={editorRef}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <UndoRedo />
            </>
          ),
        }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageUploadHandler }),
        markdownShortcutPlugin(),
      ]}
    />
  );
}
