import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import type { AlertType } from "../types/alert.type";

export const iconMap: Record<AlertType, React.ReactNode> = {
  info: <Info className="h-5 w-5" />,
  success: <CheckCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  error: <XCircle className="h-5 w-5" />,
};

export const tone: Record<AlertType, { accent: string; badge: string; icon: string }> = {
  info: {
    accent: "from-blue-500 to-cyan-500",
    badge: "bg-blue-100 text-blue-600",
    icon: "text-blue-600",
  },
  success: {
    accent: "from-emerald-500 to-green-500",
    badge: "bg-emerald-100 text-emerald-600",
    icon: "text-emerald-600",
  },
  warning: {
    accent: "from-amber-500 to-orange-500",
    badge: "bg-amber-100 text-amber-600",
    icon: "text-amber-600",
  },
  error: {
    accent: "from-rose-500 to-red-500",
    badge: "bg-rose-100 text-rose-600",
    icon: "text-rose-600",
  },
};
