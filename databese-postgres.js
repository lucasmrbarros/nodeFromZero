import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DataBasePostgress {
  async  create(video){
    const videoId = randomUUID()
    const {title, description, duration} = video

await sql`insert into videos(id, title, description, duration) values (${videoId}, ${title}, ${description}, ${duration})`
    }

    //read

   async list(search) {
        let videos 

        if (search){
            return videos = await sql`select * from videos where tile ilike ${'%' + search + '%'}`
        }
        return videos = await sql`select * from videos`

    }

    async update (id, video){
        const {title, description, duration} = video

        await sql `update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id){
        await sql `DELETE from videos WHERE id = ${id}`
    }
}