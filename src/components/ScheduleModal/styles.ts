import styled from "styled-components";
import * as C from "@/styles/Constants";

export const InfoModal = styled.div`
  width: 327px;
  height: 400px;
  overflow: unset;
  padding-top: 0;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  hr {
    border: 1px solid #d4d4d4;
    opacity: 0.5;
  }

  @media (min-width: ${C.SM}) {
    width: 546px;
    height: 500px;
  }
`;

export const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 25px 17px 25px;

  svg {
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  flex: 1;
  margin-top: 20px;
  margin-bottom: 14px;
  padding-left: 25px;
  overflow: scroll;
`;

export const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;

  button {
    width: 135px;
    height: 50px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 0.875rem;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 6px 12px #00000029;
    }
  }

  .cancel-button {
    background: #fff;
    color: #000;
    margin-right: 10px;
    border: 1px solid #000;
  }

  .confirm-button {
    background: #545454;
    color: #fff;

    &:active {
      background: #3b3b3b;
    }
  }

  @media (min-width: ${C.SM}) {
    margin-top: 20px;

    button {
      width: 228px;
      height: 54px;
      font-size: 1rem;
    }
  }
`;
