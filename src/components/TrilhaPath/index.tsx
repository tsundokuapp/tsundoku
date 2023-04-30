import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import { Box, LinkStyled } from "./styles";

interface ITrilhaPath {
  isAdmin?: boolean;
}

export const TrilhaPath = ({ isAdmin }: ITrilhaPath) => {
  const router = useRouter();
  const path = router.pathname;

  const listaPath = path.replace(/-/g, " ").split("/");
  listaPath.shift();

  const reconstruirPath = (path: string) => {
    const indexPathAtual = listaPath.indexOf(path);

    const pathConstruido = listaPath.reduce((acc, item) => {
      if (listaPath.indexOf(item) > indexPathAtual) return acc;
      if (item.includes(" ")) item = item.replace(" ", "-");

      const path = `${acc}/${item}`;
      return path;
    }, "");

    return pathConstruido;
  };

  return (
    <Box>
      {!isAdmin
        ? listaPath.map((item, i) => (
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
          ))
        : listaPath.map((item, i) => (
            <>
              {isAdmin && i > 1 && (
                <span>
                  <Link href={`${reconstruirPath(item)}`} key={item + i}>
                    <LinkStyled isAdmin={isAdmin}>
                      {item.toUpperCase()}
                    </LinkStyled>
                  </Link>
                  {i !== listaPath.length - 1 && (
                    <span>&nbsp; {" / "} &nbsp;</span>
                  )}
                </span>
              )}
            </>
          ))}
    </Box>
  );
};
