import styled from "styled-components";
import * as C from '@/styles/Constants';
import Link from "next/link";
import { Container } from "@/styles/Grid";

export const Header = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  transition: all 0.4s ease-in;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 12px;
`;

export const HeaderWrap = styled.div`
    padding: 0 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    transition: all .4s;
    background-color: transparent;
`;

export const HeaderContainer = styled(Container)`
    @media (min-width: ${C.XL}) {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`;

export const HeaderTitle = styled(Link)`
    font-family: 'Ysabeau SC', sans-serif;
    font-size: 2rem;
    text-decoration: none;
    color: #000;
    align-self: center;
    text-align: center;


    @media (min-width: ${C.XL}) {
        margin-right: 100px;
    }
`;

export const NavContainer = styled.div`
    display: none;

    @media (min-width: ${C.XL}) {
        width: 100%;
        display: flex;
        justify-content: space-between;

        a {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
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


interface LiProps {
    active: boolean;
}

export const LiComSub = styled.li<LiProps>`
    
    cursor: pointer;
    position: relative;

    .subMenu {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 12px;
        position: absolute;
        display: ${props => props.active ? 'flex' : 'none'};
        align-items: flex-start;
        justify-content: start;
        background: #FFF;
        width: 220px;
        border-radius: 5px;
        top: 50px;
        z-index: 1;
    }
`;

export const ULSubMenu = styled.ul`
    display: flex; 
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 0;
    width: 100%;

    li:not(:last-child) {
        margin-bottom: 10px;
    }
`;