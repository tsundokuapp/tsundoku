import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Box, LinkStyled } from "./styles";
import { useRouter } from "next/router";

export const TrilhaPath = () => {
  const router = useRouter();
  const path = router.pathname;

  const { id } = router.query;
  const truePath = id ? path.replace("[id]", id.toString()) : path;

  const listaPath = truePath.replace(/-/g, " ").split("/");
  listaPath.shift();

  const reconstruirPath = (path: string) => {
    const indexPathAtual = listaPath.indexOf(path);

    const pathConstruido = listaPath.reduce((acc, item) => {
      if (listaPath.indexOf(item) > indexPathAtual) return acc;
      if (item.includes(" ")) item = item.replace(/ +/g, "-");

      const path = `${acc}/${item}`;
      return path;
    }, "");

    return pathConstruido;
  };

  return (
    <Box>
      {listaPath.map((item, i) => (
        <>
          <Link href={`${reconstruirPath(item)}`} key={item + i}>
            <LinkStyled>{item.toUpperCase()}</LinkStyled>
          </Link>
          {i !== listaPath.length - 1 && (
            <span>
              &nbsp;
              <FaChevronRight />
              &nbsp;
            </span>
          )}
        </>
      ))}
    </Box>
  );
};
