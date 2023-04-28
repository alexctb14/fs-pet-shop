import { isUtf8 } from 'buffer';
import http from 'http';
import fs from "node:fs"
let port = 3000

http.createServer(function (req, res) {
    let petRegExp = /^\/pets\/(-?\d+)$/;
       // if GET to /pets, return pets
        if (req.method === "GET" && req.url === "/pets") {
            fs.readFile("pets.json", "utf-8", (error, string) => {
            res.setHeader('Content-Type', 'application/json')
            res.write(string)
            res.end()
            })
        } else if (req.method === 'GET' && petRegExp.test(req.url)) {
            let petIndex = Number(req.url.match(petRegExp)[1])

            fs.readFile('pets.json', 'utf-8', (error, string) => {

                let pets = JSON.parse(string)

                if (petIndex < 0 || petIndex >= pets.length) {
                    res.statusCode = 404
                    res.setHeader("Content-Type", "text/plain")
                    res.write("404 Not Found")
                    res.end()
                } else {
                    res.setHeader('Content-Type', 'application/json')
                    let pet = pets[petIndex]
                    res.statusCode = 200
                    res.end(JSON.stringify(pet))
                }
            })
        } else {
            res.write('Hello World!'); 
         res.end();
        }
})
    .listen(port, function() {
        console.log(`Listening on port ${port}...`)
    }); 