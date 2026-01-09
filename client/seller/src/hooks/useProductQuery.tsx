import { useState } from "react"
import type { Product } from "../types/product.type";

const useProductQuery=()=>{
    const [search, setSearch] =useState("");
    const [status, setStatus] = useState<"ALL" | Product["status"]>("ALL");
    const [sortKey, setSortKey] = useState<keyof Product>("id");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
  
    const toggleSort = (key: keyof Product) => {
      if (sortKey === key) {
        setSortDir(sortDir === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
    };
    const buildParams = () => ({
        page,
        size,
        searchValue: search.trim(),
        filter  : status=="ALL" ?"":`status==${status}` ,
        sort: `${sortKey},${sortDir}`,
      });
      return {
        search,
        setSearch,
        status,
        setStatus,
        sortKey,
        sortDir,
        toggleSort,
        page,
        setPage,
        size,
        setSize,
        buildParams,
      };
    
      
}
export default useProductQuery;