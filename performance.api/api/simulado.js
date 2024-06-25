import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


export const create =async (ctx) => {
   
   const data = {
       total: ctx.request.body.total,
       pontuacao: ctx.request.body.pontuacao,
       usuarioId: ctx.request.body.usuarioId,
   }

   try{
       const simulado = await prisma.simulado.create({ data })
       
       ctx.body = {
           "success": true,
           "message": "Mensagem enviada com sucesso!",
           "data": simulado
       }
       ctx.status = 201
   } catch( error ) {       
       ctx.body = {
           "success": false,
           "message": error.message
       }
       ctx.status = 500
   }
}

export const listar = async (ctx) => {
    try{
        const simulados = await prisma.simulado.findMany({});
        
        ctx.body = {
            "success": true,
            "data": simulados
        }
       
        ctx.status = 200
    } catch( error ) {
        ctx.body = error
        ctx.status = 500
    }
}

export const buscar = async (ctx) => {
    let params = ctx.params;
    try{
        const simulado = await prisma.simulado.findUnique({
            where: {
                id: params.id
            }
        });

        ctx.body = {
            "success": true,
            "data": simulado
        }
        ctx.status = 200
    } catch( error ) {
        ctx.body = {
            "success": false,
            "message": error
        }
        ctx.status = 500
    }
}

export const deletar = async (ctx) => {
    try{
        const simulado = await prisma.simulado.delete({
            where: {
                id: ctx.params.id
            }
        })

        ctx.body = {
            "success": true,
            "message": "Mensagem excluída com sucesso!",
            "data": simulado
        }
        ctx.status = 200
    } catch( error ) {
        ctx.body = {
            "success": false,
            "message": error.message
        }
        ctx.status = 500
    }
}