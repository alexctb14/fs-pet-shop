import express, { json } from 'express'
import fs from "fs"

const server = express();
const port = 3000;

server.get('/', (req, res) => {
  res.send('Hello World!')
});

server.get("/pets", (req, res) => {
    fs.readFile("pets.json", "utf-8", (error, string) => {
        if (error) {
            res.sendStatus(500);
            console.log(error)
            return
        }
        let pets = JSON.parse(string)
        res.send(pets)  
    })
})

server.get("/pets/:petIndex", (req, res) => {
    let petIndex = Number(req.params.petIndex)

    fs.readFile("pets.json", "utf-8", (error, string) => {
        let pets = JSON.parse(string)

        if (error) {
            res.sendStatus(500);
            console.log(error)
            return
        } else if (petIndex < 0 || petIndex >= pets.length) {
            res.sendStatus(404)
            return
        }
        
        res.send(pets[petIndex])  

        
    })

})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});