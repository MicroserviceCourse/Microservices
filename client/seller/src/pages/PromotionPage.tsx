import { useCallback, useEffect, useState } from "react";
import type { Promotion } from "../types/promotion.type";
import type { TableColumn } from "../types";
import { getPromotions } from "../service/api/Promotion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TableUI from "../components/ui/tableUi/TableUI";
import PromotionTableAction from "../components/Promotion/PromotionTableAction";

const PromotionPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "true" | "false">("ALL");
  const [sortKey, setSortKey] = useState<keyof Promotion>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const toggleSort = (key: keyof Promotion) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const payload = {
        page,
        size,
        searchValue: search.trim(),
        filter: status == "ALL" ? "" : `active==${status}`,
        sort: `${sortKey},${sortDir}`,
      }
      const response = await getPromotions(payload);
      const data = response.data ?? response;
      setPromotions(data.content ?? []);
      setTotalPages(data.totalPages);
      setPage(data.pageNumber + 1);
    } catch (err) {
      console.log(err);
      setPromotions([])
    } finally {
      setLoading(false)
    }
  }, [search, status, sortDir, sortKey, page, size]);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  const columns: TableColumn<Promotion>[] = [
    {
      key: "code",
      label: "Product Code",
      sortable: true,
      render: (p) => <span className="font-mono text-sm">{p.code}</span>
    },
    {
      key: "name",
      label: "Promotion Name",
      sortable: true,
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
    },
    {
      key: "startAt",
      label: "Start At",
      sortable: true
    },
    {
      key: "endAt",
      label: "End At",
      sortable: true
    },
    {
      key: "createdAt",
      label: "Created At",
      sortable: true,
      render: (p) =>
        p.createdAt
          ? new Date(p.createdAt).toLocaleDateString("vi-VN")
          : "--",
    },
    {
      key: "updatedAt",
      label: "Updated At",
      sortable: true,
      render: (p) => new Date(p.updatedAt).toLocaleDateString("vi-VN"),
    },
    {
      key: "active",
      label: "Status",
      sortable: true,
      render: (p) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
        ${p.active
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
            }
      `}
        >
          {p.active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (p) => (
        <PromotionTableAction promotion={p} onUpdated={fetchData} />
      ),
    },
  ];
  return (
    <div className="p-8 bg-white dark:bg-card-dark rounded-xl shadow-sm space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap flex-1">
          <div className="relative flex-grow min-w-[250px] max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="code,name..."
              className="w-full py-2.5 pl-12 pr-4 rounded-xl bg-gray-50 
                         border border-gray-300 hover:border-gray-400 
                         focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as "ALL" | "true" | "false");
                setPage(1);
              }}
              className="py-2.5 pl-4 pr-10 rounded-xl bg-gray-50 border border-gray-300 
                         focus:ring-2 focus:ring-blue-600 outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="true">Active</option>
              <option value="false">Hidden</option>

            </select>
          </div>
        </div>
        <button
          onClick={() => navigate("/Dashboard/promotion/create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          + Add Promotion
        </button>
      </div>
      <TableUI<Promotion>
        columns={columns}
        data={promotions}
        loading={loading}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={toggleSort}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}

      />
    </div>
  )
}
export default PromotionPage;