import { Post } from "@/types";

// Keep all WordPress integration in one module so route files stay focused on UI/rendering.
const WP_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL!;

type WPQuery = Record<string, string | number | boolean | undefined>;

type FetchOptions = {
  revalidate?: number;
  tags?: string[];
};

export type PaginatedPosts = {
  posts: Post[];
  total: number;
  totalPages: number;
};

function buildUrl(path: string, query?: WPQuery) {
  const url = new URL(`${WP_BASE_URL}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function wpFetch<T>(
  path: string,
  query?: WPQuery,
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetch(buildUrl(path, query), {
    // ISR is ideal for CMS-driven content pages that update often but not every request.
    next: {
      revalidate: options.revalidate ?? 300,
      tags: options.tags ?? ["wp-posts"],
    },
  });

  if (!response.ok) {
    throw new Error(`WP request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getAllPosts() {
  return wpFetch<Post[]>(
    "/posts",
    { _embed: true, per_page: 20, orderby: "date", order: "desc" },
    { revalidate: 300 }
  );
}

export async function getPaginatedPosts(page = 1, perPage = 10): Promise<PaginatedPosts> {
  // We fetch directly here (instead of wpFetch) because pagination totals come from headers.
  const response = await fetch(
    buildUrl("/posts", {
      _embed: true,
      page,
      per_page: perPage,
      orderby: "date",
      order: "desc",
    }),
    {
      next: { revalidate: 300, tags: ["wp-posts"] },
    }
  );

  if (!response.ok) {
    throw new Error(`WP request failed: ${response.status} ${response.statusText}`);
  }

  const posts = (await response.json()) as Post[];
  const total = Number(response.headers.get("X-WP-Total") || "0");
  const totalPages = Number(response.headers.get("X-WP-TotalPages") || "0");

  return {
    posts,
    total,
    totalPages,
  };
}

export async function getPostBySlug(slug: string) {
  const posts = await wpFetch<Post[]>("/posts", { slug, _embed: true }, { revalidate: 300 });
  return posts[0] || null;
}

export async function getPostSlugs() {
  // Only request slug to keep payload small for generateStaticParams and sitemap.
  const posts = await wpFetch<Pick<Post, "slug">[]>(
    "/posts",
    {
      _fields: "slug",
      per_page: 100,
      orderby: "date",
      order: "desc",
    },
    { revalidate: 300 }
  );

  return posts.map((post) => post.slug);
}

export async function getPostNavigation(slug: string) {
  const posts = await wpFetch<Pick<Post, "slug" | "title">[]>(
    "/posts",
    {
      _fields: "slug,title",
      per_page: 100,
      orderby: "date",
      order: "desc",
    },
    { revalidate: 300 }
  );

  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return {
      previousPost: null,
      nextPost: null,
    };
  }

  return {
    previousPost: posts[index + 1] || null,
    nextPost: posts[index - 1] || null,
  };
}

export async function getRelatedPosts(postId: number, authorId: number, limit = 3) {
  return wpFetch<Post[]>(
    "/posts",
    {
      _embed: true,
      author: authorId,
      exclude: postId,
      per_page: limit,
      orderby: "date",
      order: "desc",
    },
    { revalidate: 300 }
  );
}