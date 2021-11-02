const gradienteSepia = {
    "background": "linear-gradient(180deg, #f2cc8f 0%, #FAF3D5 100%);",
    "boxshadow": "0px 5px 10px rgba(232, 202, 64, 0.8);",
    "border": "1px solid #f2cc8f;"
  }

export default {
    title: "sepia",

    colors:{
        primaria: gradienteSepia.background,
        secundaria: "#E8CA40",
        terciaria: "#F0DC82",
        quartiaria: "#1f2421",
        
        branca: "#7A290E",
        borda: gradienteSepia.border,
        sombra: gradienteSepia.boxshadow,

        sucesso: "#7ddf64",
        informacao: "#ffd819",
        aviso: "#e35053"

        /*
         #f2cc8f
         #F0DC82 
         */
    }
};

