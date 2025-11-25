import { useState, useCallback, useEffect } from "react";
import { approveShop, blockShop, getShops, rejectShop, restoreShop } from "../../service/api/Shop";
import { type Column, type ShopDTO, type SortState } from "../../types";
import TableUI from "../../components/ui/TableUI";
import ShopActionMenu from "../../components/Shop/ShopActionMenu";
import ReasonModal from "../../components/Shop/ReasonModal";
import { useAlert } from "../../components/alert-context";
import { useNavigate } from "react-router-dom";

const ShopList = () => {
    const [shops, setShops] = useState<ShopDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState<SortState | null>(null);
    const [actionLoading, setActionLoading] = useState<number | null>(null);

    const { showAlert } = useAlert();

    const [reasonModal, setReasonModal] = useState<{
        id: number;
        type: "reject" | "block";
    } | null>(null);
    const [modalLoading, setModalLoading] = useState(false);


    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getShops({
                page,
                size: 10,
                searchValue: search,
                filter: statusFilter && `status==${statusFilter}` ,
                sort: sort ? `${sort.accessor},${sort.direction}` : "id,desc"
            });

            setShops(data.content);
            setTotalPages(data.totalPages);
        } catch (e: any) {
            setError("Failed to load shops.");
        } finally {
            setLoading(false);
        }
    }, [page, sort, search, statusFilter])

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const renderStatusBadge = (status: number) => {
        const map = [
            { text: "Pending", class: "bg-yellow-100 text-yellow-700" },
            { text: "Active", class: "bg-green-100 text-green-700" },
            { text: "Rejected", class: "bg-red-100 text-red-700" },
            { text: "Blocked", class: "bg-red-200 text-red-800" },
            { text: "Inactive", class: "bg-gray-100 text-gray-600" }
        ];

        const item = map[status] ?? map[4];

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.class}`}>
                {item.text}
            </span>
        );
    }

    const handleApprove = async (id: number) => {
        setActionLoading(id);

        try {
            const response =
                await approveShop(id);

            const message =
                response?.data?.message || "Approve shop successfully!";
            showAlert({ title: message, type: "success", autoClose: 3000 });
            fetchData();
        } catch (err: any) {
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed Reject Shop. Please try again.",
                type: "error",
            });
        }finally{
            setActionLoading(null)
        }
    };

    const handleRestore = async (id: number) => {
        setActionLoading(id);

        try {
            const response =
                await restoreShop(id);

            const message =
                response?.data?.message || "restore shop successfully!";
            showAlert({ title: message, type: "success", autoClose: 3000 });
            fetchData();

        } catch (err: any) {
            showAlert({
                title:
                    err?.response?.data?.message ||
                    "Failed Restore Shop. Please try again.",
                type: "error",
            });
        }finally{
            setActionLoading(null);
        }
    };

    const handleReasonAction = async (id: number, reason: string, action: "reject" | "block") => {
        setModalLoading(true);

        try {
            if (action === "reject") {
                await rejectShop(id, reason);
            } else {
                await blockShop(id, reason);
            }

            fetchData();

        } finally {
            setModalLoading(false);
            setReasonModal(null);
        }
    }

    const columns: Column<any>[] = [
        { header: "Shop Code", accessor: "shopCode", sortable: true },
        { header: "Shop Name", accessor: "shopName", sortable: true },
        { header: "Owner", accessor: "Owner" },
        {
            header: "Status",
            accessor: "status",
            sortable: true,
            render: (status) => renderStatusBadge(status)
        },
        { header: "Created Date", accessor: "createdAt", sortable: true },
        { header: "Last Updated Date", accessor: "updatedAt", sortable: true },
    ]

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Shop Management</h2>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <TableUI
                columns={columns}
                data={shops}
                loadingText="Loading Shops..."
                sortState={sort}
                onSortChange={(newSort) => {
                    const isSameSort =
                        sort?.accessor === newSort?.accessor &&
                        sort?.direction === newSort?.direction;

                    const updatedSort = isSameSort ? null : newSort;

                    setSort(updatedSort);
                }}
                searchConfig={{
                    enabled: true,
                    placeholder: "Search by shop code, shop name, owner...",
                    value: search,
                    onChange: (value) => {
                        setSearch(value);
                    },
                }}
                filterConfig={{
                    enabled: true,
                    label: "Status",
                    options: [
                        { label: "All", value: "" },
                        { label: "Pending", value: "0" },
                        { label: "Active", value: "1" },
                        { label: "Rejected", value: "2" },
                        { label: "Blocked", value: "3" },],
                    value: statusFilter,
                    onChange: (value) => {
                        setStatusFilter(value)
                    },
                }}
                pagination={{
                    currentPage: page,
                    totalPages,
                    disabled: loading,
                    onPageChange: (newPage) => {
                        if (newPage < 1 || newPage > totalPages) return;
                        setPage(newPage);
                    },
                }}
                renderActions={(row) => (
                    <ShopActionMenu
                        status={row.status}
                        loading={actionLoading === row.id}
                        onViewDetail={() => navigate(`/dashboard/shops/${row.id}`)}
                        onApprove={() => handleApprove(row.id)}
                        onReject={() => setReasonModal({ id: row.id, type: "reject" })}
                        onBlock={() => setReasonModal({ id: row.id, type: "block" })}
                        onRestore={() => handleRestore(row.id)}

                    />
                )}
            />
            {reasonModal && (
                <ReasonModal
                    title={reasonModal.type === "reject" ? "Reject Shop" : "Block Shop"}
                    loading={modalLoading}
                    onConfirm={(reason) => {
                        handleReasonAction(
                            reasonModal.id,
                            reason,
                            reasonModal.type
                        );
                    }}
                    onClose={() => {
                        if (!modalLoading) {
                            setReasonModal(null);
                        }
                    }}
                />
            )}

        </div>
    )

}
export default ShopList;