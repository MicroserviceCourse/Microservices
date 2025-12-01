import { useEffect, useState } from "react";
import type { Product, TableColumn } from "../types";

import TableUI from "../components/ui/TableUI";

import { getProducts } from "../service/api/Product";
import { ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Search } from "lucide-react";
import useProductQuery from "../hooks/useProductQuery";

const ProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

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
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const params = buildParams();
                const res = await getProducts(params);

                const data = res.data ?? res;

                setProducts(data.content ?? []);
                setTotalPages(data.totalPages);
                setPage(data.pageNumber + 1); // vì backend trả pageNumber (0-based)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [search, status, sortKey, sortDir, page, size]);

    const renderPageNumbers = () => {
        const pages = [];
        const max = totalPages;

        // Quy tắc: 1, current-1, current, current+1, last
        for (let i = 1; i <= max; i++) {
            if (
                i === 1 ||
                i === max ||
                (i >= page - 1 && i <= page + 1)
            ) {
                pages.push(i);
            }
        }

        // Loại trùng + sắp xếp
        const unique = [...new Set(pages)].sort((a, b) => a - b);

        return unique.map((p, idx) => {
            const showDots = unique[idx + 1] && unique[idx + 1] - p > 1;

            return (
                <div key={p} className="flex items-center gap-2">

                    {/* 🔵 PAGE BUTTON */}
                    <button
                        onClick={() => setPage(p)}
                        className={`
                  h-8 w-8 flex items-center justify-center rounded-lg 
                  text-sm font-medium transition
                  ${p === page
                                ? "bg-blue-600 text-white"
                                : "text-gray-800 hover:bg-gray-100"
                            }
                `}
                    >
                        {p}
                    </button>


                    {showDots && <span className="text-gray-400">...</span>}
                </div>
            );
        });
    };

    // ⭐ STATUS UI
    const statusBadge = (st: number) => {
        if (st === 1)
            return <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Active</span>;
        if (st === 0)
            return <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-slate-300">Hidden</span>;
        return <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">Deleted</span>;
    };

    // ⭐ COLUMNS giống HTML
    const columns: TableColumn<Product>[] = [
        {
            key: "thumbnailUrl",
            label: "Thumbnail",
            render: (row) => (
                <img src={row.thumbnailUrl} alt={row.name} className="h-12 w-12 rounded-lg object-cover" />
            ),
        },
        {
            key: "name",
            label: "Product Name",
            sortable: true,
            render: (row) => (
                <div>
                    <div className="font-medium">{row.name}</div>
                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark">{row.slug}</div>
                </div>
            ),
        },
        {
            key: "code",
            label: "Product Code",
            sortable: true,
            render: (row) => <span className="font-mono text-sm">{row.code}</span>,
        },
        {
            key: "price",
            label: "Price",
            sortable: true,
            render: (row) => `${row.price.toLocaleString("vi-VN")}đ`,
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (row) => statusBadge(row.status),
        },
        {
            key: "createdAt",
            label: "Created At",
            sortable: true,
            render: (row) =>
              row.createdAt
                ? new Date(row.createdAt).toLocaleDateString("vi-VN")
                : "--",
          },
          
        {
            key: "updatedAt",
            label: "Last Updated",
            sortable: true,
            render: (row) => new Date(row.updatedAt).toLocaleDateString("vi-VN"),
        },
        {
            key: "actions",
            label: "Actions",
            align: "left",
            render: () => (
                <div className="dropdown relative">
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600">
                        <MoreVertical className="h-5 w-5 text-gray-600" />
                    </button>

                    {/* Dropdown content */}
                    <div className="dropdown-content absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md py-2 w-36 z-10 hidden group-hover:block">
                        <a className="block px-4 py-2 hover:bg-gray-100 text-sm" href="#">Edit</a>
                        <a className="block px-4 py-2 hover:bg-gray-100 text-sm" href="#">Hide Product</a>
                        <a className="block px-4 py-2 hover:bg-gray-100 text-sm" href="#">Discontinue</a>
                    </div>
                </div>
            )
        },

    ];

    return (
        <div className="p-8 bg-card-light dark:bg-card-dark rounded-xl shadow-sm">

            {/* FILTER BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

                {/* LEFT */}
                <div className="flex flex-wrap items-center gap-4 flex-1">

                    {/* Search input */}
                    <div className="relative flex-grow min-w-[250px] max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Tên, SKU, slug, giá..."
                            className="
    w-full py-2.5 pl-12 pr-4 
    rounded-xl 
    bg-gray-50 
    text-gray-700 
    
    border border-gray-300
    hover:border-gray-400

    focus:outline-none
    focus:border-blue-700
    focus:ring-2 
    focus:ring-blue-600

    transition-all
  "
                        />

                    </div>

                    {/* Select */}
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                            className="
        appearance-none
        py-2.5 pl-4 pr-10
        rounded-xl
        bg-gray-50
        border border-gray-200 
         focus:outline-none
    focus:border-blue-700
    focus:ring-2 
    focus:ring-blue-600

         outline-none
      "
                        >
                            <option value="ALL">All Status</option>
                            <option value={1}>Active</option>
                            <option value={0}>Hidden</option>
                            <option value={-1}>Deleted</option>
                        </select>

                        <ChevronDown
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5 pointer-events-none"
                        />
                    </div>

                </div>

                {/* Add product */}
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl">
                    + Add Product
                </button>
            </div>


            {/* TABLE */}
            <TableUI<Product> columns={columns}
                data={products}
                loading={loading}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={toggleSort} />

            {/* PAGINATION */}
            <div className="flex items-center justify-between mt-6">

                <span className="text-sm opacity-70">
                    Showing {(page - 1) * size + 1} - {Math.min(page * size, products.length)}
                </span>

                <nav className="flex items-center gap-2">

                    {/* PREV */}
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="
      h-8 w-8 flex items-center justify-center 
      rounded-lg text-gray-700
      hover:bg-gray-100 
      disabled:opacity-40 disabled:cursor-not-allowed
    "
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* PAGE BUTTONS */}
                    {renderPageNumbers()}

                    {/* NEXT */}
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="
      h-8 w-8 flex items-center justify-center 
      rounded-lg text-gray-700
      hover:bg-gray-100
      disabled:opacity-40 disabled:cursor-not-allowed
    "
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>

                </nav>
            </div>


        </div>
    );
};

export default ProductPage;
