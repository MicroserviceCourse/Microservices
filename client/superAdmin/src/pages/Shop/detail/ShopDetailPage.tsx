import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type ShopDetail } from "../../../types";
import { getShopById } from "../../../service/api/Shop";
import { renderShopStatusBadge } from "../../../util/StatusBadge";
import { SHOP_TABS, ShopTab } from "../../../constant/tabs";
import OverViewTab from "../../../components/Shop/detail/OverViewTab";
import ProfileTab from "../../../components/Shop/detail/ProfileTab";
import AddressTab from "../../../components/Shop/detail/AddressTab";
import HistoryTab from "../../../components/Shop/detail/HistoryTab";
import { FiArrowLeft } from "react-icons/fi";

const ShopDetailPage = () => {
    const { id } = useParams();
    const [shop, setShop] = useState<ShopDetail>();
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState<ShopTab>(ShopTab.OVERVIEW);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getShopById(Number(id));
                setShop(res.data.data);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (loading) return <div className="p-6">Loading shop...</div>;
    if (!shop) return <div className="p-6">Shop not found</div>;

    return (
        <div className="p-6 space-y-8">

            {/* Header */}
            <div className="bg-white px-6 py-5 rounded-xl shadow-sm flex justify-between items-center">

                <div className="flex items-center gap-4">

                    {/* Back button */}
                    <button
                        onClick={() => navigate("/dashboard/shops")}
                        className="p-2 rounded-full hover:bg-gray-100 border border-gray-200 transition"
                    >
                        <FiArrowLeft className="text-gray-700" size={18} />
                    </button>

                    {/* Title + Shop code */}
                    <div>
                        <h1 className="text-xl font-semibold leading-tight">
                            {shop.shopName}
                        </h1>
                        <p className="text-gray-500 text-sm mt-0.5">
                            Shop Code: {shop.shopCode}
                        </p>
                    </div>

                </div>

                {/* Status */}
                {renderShopStatusBadge(shop.status)}

            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mt-4">
                <nav className="flex gap-6">
                    {SHOP_TABS.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setTab(item.key as any)}
                            className={`py-3 text-sm font-medium transition-all
                                ${
                                  tab === item.key
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                                }
                              `}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab content */}
            <div className="mt-4">
                {tab === "overview" && <OverViewTab shop={shop} />}
                {tab === "profile" && <ProfileTab shop={shop} />}
                {tab === "address" && <AddressTab shop={shop} />}
                {tab === "history" && <HistoryTab shopId={shop.id} />}
            </div>

        </div>
    );
};

export default ShopDetailPage;
