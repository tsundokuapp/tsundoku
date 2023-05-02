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

  const { id } = router.query;
  const truePath = id ? path.replace("[id]", id.toString()) : path;

  const pathList = truePath.replace(/-/g, " ").split("/");
  pathList.shift();

  const reconstructorPath = (path: string) => {
    const indexCurrentPath = pathList.indexOf(path);

    const reconstructedPath = pathList.reduce((acc, item) => {
      if (pathList.indexOf(item) > indexCurrentPath) return acc;
      if (item.includes(" ")) item = item.replace(/ +/g, "-");

      const path = `${acc}/${item}`;
      return path;
    }, "");

    return reconstructedPath;
  };

  return (
    <Box>
      {!isAdmin
        ? pathList.map((item, i) => (
            <>
              <Link href={`${reconstructorPath(item)}`} key={item + i}>
                <LinkStyled>{item.toUpperCase()}</LinkStyled>
              </Link>
              {i !== pathList.length - 1 && (
                <span>
                  &nbsp;
                  <FaChevronRight />
                  &nbsp;
                </span>
              )}
            </>
          ))
        : pathList.map((item, i) => (
            <>
              {isAdmin && i > 1 && (
                <span>
                  <Link href={`${reconstructorPath(item)}`} key={item + i}>
                    <LinkStyled isAdmin={isAdmin}>
                      {item.toUpperCase()}
                    </LinkStyled>
                  </Link>
                  {i !== pathList.length - 1 && (
                    <span>&nbsp; {" / "} &nbsp;</span>
                  )}
                </span>
              )}
            </>
          ))}
    </Box>
  );
};
