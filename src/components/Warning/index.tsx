import { useState } from "react";
import { Container } from "./styles";
import { RiCloseFill } from "react-icons/ri";

// "Important" apenas muda a cor do aviso para vermelho;
interface IWarningProps {
  message: string;
  important: boolean;
}

export const Warning = ({ message, important }: IWarningProps) => {
  const [showWarning, setShowWarning] = useState(true);

  const handleClose = () => {
    setShowWarning(false);
  };

  return (
    <>
      {showWarning ? (
        <Container bg={important}>
          <button onClick={() => handleClose()}>
            <RiCloseFill size={30} color="white" />
          </button>
          <div>
            <h2>AVISO</h2>
          </div>
          <p>{message}</p>
        </Container>
      ) : null}
    </>
  );
};
