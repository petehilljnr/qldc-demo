import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import clientLogo from './qldc.png'

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  left: 0;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const TitleBar = styled.div`
  margin-left: 1.5rem;
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
`;

const LeftLogo = styled.div`
  justify-content: flex-start;
`;

const ClientTitle = styled.div`
  margin-left: 150px;
`;

const RightLogo = styled.div`
  justify-content: flex-end;
  align-items: right;
`;

const Sidebar = () => {
  //const [sidebar, setSidebar] = useState(false);
  const sidebar = true;
  //const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <TitleBar>
            <LeftLogo>
            <img src={clientLogo} alt="QLDC" height={40} />
            </LeftLogo>
            <ClientTitle>
            Minor Improvements 2021 - 2024
            </ClientTitle>
            <RightLogo>
            
            </RightLogo>
          </TitleBar>
        </Nav>
        <SidebarNav>
          <SidebarWrap>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
