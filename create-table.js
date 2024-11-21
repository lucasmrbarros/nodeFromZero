import { sql } from "./db.js"

sql`
CREATE TABLE videos(
  id TEXT PRIMARY key,
  title TEXT, 
  description TEXT, 
  duration integer
)
`
.then(() => {
    console.log('Tabela Criada!')
})