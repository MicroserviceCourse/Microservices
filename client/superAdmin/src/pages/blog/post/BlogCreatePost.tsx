// src/pages/blog/post/CreatePost.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BlogPostApi } from "../../../service/api/BlogPost";
import { BlogCategoryApi } from "../../../service/api/BlogCategory";
import { BlogTagApi } from "../../../service/api/BlogTag";

import type {
  BlogPostForm,
  CategoryDto,
  TagDto,
  PageResponse,
  PostDto,
} from "../../../types";

import { slugify } from "../../../util/slug";

const BlogCreatePost = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [form, setForm] = useState<BlogPostForm>({
    title: "",
    content: "",
    slug: "",
    thumbnailUrl: "",
    metaTitle: "",
    metaDescription: "",
    published: false,
    categoryId: 0,
    tagIds: [],
  });

  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [tags, setTags] = useState<TagDto[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Load categories + tags
  useEffect(() => {
    (async () => {
      try {
        const catPage: PageResponse<CategoryDto> =
          await BlogCategoryApi.getPage({ page: 0, size: 100 });

        const tagPage: PageResponse<TagDto> =
          await BlogTagApi.getPage({ page: 0, size: 100 });

        setCategories(catPage.content);
        setTags(tagPage.content);
      } catch (e) {
        console.error("Load categories/tags failed", e);
      }
    })();
  }, []);

  // Nếu edit thì load post
  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      try {
        const data: PostDto = await BlogPostApi.getById(Number(id));
        setForm({
          title: data.title,
          content: data.content,
          slug: data.slug,
          thumbnailUrl: data.thumbnailUrl ?? "",
          metaTitle: data.metaTitle ?? "",
          metaDescription: data.metaDescription ?? "",
          published: data.published,
          categoryId: data.categoryId,
          tagIds: data.tags.map((t) => t.id),
        });
      } catch (e) {
        console.error("Load post failed", e);
      }
    })();
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as any;

    if (name === "published") {
      setForm((prev) => ({ ...prev, published: checked }));
      return;
    }

    if (name === "categoryId") {
      setForm((prev) => ({ ...prev, categoryId: Number(value) }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug ? prev.slug : slugify(value),
      metaTitle: prev.metaTitle || value,
    }));
  };

  const toggleTag = (tagId: number) => {
    setForm((prev) => {
      const exists = prev.tagIds.includes(tagId);
      return {
        ...prev,
        tagIds: exists
          ? prev.tagIds.filter((id) => id !== tagId)
          : [...prev.tagIds, tagId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await BlogPostApi.update(Number(id), form);
      } else {
        await BlogPostApi.create(form);
      }
      navigate("/dashboard/blog/posts");
    } catch (err) {
      console.error("Save post error", err);
    } finally {
      setLoading(false);
    }
  };

  const mainSlug = slugify(form.title || "");
  const altSlug1 = mainSlug ? `${mainSlug}-1` : "";
  const altSlug2 = mainSlug ? `${mainSlug}-2` : "";

  const applySlug = (s: string) => {
    setForm((prev) => ({ ...prev, slug: s }));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Post" : "Create New Post"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            name="title"
            className="w-full border rounded px-3 py-2"
            value={form.title}
            onChange={handleTitleChange}
            placeholder="VD: Giới thiệu về Spring Boot"
          />
        </div>

        {/* Slug + suggestions */}
        <div>
          <label className="block text-sm mb-1">Slug</label>
          <input
            name="slug"
            className="w-full border rounded px-3 py-2"
            value={form.slug}
            onChange={handleChange}
            placeholder="vd: gioi-thieu-spring-boot"
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

        {/* Category */}
        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            name="categoryId"
            className="w-full border rounded px-3 py-2"
            value={form.categoryId || 0}
            onChange={handleChange}
          >
            <option value={0}>-- Select category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm mb-1">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const checked = form.tagIds.includes(tag.id);
              return (
                <label
                  key={tag.id}
                  className="flex items-center gap-1 border rounded-full px-2 py-1 text-xs cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleTag(tag.id)}
                  />
                  <span>{tag.name}</span>
                </label>
              );
            })}
            {tags.length === 0 && (
              <p className="text-xs text-gray-500">
                Chưa có tag nào. Hãy tạo Tag trước.
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm mb-1">Content</label>
          <textarea
            name="content"
            className="w-full border rounded px-3 py-2"
            rows={8}
            value={form.content}
            onChange={handleChange}
            placeholder="Nội dung bài viết..."
          />
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="block text-sm mb-1">Thumbnail URL</label>
          <input
            name="thumbnailUrl"
            className="w-full border rounded px-3 py-2"
            value={form.thumbnailUrl || ""}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        {/* SEO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Meta Title</label>
            <input
              name="metaTitle"
              className="w-full border rounded px-3 py-2"
              value={form.metaTitle || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Meta Description</label>
            <input
              name="metaDescription"
              className="w-full border rounded px-3 py-2"
              value={form.metaDescription || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Published */}
        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={handleChange}
          />
          <label htmlFor="published" className="text-sm">
            Published
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded border"
            onClick={() => navigate("/dashboard/blog/posts")}
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

export default BlogCreatePost;
