import type { ActionPermissionProps } from "../../types";
import ActionMenu from "../ui/ActionMenu";

const PermissionActionMenu: React.FC<ActionPermissionProps> = ({
    status,
    onEdit,
    onActive,
    onDeactive,
    size
}) => {
    return (
        <ActionMenu
            size={size}
            onEdit={status == true ? onEdit : undefined}
            onActive={status == false ? onActive : undefined}
            onDeactive={status == true ? onDeactive : undefined}
        />
    )
}
export default PermissionActionMenu;