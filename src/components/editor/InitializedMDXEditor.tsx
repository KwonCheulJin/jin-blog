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
  editorRef: React.MutableRefObject<MDXEditorMethods | null>;
  onChange: (markdown: string) => void;
}

export default function Editor({ markdown, onChange, editorRef }: EditorProps) {
  const { theme } = useTheme();
  return (
    <MDXEditor
      className={`${
        theme === 'dark' ? 'dark-theme dark-editor' : 'light-theme'
      } h-full w-full overflow-y-scroll dark:bg-transparent dark:caret-primary-500`}
      contentEditableClassName="prose dark:prose-invert min-w-full min-h-full py-4 text-lg"
      placeholder="당신의 이야기를 적어보세요...."
      onChange={onChange}
      markdown={markdown}
      ref={editorRef}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex w-full">
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <UndoRedo />
            </div>
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
