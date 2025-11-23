import { useEffect, useState } from "react";
import type { Column, SortState } from "../../types";
import { changeUserStatus, getAllUser } from "../../service/api/Authenticate";
import TableUI from "../../components/ui/TableUI";
import UserActionMenu from "../../components/User/UserActionMenu";
import UserActionRoleSidebar from "../../components/User/UsesrAssignRolePopup";
import { useAlert } from "../../components/alert-context";


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState<SortState | null>(null);

    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [showAssignRoleSidebar, setShowAssignRoleSidebar] = useState(false);

    const { showAlert } = useAlert();
    // 🔥 FETCH DATA
    const fetchData = async (param?: {
        search?: string;
        page?: number;
        sort?: SortState | null;
    }) => {
        setLoading(true);
        setError(null);

        const currentSearch = param?.search ?? search;
        const targetPage = param?.page ?? page;
        const currentSort = param?.sort ?? sort;

        setPage(targetPage);

        try {
            const response = await getAllUser({
                page: targetPage,
                size: 10,
                ...(currentSearch ? { searchValue: currentSearch } : {}),
                ...(currentSort
                    ? { sort: `${currentSort.accessor},${currentSort.direction}` }
                    : {}),
            },


            );

            setUsers(
                response.data.content.map((u: any) => ({
                    ...u,
                    statusText: u.status === 1 ? "Active" : "Inactive",
                }))
            );

            setTotalPages(response.data.totalPages || 1);
        } catch (err) {
            setError("Failed to fetch users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // FIRST LOAD
    useEffect(() => {
        fetchData();
    }, []);

    // OPEN SIDEBAR
    const handleAssignRole = (user: any) => {
        setSelectedUser(user);
        setShowAssignRoleSidebar(true);
    };

    const handleChangeUserStatus = async (row: any, status: number) => {
        try {
            setLoading(true);
            const response =
                await changeUserStatus(row.id, status);
            const message =
                response?.data?.message || "User change status successfully!";
            showAlert({ title: message, type: "success", autoClose: 3000 });
            fetchData();
        } catch (err: any) {
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed to change status User. Please try again.",
                type: "error",
            });
        }
    }

    const columns: Column<any>[] = [
        { header: "Code", accessor: "code", sortable: true },
        { header: "Full Name", accessor: "fullName", sortable: true },
        { header: "Email", accessor: "email", sortable: true },
        {
            header: "Roles",
            accessor: "roles",
            render: (roles: string[]) => (
                <span className="text-sm text-gray-700">
                    {roles?.join(", ") || "No Role"}
                </span>
            ),
        },
        {
            header: "Status",
            accessor: "statusText",
            render: (value: string) => {
                const isActive = value === "Active";

                return (
                    <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full 
                            ${isActive
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                            }`}
                    >
                        {value}
                    </span>
                );
            },
        },

    ];

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        User Management
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage system users, roles, and access permissions.
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && <div className="text-sm text-red-500">{error}</div>}

            {/* Table */}
            <TableUI
                columns={columns}
                data={users}
                loading={loading}
                loadingText="Loading users..."
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
                    placeholder: "Search users by code or fullName...",
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
                    <UserActionMenu
                        status={row.status}
                        onAssignRole={() => handleAssignRole(row)}
                        onActive={() => handleChangeUserStatus(row, 1)}
                        onDeactive={() => handleChangeUserStatus(row, 0)}
                    />
                )}
            />

            {/* SIDEBAR ASSIGN ROLE */}
            {showAssignRoleSidebar && selectedUser && (
                <UserActionRoleSidebar
                    selectedUser={selectedUser}
                    onClose={() => setShowAssignRoleSidebar(false)}
                    onUpdated={fetchData}
                />
            )}
        </div>
    );
};

export default UserList;
