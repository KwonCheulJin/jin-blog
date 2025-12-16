import { imageUploadHandler } from '@/lib/image-uploader';
import insertToTextArea from '@/lib/insert-to-text-area';

const onImagePasted = async (
  dataTransfer: DataTransfer,
  setMarkdown: (value: string) => void,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      files.push(file);
    }
  }

  await Promise.all(
    files.map(async file => {
      const url = await imageUploadHandler(file);
      const insertedMarkdown = insertToTextArea(`![](${url})`);
      if (!insertedMarkdown) {
        return;
      }
      setMarkdown(insertedMarkdown);
    }),
  );
};

export default onImagePasted;
