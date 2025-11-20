export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")                    // bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")        // thay khoảng trắng & ký tự lạ = -
    .replace(/(^-|-$)+/g, "");          // bỏ - đầu/cuối
}
