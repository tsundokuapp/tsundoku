import React from "react";
import Link from "next/link";

interface ILinkNav {
    textoLink: string;
    url: string;
}
export  const LinkNav: React.FC<ILinkNav> = ({textoLink, url}) =>{
    return(
        <Link href={url}>
            <a>{textoLink}</a>
        </Link>
    );
} 