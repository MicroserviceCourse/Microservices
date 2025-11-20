// client/superAdmin/src/pages/blog/category/CategoryList.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableUI from "../../../components/ui/TableUI";
import type { CategoryDto, PageResponse, Column } from "../../../types";
import { BlogCategoryApi } from "../../../service/api/BlogCategory";

const BlogCategoryList = () => {
  const [pageData, setPageData] =
    useState<PageResponse<CategoryDto> | null>(null);
  const [page, setPage] = useState(0);    // 0-based cho backend
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await BlogCategoryApi.getPage({
        page,
        size,
        search,
        sort: "id,desc",
      });
      setPageData(data);
    } catch (error) {
      console.error("Failed to load blog categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, search]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await BlogCategoryApi.delete(id);
      fetchData();
    } catch (error) {
      console.error("Delete category error", error);
    }
  };

  const handleSearchClick = () => {
    setPage(0);
    fetchData();
  };

  const handlePageChange = (uiPage: number) => {
    // uiPage: 1,2,3,... từ TableUI
    setPage(uiPage - 1); // convert về 0-based
  };

  const columns: Column<CategoryDto>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Slug", accessor: "slug" },
    { header: "Description", accessor: "description" },
    {
      header: "Action",
      accessor: "id",
      render: (_value, row) => (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
            onClick={() => navigate(`/dashboard/blog/categories/${row.id}/edit`)}
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
        <div className="flex gap-2">
          <input
            className="border px-2 py-1 rounded"
            placeholder="Search by name / slug / description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>

        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => navigate("/dashboard/blog/categories/create")}
        >
          + New Category
        </button>
      </div>

      <TableUI<CategoryDto>
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

export default BlogCategoryList;
