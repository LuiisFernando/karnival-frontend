import Link from "next/link";
import styled from "styled-components";
import * as C from "@/styles/Constants";

export const AdministrativoContainer = styled.div`
    min-height: calc(100vh - 200px);
    padding-top: 40px;

    @media (min-width: ${C.XL}) {

    h1 {
        font-size: 3rem;
    }
  }
`;