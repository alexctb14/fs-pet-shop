import process from 'node:process';
import fs from 'node:fs';
// import { error } from 'node:console';

let subcommand = process.argv[2];

if (subcommand === "read") {
    let petIndexStr = process.argv[3]
    let petIndex = Number(petIndexStr)

    fs.readFile("pets.json", "utf8", (error, string) => {
        if (error) {
            console.error(error);
            throw error;
        }
    
        let pets = JSON.parse(string);
        
        if (petIndexStr === undefined) {
            console.log(pets);
         } else if (petIndex >= pets.length || petIndex < 0 || Number.isNaN(petIndex)) {
            console.error('Usage: node pets.js read INDEX')
            process.exit(1)
        } else {
        console.log(pets[petIndex]);
     }
    });
} else if (subcommand === "create"){
    let age = process.argv[3]
    let kind = process.argv[4]
    let name = process.argv[5]
    let newPet = { age, kind, name }

    if (Number.isNaN(age) || typeof kind !== 'string' || typeof name !== 'string') {
        console.error("Must add: age kind name")
        process.exit(1)
    }

    fs.readFile("pets.json", "utf8", (error, string) => {
        if (error) {
            console.error(error);
            throw error;
        } 

        let pets = JSON.parse(string)
        pets.push(newPet)

        fs.writeFile("pets.json", JSON.stringify(pets), (error) => {
            throw error
        })
    })

    

} else {
    console.error("Usage: node pets.js [read | create | update | destroy]")
    process.exit(1);
}


// console.error("Usage: node pets.js [read | create | update | destroy]");
// process.exit(1);

// JSON.stringify/JSON.parse