import TableUI from "../../components/ui/TableUI";
import type { Category, Column } from "../../types"

const CategoryList = ()=>{
    const data :Category[] = [
        {
            id: 1,
            name: "Dried food",
            icon: "/images/dried.png",
            quantity: 1638,
            sale: 20,
            startDate: "20 Nov 2023",
          },
          {
            id: 2,
            name: "Wet food",
            icon: "/images/wet.png",
            quantity: 1200,
            sale: 15,
            startDate: "10 Dec 2023",
          },
    ]
    const columns: Column<Category>[] = [
        {
          header: "Category",
          accessor: "name",
          render: (value: string, row: Category) => (
            <div className="flex items-center gap-3">
              <img src={row.icon} alt={value} className="w-8 h-8 rounded-md" />
              <span className="font-medium">{value}</span>
            </div>
          ),
        },
        { header: "Quantity", accessor: "quantity" },
        { header: "Sale", accessor: "sale" },
        { header: "Start Date", accessor: "startDate" },
      ];
      return(
        <TableUI
        title="Category List"
        columns={columns}
        data={data}
        onView={(item) => alert(`View ${item.name}`)}
        onEdit={(item) => alert(`Edit ${item.name}`)}
      />
      )
}
export default CategoryList;    