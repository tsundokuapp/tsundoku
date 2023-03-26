import styled from 'styled-components';

interface IContainerProps {
  imagemFundo: string;
}

// TODO: refatorar esse código
const Container = styled.div<IContainerProps>`
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

export const InputLogin = styled.input.attrs(() => ({ type: 'text' }))`
  height: 50px;
  width: 250px;
  margin-bottom: 15px;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 100%;
`;

export const InputEmail = styled.input.attrs(() => ({ type: 'email' }))`
  height: 50px;
  width: 250px;
  margin-bottom: 15px;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 100%;
`;

export const InputSenha = styled.input.attrs(() => ({
  type: 'password',
}))`
  height: 50px;
  width: 250px;
  margin-bottom: 15px;
  padding-left: 10px;
  border-radius: 7px;
  font-size: 100%;
  border-radius: 5px;
`;

export const InputSubmit = styled.input.attrs(() => ({ type: 'submit' }))`
  height: 50px;
  width: 250px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 100%;
  /* Rosa
  background-color: #ffcbf2;
  color: #ef476f;
  */

  background-color: #bc98ff;
  color: #6818a5;

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
  /* Rosa
  border: 1px solid #ffcbf2;
  */

  // Roxo
  border: 1px solid #bc98ff;

  background-color: rgba(0, 0, 0, 0);
  border-radius: 5px;

  /* Rosa
  :hover{
    background-color: #ffcbf2;
  color: #ef476f;
  }

  */

  // Roxo
  :hover {
    background-color: #bc98ff;
    color: #6818a5;
  }
`;

export default Container;
