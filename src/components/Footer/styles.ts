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
  /* padding-top: 40px; */

  display: flex;
  /* justify-content: center;
    align-items: flex-start; */
  width: 100%;

  /* display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    
    @media (min-width: ${C.XL}) {
        grid-gap: 20px;
    } */
  flex-direction: column;

  @media (min-width: ${C.XL}) {
    padding-top: 40px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Opening = styled.div`
  display: flex;
  flex-direction: column;
  /* min-width: 200px; */
  margin-bottom: 20px;
  /* width: 100%; */

  span {
    margin-bottom: 10px;
  }

  @media (min-width: ${C.XL}) {
    /* min-width: 300px; */

    margin-bottom: 0;
  }
`;

export const OpeningContainer = styled.div`
  /* display: flex;
    flex-direction: column; */
`;

export const AddressContainer = styled.div`
  /* max-width: 40px; */
  /* margin-right: 50px; */
  margin-bottom: 20px;

  p {
    max-width: 200px;
  }

  /* width: 100%; */

  span {
    display: block;
    margin-bottom: 10px;
  }

  @media (min-width: ${C.XL}) {
    /* margin-right: 200px; */
    margin-bottom: 0;
  }
`;

export const PagesContainer = styled.div`
  /* min-width: 200px; */
  /* width: 100%; */
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: #fff;

    &:hover {
        text-decoration: underline;
    }
  }

  span {
    display: block;
    margin-bottom: 10px;
  }

  @media (min-width: ${C.XL}) {
    /* min-width: 500px; */
  }
`;

export const SocialNetworkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
