import { SHOP_STATUS } from "../constant/status";


export const renderShopStatusBadge = (status: number) => {
    const item = SHOP_STATUS[status] ?? SHOP_STATUS[4];

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.className}`}>
            {item.text}
        </span>
    );
};
