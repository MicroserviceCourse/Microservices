import Http from "../http/http";

export const importInventory = async (data: any) => {
  return await Http.post("/api/inventories", data);
};
