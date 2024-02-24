import styled from "styled-components";
import * as C from "@/styles/Constants";

interface ModalProps {
  active: boolean;
}
export const Modal = styled.div<ModalProps>`
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 3;

  display: ${(props) => (props.active ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50%;
  z-index: 99999;

  @media (min-width: ${C.SM}) {
    align-items: center;
    justify-content: center;
    padding-top: 0;
  }
`;