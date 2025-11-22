// src/pages/blog/post/PostList.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableUI from "../../../components/ui/TableUI";
import type { PostDto, PageResponse, Column } from "../../../types";
import { BlogPostApi } from "../../../service/api/BlogPost";

const BlogPostList = () => {
  const [pageData, setPageData] =
    useState<PageResponse<PostDto> | null>(null);
  const [page, setPage] = useState(0);   // 0-based cho backend
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await BlogPostApi.getPage({ page, size });
      setPageData(data);
    } catch (error) {
      console.error("Failed to load blog posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await BlogPostApi.delete(id);
      fetchData();
    } catch (error) {
      console.error("Delete post error", error);
    }
  };

  const handlePageChange = (uiPage: number) => {
    setPage(uiPage - 1); // 1-based UI -> 0-based backend
  };

  const columns: Column<PostDto>[] = [
    { header: "ID", accessor: "id" },
    { header: "Title", accessor: "title" },
    { header: "Slug", accessor: "slug" },
    {
      header: "Category",
      accessor: "categoryName",
    },
    {
      header: "Status",
      accessor: "published",
      render: (value: boolean) => (
        <span
          className={
            value ? "text-green-600 font-medium" : "text-gray-500"
          }
        >
          {value ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      header: "Published At",
      accessor: "publishedAt",
    },
    {
      header: "Action",
      accessor: "id",
      render: (_value, row) => (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
            onClick={() =>
              navigate(`/dashboard/blog/posts/${row.id}/edit`)
            }
          >
            Edit
          </button>
          <button
            className="px-2 py-1 text-sm bg-red-500 text-white rounded"
            onClick={() => handleDelete(row.id!)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Blog Posts</h1>

        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => navigate("/dashboard/blog/posts/create")}
        >
          + New Post
        </button>
      </div>

      <TableUI<PostDto>
        columns={columns}
        data={pageData?.content || []}
        loading={loading}
        pagination={{
          currentPage: page + 1,
          totalPages: pageData?.totalPages || 1,
          disabled: loading,
          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default BlogPostList;
