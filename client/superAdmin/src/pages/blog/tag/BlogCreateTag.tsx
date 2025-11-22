// src/pages/blog/tag/CreateTag.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogTagApi } from "../../../service/api/BlogTag";
import type { BlogTagForm, TagDto } from "../../../types";
import { slugify } from "../../../util/slug";

const BlogCreateTag = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [form, setForm] = useState<BlogTagForm>({
    name: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Nếu là edit thì load dữ liệu tag
  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      try {
        const data: TagDto = await BlogTagApi.getById(Number(id));
        setForm({
          name: data.name,
          slug: data.slug ?? "",
        });
      } catch (error) {
        console.error("Load tag failed", error);
      }
    })();
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Khi gõ name, nếu slug đang rỗng thì gợi ý slug
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
        await BlogTagApi.update(Number(id), form);
      } else {
        await BlogTagApi.create(form);
      }
      navigate("/dashboard/blog/tags");
    } catch (error) {
      console.error("Save tag error", error);
    } finally {
      setLoading(false);
    }
  };

  // Gợi ý slug từ name (giống Category)
  const mainSlug = slugify(form.name || "");
  const altSlug1 = mainSlug ? `${mainSlug}-1` : "";
  const altSlug2 = mainSlug ? `${mainSlug}-2` : "";

  const applySlug = (s: string) => {
    setForm((prev) => ({ ...prev, slug: s }));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Tag" : "Create New Tag"}
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
            placeholder="vd: Java, Spring, React..."
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
            placeholder="vd: java, spring, react"
          />
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

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded border"
            onClick={() => navigate("/dashboard/blog/tags")}
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

export default BlogCreateTag;
