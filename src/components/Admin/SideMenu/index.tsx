import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logoDefault.svg";
import { Container, ContainerLogo, ContainerHandlleMenu, ContainerMenu, MenuList, ItemList } from "./styles";
import Avatar from "@/components/Avatar";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { contentSideMenu } from "@/constants/ContentSideMenu";

import avatar from "@/assets/img/Lelouch.jpg";

export default function SideMenu() {
    const [retractMenuStatus, setRetractMenu] = useState(false);
    const user = retractMenuStatus ? "" : "Bravo";

    function retractMenu() {
        setRetractMenu(!retractMenuStatus)
    };

    return (
        <Container retractMenuStatus={retractMenuStatus}>
            <ContainerLogo retractMenuStatus={retractMenuStatus}>
                <Image alt="Logo Tsundoku" src={logo} height="40" />
                <span>
                    {retractMenuStatus === false ? "Tsundoku" : ""}
                </span>
            </ContainerLogo>
            <div className="container-avatar">
                <Avatar image={avatar} user={user} retractMenuAdmin={retractMenuStatus} />
            </div>
            <ContainerHandlleMenu
                onClick={retractMenu}
                retractMenuStatus={retractMenuStatus}
            >
                Menu
                {retractMenuStatus === false ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
            </ContainerHandlleMenu>
            {contentSideMenu.map((item) => (
                <ContainerMenu key={item.key} setFooter={item.setFooter} retractMenuStatus={retractMenuStatus} >
                    <span className="title-menu-navigation">
                        {item.contentTitle}
                    </span>
                    <MenuList>
                        {item.listContent.map((subItem) => (
                            <ItemList key={subItem.key} retractMenuStatus={retractMenuStatus}>
                                <Link href={subItem.href}>
                                    <subItem.icon/>
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