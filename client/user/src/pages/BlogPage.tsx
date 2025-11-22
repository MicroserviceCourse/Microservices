// src/pages/BlogPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogPostApi } from "../service/api/BlogPost";
import type { PageResponse, PostDto } from "../types";

const BlogPage = () => {
  const [pageData, setPageData] =
    useState<PageResponse<PostDto> | null>(null);
  const [page, setPage] = useState(0); // backend 0-based
  const [size] = useState(10);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await BlogPostApi.getPage({ page, size });
      setPageData(data);
    } catch (e) {
      console.error("Load posts failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleOpenPost = (post: PostDto) => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {loading && !pageData && <p>Loading...</p>}

      <div className="space-y-4">
        {pageData?.content.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => handleOpenPost(post)}
          >
            <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
            {post.publishedAt && (
              <p className="text-xs text-gray-500 mb-1">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            )}
            {post.categoryName && (
              <p className="text-xs text-blue-600 mb-2">
                {post.categoryName}
              </p>
            )}
          </article>
        ))}

        {pageData && pageData.content.length === 0 && (
          <p className="text-gray-500">Chưa có bài viết nào.</p>
        )}
      </div>

      {/* pagination đơn giản */}
      {pageData && pageData.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page + 1} / {pageData.totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page + 1 >= pageData.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
