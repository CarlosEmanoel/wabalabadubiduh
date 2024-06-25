import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const create = async (ctx) => {
    const { id = 0, letra, resposta, questaoId } = ctx.request.body

    try{
        const [alternativa] = await prisma.alternativa.findMany({
            where: { id }
        })

        const data = {
            letra,
            resposta,
            questaoId,
        }

        if (alternativa) {
            ctx.body = await prisma.alternativa.update({
                where: { id: alternativa.id },
                data
            })
        } else {
            ctx.body = await prisma.alternativa.create({
                data
            })
        }
    } catch( error) {
        ctx.boby = error
        ctx.status = 500
    }
}

export const editar = async (ctx) => {
    try{
        const alternativa = await prisma.alternativa.updateMany({
            where: {
                id: ctx.request.body.id
            },
            data
        })

        ctx.body = {
            alternativa
        }
        ctx.status = 201
    } catch( error ) {
        ctx.body = error
        ctx.status = 500
    }
}

export const deletar = async (ctx) => {
    try{
        const alternativa = await prisma.alternativa.delete({
            where: {
                id: ctx.request.body.id
            },
            data
        })

        ctx.body = {
            alternativa
        }
        ctx.status = 201
    } catch( error ) {
        ctx.body = error
        ctx.status = 500
    }
}

export const listar = async (ctx) => {
    try{
        const alternativa = await prisma.alternativa.findMany({});
        ctx.body = alternativa
        ctx.status = 200
    } catch( error ) {
        ctx.body = error
        ctx.status = 500
    }
}