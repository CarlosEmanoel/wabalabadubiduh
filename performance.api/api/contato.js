import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


export const create =async (ctx) => {
   
   const data = {
       nome: ctx.request.body.nome,
       email: ctx.request.body.email,
       telefone: ctx.request.body.telefone,
       assunto: ctx.request.body.assunto,
       mensagem: ctx.request.body.mensagem, 
   }

   try{
       const contato = await prisma.contato.create({ data })
       
       ctx.body = {
           "success": true,
           "message": "Mensagem enviada com sucesso!",
           "data": contato
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
        const contatos = await prisma.contato.findMany({});
        
        ctx.body = {
            "success": true,
            "data": contatos
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
        const contato = await prisma.contato.findUnique({
            where: {
                id: params.id
            }
        });

        ctx.body = {
            "success": true,
            "data": contato
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
        const contato = await prisma.contato.delete({
            where: {
                id: ctx.params.id
            }
        })

        ctx.body = {
            "success": true,
            "message": "Mensagem excluída com sucesso!",
            "data": contato
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