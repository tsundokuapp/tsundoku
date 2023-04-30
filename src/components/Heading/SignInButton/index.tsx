import { ROTAS } from "@/constants/rotas";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";

import { LinkButton } from "./styles";

export function SignInButton() {
  // TODO: criar um hook para o signIn e signOut que verifica se o usuário está logado ou não.
  // const [session] = useSession();
  // TODO: Retornar a rota original: ROTAS.LOGIN
  return (
    <LinkButton>
      <Link href={ROTAS.DASHBOARD}>
        <FiLogIn />
      </Link>
    </LinkButton>
  );
}
