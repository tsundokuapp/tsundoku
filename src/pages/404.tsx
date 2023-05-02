import Image from "next/image";
import elaina from "@/assets/404.png";

export default function Custom404() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        width: "100dvw",
      }}
    >
      <h1>404 - Não tem nada aqui!</h1>
      <Image src={elaina} alt="Elaina triste" width={640} />
    </div>
  );
}
