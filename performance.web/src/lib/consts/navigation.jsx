import {
    HiBookOpen,
    HiOutlineCog,
    HiOutlineQuestionMarkCircle,
    HiOutlineViewGrid,
  } from "react-icons/hi";
  
  import { BiUser } from "react-icons/bi";
  import { BsFillEnvelopeAtFill, BsJournalCheck } from "react-icons/bs";
  import { FaArrowAltCircleUp, FaList, FaUpload } from "react-icons/fa";
  import { GiTeacher } from "react-icons/gi";
  import { FiUserCheck } from "react-icons/fi";
  import util from "../../services/util";
  
  export const DASHBOARD_PAINEL_SIDEBAR_LINKS = [
    {
      key: "dashboard",
      label: "Dashboard",
      path: util.getEnv() + "/painel",
      icon: <HiOutlineViewGrid />,
    },
    {
      key: "usuarios",
      label: "Usuários",
      path: util.getEnv() + "/painel/listausuario",
      icon: <BiUser />,
    },
    {
      key: "questao",
      label: "Questões",
      path: util.getEnv() + "/painel/questoes/1",
      icon: <HiBookOpen />,
    },
    {
      key: "simulado",
      label: "Simulado",
      path: util.getEnv() + "/painel/painelsimulado",
      icon: <FaList />,
    },
    {
      key: "contato",
      label: "Contatos",
      path: util.getEnv() + "/painel/contatos",
      icon: <BsFillEnvelopeAtFill />,
    },
    {
      key: "inscrição",
      label: "Inscrições",
      path: util.getEnv() + "/painel/listainscricoes",
      icon: <FiUserCheck />,
    },
    {
      key: "upload",
      label: "Gerenciar Arquivos",
      path: "/painel/upload",
      icon: <FaUpload />
    },
    {
      key: "professores",
      label: "Professores",
      path: util.getEnv() + "/painel/professores",
      icon: <GiTeacher />,
    },
    {
      key: "cursos",
      label: "Cursos",
      path: util.getEnv() + "/painel/listacursos",
      icon: <BsJournalCheck />,
    },
    {
      key: "deploy",
      label: "Deploy",
      path: "/painel/deploy",
      icon: <FaArrowAltCircleUp />
    },
  ];
  
  export const DASHBOARD_USER_SIDEBAR_LINKS = [
    {
      key: "simuladodiretor",
      label: "Dirigentes e Conselheiros",
      path: util.getEnv() + "/user/simuladodiretor",
      icon: <FaList />,
      niveisPermitidos: [1, 3]
    },
  
    {
      key: "simuladoinvestimentos",
      label: "Investimentos",
      path: util.getEnv() + "/user/simuladoinvestimentos",
      icon: <FaList />,
      niveisPermitidos: [2, 3]
    },
  ];
  
  export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
      key: "settings",
      label: "Configurações",
      path: util.getEnv() + "/settings",
      icon: <HiOutlineCog />,
    },
    {
      key: "support",
      label: "Ajuda & Suporte",
      path: util.getEnv() + "/support",
      icon: <HiOutlineQuestionMarkCircle />,
    },
  ];
  