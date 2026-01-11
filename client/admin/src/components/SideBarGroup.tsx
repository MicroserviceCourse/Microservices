import SideBarItem from "./SideBarItem";

const SideBarGroup = ({ group }: any) => {
  return (
    <div>
      <p className="px-3 mb-2 text-xs text-gray-400 uppercase">{group.section}</p>
      <div className="space-y-1">
        {group.items.map((item: any) => (
          <SideBarItem key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
};
export default SideBarGroup;
