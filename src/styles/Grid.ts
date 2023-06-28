import styled from "styled-components";
import * as C from './Constants';

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

/* BREAKPOINT 576px */
  @media (min-width: ${C.SMIPHONE5}) {
    max-width: 300px;
  }

  /* BREAKPOINT 576px */
  @media (min-width: ${C.SAMSUNGSM}) {
    max-width: 340px;
  }

  /* BREAKPOINT 576px */
  @media (min-width: ${C.SSM}) {
    max-width: 340px;
  }

  /* BREAKPOINT 576px */
  @media (min-width: 36em) {
    max-width: 540px;
  }

  /* BREAKPOINT 768px */
  @media (min-width: 48em) {
    max-width: 720px;
  }

  /* BREAKPOINT 992px */
  @media (min-width: 62em) {
    max-width: 960px;
  }

  /* BREAKPOINT 1200px */
  @media (min-width: 75em) {
    max-width: 1200px;
  }
`;
