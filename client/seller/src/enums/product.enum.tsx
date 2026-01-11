export enum ProductStatus {
  HIDDEN = 0, // Sản phẩm ẩn
  ACTIVE = 1, // Đang hoạt động
  DELETED = 2, // Ngừng hoạt động
}
export const ProductStatusLabel: Record<ProductStatus, string> = {
  [ProductStatus.HIDDEN]: "Hidden",
  [ProductStatus.ACTIVE]: "Active",
  [ProductStatus.DELETED]: "Deleted",
};
