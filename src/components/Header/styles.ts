import styled from "styled-components";
import * as C from '@/styles/Constants';
import Link from "next/link";

export const Header = styled.header`
  width: 100%;
  height: 70px;
  z-index: 9999;
  display: flex;
  transition: all 0.4s ease-in;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 12px; 
`;

export const HeaderWrap = styled.div`
    padding: 0 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transition: all .4s;
    background-color: transparent;
`;

export const HeaderContainer = styled.div`
    display: none;

    @media (min-width: ${C.XL}) {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const HeaderTitle = styled(Link)`
    font-family: 'Ysabeau SC', sans-serif;
    font-size: 2rem;
    margin-right: 100px;
    text-decoration: none;
    color: #000;
`;

export const Navbar = styled.nav`
    ul {
        margin-top: 50px;
        list-style-type: none;
        font-family: 'Ysabeau SC', sans-serif;
        font-size: 1.1rem;
        height: 100%;
    }

    ul li {
        padding: 0 20px;
        transition: all .4s;
        margin-top: 20px;
    }
    
    ul li a {
        text-decoration: none;
        color: black;
        transition: all cubic-bezier(.4,0,.2,1) .4s;
        cursor: pointer;
    }

    @media (min-width: ${C.XL}) {
        ul {
            margin-top: unset;
            display: flex;
            height: 100%;
        }

        ul li {
            margin-top: unset;
        }

        ul:hover li:not(:hover) {
            opacity: .5;
        }
    }
`;