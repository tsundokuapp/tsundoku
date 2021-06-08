const gradienteSepia = {
    "background": "linear-gradient(180deg, #F0DC82 0%, #FAF3D5 100%);",
    "boxshadow": "0px 5px 10px rgba(232, 202, 64, 0.8);",
    "border": "1px solid #F0DC82;"
  }

export default {
    title: "sepia",

    colors:{
        primaria: gradienteSepia.background,
        secundaria: "#E8CA40",
        
        branca: "#7A290E",
        borda: gradienteSepia.border,
        sombra: gradienteSepia.boxshadow,

        sucesso: "#7ddf64",
        informacao: "#ffd819",
        aviso: "#e35053"
    }
};