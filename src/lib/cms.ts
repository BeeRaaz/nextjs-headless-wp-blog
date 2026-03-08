import { Post } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL as string;

// get all posts
export const getAllPosts = async (): Promise<Post[] | []> => {
  try {
    const response = await fetch(`${BASE_URL}/posts?_embed`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error("Failed to fetch all posts");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error while fetching all posts: ${error}`);
    return [];
  }
};

// get post by its slug
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const response = await fetch(`${BASE_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 },
    });

    if (!response.ok)
      throw new Error(`Failed to fetch the post with the slug: ${slug}`);

    const data = await response.json();

    const post = data[0];

    if (!post) return null;

    return post;
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
};
