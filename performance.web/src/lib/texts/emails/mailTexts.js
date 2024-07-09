import util from "../../../services/util"
import { mailTemplate } from './mailTemplate'
const fullDateTime = util.getFullDateTime()

/* INSCRIÇÃO - CLIENTE */
export const subClientText = (subscribe) => mailTemplate({
    title: "Obrigado pela inscrição",
    saudation: `Prezado(a) senhor(a), ${subscribe.nome}`,
    content: `Espero que este e-mail o(a) encontre bem.
    Gostaríamos de confirmar que recebemos a sua inscrição para o curso: "${subscribe?.curso?.courseTitle}", oferecido pela Performance.
    Estamos muito satisfeitos com o seu interesse em aprimorar suas habilidades e conhecimentos através da nossa empresa.

    Abaixo estão alguns detalhes importantes sobre o curso:
    Data Inicial: ${subscribe.curso ? util.getDateView(subscribe?.curso?.courseStart?.toString()) : ''}
    Data Final: ${subscribe.curso ? util.getDateView(subscribe?.curso?.courseEnd?.toString()) : ''}
    Duração: ${subscribe.curso ? util.calculateDaysBetweenDates(subscribe?.curso?.courseStart, subscribe?.curso?.courseEnd) : ''}
    Endereço: ${subscribe?.curso?.courseAddress}
    Cidade: ${subscribe?.curso?.courseCity}/${subscribe?.curso?.courseUf}

    Estamos à disposição para responder a quaisquer perguntas ou fornecer informações adicionais que você possa precisar. Aguardamos ansiosamente a sua participação e esperamos que este curso seja uma experiência enriquecedora para o seu desenvolvimento profissional.

    Já nos segue nas redes sociais?
    Se não, clique em alguns dos links abaixo e acompanhe nossas novidades!`,

    signature: "Atenciosamente,<br>Equipe Performance",
})

/* INSCRIÇÃO - PERFORMANCE */
export const subPerfText = (subscribe) => mailTemplate({
    title: "Contato do Usuário",
    saudation: `Atenção, setor administrativo!`,
    content: `Prezados Administradores,

    Gostaríamos de informá-los que um usuário se inscreveu no curso: "${subscribe?.curso?.courseTitle}".
    Abaixo estão os detalhes da inscrição efetuada:

    Nome: ${subscribe.nome}
    Documento: ${subscribe.cpf || subscribe.cnpj}
    Data de Início e Fim: ${subscribe.curso ? util.getDateView(subscribe?.curso?.courseStart?.toString()) : ''} - ${subscribe.curso ? util.getDateView(subscribe?.curso?.courseEnd?.toString()) : ''}
    Endereço: ${subscribe?.curso?.courseAddress}
    Cidade: ${subscribe?.curso?.courseCity}/${subscribe?.curso?.courseUf}
    Data e hora: ${fullDateTime}

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
        * (62) 99942-8364
        * (62) 99832-6112
    Ou por nosso e-mail: atendimento@performance.goiania.br 

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

    Usuário: ${contato.nome}
    Email: ${contato.email}
    Data e hora: ${fullDateTime}
    Conteúdo da Mensagem:
    ${contato.mensagem}

    Revisem os dados e tomem as ações necessárias.`,
    signature: "Obrigado!!",
})

/* REDEFINIÇÃO DE SENHA - TOKEN */
export const passTokenText = (token) => mailTemplate({
    title: "Contato do Usuário!",
    saudation: `Olá!`,
    content: `Assunto: Redefinição de Senha - Performance

    Prezado(a),

    Recebemos uma solicitação para redefinir a senha associada à sua conta na Performance.
    Para garantir a segurança de sua conta, por favor, utilize o token abaixo para definir uma nova senha.

    TOKEN: ${token}

    Este link é válido por 24 horas a partir do momento do envio desta mensagem. Caso o link expire, será necessário solicitar um novo.

    Se você não solicitou a redefinição de senha, por favor, ignore este e-mail. Sua senha atual permanecerá inalterada e sua conta continuará segura.

    Para sua segurança, recomendamos que escolha uma senha forte, que combine letras maiúsculas, minúsculas, números e caracteres especiais.

    Caso tenha qualquer dúvida ou necessite de assistência adicional, não hesite em nos contatar através do e-mail [Endereço de E-mail] ou pelo telefone [Número de Telefone].`,
    signature: "Atenciosamente,<br>Equipe Performance",
})