export type PromotionStatusCode = 1 | 2 | 3;
export interface Promotion {
  id: number;
  name: string;
  code: string;
  type: number;
  value: number;
  priority: number;
  startAt: string;
  endAt: string | null;
  status: PromotionStatusCode; 
}

export interface PromotionColumnProps {
  onEdit: (row: Promotion) => void;
  onActive:(id:number)=>void;
  onPause:(id:number)=>void;
}
export const PROMOTION_STATUS_MAP = {
  1: {
    label: "DRAFT",
    className: "bg-gray-200 text-gray-600",
  },
  2: {
    label: "ACTIVE",
    className: "bg-green-100 text-green-600",
  },
  3: {
    label: "PAUSED",
    className: "bg-yellow-100 text-yellow-600",
  },
} as const;
export interface CreatePromotionModalProps  {
  isOpen:boolean;
  onClose:()=>void;
  onSuccess:()=>void;
}

export interface UpdatePromotionModalProps extends CreatePromotionModalProps{
  promotionId:any;
}