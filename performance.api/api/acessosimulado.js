import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const getTipoAcesso = async (ctx) => {
    let params = ctx.params;
    try {
        const acessos = await client.acessoSimulado.findMany({
            where: {
                usuarioId: params.id,
            },
            select: {
                tipo: true,
                nivelsimulado: true
            }
        });

        if (acessos.length > 0) {
            ctx.body = {
                success: true,
                data: acessos, // Envia todos os acessos
            };
        } else {
            // Quando não houver acessos, retorne 0 como um tipo dentro de um objeto para manter a consistência
            ctx.body = {
                success: true,
                data: [{ tipo: 0, nivelsimulado: 0 }],
            };
        }
        ctx.status = 200;
    } catch (error) {
        ctx.body = {
            success: false,
            message: error.message,
        };
        ctx.status = 500;
    }
};

export const setTipoAcesso = async (ctx) => {
    let { id } = ctx.params;
    let { tipo, nivelsimulado } = ctx.request.body;

    console.log('tipo: ', tipo, 'nivel: ', nivelsimulado)
    
    tipo = parseInt(tipo, 10);
    nivelsimulado = parseInt(nivelsimulado, 10);

    try {
        const acessoExistente = await client.acessoSimulado.findFirst({
            where: {
                usuarioId: id,
            },
        });

        let acesso;
        if (acessoExistente) {
            // Atualiza o acesso existente
            acesso = await client.acessoSimulado.update({
                where: {
                    id: acessoExistente.id, // Corrigido para usar o id do acessoExistente
                },
                data: {
                    tipo, nivelsimulado
                },
            });
        } else {
            // Cria um novo acesso se não existir
            acesso = await client.acessoSimulado.create({
                data: {
                    usuarioId: id,
                    tipo, nivelsimulado
                },
            });
        }

        ctx.body = {
            success: true,
            data: acesso,
        };
        ctx.status = 200;
    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        ctx.body = {
            success: false,
            message: "Erro interno do servidor",
        };
        ctx.status = 500;
    }
};