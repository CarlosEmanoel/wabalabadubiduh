import Router from "@koa/router";

/* API'S e Telas */
import * as alternativa from "./api/alternativa.js";
import * as contato from "./api/contato.js";
import * as curso from "./api/curso.js";
import * as deploy from "./api/deploy.js";
import * as inscricao from "./api/inscricao.js";
import * as questao from "./api/questao.js";
import * as simulado from "./api/simulado.js";
import * as usuario from "./api/usuario.js";
import * as acessosimulado from "./api/acessosimulado.js";
import * as professores from "./api/professores.js";
import * as upload from "./api/upload.js";

/* Middlewares */
import verifyToken from "./middlewares/verifyToken.js";
import createUploadDirectories from "./middlewares/createUploadDirectories.js";
import uploadMiddleware from "./middlewares/uploadMiddleware.js";
import fileFinderMiddleware from './middlewares/fileFinderMiddleware.js';
import parseCoursesMiddleware from "./middlewares/parseCoursesMiddleware.js";
import sendMailMiddleware from "./middlewares/sendMailMiddleware.js";

/* Inicializações */
createUploadDirectories();
export const router = new Router();

/* Rotas */
router.get("/teste", (ctx) => {
  ctx.status = 200;
});

router.get("/usuarios", verifyToken, usuario.listar);
router.post("/usuario", usuario.create);
router.patch("/usuario/:id", verifyToken, usuario.editar);
router.delete("/usuario/:id", verifyToken, usuario.deletar);
router.get("/usuario/:id", verifyToken, usuario.buscar);

router.post("/forgot-password", usuario.requestRenewToken);
router.post("/reset-password", usuario.renewPassword);
router.post("/verify-token", usuario.verifyToken);

router.get("/acessosimulado/:id", verifyToken, acessosimulado.getTipoAcesso);
router.patch("/acessosimulado/:id", verifyToken, acessosimulado.setTipoAcesso);

router.post("/login", usuario.login);

router.post("/contato", contato.create);
router.get("/contatos", verifyToken, contato.listar);
router.get("/contato/:id", verifyToken, contato.buscar);
router.delete("/contato/:id", verifyToken, contato.deletar);

router.post("/inscricao", inscricao.criar);
router.get("/inscricoes", verifyToken, inscricao.listar);
router.get("/inscricao/:id", verifyToken, inscricao.buscar);
router.delete("/inscricao/:id", verifyToken, inscricao.deletar);

router.get("/questoes", verifyToken, questao.listar);
router.get("/questao/:id", verifyToken, questao.buscar);
router.post("/questao", verifyToken, questao.create);
router.patch("/questao", verifyToken, questao.editar);
router.delete("/questao/:id", verifyToken, questao.deletar);

router.get("/alternativas", alternativa.listar);
router.post("/alternativa", alternativa.create);
router.patch("/alternativa", alternativa.editar);
router.delete("/alternativa/:id", alternativa.deletar);

router.post("/curso", curso.criar);
router.get("/cursos", verifyToken, curso.listar);
router.get("/curso/:id", verifyToken, curso.buscar);
router.patch("/curso/:id", verifyToken, curso.editar);
router.delete("/curso/:id", verifyToken, curso.deletar);

router.get("/parse-cursos", parseCoursesMiddleware);

router.post("/simulado", simulado.create);
router.get("/simulados", verifyToken, simulado.listar);
router.get("/simulado/:id", verifyToken, simulado.buscar);
router.delete("/simulado/:id", verifyToken, simulado.deletar);

router.post("/professor", verifyToken, professores.criar);
router.get("/professores", verifyToken, professores.listar);
router.get("/professor/:id", verifyToken, professores.buscar);
router.patch("/professor/:id", verifyToken, professores.editar);
router.delete("/professor/:id", verifyToken, professores.deletar);

router.post("/upload", verifyToken, uploadMiddleware.single("file"), upload.uploadFile);
router.get("/uploads/:id", verifyToken, upload.getFile);
router.get("/upload/list", verifyToken, upload.listFiles);
router.delete("/upload/:id", verifyToken, upload.deleteFile);

router.get("/files/:filename", fileFinderMiddleware);

router.post("/deploy", verifyToken, deploy.deploy);

router.post('/send-email', sendMailMiddleware);