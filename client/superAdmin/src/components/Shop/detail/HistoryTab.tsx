import { useEffect, useState } from "react";
import type { HistoryTabProps, ShopHistory } from "../../../types";
import { GetShopStatusHistories } from "../../../service/api/ShopStatusHistory";
import { SHOP_STATUS } from "../../../constant/status";
import Pagination from "../../ui/Pagination";
import { Icons } from "../../common/Icon";

const HistoryTab: React.FC<HistoryTabProps> = ({ shopId }) => {
  const [history, setHistory] = useState<ShopHistory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const size = 5;

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await GetShopStatusHistories({
        page,
        size,
        sort: "id,desc",
        searchField: "shop.id",
        searchValue: shopId.toString(),
      });

      setHistory(res.content);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, shopId]);


  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-8">

      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <Icons.clock /> Status Timeline
      </h3>

      <div className="relative ml-6">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gray-200"></div>

        <div className="ml-6 space-y-8">
          {history.map((h, index) => (
            <div key={h.id} className="relative">

              {/* Dot */}
              <div className="absolute -left-[34px] top-1 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-md"></div>

              {/* Card */}
              <div className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Icons.clock className="text-gray-400" />
                  {h.actionAt}
                </p>

                <p className="font-semibold text-gray-900 mt-1 flex items-center gap-2">

                  <span className={SHOP_STATUS[h.previousStatus].className}>
                    {SHOP_STATUS[h.previousStatus].text}
                  </span>

                  <Icons.cornerDown className="text-gray-400" />

                  <span className={SHOP_STATUS[h.newStatus].className}>
                    {SHOP_STATUS[h.newStatus].text}
                  </span>

                </p>

                {h.reason && (
                  <p className="text-gray-700 mt-2 border-l-4 border-blue-400 pl-3 italic">
                    “{h.reason}”
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <Icons.user /> By {h.actionBy}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />

    </div>
  );
};

export default HistoryTab;