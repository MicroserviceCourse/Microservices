import type { ShopDetailTabProps } from "../../../types";

const ProfileTab: React.FC<ShopDetailTabProps> = ({ shop }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

            <h3 className="text-lg font-semibold mb-4">Shop Profile</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Description */}
                <div>
                    <p className="text-gray-500 text-sm">Description</p>
                    <p className="text-gray-800 mt-1">
                        {shop.description || "No description provided"}
                    </p>
                </div>

                {/* Slug */}
                <div>
                    <p className="text-gray-500 text-sm">Slug</p>
                    <p className="text-gray-800 mt-1">
                        {shop.slug}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ProfileTab;
