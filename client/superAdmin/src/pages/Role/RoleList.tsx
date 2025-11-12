import { useEffect, useState } from "react";
import type { Column, Role, SortState } from "../../types";
import { getListRole } from "../../service/api/Role";
import TableUI from "../../components/ui/TableUI";
import RoleActionMenu from "../../components/Role/RoleActionMenu";
import RoleFormEdit from "../../components/Role/RoleFormEdit";
import RolePermissionGroupPopup from "../../components/Role/RolePermissionGroupPopup";

const RoleList = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState<SortState | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [showPermissionPopup, setShowPermissionPopup] = useState(false);
    const fetchData = async (param?: {
        search?: string;
        page?: number;
        sort?: SortState | null
    }) => {
        setLoading(true);
        setError(null);
        const currentSearch = param?.search ?? search;
        const targetPage = param?.page ?? page;
        const currentSort = param?.sort ?? sort;
        setPage(targetPage);
        try {
            const response = await getListRole({
                page: targetPage,
                size: 5,
                ...(currentSearch ? { searchValue: currentSearch } : {}),
                ...(currentSort
                    ? {
                        sort: `${currentSort.accessor},${currentSort.direction}`,
                    }
                    : {}),
            });

            setRoles(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (err) {
            console.error("Error fetching roles:", err);
            setError("Failed to fetch roles. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    const handleViewPermission = (row: Role) => {
        setSelectedRole(row);
        setShowPermissionPopup(true);
      };
    
    const handleEdit = (row: Role) => {
        setShowUpdateModal(true);
        setSelectedRole(row);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const columns: Column<Role>[] = [
        { header: "Code", accessor: "code", sortable: true },
        { header: "Name", accessor: "name", sortable: true },
        {
            header: "Description",
            accessor: "description",
            render: (value: string) => (
                <span className="text-sm text-gray-600 line-clamp-1">{value}</span>
            ),
        },
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

    ]
    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Role List</h2>
                    <p className="text-sm text-gray-500">
                        Manage roles and assign permissions to each role.
                    </p>
                </div>
            </div>
            {error && (
                <div className="text-sm text-red-500 font-medium">{error}</div>
            )}
            <TableUI<Role>
                columns={columns}
                data={roles}
                loading={loading}
                loadingText="Loading roles..."
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
                    placeholder: "Search role by code or name...",
                    value: search,
                    onChange: (value) => {
                        setSearch(value);
                        fetchData({ search: value });
                    },
                }}


                pagination={{
                    currentPage: page,
                    totalPages,
                    disabled: loading,
                    onPageChange: (newPage) => {
                        if (newPage < 1 || newPage > totalPages) return;
                        fetchData({ page: newPage });
                    },
                }}
                renderActions={(row) => (
                    <RoleActionMenu
                        onEdit={() => handleEdit(row)}
                        onViewPermission={() => handleViewPermission(row)}
                    />
                )}
            />
            <RoleFormEdit
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                onSubmit={fetchData}
                roleData={selectedRole}
            />
              {showPermissionPopup && selectedRole && (
        <RolePermissionGroupPopup
        key={selectedRole.id}   
          roleId={Number(selectedRole.id)}
          roleName={selectedRole.name}
          onClose={() => setShowPermissionPopup(false)}
        />
      )}
        </div>
    )
}
export default RoleList;