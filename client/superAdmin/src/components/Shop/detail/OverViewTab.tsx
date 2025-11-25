import type { ShopDetailTabProps } from "../../../types";
import { Icons } from "../../common/Icon";

const OverViewTab: React.FC<ShopDetailTabProps> = ({ shop }) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ==== Branding Card ==== */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Branding</h3>

                <div className="flex items-center gap-6">
                    <img
                        src={shop.logoUrl}
                        alt="Logo"
                       className="h-20 w-20 rounded-xl object-cover shadow-sm"
                    />

                    <img
                        src={shop.bannerUrl}
                        alt="Banner"
                        className="h-20 w-56 rounded-xl object-cover shadow-sm"
                    />
                </div>
            </div>

            {/* ==== Owner Information ==== */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Owner Information</h3>

                <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-2 text-gray-800 font-medium">
                        <Icons.user className="text-gray-500" />
                        <span>{shop.ownerName}</span>
                    </div>

                    <p><span className="font-semibold">Email:</span> {shop.ownerEmail}</p>
                    <p><span className="font-semibold">Phone:</span> {shop.ownerPhone}</p>
                </div>
            </div>

            {/* ==== Time Information ==== */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-1 lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Timeline</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

                    <div className="flex items-center gap-2">
                        <Icons.clock className="text-gray-500" />
                        <p>
                            <span className="font-semibold">Created:</span> {shop.createdAt}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Icons.clock className="text-gray-500" />
                        <p>
                            <span className="font-semibold">Updated:</span> {shop.updatedAt}
                        </p>
                    </div>
                </div>
            </div>

        </div>

    )
}
export default OverViewTab;