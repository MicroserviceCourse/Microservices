# Frontend Coding Convention

> Áp dụng cho dự án **seller** – React + TypeScript + Vite

Tài liệu này nhằm **đồng bộ code style, format và quy ước làm việc** giữa các thành viên FE để:

- Tránh conflict không cần thiết
- Dễ review code
- Code dễ đọc, dễ bảo trì

---

## 1. Nguyên tắc chung

- **Không tranh luận format** → Prettier quyết định
- **Lint lỗi logic, không lint format**
- **Rule chung cho mọi máy** → không config cá nhân
- Code phải **qua được lint + format** trước khi commit

---

## 2. Công cụ & phiên bản

### Stack chính

- React 19
- TypeScript ~5.9
- Vite
- ESLint 9 (Flat Config)
- Prettier 3
- Husky + lint-staged

### Scripts chuẩn

```bash
npm run lint          # Kiểm tra toàn bộ project (CI)
npm run lint:fix      # Tự sửa lỗi ESLint
npm run format        # Format toàn bộ project
npm run format:check  # Check format (CI)
```

---

## 3. Format code (Prettier)

### Quy tắc chính

- Dấu `;`: **có**
- Quote: `"` (double quote)
- Indent: `2 spaces`
- Line length: `100`
- Trailing comma: `all`

👉 **Không chỉnh format thủ công**

### VS Code (khuyến nghị)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 4. ESLint rules – cách hiểu đúng

### 4.1 `prefer-const`

```ts
// ❌ Sai
let filters = [];
filters.push(x);

// ✅ Đúng
const filters = [];
filters.push(x);
```

> `push` không phải là reassignment => khi không thay đổi thì phải dùng const

---

### 4.2 `no-explicit-any`

- ❌ Hạn chế dùng `any`
- ✅ Ưu tiên:
  - `unknown`
  - generic `<T>`
  - type cụ thể
  - obj: any => Record<string, any>

```ts
function handle(data: unknown) {
  if (typeof data === "string") {
    // ...
  }
}
```

---

### 4.3 `no-unused-vars`

```ts
// ❌
const error = err;

// ✅ Nếu bắt buộc giữ
const _error = err;
```

Rule cho phép biến bắt đầu bằng `_`

---

### 4.4 React Hooks rules

#### `react-hooks/exhaustive-deps`

- Không bỏ dependency một cách tuỳ tiện
- Nếu function dùng trong `useEffect` → `useCallback`

```ts
const fetchData = useCallback(() => {
  // ...
}, [id]);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

---

### 4.5 Không gọi `setState` trực tiếp trong `useEffect`

❌ Tránh:

```ts
useEffect(() => {
  setState(x);
}, [x]);
```

✅ Thay bằng:

- derived state
- event handler
- conditional render

---

## 5. TypeScript conventions

### 5.1 Không dùng `Object`

```ts
// ❌
const obj: Object = {};

// ✅
const obj: Record<string, unknown> = {};
```

---

### 5.2 Không dùng `hasOwnProperty` trực tiếp

```ts
// ❌
obj.hasOwnProperty(key);

// ✅
Object.prototype.hasOwnProperty.call(obj, key);
```

---

## 6. Quy ước đặt tên

### File & folder

- Component: `PascalCase`
- Hook: `useSomething.ts`
- Utils: `camelCase`

```
components/
  MediaLibraryModal.tsx
hooks/
  useFetch.ts
utils/
  formData.util.ts
```

---

### Biến & function

- Boolean: `isOpen`, `hasError`, `canEdit`
- Event handler: `handleClick`, `onSubmit`

---

## 7. Git & Commit

### Pre-commit

- Husky chạy `lint-staged`
- Tự động:
  - format
  - fix ESLint

👉 Commit **fail nếu còn error**

---

## 8. CI Rules

Trên CI:

```bash
npm run lint
npm run format:check
```

Không merge nếu fail

---

## 9. Checklist trước khi PR

- [ ] Không còn ESLint error
- [ ] Không commit file format linh tinh
- [ ] Không để `any` vô tội vạ

---

## 10. Tinh thần chung

> **Readable > Clever**
> **Consistency > Personal style**

Mọi rule đều có thể bàn lại, **nhưng phải thống nhất cho cả team**.
