export const PromotionStatus = {
  DRAFT: 1,
  ACTIVE: 2,
  PAUSED: 3,
} as const;

export type PromotionStatus =
  (typeof PromotionStatus)[keyof typeof PromotionStatus];