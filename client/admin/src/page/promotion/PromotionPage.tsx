import { useCallback, useEffect, useState } from "react";
import type { SortState } from "../../types";
import { changeStatusPromotion, getPromotions } from "../../service/api/Promotion";
import { Table } from "../../components/ui/Table/TableIUI";
import { getPromotionColumns } from "./promotion.columns";
import CreatePromotionModal from "../../components/promotion/CreatePromotionModal";
import EditPromotionModal from "../../components/promotion/EditPromotionModal";
import { useAlert } from "../../components/alert-context/alert-context";
import type { Promotion } from "../../types/promotion/promotion";
import { PromotionStatus } from "../../types/promotion/promotion.enum";

const PromotionPage = () => {
  const [data, setData] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedPromotion,setSelectedPromotion] = useState<any | null>(null);
  const [openUpdate,  setOpenUpdate] = useState(false);
  const [open,setOpen] = useState(false);
  const {showAlert} = useAlert();
  const [sort, setSort] = useState<SortState<Promotion>>({
    key: "priority",
    order: "desc",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let filters: string[] = [];
      if (statusFilter) {
        filters.push(`status=${statusFilter}`);
      }
      if (typeFilter) {
        filters.push(`type=${typeFilter}`);
      }
      const filterQuery = filters.join(" and ");
      const res = await getPromotions({
        page: 1,
        size: 10,
        sort: `${sort.key},${sort.order}`,
        ...(filterQuery ? { filter: filterQuery } : {}),
        searchValue: search,
      });
      setData(res.data.data.content);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, typeFilter, sort]);
  const handleEdit =(row:any)=>{
    setSelectedPromotion(row);
    setOpenUpdate(true);
  }
  const changeStatus = async(
    id:number,
    nextStatus:number
  )=>{
    const prevData = [...data];
    setData((list:any)=>
      list.map((item:any)=>
        item.id == id
        ? {...item,status:nextStatus}
        :item
      )
    )
    try {
      await changeStatusPromotion(id,nextStatus);
      showAlert({
        title:"Change status successfully",
        type:"success",
        autoClose:3000
      })
    }catch(err:any){
      setData(prevData);
      showAlert({
        title:"Change status failed",
        type:"error",
        autoClose:3000
      })
    }
  }
  const columns = getPromotionColumns({
  
    onEdit: (row) => {
      handleEdit(row)
    },
    onActive: (id) => {
      changeStatus(id,PromotionStatus.ACTIVE);
    },
    onPause: (id) => {
      changeStatus(id,PromotionStatus.PAUSED);
    },
    });
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
   <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Promotion Manager</h1>
          <p className="text-sm text-gray-400">
            Manage promotion campaigns
          </p>
        </div>
        <button onClick={()=>setOpen(true)} className="rounded-xl bg-orange-500 px-4 py-2 text-sm text-white">
          + Create Promotion
        </button>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name / code"
          className="w-64 rounded-xl border px-3 py-2 text-sm border-[#C2C4C5]"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border px-3 py-2 text-sm border-[#C2C4C5]"
        >
          <option value="">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="ACTIVE">Active</option>
          <option value="PAUSED">Paused</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border px-3 py-2 text-sm border-[#C2C4C5]"
        >
          <option value="">All Types</option>
          <option value="ORDER_DISCOUNT">Order Discount</option>
          <option value="PRODUCT_DISCOUNT">Product Discount</option>
          <option value="FREESHIP">Free Ship</option>
        </select>
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={data}
        loading={loading}
        sort={sort}
        onSortChange={setSort}
        rowKey={(row) => row.id.toString()}
      />
      <CreatePromotionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchData}
      />
      <EditPromotionModal
        isOpen={openUpdate}
        onClose={() => setOpenUpdate(false)}
        onSuccess={fetchData}
        promotionId={selectedPromotion?.id}
      />
    </div>
  );
};
export default PromotionPage;
