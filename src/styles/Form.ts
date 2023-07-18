import Link from "next/link";
import styled from "styled-components";
import * as C from "@/styles/Constants";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  button {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
  }

  .delete {
    background-color: #ed645a;
    color: #fff;
  }

  .active {
    background-color: #65d67f;
    color: #fff;
  }

  @media (min-width: ${C.XL}) {
    margin-top: unset;
    padding: 50px;

    form {
      width: 50%;
    }
  }
`;

export const FormTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;

  h1 {
        font-size: 1.5rem;
    }

  @media (min-width: ${C.XL}) {
    width: 50%;

    h1 {
        font-size: 2rem;
    }
  }
`;

export const FormGoBackButton = styled(Link)`
  color: #000;
  display: flex;
  svg {
  }
`;
