const gradienteDark = {
    "background": "linear-gradient(180deg, #23272A 0%, #3D4F68 100%);",
    "boxshadow": "0px 5px 10px rgba(0, 0, 0, 0.5);",
    "border": "1px solid #23272a;"
}

export default {
    title: "dark",

    colors:{
        primaria: gradienteDark.background,
        secundaria: "#259CC1",
        
        branca: "#FFF",
        borda: gradienteDark.border,
        sombra: gradienteDark.boxshadow,  

        sucesso: "#7ddf64",
        informacao: "#ffd819",
        aviso: "#e35053"
    }
};