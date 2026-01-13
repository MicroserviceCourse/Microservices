import { useCallback, useEffect, useState } from "react";
import { Table } from "../../../components/ui/TableIUI";
import type { BlogCategory } from "../../../types/blog/blog.type";
import { getBlogCategories } from "../../../service/api/Blog/BlogCategory";
import { categoryColumns } from "./category.columns";
import CreateBlogCategoryModal from "../../../components/blog/category/CreateBlogCategoryModal";

export default function CategoryListPage() {
  const [data, setData] = useState<BlogCategory[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBlogCategories({
        page: 1,
        size: 10,
      });
      setData(data?.data?.data?.content || []);
    } catch (err) {
      setError("Failed to load blog categories.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[#5d7186]">Manager Blog Categories</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-[#FF7A29] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF6A14]"
          >
            Add Blog Categories
          </button>
        </div>
      </div>

      <Table columns={categoryColumns} data={data} rowKey={(row) => row.id.toString()} />
      <CreateBlogCategoryModal isOpen={open} onClose={() => setOpen(false)} onSuccess={fetchData} />
    </div>
  );
}
