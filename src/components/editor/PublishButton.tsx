'use client';
import { Button } from '@/components/ui/button';
import { usePostStore } from '@/store/post';
import { useRouter } from 'next/navigation';

export default function PublishButton() {
  const { addPost, setAddPostInit } = usePostStore();
  const router = useRouter();
  const handelMarkdown = async () => {
    console.log('🚀 ~ handelMarkdown ~ addPost:', addPost);
    setAddPostInit();
    // const result = await AddPost(addPost);
    // if (result.status === 200) {
    //   setAddPostInit();
    //   router.push('/posts');
    // }
  };
  return (
    <Button
      className="text-xl hover:bg-primaryDark hover:text-dark"
      onClick={handelMarkdown}
    >
      출간하기
    </Button>
  );
}
