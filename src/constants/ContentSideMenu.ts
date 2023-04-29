import { ROTAS } from "@/constants/rotas";
import { RiLayoutMasonryFill, RiFileMarkFill} from "react-icons/ri";
import { MdOutlineMenuBook, MdLibraryBooks, MdLabel, MdCategory, MdInsertChart } from "react-icons/md";
import { FaRss } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import { RxExit } from "react-icons/rx";

export const contentSideMenu= [
    {
        key: 1,
        contentTitle: "Principal",
        setFooter: false,
        listContent: [
            { key: 1, label: "Dashboard", href: ROTAS.DASHBOARD, icon: RiLayoutMasonryFill},
            { key: 2, label: "Obras", href: ROTAS.OBRAS, icon: RiFileMarkFill},
            { key: 3, label: "Volumes", href: ROTAS.VOLUMES, icon: MdOutlineMenuBook},
            { key: 4, label: "Capitulos", href:ROTAS.CAPITULOS, icon: MdLibraryBooks},
            { key: 5, label: "Gêneros", href: ROTAS.GENEROS, icon: MdLabel},
        ]
    },
    {
        key: 2,
        contentTitle: "Blog",
        setFooter: false, 
        listContent: [
            { key: 1, label: "Posts", href: ROTAS.POSTS, icon: FaRss},
            { key: 2, label: "Categorias", href: ROTAS.CATEGORIAS, icon: MdCategory},
        ]
    },
    {
        key: 3,
        contentTitle: "Admin",
        setFooter: false,
        listContent: [
            { key: 1, label: "Usuários", href: ROTAS.USUARIOS, icon: HiUsers},
            { key: 2, label: "Estatísticas", href: ROTAS.ESTATISTICAS, icon: MdInsertChart},
        ]
    },
    {
        key: 4,
        contentTitle: "",
        setFooter: true, 
        listContent: [
            { key: 1, label: "Site", href: "/", icon: BiWorld},
            { key: 2, label: "Sair", href: "#", icon: RxExit},
        ]
    }
]