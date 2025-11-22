// src/pages/PostDetail.tsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BlogPostApi } from "../service/api/BlogPost";
import type { PostDto } from "../types";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        const data = await BlogPostApi.getById(Number(id));
        setPost(data);
      } catch (error) {
        console.error("Load post failed", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading && !post) {
    return <div className="p-4 max-w-3xl mx-auto">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <Link to="/blog" className="text-sm text-blue-600">
          ← Back to blog
        </Link>
        <p className="mt-4">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Link to="/blog" className="text-sm text-blue-600">
        ← Back to blog
      </Link>

      <h1 className="text-3xl font-bold mt-3 mb-2">{post.title}</h1>

      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
        {post.publishedAt && (
          <span>
            {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
          </span>
        )}
        {post.categoryName && (
          <span className="text-blue-600">{post.categoryName}</span>
        )}
      </div>

      {post.thumbnailUrl && (
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="w-full max-h-96 object-cover rounded mb-6"
        />
      )}

      {/* Nếu content bên backend là HTML đã render sẵn thì dùng dangerouslySetInnerHTML */}
      {/* Nếu chỉ là plain text/markdown thì giữ dạng {post.content} như dưới */}
      <div className="prose max-w-none">
        {post.content}
        {/* 
        Nếu là HTML:
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        */}
      </div>
    </div>
  );
};

export default PostDetail;
