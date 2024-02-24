import { IModalProps } from "./types/indes";
import * as Styled from './styles';

export default function Modal({ active, children, onClick }: IModalProps) {
    return (
        <Styled.Modal active={active} onClick={onClick}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </Styled.Modal>
    );
}