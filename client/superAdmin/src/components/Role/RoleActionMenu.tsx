import type { ActionRoleProps } from "../../types";
import ActionMenu from "../ui/ActionMenu";

const RoleActionMenu: React.FC<ActionRoleProps> = ({
    onEdit,
    onViewPermission
}) => {
    return (
        <ActionMenu
            onEdit={onEdit}
            onViewPermission={onViewPermission}
        />
    )
}
export default RoleActionMenu;