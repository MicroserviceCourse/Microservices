import type { IconType } from "react-icons";

export type Tokens = {
    accessToken: string;
    refreshToken?: string;
    accessTokenAt: number;
    refreshTokenAt?: number;
}
export type SidebarItemProps = {
    icon: IconType;
    label: string;
    onClick?: () => void;
  };
export type ReportItemProps = {
    icon: string;
    label: string;
    amount: string;
    growth: string;
    color: string;
  };