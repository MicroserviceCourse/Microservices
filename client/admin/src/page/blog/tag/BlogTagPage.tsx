import { useCallback, useEffect, useState } from "react";
import type { BlogTag } from "../../../types/blog/tag/tag.type";
import { changeStatusBlogTag, getBlogTags } from "../../../service/api/Blog/BlogTag";
import { useAlert } from "../../../components/alert-context/alert-context";
import { getBlogTagColumns } from "./BlogTag.columns";
import { Table } from "../../../components/ui/Table/TableIUI";
import CreateBlogTagModal from "../../../components/blog/tag/CreateBlogTagModal";
import EditBlogTagModal from "../../../components/blog/tag/EditBlogTagModal";
import type { SortState } from "../../../types";

const BlogTagPage = () => {
  const [data, setData] = useState<BlogTag[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedBlogTag, setSelectedBlogTag] = useState<any | null>(null);
  const { showAlert } = useAlert();
  const [error, setError] = useState<string | null>(null);
const [sort, setSort] = useState<SortState<BlogTag>>({
  key: "id",
  order: "asc",
});
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let filters: string[] = [];
      if (statusFilter) {
        filters.push(`isStatus==${statusFilter}`);
      }
      const filterQuery = filters.join(" and ");
      const data = await getBlogTags({
        page: 1,
        size: 10,
        sort: `${sort.key},${sort.order}`,
        searchValue: search,
        ...(filterQuery ? { filter: filterQuery } : {}),
      });
      setData(data?.data?.data?.content || []);
    } catch (err) {
      setError("Failed to load blog categories.");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, sort]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleToggleStatus = async (id: number, nextStatus: boolean) => {
    const prev = [...data];

    setData((list) =>
      list.map((item) => (item.id === id ? { ...item, isStatus: nextStatus } : item)),
    );
    try {
      await changeStatusBlogTag(id, nextStatus);
    } catch (err) {
      setData(prev);
      showAlert({
        title: "Update status failed",
        type: "error",
        autoClose: 3000,
      });
    }
  };
  const handleEdit = (row: any) => {
    setOpenUpdate(true);
    setSelectedBlogTag(row);
  };
  const columns = getBlogTagColumns({
    onToggleStatus: handleToggleStatus,
    onEdit: (row) => {
      handleEdit(row);
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[#5d7186]">Manager Blog Tags</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-[#FF7A29] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF6A14]"
          >
            Add Blog Tags
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by id,name"
          className="w-64 rounded-xl border border-[#C2C4C5]
        px-3 py-2 text-sm focus:border-[#FF7A29]
        focus:outline-none focus:ring-1 focus:ring-[#FF7A29]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="rounded-xl border border-[#C2C4C5]
        px-3 py-2 text-sm focus:border-[#FF7A29] focus:outline-none focus:ring-[#FF7A29]"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">InActive</option>
        </select>
      </div>
      <Table
        columns={columns}
        data={data}
        loading={loading}
        sort={sort}
        onSortChange={setSort}
        rowKey={(row) => row.id.toString()}
      />
      <CreateBlogTagModal isOpen={open} onClose={() => setOpen(false)} onSuccess={fetchData} />
        <EditBlogTagModal
        isOpen={openUpdate}
        onClose={() => setOpenUpdate(false)}
        onSuccess={fetchData}
        blogTagId={selectedBlogTag?.id}
      />
    </div>
  );
};
export default BlogTagPage;
