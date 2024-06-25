// Layouts
import { Blank, Painel, Site } from "../layout";

// Pages
import {
  Advanced,
  Basic,
  Comprev,
  Contact,
  Courses,
  FirstGalery,
  Home,
  Events,
  InPerson,
  Intermediary,
  NotFound,
  Practice,
  Preparatory,
  Question,
  SecondGalery,
  ServerError,
  Success,
  Unauthorized,
} from "../pages";

// Blank
import { Login, SignUp } from "../pages";

// Painel
import PainelDashboard from "../painel/pages/Dashboard";
import Deploy from "../painel/pages/Deploy";
import ListaContato from "../painel/pages/ListaContato";

import ListCourses from "../painel/pages/cursos/ListCourses";
import CourseForm from "../painel/pages/cursos/CourseForm";

import ListSubscribes from "../painel/pages/inscricoes/ListSubscribes";
import ListaQuestao from "../painel/pages/ListaQuestao";
import ListaUsuario from "../painel/pages/ListaUsuario";
import PainelContato_msg from "../painel/pages/PainelContato_msg";
import ShowSubscribe from "../painel/pages/inscricoes/ShowSubscribe";
import PainelQuestionario from "../painel/pages/PainelQuestionario";
import PainelSimulado from "../painel/pages/PainelSimulado";
import PainelUsuario from "../painel/pages/PainelUsuario";

import Usuarios from "../painel/pages/Usuario";

import { renderRoutes } from "./generate-routes";

import UserDashboard from "../painel/pages/UserDashboard";
import UserListaSimulado from "../painel/pages/UserListaSimulado";

import Subscribe from "../components/Forms/Subscribe/Subscribe";
import NewCursos from "../painel/pages/NewCursos";
import UserNovoSimulado from "../painel/pages/UserNovoSimulado";
import util from "../services/util";
import SimuladoDiretor from "../painel/pages/SimuladoDiretor";
import SimuladoInvestimentos from "../painel/pages/SimuladoInvestimentos";

//uploads:
import FileManagementScreen from "../painel/pages/uploads/FileManagementScreen";
//professores:
import TeacherManagementScreen from "../painel/pages/professores/TeacherManagementScreen";

export const routes = [
  {
    layout: Blank,
    routes: [
      {
        name: "login",
        title: "Entrar",
        component: Login,
        path: util.getEnv() + "/login",
        isPublic: true,
      },
      {
        name: "login",
        title: "Entrar",
        component: Login,
        path: util.getEnv() + "/login/:painel",
        isPublic: true,
      },
      {
        name: "signup",
        title: "Cadastrar",
        component: SignUp,
        path: util.getEnv() + "/signup",
        isPublic: true,
      },
    ],
  },
  {
    layout: Site,
    routes: [
      {
        name: "home",
        title: "Página Inicial",
        component: Home,
        path: util.getEnv() + "/",
        isPublic: true,
      },
      {
        name: "events",
        title: "Nossos Eventos",
        component: Events,
        path: util.getEnv() + "/eventos",
        isPublic: true,
      },
      {
        name: "courses",
        title: "Cursos",
        component: Courses,
        path: util.getEnv() + "/cursos",
        isPublic: true,
      },
      {
        name: "inperson",
        title: "Presencial",
        component: InPerson,
        path: util.getEnv() + "/cursos/presencial",
        isPublic: true,
      },
      {
        name: "basic",
        title: "Básico",
        component: Basic,
        path: util.getEnv() + "/cursos/basico",
        isPublic: true,
      },
      {
        name: "intermediary",
        title: "Intermediário",
        component: Intermediary,
        path: util.getEnv() + "/cursos/intermediario",
        isPublic: true,
      },
      {
        name: "advanced",
        title: "Avançado",
        component: Advanced,
        path: util.getEnv() + "/cursos/avancado",
        isPublic: true,
      },
      {
        name: "comprev",
        title: "Comprev",
        component: Comprev,
        path: util.getEnv() + "/cursos/comprev",
        isPublic: true,
      },
      {
        name: "preparatory",
        title: "Preparatório",
        component: Preparatory,
        path: util.getEnv() + "/cursos/preparatorio",
        isPublic: true,
      },
      {
        name: "contact",
        title: "Contato",
        component: Contact,
        path: util.getEnv() + "/contato",
        isPublic: true,
      },
      {
        name: "firstgalery",
        title: "Primeira Galeria",
        component: FirstGalery,
        path: util.getEnv() + "/galeria",
        isPublic: true,
      },
      {
        name: "secondgalery",
        title: "Segunda Galeria",
        component: SecondGalery,
        path: util.getEnv() + "/galeria2",
        isPublic: true,
      },
      {
        name: "subscribe",
        title: "Inscrição",
        component: Subscribe,
        path: util.getEnv() + "/inscricao",
        isPublic: true,
      },
      {
        name: "question",
        title: "Questão",
        component: Question,
        path: util.getEnv() + "/questao",
        isPublic: true,
      },
      {
        name: "practice",
        title: "Simulado",
        component: Practice,
        path: util.getEnv() + "/simulado",
        isPublic: true,
      },
      {
        name: "success",
        title: "Cadastro Efetuado",
        component: Success,
        path: util.getEnv() + "/cadastro-efetuado",
        isPublic: true,
      },
      {
        name: "unauthorized",
        title: "Acesso Negado",
        component: Unauthorized,
        path: util.getEnv() + "/acesso-negado",
        isPublic: true,
      },
      {
        name: "notfound",
        title: "Não Encontrado",
        component: NotFound,
        path: util.getEnv() + "/nao-encontrado",
        isPublic: true,
      },
      {
        name: "servererror",
        title: "Erro no Servidor",
        component: ServerError,
        path: util.getEnv() + "/erro-servidor",
        isPublic: true,
      },
    ],
  },
  {
    layout: Painel,
    routes: [
      // Painel adm
      {
        name: "Editar Usuário",
        title: "Editar Usuário",
        component: Usuarios,
        path: "/painel/editar-usuario/:id",
        allowedUserType: "p",
      },
      {
        name: "dashboard",
        title: "Dashboard",
        component: PainelDashboard,
        path: "/painel",
        allowedUserType: "p",
      },
      {
        name: "listausuario",
        title: "ListaUsuario",
        component: ListaUsuario,
        path: "/painel/listausuario",
        allowedUserType: "p",
      },
      {
        name: "painelusuario",
        title: "PainelUsuario",
        component: PainelUsuario,
        path: "/painel/painelusuario",
        allowedUserType: "p",
      },
      {
        name: "painelusuario",
        title: "PainelUsuario",
        component: PainelUsuario,
        path: "/painel/painelusuario/:id",
        allowedUserType: "p",
      },
      {
        name: "listacontato",
        title: "Listacontato",
        component: ListaContato,
        path: "/painel/contatos",
        allowedUserType: "p",
      },
      {
        name: "painelcontato_msg",
        title: "painelContato_msg",
        component: PainelContato_msg,
        path: "/painel/contato/:id",
        allowedUserType: "p",
      },
      {
        name: "listsubscribes",
        title: "ListSubscribes",
        component: ListSubscribes,
        path: "/painel/listainscricoes",
        allowedUserType: "p",
      },
      {
        name: "showsubscribe",
        title: "ShowSubscribe",
        component: ShowSubscribe,
        path: "/painel/inscricao/:id",
        allowedUserType: "p",
      },
      {
        name: "painelquestionario",
        title: "PainelQuestionario",
        component: PainelQuestionario,
        path: "/painel/painelquestionario",
        allowedUserType: "p",
      },
      {
        name: "painelquestionario",
        title: "PainelQuestionario",
        component: PainelQuestionario,
        path: "/painel/painelquestionario/:id/:page",
        allowedUserType: "p",
      },
      {
        name: "painelsimulado",
        title: "PainelSimulado",
        component: PainelSimulado,
        path: "/painel/painelsimulado",
        allowedUserType: "p",
      },
      {
        name: "listcourses",
        title: "ListCourses",
        component: ListCourses,
        path: "/painel/listacursos",
        allowedUserType: "p",
      },
      {
        name: "course",
        title: "Course",
        component: CourseForm,
        path: "/painel/cursoform",
        allowedUserType: "p",
      },
      {
        name: "course",
        title: "Course",
        component: CourseForm,
        path: "/painel/cursoform/:id",
        allowedUserType: "p",
      },
      {
        name: "newcursos",
        title: "NewCursos",
        component: NewCursos,
        path: "/painel/newcursos",
        allowedUserType: "p",
      },
      {
        name: "questao",
        title: "Lista Questões",
        component: ListaQuestao,
        path: "/painel/questoes",
        allowedUserType: "p",
      },
      {
        name: "questao",
        title: "Lista Questões",
        component: ListaQuestao,
        path: "/painel/questoes/:page",
        allowedUserType: "p",
      },
      {
        name: "deploy",
        title: "Deploy",
        component: Deploy,
        path: "/painel/deploy",
        allowedUserType: "p",
      },
      // Painel User
      {
        name: "dashboarddUser",
        title: "Dashboard User",
        component: UserDashboard,
        path: util.getEnv() + "/user",
        allowedUserType: "u",
      },
      {
        name: "simuladodiretor",
        title: "Simulado Dirigentes e Conselheiros",
        component: SimuladoDiretor,
        path: util.getEnv() + "/user/simuladodiretor",
        allowedUserType: "u",
      },
      {
        name: "simuladoinvestimentos",
        title: "Simulado Investimentos",
        component: SimuladoInvestimentos,
        path: util.getEnv() + "/user/simuladoinvestimentos",
        allowedUserType: "u",
      },
      {
        name: "usersimulado2",
        title: "UserSimulado2",
        component: UserListaSimulado,
        path: util.getEnv() + "/user/userlistasimulado",
        allowedUserType: "u",
      },
      {
        name: "usernovosimulado",
        title: "UserNovoSimulado",
        component: UserNovoSimulado,
        path: util.getEnv() + "/user/usernovosimulado",
        allowedUserType: "u",
      },
      //uploads:
      {
        name: "upload",
        title: "Upload",
        component: FileManagementScreen,
        path: util.getEnv() + "/painel/upload",
        isPublic: true,
      },
      //professores:
      {
        name: "professores",
        title: "Professores",
        component: TeacherManagementScreen,
        path: util.getEnv() + "/painel/professores",
        isPublic: true,
      },
    ],
  },
  /*
    {
        layout: MainLayout,
        routes: [
            {
                name: 'home',
                title: 'Home page',
                component: Home,
                path: '/'
            },
            {
                name: 'users',
                title: 'Users',
                hasSiderLink: true,
                routes: [
                    {
                        name: 'list-users',
                        title: 'List of users',
                        hasSiderLink: true,
                        component: ListUsers,
                        path: '/users'
                    },
                    {
                        name: 'create-users',
                        title: 'Add user',
                        hasSiderLink: true,
                        component: CreateUser,
                        path: '/user/new'
                    },
                ]
            }
        ]
    }*/
];

export const Routes = renderRoutes(routes);
