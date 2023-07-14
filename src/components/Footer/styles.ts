import styled from "styled-components";
import * as C from "@/styles/Constants";

export const FooterContainer = styled.footer`
  margin-top: 20px;
  background-color: #000;
  width: 100%;
  /* height: 400px; */
  color: #fff;
  padding: 20px 0;

  @media (min-width: ${C.XL}) {
    padding: 0;
    height: 400px;
  }
`;

export const FooterWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (min-width: ${C.XL}) {
    padding-top: 40px;
    flex-direction: row;

    div:not(:last-child) {
      margin-right: 100px;
    }
  }
`;

export const Opening = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 40px;

  span {
    margin-bottom: 30px;
  }

  @media (min-width: ${C.XL}) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const OpeningContainer = styled.div`
  margin-bottom: 10px;
`;

export const AddressContainer = styled.div`
  margin-bottom: 20px;

  p {
    max-width: 200px;
    letter-spacing: 1px;
  }
  span {
    display: block;
    margin-bottom: 30px;
  }

  @media (min-width: ${C.XL}) {
    margin-bottom: 0;
  }
`;

export const PagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
  a {
    text-decoration: none;
    color: #fff;
    margin-bottom: 10px;

    &:hover {
        text-decoration: underline;
    }
  }

  span {
    display: block;
    margin-bottom: 30px;
  }

  @media (min-width: ${C.XL}) {
    margin-bottom: 0;
  }
`;

export const SocialNetworkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 10px;
  text-align: center;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin-right: 20px;
  }

  svg {
    cursor: pointer;
  }

  a:not(:last-child) {
    margin-right: 40px;
  }

  @media (min-width: ${C.XL}) {
    bottom: 50px;
  }

`;
