import { ReactNode } from "react";

export interface IModalProps {
    active: boolean;
    children: ReactNode;
    onClick: () => void;
}