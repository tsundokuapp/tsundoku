import React, { useState } from "react";
import LayoutDashBoard from 'components/LayoutDashBoard';
import { Formik, Form, Field } from "formik";
import Container, {ContainerForm, SecaoInputs, SecaoCapaObra, ImagemCapaObraPrincipal, SecaoBotoesSubmit, } from "../novaobra/styles";
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditorTsun from "components/EditorTsun/index";
import Blob from 'cross-blob';

interface Values {
  capaVolumeObra: File | any;
  numeroVolume: number;
  sinopse: string;
}

const EditarVolume: React.FC = () => {
  
  const initialValues: Values = {
    capaVolumeObra: 'https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MJ_V7_Capa.png',
    numeroVolume: 8,
    sinopse: "<p>Aqui é uma sinopse!!</p>",
  };

  const valorInicialImagem = new Blob();

  const [valorConteudoEditor, setValorConteudoEditor] = useState(initialValues.sinopse);
  const [imagemCapa, setImagemCapa] = useState(valorInicialImagem);
  const [enderecoImagemCapa] = useState(initialValues.capaVolumeObra);  

    const handleImagemCapa = (event: any) => {
        setImagemCapa(event.target.files[0]);
    }   

    const handleSubmit = (values: Values) => {        
        console.log(values);        
      };

      const excluirObra = () => {
        alert("Volume excluído")
      }

  return (
    <LayoutDashBoard>
      <Container>
        <SecaoHeadBar>
          <NavPaginas>
            <AddBoxIcon />
            <h3>Editar Volume</h3>
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
                <EditorTsun larguraEditor='90%' tamanhoEditor='200px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

                <SecaoBotoesSubmit>
                    <button className="botao-submit secundaria" type="submit">Alterar</button>                
                    <button className="botao-submit aviso" type="button" onClick={excluirObra}>Excluir</button>
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

export default EditarVolume;
