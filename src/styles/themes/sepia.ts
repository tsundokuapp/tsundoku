const gradienteSepia = {
    "background": "#f3e8da",
    "boxshadow": "0px 5px 10px rgba(99,67,67, 0.3);",
    "border": "1px solid #f2cc8f;"
  }

export default {
    title: "sepia",

    colors:{
        primaria: gradienteSepia.background,
        secundaria: "#E8CA40",
        terciaria: "#e5d4c3",
        quartiaria: "#1f2421",
        
        branca: "#634343",//"#7A290E",
        borda: gradienteSepia.border,
        sombra: gradienteSepia.boxshadow,

        sucesso: "#7ddf64",
        informacao: "#ffd819",
        aviso: "#e35053"

        /*
         #f2cc8f
         #F0DC82 
         "linear-gradient(180deg, #f2cc8f 0%, #FAF3D5 100%);",
         */
    }
};

