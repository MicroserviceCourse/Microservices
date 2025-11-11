import type { ActionRoleProps } from "../../types";
import ActionMenu from "../ui/ActionMenu";

const RoleActionMenu: React.FC<ActionRoleProps> = ({
    onEdit
}) => {
    return (
        <ActionMenu
            onEdit={onEdit}
        />
    )
}
export default RoleActionMenu;