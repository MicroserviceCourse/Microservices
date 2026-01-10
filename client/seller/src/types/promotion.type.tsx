export interface Promotion {
  id: number;
  code: string;
  name: string;
  type: string;
  value: number;
  priority: number;
  startAt: string;
  endAt: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PromotionTableProps {
  promotion: Promotion;
  onUpdated?: () => void;
}
