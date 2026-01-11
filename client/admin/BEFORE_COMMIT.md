# ✅ Checklist trước khi Commit (Frontend)

Tài liệu này mô tả **những việc Dev FE cần (và không cần) làm trước khi commit code** trong project.

> ⚠️ Mục tiêu:
>
> - Đồng bộ format code trong team
> - Tránh conflict không cần thiết
> - Ngăn code lỗi lọt vào repository

---

## 🚀 TL;DR (Ngắn gọn cho Dev)

👉 **Chỉ cần `git commit`**
👉 **KHÔNG cần chạy prettier / eslint thủ công**

Mọi thứ đã được tự động xử lý bởi **Husky + lint-staged**.

---

## 🔁 Quy trình chuẩn khi hoàn thành 1 feature

### 1️⃣ Code xong feature

- Code bình thường
- Không cần format tay
- Không cần chỉnh style theo cảm tính

---

### 2️⃣ (Khuyến nghị) Kiểm tra nhanh ở local

> Không bắt buộc, nhưng nên làm để tránh commit bị chặn

`````bash
npm run lint

> Hoặc nếu biết có lỗi fix được:
```bash
npm run lint:fix

### 3️⃣ Commit code (BƯỚC QUAN TRỌNG NHẤT)

````bash
git add .
git commit -m "feat: short description"

> Khi chạy git commit, Husky sẽ tự động chạy:
> pre-commit
> └─ lint-staged

     ├─ prettier --write (chỉ file được stage)
     └─ eslint --fix (chỉ file được stage)

### 4️⃣ Push code

```bash
git push origin feat/media-library

=====================
npm i -D \
  prettier \
  eslint \
  eslint-config-prettier \
  eslint-plugin-prettier \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-react-refresh \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin

`````

npm install -D husky lint-staged
npx husky init
