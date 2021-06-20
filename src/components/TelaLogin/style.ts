import styled from "styled-components";

interface IContainer {
  imagemFundo: string;
}

export const Container = styled.div<IContainer>`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.imagemFundo});
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 54px;
    color: #fff;
    margin-top: 40px;
  }

  p {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

export const ContainerLogo = styled.section`
  width: 100%;
  height: 100px; 
  padding: 15px 0 20px 20px;
  margin-bottom: 150px;
`;

export const ContainerImagemLogo = styled.img`
  width: 80px;
  height: 80px;
  margin-left: 20px;
`;

export const ContainerForm = styled.section`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  margin-left: 200px;
`;

export const InputLogin = styled.input.attrs((props) => ({ type: "text" }))`
  height: 50px;
  width: 250px;
  margin-bottom: 15px;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 100%;
`;

export const InputSenha = styled.input.attrs((props) => ({
  type: "password",
}))`
  height: 50px;
  width: 250px;
  margin-bottom: 15px;
  padding-left: 10px;
  border-radius: 7px;
  font-size: 100%;
  border-radius: 5px;
`;

export const InputSubmit = styled.input.attrs((props) => ({ type: "submit" }))`
  height: 50px;
  width: 250px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 100%;
  background-color: #259cc1;
  color: #fff;
  border-radius: 5px;

  :hover {
    opacity: 0.9;
  }
`;

export const InputBotaoPaginaInicial = styled.button`
  height: 50px;
  width: 250px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 100%;
  border: 1px solid #259cc1;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 5px;

  :hover{
    background-color: #259cc1;
  color: #fff;
  }
`;
