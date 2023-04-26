import Link from "next/link";
import { ROTAS } from "@/constants/rotas";
import { FiLogIn } from "react-icons/fi";

import { LinkButton } from "./styles";

export function SignInButton() {
  // TODO: criar um hook para o signIn e signOut que verifica se o usuário está logado ou não.
  // const [session] = useSession();
  return (
    <LinkButton>
      <Link href={ROTAS.LOGIN}>
        <FiLogIn />
      </Link>
    </LinkButton>
  );
}
