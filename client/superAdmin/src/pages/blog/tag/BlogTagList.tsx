// src/pages/blog/tag/TagList.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableUI from "../../../components/ui/TableUI";
import type { TagDto, PageResponse, Column } from "../../../types";
import { BlogTagApi } from "../../../service/api/BlogTag";

const BlogTagList = () => {
  const [pageData, setPageData] =
    useState<PageResponse<TagDto> | null>(null);
  const [page, setPage] = useState(0);   // 0-based cho backend
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await BlogTagApi.getPage({
        page,
        size,
      });
      setPageData(data);
    } catch (error) {
      console.error("Failed to load blog tags", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this tag?")) return;
    try {
      await BlogTagApi.delete(id);
      fetchData();
    } catch (error) {
      console.error("Delete tag error", error);
    }
  };

  const handlePageChange = (uiPage: number) => {
    // uiPage: 1,2,3,... từ TableUI
    setPage(uiPage - 1); // convert về 0-based
  };

  const columns: Column<TagDto>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Slug", accessor: "slug" },
    {
      header: "Action",
      accessor: "id",
      render: (_value, row) => (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
            onClick={() =>
              navigate(`/dashboard/blog/tags/${row.id}/edit`)
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
        <h1 className="text-xl font-semibold">Blog Tags</h1>

        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => navigate("/dashboard/blog/tags/create")}
        >
          + New Tag
        </button>
      </div>

      <TableUI<TagDto>
        columns={columns}
        data={pageData?.content || []}
        loading={loading}
        pagination={{
          currentPage: page + 1,                         // 1-based cho UI
          totalPages: pageData?.totalPages || 1,
          disabled: loading,
          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default BlogTagList;
