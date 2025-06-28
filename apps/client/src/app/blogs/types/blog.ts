export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  isPublished: boolean;
  shortDescription: string;
  createdAt: string;
}
export interface RawBlog {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  isPublished: boolean;
  shortDescription: string;
  createdAt: string;
}
