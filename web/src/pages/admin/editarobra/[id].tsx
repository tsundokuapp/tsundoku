import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import LayoutDashBoard from 'components/LayoutDashBoard';
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditorTsun from "components/EditorTsun/index";
import Container, {ContainerForm, SecaoInputs, SecaoCapaObra, ImagemCapaObraPrincipal, SecaoOutrasInformacoes, SecaoGeneros, SecaoBotoesSubmit, } from "../novaobra/styles";
import EditIcon from '@material-ui/icons/Edit';
import Blob from 'cross-blob';


interface Values {
  capaPrincipalObra: File | any;
  tituloObra: string;
  titulosAlternativos: string;
  autor: string;
  artista: string;
  generos: string[];
  sinopse: string;
  maiorIdade: boolean;
  tipoObra: string;
  statusObra: string;
}

const handleSubmit = (valores: Values) => {
    alert(JSON.stringify(valores));
    console.log(JSON.stringify(valores));
}

const excluirObra = () =>{
    alert("Obra Excluída");
}

const listaTipoObra = ["Selecione o tipo da obra", "Light Novel","Web Novel","Mangá","Manhua","Manhwa"];
const listaStatusObra = ["Selecione o status da obra", "Em Andamento","Completa","Pausada","Dropada"];
const listaGeneros = ["Slice  of Life", "Drama", "Comédia", "Fantasia", "Ação", "Aventura"] // Virá do banco de dados

const EditarObra: React.FC = () => {

  const initialValues: Values = {
    capaPrincipalObra: "https://i2.wp.com/tsundoku.com.br/wp-content/uploads/2022/07/MT_V16_Capa-01.jpg",
    tituloObra: "Mushoku Tensei: Reencarnação do Desempregado",
    titulosAlternativos: "Mushoku Tensei: Isekai Ittara Honki Dasu | 無職転生 | 無職転生 – 異世界行ったら本気だす | Mushoku Tensei: Jobless Reincarnation ~ It will be All Out if I Go to Another World ~",
    autor: "Rifujin na Magonote",
    artista: "Shirotaka",
    generos: ["Ação", "Aventura"],
    sinopse:"<p>Aqui é um parágrafo, pode acreditar<p><p>Mais um aqui<p><p>Oxi, mais um?!<p>",
    maiorIdade: false,    
    tipoObra: "Light Novel",
    statusObra: "Em Andamento"
  };

  const valorInicialImagem = new Blob();

  const [valorConteudoEditor, setValorConteudoEditor] = useState(initialValues.sinopse);
  const [imagemCapa, setImagemCapa] = useState(valorInicialImagem);
  const [enderecoImagemCapa] = useState(initialValues.capaPrincipalObra);  

    const handleImagemCapa = (event: any) => {
        setImagemCapa(event.target.files[0]);
    }   
  
    const handleCheckState = (opcao: string) => {
        return initialValues.generos.some(element => element === opcao);
    }

  return (
    <LayoutDashBoard>
      <Container>
        <SecaoHeadBar>
          <NavPaginas>
            <EditIcon />
            <h3>Editar Obra</h3>
          </NavPaginas>
        </SecaoHeadBar>
        <ContainerForm>
          <SecaoInputs>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form >
                
                <label htmlFor="capaPrincipalObra" >Capa Principal: </label>                
                <input className="inputIncluiCapaPrincipal" id="capaPrincipalObra" name="capaPrincipalObra" type="file" onChange={(e:any) => { setFieldValue("capaVolumeObra", e.target.files[0]); handleImagemCapa(e) }} />

                <label htmlFor="tituloObra">Título da Obra: </label>
                <Field className="InputCampoDados" id="tituloObra" name="tituloObra" type="text" />
                
                <label htmlFor="titulosAlternativos">Títulos alternativos: </label>
                <Field className="InputCampoDados" id="titulosAlternativos" name="titulosAlternativos" type="text" />
                
                <label htmlFor="autor">Autor(es): </label>
                <Field className="InputCampoDados" id="autor" name="autor" type="text" />
                
                <label htmlFor="artista">Artista(s): </label>
                <Field className="InputCampoDados" id="artista" name="artista" type="text" />
                
                <label htmlFor="generos">Gêneros: </label>
                <SecaoGeneros>

                {listaGeneros.map((opt) =>{
                        return (
                            <label key={opt}>
                                <Field className="checkBoxGeneros" type="checkbox" name="generos" value={opt}  
                                checked={handleCheckState(opt)} 
                                />
                                {opt}
                            </label>
                        )
                    })}
                    
                </SecaoGeneros>
                
                <label htmlFor="sinopse">Sinopse:</label>                
                <EditorTsun larguraEditor='100%' tamanhoEditor='200px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

                <SecaoOutrasInformacoes>
                    <label>
                        <Field className="checkBoxOutrasInformacoes" type="checkbox" name="maiorIdade" />                        
                        +18
                    </label>

                    <Field name="tipoObra" id="tipoObra">
                    {({ field }: FieldProps) => {
                     const options=listaTipoObra.map((opt)=>{return (<option key={opt} value={opt}>{opt}</option>)})
                    return (
                        <div>
                            <select className="selectTipoObras" {...field}>{options}</select>
                        </div>
                        )
                    }}
                  </Field>

                  <Field name="statusObra" id="statusObra">
                      {({ field }: FieldProps) => {
                      const options=listaStatusObra.map((opt)=>{return (<option key={opt} value={opt}>{opt}</option>)})
                      return (
                          <div>
                              <select className="selectTipoObras" {...field}>{options}</select>
                          </div>
                          )
                      }}
                  </Field>
                </SecaoOutrasInformacoes>

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

export default EditarObra;