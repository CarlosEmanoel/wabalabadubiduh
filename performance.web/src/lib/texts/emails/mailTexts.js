import util from "../../../services/util"
import { mailTemplate } from './mailTemplate'
const fullDateTime = util.getFullDateTime()

/* INSCRIÇÃO - CLIENTE */
export const subClientText = (subscribe) => mailTemplate({
    title: "Obrigado pela inscrição",
    saudation: `Prezado(a) senhor(a), ${subscribe.nome}`,
    content: `Espero que este e-mail o(a) encontre bem.
    Gostaríamos de confirmar que recebemos a sua inscrição para o curso: "<strong>${subscribe?.curso?.courseTitle}</strong>", oferecido pela Performance.
    Estamos muito satisfeitos com o seu interesse em aprimorar suas habilidades e conhecimentos através da nossa empresa.

    Abaixo estão alguns detalhes importantes sobre o curso:
    Data Inicial: <strong>${subscribe.curso ? util.getDateView(subscribe?.curso?.courseStart?.toString()) : ''}</strong>
    Data Final: <strong>${subscribe.curso ? util.getDateView(subscribe?.curso?.courseEnd?.toString()) : ''}</strong>
    Duração: <strong>${subscribe.curso ? util.calculateDaysBetweenDates(subscribe?.curso?.courseStart, subscribe?.curso?.courseEnd) : ''}</strong>
    Endereço: <strong>${subscribe?.curso?.courseAddress}</strong>
    Cidade: <strong>${subscribe?.curso?.courseCity}/${subscribe?.curso?.courseUf}</strong>

    Estamos à disposição para responder a quaisquer perguntas ou fornecer informações adicionais que você possa precisar.
    Aguardamos ansiosamente a sua participação e esperamos que este curso seja uma experiência enriquecedora para o seu desenvolvimento profissional.

    Já nos segue nas redes sociais?
    Se não, clique em alguns dos links abaixo e acompanhe nossas novidades!`,

    signature: "Atenciosamente,<br>Equipe Performance",
})

/* INSCRIÇÃO - PERFORMANCE */
export const subPerfText = (subscribe) => mailTemplate({
    title: "Contato do Usuário",
    saudation: `Atenção, setor administrativo!`,
    content: `Prezados Administradores,

    Gostaríamos de informá-los que um usuário se inscreveu no curso: "<strong>${subscribe?.curso?.courseTitle}</strong>".
    Abaixo estão os detalhes da inscrição efetuada:

    Nome: <strong>${subscribe.nome}</strong>
    Documento: <strong>${subscribe.cpf || subscribe.cnpj}</strong>
    Data de Início e Fim: <strong>${subscribe.curso ? util.getDateView(subscribe?.curso?.courseStart?.toString()) : ''} - ${subscribe.curso ? util.getDateView(subscribe?.curso?.courseEnd?.toString()) : ''}</strong>
    Endereço: <strong>${subscribe?.curso?.courseAddress}</strong>
    Cidade: <strong>${subscribe?.curso?.courseCity}/${subscribe?.curso?.courseUf}</strong>
    Data e Hora da Inscrição: <strong>${fullDateTime}</strong>

    Revisem os dados e tomem as ações necessárias.`,
    signature: "Obrigado!!",
})

/* CONTATO - CLIENTE */
export const contClientText = (contato) => mailTemplate({
    title: "Status do Contato",
    saudation: `Prezado(a) senhor(a), ${contato.nome}`,
    content: `Agradecemos por entrar em contato com a Performance. Seu interesse em nossos cursos é muito importante para nós.

    Recebemos sua mensagem e nossa equipe está analisando suas necessidades com atenção.
    Em breve, um de nossos consultores especializados entrará em contato para fornecer todas as informações necessárias e esclarecer
    quaisquer dúvidas que você possa ter.

    Enquanto isso, convidamos você a explorar nosso site para conhecer mais sobre nossos cursos e serviços.
    Se preferir, pode nos contatar diretamente pelo telefones:
        * <strong>(62) 99942-8364</strong>
        * <strong>(62) 99832-6112</strong>
    Ou por nosso e-mail: <strong>atendimento@performance.goiania.br</strong>

    Estamos comprometidos em oferecer a melhor experiência de aprendizado e estamos à disposição para ajudá-lo(a) a alcançar seus objetivos.

    Já nos segue nas redes sociais?
    Se não, clique em alguns dos links abaixo e acompanhe nossas novidades!!`,
    signature: "Atenciosamente,<br>Equipe Performance",
})

/* CONTATO - PERFORMANCE */
export const contPerfText = (contato) => mailTemplate({
    title: "Contato do Usuário!",
    saudation: `Atenção, setor administrativo!`,
    content: `Prezados Administradores,

    Gostaríamos de informá-los que um usuário entrou em contato pelo nosso site!
    Abaixo estão os detalhes da solicitação efetuada:

    Usuário: <strong>${contato.nome}</strong>
    Email: <strong>${contato.email}</strong>
    Data e Hora do Contato: <strong>${fullDateTime}</strong>
    Conteúdo da Mensagem:
    <strong>${contato.mensagem}</strong>

    Revisem os dados e tomem as ações necessárias.`,
    signature: "Obrigado!!",
})

/* REDEFINIÇÃO DE SENHA - TOKEN */
export const passTokenText = (token) => mailTemplate({
    title: "Redefinição de Senha - Performance!",
    saudation: `Olá!`,
    content: `Prezado(a),

    Recebemos uma solicitação para redefinir a senha associada à sua conta na Performance.
    Para garantir a segurança de sua conta, por favor, utilize o token abaixo para definir uma nova senha.

    <strong>TOKEN: ${token}</strong>

    Este token é válido por 1 hora, à partir do momento do envio desta mensagem. Caso o token expire, será necessário solicitar um novo.

    Se você não solicitou a redefinição de senha, por favor, ignore este e-mail. Sua senha atual permanecerá inalterada e sua conta continuará segura.

    Para sua segurança, recomendamos que escolha uma senha forte, que combine letras maiúsculas, minúsculas, números e caracteres especiais.

    Caso tenha qualquer dúvida ou necessite de assistência adicional, não hesite em nos contatar diretamente pelo telefones:
        * <strong>(62) 99942-8364</strong>
        * <strong>(62) 99832-6112</strong>
    Ou por nosso e-mail: <strong>atendimento@performance.goiania.br</strong>`,
    signature: "Atenciosamente,<br>Equipe Performance",
})