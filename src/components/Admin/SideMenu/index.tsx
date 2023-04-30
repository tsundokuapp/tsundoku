import logo from "@/assets/logo/logoDefault.svg";
import Avatar from "@/components/Avatar";
import { contentSideMenu } from "@/constants/ContentSideMenu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import {
  Container,
  ContainerHandlleMenu,
  ContainerLogo,
  ContainerMenu,
  ItemList,
  MenuList,
} from "./styles";

import avatar from "@/assets/img/Lelouch.jpg";

// TODO: Criar ação para deixar o backgound dos links ativas
export default function SideMenu() {
  const [retractMenuStatus, setRetractMenu] = useState(false);
  const user = retractMenuStatus ? "" : "Bravo";

  function retractMenu() {
    setRetractMenu(!retractMenuStatus);
  }

  return (
    <Container retractMenuStatus={retractMenuStatus}>
      <ContainerLogo retractMenuStatus={retractMenuStatus}>
        <Image alt="Logo Tsundoku" src={logo} height="40" />
        <span>{retractMenuStatus === false ? "Tsundoku" : ""}</span>
      </ContainerLogo>
      <div className="container-avatar">
        <Avatar
          image={avatar}
          user={user}
          retractMenuAdmin={retractMenuStatus}
        />
      </div>
      <ContainerHandlleMenu
        onClick={retractMenu}
        retractMenuStatus={retractMenuStatus}
      >
        Menu
        {retractMenuStatus === false ? (
          <RiArrowLeftSLine />
        ) : (
          <RiArrowRightSLine />
        )}
      </ContainerHandlleMenu>
      {contentSideMenu.map((item) => (
        <ContainerMenu
          key={item.key}
          setFooter={item.setFooter}
          retractMenuStatus={retractMenuStatus}
        >
          <span className="title-menu-navigation">{item.contentTitle}</span>
          <MenuList>
            {item.listContent.map((subItem) => (
              <ItemList key={subItem.key} retractMenuStatus={retractMenuStatus}>
                <Link href={subItem.href}>
                  <subItem.icon />
                  {retractMenuStatus === false ? subItem.label : ""}
                </Link>
              </ItemList>
            ))}
          </MenuList>
        </ContainerMenu>
      ))}
    </Container>
  );
}
