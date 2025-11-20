import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogCategoryApi } from "../../../service/api/BlogCategory";
import type { BlogCategoryForm, CategoryDto } from "../../../types";
import { slugify } from "../../../util/slug";

const BlogCreateCategory = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [form, setForm] = useState<BlogCategoryForm>({
    name: "",
    slug: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Nếu edit thì load category hiện tại
  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      try {
        const data: CategoryDto = await BlogCategoryApi.getById(Number(id));
        setForm({
          name: data.name,
          slug: data.slug ?? "",
          description: data.description ?? "",
        });
      } catch (e) {
        console.error("Load category failed", e);
      }
    })();
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Khi user gõ name, nếu slug đang rỗng thì auto gợi ý
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: prev.slug ? prev.slug : slugify(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await BlogCategoryApi.update(Number(id), form);
      } else {
        await BlogCategoryApi.create(form);
      }
      navigate("/dashboard/blog/categories");
    } catch (error) {
      console.error("Save category error", error);
    } finally {
      setLoading(false);
    }
  };

  // Gợi ý slug từ name
  const mainSlug = slugify(form.name || "");
  const altSlug1 = mainSlug ? `${mainSlug}-1` : "";
  const altSlug2 = mainSlug ? `${mainSlug}-2` : "";

  const applySlug = (s: string) => {
    setForm((prev) => ({ ...prev, slug: s }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Blog Category" : "Create Blog Category"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            className="w-full border rounded px-3 py-2"
            value={form.name}
            onChange={handleNameChange}
            required
          />
        </div>

        {/* Slug + gợi ý */}
        <div>
          <label className="block text-sm mb-1">Slug</label>
          <input
            name="slug"
            className="w-full border rounded px-3 py-2"
            value={form.slug}
            onChange={handleChange}
            placeholder="vd: dien-thoai-iphone"
          />
          {/* gợi ý chọn nhanh */}
          {mainSlug && (
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="text-gray-500 mr-2">Suggestions:</span>
              <button
                type="button"
                className="px-2 py-1 border rounded-full hover:bg-gray-100"
                onClick={() => applySlug(mainSlug)}
              >
                {mainSlug}
              </button>
              {altSlug1 && (
                <button
                  type="button"
                  className="px-2 py-1 border rounded-full hover:bg-gray-100"
                  onClick={() => applySlug(altSlug1)}
                >
                  {altSlug1}
                </button>
              )}
              {altSlug2 && (
                <button
                  type="button"
                  className="px-2 py-1 border rounded-full hover:bg-gray-100"
                  onClick={() => applySlug(altSlug2)}
                >
                  {altSlug2}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border rounded px-3 py-2"
            rows={4}
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded border"
            onClick={() => navigate("/dashboard/blog/categories")}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreateCategory;
