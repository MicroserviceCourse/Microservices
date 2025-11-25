import type { ShopDetailTabProps } from "../../../types";
import { Icons } from "../../common/Icon";

const AddressTab: React.FC<ShopDetailTabProps> = ({ shop }) => {
  return (
    <div className="space-y-5">

      {shop.addresses.map((a) => (
        <div
          key={a.id}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icons.mapPin size={20} className="text-blue-600" />
            </div>

            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-lg">
                {a.fullAddress}
              </h4>

              <p className="text-gray-600 text-sm mt-1">
                Province / District / Ward:  
                <span className="font-medium">
                  {a.idProvince} / {a.idDistrict} / {a.idWard}
                </span>
              </p>

              {/* Default label */}
              {a.isDefault && (
                <span className="
                  mt-2 inline-block px-3 py-1 
                  bg-blue-100 text-blue-600 
                  rounded-full text-xs font-medium
                ">
                  Default Address
                </span>
              )}
            </div>
          </div>

        </div>
      ))}

    </div>
  );
};

export default AddressTab;
