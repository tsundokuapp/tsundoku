import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Box, LinkStyled } from "./styles";
interface ITrilhaPath {
  isAdmin?: boolean;
}

export const TrilhaPath = ({ isAdmin }: ITrilhaPath) => {
  const router = useRouter();
  const path = router.pathname;
  const separator = isAdmin ? "/" : <FaChevronRight />;

  const { id } = router.query;
  const truePath = id ? path.replace("[id]", id.toString()) : path;

  const listaPath = truePath.replace(/-/g, " ").split("/");
  listaPath.shift();

  const reconstructorPath = (path: string) => {
    const indexCurrentPath = listaPath.indexOf(path);

    const reconstructedPath = listaPath.reduce((acc, item) => {
      if (listaPath.indexOf(item) > indexCurrentPath) return acc;
      if (item.includes(" ")) item = item.replace(/ +/g, "-");

      const path = `${acc}/${item}`;
      return path;
    }, "");

    return reconstructedPath;
  };

  return (
    <Box>
      {listaPath.map((item, i) => (
        <>
          <Link href={`${reconstructorPath(item)}`} key={item + i}>
            <LinkStyled>{item.toUpperCase()}</LinkStyled>
          </Link>
          {i !== listaPath.length - 1 && (
            <span>
              &nbsp;
              {separator}
              &nbsp;
            </span>
          )}
        </>
      ))}
    </Box>
  );
};

export const TrilhaPathManga = () => {
  const router = useRouter();

  const { id } = router.query;
  const trueName = (id ? id.toString() : "Mangá")
    .toUpperCase()
    .replace(/-/g, " ")
    .split("/");

  return (
    <Box onClick={router.back}>
      <span>
        &nbsp;
        <FaChevronLeft />
        &nbsp;
      </span>
      <LinkStyled>{trueName}</LinkStyled>
    </Box>
  );
};
