import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { type Column, type Permission, type SortState } from "../../types";
import { getAllPermission, updateStatus } from "../../service/api/Permission";
import { ArrowLeft, Plus } from "lucide-react";
import TableUI from "../../components/ui/TableUI";
import PermissionFormCreate from "../../components/Permission/PermissionFormCreate";
import PermissionActionMenu from "../../components/Permission/PermissionActionMenu";
import PermissionFormEdit from "../../components/Permission/PermissionFormEdit";
import { useAlert } from "../../components/alert-context";

const PermissionList = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id)  
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { moduleCode?: string; moduleName?: string } | undefined;
    const moduleCode = state?.moduleCode;
    const moduleName = state?.moduleName;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState<any | null>(null);
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState<SortState | null>(null);
    const { showAlert } = useAlert();
    const fetchData = async (params?: {
        search?: string;
        status?: string;
        page?: number;
        sort?: SortState | null;
    }) => {
        if (!id) return;
        setLoading(true);
        setError(null);
        const currentSearch = params?.search ?? search;
        const currentStatus = params?.status ?? status;
        const targetPage = params?.page ?? page;
        const currentSort = params?.sort ?? sort;
        setPage(targetPage);
        let filters: string[] = []
        if (currentStatus === "true") filters.push("isActive==true");
        else if (currentStatus === "false") filters.push("isActive==false");
        filters.push(`module.id==${id}`);
        const filterQuery = filters.join(" and ");
        try {
            const params = {
                page: targetPage,
                size: 5,
                ...(currentSearch ? { searchValue: currentSearch } : {}),
                ...(filterQuery ? { filter: filterQuery } : {}),
                ...(currentSort
                    ? { sort: `${currentSort.accessor},${currentSort.direction}` }
                    : {})
            }
            const res = await getAllPermission(params);
            setPermissions(res.data.content || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err: any) {
            console.error("Error fetching permissions:", err);
            setError("Failed to fetch permissions. Please try again.")
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
      fetchData({page:1});
    },[id])
    const handleEdit = (row: any) => {
      setShowUpdateModal(true);
      setSelectedPermission(row);
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
    const columns: Column<Permission>[] = [
        { header: "Code", accessor: "code", sortable: true },
        { header: "key", accessor: "permissionKey", sortable: true },
        {
            header: "status",
            accessor: "isActive",
            render: (value: boolean) => (
                <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                >
                    {value ? "Active" : "Inactive"}
                </span>
            ),
        },
        { header: "Created Date", accessor: "createdAt", sortable: true },
        { header: "Last Updated Date", accessor: "updatedAt", sortable: true },
    ]
    return (
        <div className="min-h-screen bg-[#f5f8fc] py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Permissions
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Module:&nbsp;
                <span className="font-semibold text-gray-900">
                  {moduleCode || `#${id}`}
                </span>
                {moduleName && (
                  <span className="text-gray-400"> — {moduleName}</span>
                )}
              </p>
            </div>
          </div>

       
        </div>

        {error && (
          <div className="max-w-6xl mx-auto text-sm text-red-500">{error}</div>
        )}

        {/* Card + Table */}
        <div className="max-w-6xl mx-auto">
          <TableUI<Permission>
            columns={columns}
            data={permissions}
            loading={loading}
            loadingText="Loading permissions..."
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
                fetchData({ sort: newSort ?? null, page: 1 });
              }
            }}
            searchConfig={{
              enabled: true,
              placeholder: "Search by code or key...",
              value: search,
              onChange: (value) => {
                setSearch(value);
                fetchData({ search: value, page: 1 });
              },
            }}
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
                fetchData({ status: value, page: 1 });
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
            headerRight={
              // nút Add Permission xuất hiện cả mobile
              <button
              onClick={()=>setOpenModal(true)}
              className="flex items-center gap-2 text-sm text-blue-600 border border-blue-500 px-4 py-2 rounded-lg
                           hover:bg-[#2275fc] hover:text-white transition-all duration-200"
              >
                <Plus size={16} />
                Add Permission
              </button>
            }
            renderActions={(row) => (
              <PermissionActionMenu
                  onEdit={() => handleEdit(row)}
                  status={row.isActive}
                  onActive={()=>handleActive(row)}
                  onDeactive={()=>handleInActive(row)}
              />
          )}
          />
          <PermissionFormCreate
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onSubmit={fetchData}
            idModule={Number(id)}
          />
          <PermissionFormEdit
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onSubmit={fetchData}
          idModule={Number(id)}
          permissionData={selectedPermission}
          />
        </div>
      </div>
    </div>
    )
}
export default PermissionList;