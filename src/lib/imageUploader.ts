export async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append('image', image);
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  const json = (await response.json()) as { publicUrl: string };

  return json.publicUrl;
}
