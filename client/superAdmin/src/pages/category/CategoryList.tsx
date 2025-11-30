import { useCallback, useEffect, useState } from "react";
import { type SortState, type CategoryResponse, type Column } from "../../types";
import { useAlert } from "../../components/alert-context";
import { useNavigate } from "react-router-dom";
import { changeCategoryStatus, getCategories } from "../../service/api/Category";
import TableUI from "../../components/ui/TableUI";
import CategoryFormCreate from "../../components/Category/CategoryFormCreate";
import { Edit } from "lucide-react";
import CategoryFormEdit from "../../components/Category/CategoryFormEdit";

const CategoryList = () => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [rows, setRows] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [openModal, setOpenModal] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [sort, setSort] = useState<SortState | null>(null);

    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const [editOpen, setEditOpen] = useState(false);
    const [editItem, setEditItem] = useState<CategoryResponse | null>(null);

    /** ------------------------------------------------
     *  FETCH DATA
     --------------------------------------------------*/
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getCategories({
                page,
                size: 10,
                searchValue: search,
                filter: statusFilter ? `active==${statusFilter}` : "",
                sort: sort ? `${sort.accessor},${sort.direction}` : "sortOrder,asc"
            });

            setCategories(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError("Failed to load categories.");
        } finally {
            setLoading(false);
        }
    }, [page, search, statusFilter, sort]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    /** ------------------------------------------------
     *  BUILD TREE → FLATTEN (FOR TABLE)
     --------------------------------------------------*/
    const buildTree = () => {

        const flatten = (cat: CategoryResponse, level: number): any[] => {
            const row = {
                ...cat,
                _level: level,
                _hasChildren: cat.children?.length > 0,
                _expanded: expanded[cat.id] ?? false
            };

            const list = [row];

            if (row._expanded && row._hasChildren) {
                cat.children.forEach(child => {
                    list.push(...flatten(child, level + 1));
                });
            }

            return list;
        };

        const roots = categories.filter(c => c.parentId == null);
        setRows(roots.flatMap(r => flatten(r, 0)));
    };
    const handleToggleStatus = async (row: any) => {
        try {
            // cập nhật UI ngay lập tức
            setRows(prev =>
                prev.map(r =>
                    r.id === row.id ? { ...r, active: !row.active } : r
                )
            );
    
            // gọi API cập nhật cơ sở dữ liệu
            await changeCategoryStatus(row.id, !row.active);
    

    
        } catch (error:any) {
            showAlert({
                title: error?.response?.data?.message || "Failed to update status",
                type: "success",
                autoClose: 3000,
            });
    
            // nếu lỗi, revert lại UI
            setRows(prev =>
                prev.map(r =>
                    r.id === row.id ? { ...r, active: row.active } : r
                )
            );
        }
    };
    


    useEffect(() => {
        buildTree();
    }, [categories, expanded]);


    /** ------------------------------------------------
     *  TABLE COLUMNS
     --------------------------------------------------*/
    const columns: Column<any>[] = [
        { header: "Code", accessor: "code" },
        {
            header: "Name",
            accessor: "name",
            sortable: true,
            render: (_, row) => {
                const hasChildren = row.children && row.children.length > 0;

                return (
                    <div className="flex items-center w-full">
                        {/* INDENT spacer */}
                        <div style={{ width: `${row._level * 20}px` }}></div>

                        {/* Arrow */}
                        {hasChildren ? (
                            <button
                                className="mr-2 text-gray-500"
                                onClick={() =>
                                    setExpanded(prev => ({
                                        ...prev,
                                        [row.id]: !prev[row.id],
                                    }))
                                }
                            >
                                {row._expanded ? "▼" : "▶"}
                            </button>
                        ) : (
                            <div className="mr-2 w-4" />  // giữ thẳng cột
                        )}

                        <span>{row.name}</span>
                    </div>
                );
            }


        },

        { header: "Parent", accessor: "parentName" },
        { header: "Sort Order", accessor: "sortOrder" },

        {
            header: "Status",
            accessor: "active",
            render: (_, row) => (
                <label
                className="flex items-center gap-2 select-none cursor-pointer"
                onClick={() => handleToggleStatus(row)}
              >
                <input
                  type="checkbox"
                  checked={row.active}
                  readOnly
                  className="peer sr-only"
                />
              
                <div
                  className={`
                    relative inline-flex h-5 w-10 rounded-full transition-colors duration-200
                    ${row.active ? "bg-green-500" : "bg-gray-300"}
                  `}
                >
                  <span
                    className={`
                      absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all duration-200
                      ${row.active ? "translate-x-5 left-0.5" : "left-0.5"}
                    `}
                  ></span>
                </div>
              
                <span className={`text-sm ${row.active ? "text-green-600" : "text-gray-500"}`}>
                  {row.active ? "Active" : "Inactive"}
                </span>
              </label>
              
            )
        },
        {
            header: "Actions",
            accessor: "actions",
            render: (_, row) => (
                <button
                    className="flex items-center gap-1 text-blue-600  text-sm"
                    onClick={() => {
                        setEditItem(row);
                        setEditOpen(true);
                    }}
                >
                    <Edit className="h-4 w-4 text-blue-600" />
                    Edit
                </button>
            ),
        }

    ];

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Category Management</h2>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <TableUI
                columns={columns}
                data={rows}
                loading={loading}
                loadingText="Loading categories..."
                sortState={sort}
                headerRight={
                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex items-center gap-2 text-blue-600 border border-blue-500 px-4 py-2 rounded-lg
                        hover:bg-[#2275fc] hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        Add Category
                    </button>
                }
                onSortChange={(newSort) => {
                    const isSame =
                        sort?.accessor === newSort?.accessor &&
                        sort?.direction === newSort?.direction;

                    setSort(isSame ? null : newSort);
                }}
                searchConfig={{
                    enabled: true,
                    placeholder: "Search by name...",
                    value: search,
                    onChange: setSearch,
                }}
                filterConfig={{
                    enabled: true,
                    label: "Status",
                    options: [
                        { label: "All", value: "" },
                        { label: "Active", value: "1" },
                        { label: "Inactive", value: "0" },
                    ],
                    value: statusFilter,
                    onChange: setStatusFilter,
                }}
                pagination={{
                    currentPage: page,
                    totalPages,
                    disabled: loading,
                    onPageChange: (p) => {
                        if (p >= 1 && p <= totalPages) setPage(p);
                    },
                }}
            />
            <CategoryFormCreate
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={fetchData}
            />
            {editItem && (
                <CategoryFormEdit
                    isOpen={editOpen}
                    categoryData={editItem}
                    onClose={() => setEditOpen(false)}
                    onSubmit={async () => {
                        await fetchData();       
                        setEditOpen(false);
                        setEditItem(null);
                    }}
                />
            )}
        </div>
    );
};

export default CategoryList;
