import { Ban, Eye, EyeOff, Pencil, RotateCcw } from "lucide-react";
import type { ProductTableActionProps } from "../../types";
import { ProductStatus } from "../../enums/product.enum";
import TableActions from "../ui/TableActions";
import { useAlert } from "../alert-context";
import { ChangeStatus } from "../../service/api/Product";
import { useNavigate } from "react-router-dom";

const ProductTableActions = ({ product, onUpdated }: ProductTableActionProps) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const onHide = async () => {
    try {
      const response = await ChangeStatus(product.id, ProductStatus.HIDDEN);
      showAlert({
        title: response?.data?.message || "Product Hidden successfully!",
        type: "success",
        autoClose: 3000,
      });
    } catch (err: any) {
      showAlert({
        title: err?.response?.data?.message || "Failed to hidden product.",
        type: "error",
        autoClose: 3000,
      });
    }

    onUpdated?.();
  };

  const onActivate = async () => {
    try {
      const response = await ChangeStatus(product.id, ProductStatus.ACTIVE);
      showAlert({
        title: response?.data?.message || "Product Active successfully!",
        type: "success",
        autoClose: 3000,
      });
    } catch (err: any) {
      showAlert({
        title: err?.response?.data?.message || "Failed to Active product.",
        type: "error",
        autoClose: 3000,
      });
    }
    onUpdated?.();
  };

  const onDiscontinue = async () => {
    try {
      const response = await ChangeStatus(product.id, ProductStatus.DELETED);
      showAlert({
        title: response?.data?.message || "Product Discontinue successfully!",
        type: "success",
        autoClose: 3000,
      });
    } catch (err: any) {
      showAlert({
        title: err?.response?.data?.message || "Failed to Discontinue product.",
        type: "error",
        autoClose: 3000,
      });
    }
    onUpdated?.();
  };

  const onRestore = async () => {
    try {
      const response = await ChangeStatus(product.id, ProductStatus.ACTIVE);
      showAlert({
        title: response?.data?.message || "Product Restore successfully!",
        type: "success",
        autoClose: 3000,
      });
    } catch (err: any) {
      showAlert({
        title: err?.response?.data?.message || "Failed to Restore product.",
        type: "error",
        autoClose: 3000,
      });
    }
    onUpdated?.();
  };

  const actions = [
    {
      label: "Edit",
      icon: <Pencil className="h-4 w-4" />,
      onClick: () => navigate(`/Dashboard/product/${product.id}/edit`),
    },
    {
      label: "Hide Product",
      icon: <EyeOff className="h-4 w-4" />,
      onClick: onHide,
      hidden: product.status !== ProductStatus.ACTIVE,
    },
    {
      label: "Discontinue Product",
      icon: <Ban className="h-4 w-4 text-red-500" />,
      onClick: onDiscontinue,
      hidden: product.status !== ProductStatus.ACTIVE,
    },
    {
      label: "Activate Product",
      icon: <Eye className="h-4 w-4 text-green-600" />,
      onClick: onActivate,
      hidden: product.status !== ProductStatus.HIDDEN,
    },
    {
      label: "Restore Product",
      icon: <RotateCcw className="h-4 w-4 text-blue-600" />,
      onClick: onRestore,
      hidden: product.status !== ProductStatus.DELETED,
    },
  ];

  return <TableActions actions={actions} />;
};
export default ProductTableActions;
