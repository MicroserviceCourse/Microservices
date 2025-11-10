import type { ActionModuleProps } from "../../types";
import ActionMenu from "../ui/ActionMenu";

const ActionModule: React.FC<ActionModuleProps> = ({
    status,
    onEdit,
    onActive,
    onDeactive,
    onViewPermission,
    size,
}) => {
    return (
        <ActionMenu
            size={size}
            onEdit={status == true ? onEdit : undefined}
            onViewPermission={status==true ? onViewPermission : undefined}
            onActive={status == false ? onActive : undefined}
            onDeactive={status == true ? onDeactive : undefined}
        />
    )
}
export default ActionModule;