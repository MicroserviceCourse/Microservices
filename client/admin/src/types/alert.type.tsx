export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertAction {
  label: string;
  onClick?: () => void;
  autoFocus?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

export interface AlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string | React.ReactNode;
  type?: AlertType;
  closeable?: boolean;
  autoClose?: number;
  primaryAction?: AlertAction;
  secondaryAction?: AlertAction;
  size?: "sm" | "md" | "lg";
}
export interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  autoFocus?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  onClose: () => void;
}
export interface AlertState {
  open: boolean;
    title: string;
    description?:React.ReactNode;
    type?:AlertType;
    autoClose?:number;
    primaryAction?:{label:string; onClick:()=>void};
    secondaryAction?:{label:string; onClick:()=>void};
}

export interface AlertContextType {
    showAlert:(opts:Omit<AlertState,"open">)=>void;
    hideAlert:()=>void;
}