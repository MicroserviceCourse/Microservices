import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { Column, Module, SortState } from "../../types";
import { getAllModule, updateStatus } from "../../service/api/Module";
import TableUI from "../../components/ui/TableUI";
import ModuleFormCreate from "../../components/Module/ModuleFormCreate";
import ModuleFormEdit from "../../components/Module/ModuleFormEdit";
import ActionModule from "../../components/Module/ModuleActionMenu";
import { useAlert } from "../../components/alert-context";
import { useNavigate } from "react-router-dom";

const ModuleList = () => {
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedModule, setSelectedModule] = useState<any | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // search & status filter
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(""); // "" | "true" | "false"

    const { showAlert } = useAlert();
    const [sort, setSort] = useState<SortState | null>(null);
    const fetchData = async (params?: { search?: string; status?: string; page?: number, sort?: SortState | null }) => {
        setLoading(true);
        setError(null);

        const currentSearch = params?.search ?? search;
        const currentStatus = params?.status ?? status;
        const targetPage = params?.page ?? page; // trang muốn load
        const currentSort = params?.sort ?? sort;
        setPage(targetPage);
        let filter: string | undefined;
        if (currentStatus === "true") filter = "isActive==true";
        else if (currentStatus === "false") filter = "isActive==false";

        try {
            const response = await getAllModule({
                page: targetPage,          // nếu backend 0-based: targetPage - 1
                size: 5,
                ...(currentSearch ? { searchValue: currentSearch } : {}),
                ...(filter ? { filter } : {}),
                ...(currentSort
                    ? {
                        sort: `${currentSort.accessor},${currentSort.direction}`
                    }
                    : {}),
            });

            setModules(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (err) {
            console.error("Error fetching modules:", err);
            setError("Failed to fetch modules. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = (row: any) => {
        setShowUpdateModal(true);
        setSelectedModule(row);
    };

    const handleActive = async (row: any) => {
        try {
            setLoading(true);
            const response = await updateStatus(row.id, true);
            const message =
                response?.data?.message || "Module Active successfully!";
            showAlert({ title: message, type: "success", autoClose: 3000 });
            fetchData();
        } catch (err: any) {
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed to Active Module. Please try again.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInActive = async (row: any) => {
        try {
            setLoading(true);
            const response = await updateStatus(row.id, false);
            const message =
                response?.data?.message || "Module InActive successfully!";
            showAlert({ title: message, type: "success", autoClose: 3000 });
            fetchData();
        } catch (err: any) {
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed to InActive Module. Please try again.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ✅ Define columns
    const columns: Column<Module>[] = [
        { header: "Code", accessor: "code", sortable: true },
        { header: "Name", accessor: "name", sortable: true },
        {
            header: "Permissions",
            accessor: "permissions",
            render: (value: any) => (
                <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${value && value.length > 0
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                        }`}
                >
                    {Array.isArray(value)
                        ? `${value.length} permissions`
                        : "0 permissions"}
                </span>
            ),
        },
        { header: "Created Date", accessor: "createdAt", sortable: true },
        { header: "Last Updated Date", accessor: "updatedAt", sortable: true },
        {
            header: "Status",
            accessor: "isActive",
            render: (value: boolean) => (
                <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${value
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {value ? "Active" : "Inactive"}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Module List
                    </h2>
                    <p className="text-sm text-gray-500">
                        Search & filter by status module
                    </p>
                </div>


            </div>

            {error && (
                <div className="text-sm text-red-500 font-medium">{error}</div>
            )}

            {/* Table */}
            <TableUI<Module>
                columns={columns}
                data={modules}
                loading={loading}
                loadingText="Loading modules..."
                sortState={sort}
                onSortChange={(newSort) => {

                    if (
                        sort &&
                        newSort &&
                        sort.accessor === newSort.accessor &&
                        sort.direction === newSort.direction
                    ) {
                        setSort(null);
                        fetchData({ sort: null, page: 1 });
                    } else {
                        setSort(newSort);
                        fetchData({ sort: newSort, page: 1 });
                    }
                }}
                searchConfig={{
                    enabled: true,
                    placeholder: "Search module by code or name...",
                    value: search,
                    onChange: (value) => {
                        setSearch(value);
                        fetchData({ search: value });
                    },
                }}
                headerRight={
                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex items-center gap-2 text-blue-600 border border-blue-500 px-4 py-2 rounded-lg
                        hover:bg-[#2275fc] hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        <Plus size={16} />
                        Add Module
                    </button>
                }
                filterConfig={{
                    enabled: true,
                    label: "Status",
                    options: [
                        { label: "All", value: "" },
                        { label: "Active", value: "true" },
                        { label: "Inactive", value: "false" },
                    ],
                    value: status,
                    onChange: (value) => {
                        setStatus(value);
                        fetchData({ status: value });
                    },
                }}
                pagination={{
                    currentPage: page,
                    totalPages,
                    disabled: loading, // disable click khi đang load
                    onPageChange: (newPage) => {
                        if (newPage < 1 || newPage > totalPages) return;
                        fetchData({ page: newPage }); // gọi API, xong fetchData sẽ tự setPage
                    },
                }}
                renderActions={(row) => (
                    <ActionModule
                        onEdit={() => handleEdit(row)}
                        status={row.isActive}
                        onActive={() => handleActive(row)}
                        onDeactive={() => handleInActive(row)}
                        onViewPermission={() => navigate(`/dashboard/modules/${row.id}/permissions`, {
                            state: { moduleCode: row.code, moduleName: row.name }
                        })}
                    />
                )}
            />

            <ModuleFormCreate
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={fetchData}
            />
            <ModuleFormEdit
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                onSubmit={fetchData}
                moduleData={selectedModule}
            />
        </div>
    );
};

export default ModuleList;
