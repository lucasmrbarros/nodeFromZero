/*
//Sem pacotes
//Inicializazação do servidor node
//Comando npm init-y (arquivo json de inicialização pra rodar o servidor, devido a forma como import esta sendo feito)
// add "type": "module" no arquivo json gerado
import { createServer } from  'node:http'

const server = createServer((request, response) => 
{
    response.write('alive');

    return response.end()
})

//Definicao da porta
server.listen (3333)
*/

//Pacote instalado npm install fastify

import { fastify } from "fastify";
//import { DataBaseMemory } from "./database-memory.js"
import { DataBasePostgress } from "./databese-postgres.js";

const DataBase = new  DataBasePostgress()

const server = fastify()

server.post('/videos', async (request, reply) => 
{
    const {title, description, duration }= request.body

    await DataBase.create(
        {
            title, 
            description, 
            duration
        }
    )
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await DataBase.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const   videoId = request.params.id
    const { title, description, duration } = request.body

    await DataBase.update(videoId, {
        title, 
        description, 
        duration
    })
    
    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await DataBase.delete(videoId)

    return reply.status(204).send()
})


server.listen({
        port: process.env.PORT ?? 3333,
    }
)