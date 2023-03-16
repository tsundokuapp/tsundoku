import styled from "styled-components";

interface IContainer {
  imagemFundo: string;
}

const Container = styled.div<IContainer>`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background: url(${(props) => props.imagemFundo}) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

export const InputLogin = styled.input.attrs(() => ({ type: "text" }))`
  height: 50px;
  width: 250px;
  margin-bottom: 15px;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 100%;
`;

export const InputSenha = styled.input.attrs(() => ({
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

export const InputSubmit = styled.input.attrs(() => ({ type: "submit" }))`
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

export default Container;