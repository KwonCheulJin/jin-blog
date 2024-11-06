export type Project = {
  title: string;
  description: string[];
};
export type Experience = {
  position: string;
  company: string;
  companyLink: string;
  time: string;
  address: string;
  work?: string;
  projects?: Project[];
};

export type Education = {
  type: string;
  time: string;
  place: string;
  info: string;
};

export type Post = {
  title: string;
  sub_title: string;
  markdown: string;
  tags: string[];
};

export type PostDetail = Post & {
  id: string;
  author: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type SimplePost = Omit<PostDetail, 'markdown' | 'author'>;

export type Tags = {
  tags: string;
};

export type AdjacentPost = {
  id: string;
  title: string;
};

export type PostData = PostDetail & {
  next: AdjacentPost | null;
  prev: AdjacentPost | null;
};

export type AllPostsData = {
  page?: string;
  per_page?: string;
  tag?: string;
};

export type AddPostType = Post;

export type User = {
  email: string;
  id: string;
  image: string;
  name: string;
  type: string;
};
