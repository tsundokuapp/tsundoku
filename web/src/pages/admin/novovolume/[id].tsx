import React, { useState } from "react";
import { useRouter } from 'next/router'
import LayoutDashBoard from 'components/LayoutDashBoard';
import { Formik, Form, Field } from "formik";
import Container, { ContainerForm, SecaoInputs, SecaoBotoesSubmit, SecaoCapaObra } from "../novaobra/styles";
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditorTsun from "components/EditorTsun/index";
import { ImagemCapaObraPrincipal } from '../novocapitulo/styles';
import Blob from 'cross-blob';

interface Values {
  capaVolumeObra: File | any;
  numeroVolume: number;
  sinopse: string;
}

import capaPrincipal from '../../../../public/assets/img/logoTemaDark.svg';

const NovoVolume: React.FC = () => {
  
    const router = useRouter()
  const { pid } = router.query

  console.log(pid);

  const initialValues: Values = {
    capaVolumeObra: null,
    numeroVolume: 0,
    sinopse: "",
  };

  const valorInicialImagem = new Blob();

  const [valorConteudoEditor, setValorConteudoEditor] = useState('');
  const [imagemCapa, setImagemCapa] = useState(valorInicialImagem);
  const [enderecoImagemCapa] = useState(capaPrincipal);  

    const handleImagemCapa = (event: any) => {
        setImagemCapa(event.target.files[0]);
    }   

    const handleSubmit = (values: Values) => {        
        console.log(values);        
      };

  return (
    <LayoutDashBoard>
      <Container>
        <SecaoHeadBar>
          <NavPaginas>
            <AddBoxIcon />
            <h3>Novo Volume</h3>
          </NavPaginas>
        </SecaoHeadBar>
        <ContainerForm>
          <SecaoInputs>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values , setFieldValue }) => (
              <Form>
                <label htmlFor="capaVolumeObra">Capa Volume: </label>
                <input className="inputIncluiCapaPrincipal" id="capaVolumeObra" name="capaVolumeObra" type="file" onChange={(e:any) => { setFieldValue("capaVolumeObra", e.target.files[0]); handleImagemCapa(e) }} />

                <label htmlFor="numeroVolume">Número Volume: </label>
                <Field
                  className="InputCampoDados InputCampoDadosNumber"
                  id="numeroVolume"
                  name="numeroVolume"
                  type="number"
                />  

                <label htmlFor="sinopse">Sinopse Volume:</label>                
                <EditorTsun larguraEditor='90%' tamanhoEditor='500px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

                <SecaoBotoesSubmit>
                  <button className="botao-submit sucesso" type="submit">
                    Adicionar
                  </button>
                </SecaoBotoesSubmit>

                <Field className="InputCampoDados inputText hidden" id="sinopse" name="sinopse" as="textarea" value={values.sinopse = valorConteudoEditor} />

              </Form>
              )}
            </Formik>
          </SecaoInputs>
          <SecaoCapaObra>
            {imagemCapa.size > 0 ? <ImagemCapaObraPrincipal src={URL.createObjectURL(imagemCapa)} alt='Capa Principal'/> : <ImagemCapaObraPrincipal src={enderecoImagemCapa} alt='Capa Principal' />}
          </SecaoCapaObra>
        </ContainerForm>
      </Container>
    </LayoutDashBoard>
  );
};

export default NovoVolume;
