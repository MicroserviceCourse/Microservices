import { useCallback, useEffect, useState } from "react";
import type {  TableColumn } from "../types";

import TableUI from "../components/ui/tableUi/TableUI";

import { getProducts } from "../service/api/Product";
import {  Search } from "lucide-react";
import useProductQuery from "../hooks/useProductQuery";
import ProductTableActions from "../components/product/ProductTableActions";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/badge/StatusBadge";
import type { Product } from "../types/product.type";

const ProductPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    const {
        search,
        setSearch,
        status,
        setStatus,
        sortKey,
        sortDir,
        toggleSort,
        page,
        setPage,
        size,
        buildParams,
      } = useProductQuery();
    
      const fetchData = useCallback(async () => {
        try {
          setLoading(true);
          const params = buildParams();
          const res = await getProducts(params);
          const data = res.data ?? res;
    
          setProducts(data.content ?? []);
          setTotalPages(data.totalPages);

          setPage(data.pageNumber+1);

        } finally {
          setLoading(false);
        }
      }, [search, status, sortDir, sortKey, page, size]);

      useEffect(() => {
        fetchData();
      }, [fetchData]);

      const columns: TableColumn<Product>[] = [
        {
            key: "thumbnailUrl",
            label: "Thumbnail",
            render: (p) => (
              <img src={p.thumbnailUrl} className="h-12 w-12 rounded-lg object-cover" />
            ),
        },
        {
            key:"name",
            label:"Product Name",
            sortable:true,
            render:(p)=>(
                <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">{p.slug}</div>
              </div>
            )
        },
        {
            key:"code",
            label:"Product Code",
            sortable:true,
            render:(p)=><span className="font-mono text-sm">{p.code}</span>
        },
        {
            key: "price",
            label: "Price",
            sortable: true,
            render: (p) => `${p.price.toLocaleString("vi-VN")}đ`,
          },
          {
            key: "status",
            label: "Status",
            sortable: true,
            render: (p) => <StatusBadge value={p.status}/>,
          },
          {
            key: "createdAt",
            label: "Created",
            sortable: true,
            render: (p) =>
              p.createdAt
                ? new Date(p.createdAt).toLocaleDateString("vi-VN")
                : "--",
          },
          {
            key: "updatedAt",
            label: "Updated",
            sortable: true,
            render: (p) => new Date(p.updatedAt).toLocaleDateString("vi-VN"),
          },
          {
            key: "actions",
            label: "Actions",
            render: (p) => (
              <ProductTableActions product={p} onUpdated={fetchData} />
            ),
          },
      ]

      return(
        <div className="p-8 bg-white dark:bg-card-dark rounded-xl shadow-sm space-y-6">

      {/* FILTER BAR */}
      <div className="flex items-center justify-between gap-4 flex-wrap">

        <div className="flex items-center gap-4 flex-wrap flex-1">

          {/* SEARCH */}
          <div className="relative flex-grow min-w-[250px] max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Tên, SKU, slug, giá..."
              className="w-full py-2.5 pl-12 pr-4 rounded-xl bg-gray-50 
                         border border-gray-300 hover:border-gray-400 
                         focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* STATUS FILTER */}
          <div className="relative">
            <select
              value={status}
              onChange={(e) => {
                setStatus(Number(e.target.value));
                setPage(1);
              }}
              className="py-2.5 pl-4 pr-10 rounded-xl bg-gray-50 border border-gray-300 
                         focus:ring-2 focus:ring-blue-600 outline-none"
            >
              <option value="ALL">All Status</option>
              <option value={1}>Active</option>
              <option value={0}>Hidden</option>
              <option value={-1}>Deleted</option>
            </select>

          </div>

        </div>

        {/* ADD PRODUCT */}
        <button
          onClick={() => navigate("/Dashboard/product/create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <TableUI<Product>
        columns={columns}
        data={products}
        loading={loading}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={toggleSort}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      
      />

   
    </div>
  
      );
}

export default ProductPage;
