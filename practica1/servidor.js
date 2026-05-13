console.log("Hello World JS from the Server")

/* Operaciones */
let edad1= 11
const edad2= 42

console.log("Edad Promedio")
console.log((edad1+ edad2)/2)

/* Medir tiempo de un proceso */
console.time('miproceso')

    for(let i=0; i < 10000000; i++){

    }

console.timeEnd('miproceso')

/* Objetos tipo tabla */
let usuarios= [
    {nombre: "Aaron", Edad:21},
    {nombre: "Diego", Edad:22},
]
console.table(usuarios)