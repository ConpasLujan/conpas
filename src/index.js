
// URL DEL CATALOGO "https://docs.google.com/spreadsheets/d/1rxIGbyQkkA7jroA-RSoI67uHtAYNTberI7AZb3SNC3U/gviz/tq?tqx=out:json&gid=0";

const url = "https://docs.google.com/spreadsheets/d/1rxIGbyQkkA7jroA-RSoI67uHtAYNTberI7AZb3SNC3U/gviz/tq?tqx=out:json&gid=0";





// ARRAY PARA PRODUCTOS
const arrayCards = [];

// DIV DONDE VAN A IMPRIMIRSE LAS CARDS
const catalogo = document.querySelector(".catalogo__div")
// Conseguir el contenido de template(la guia de la card)
const templateCard = document.getElementById("template__card").content
// Conseguir el div donde está el resultado cuando no hay cards
const noCard = document.getElementById("catalogo-no-encontrado")
// Creamos un fragmento
const fragmento = document.createDocumentFragment()


// CONSUMO DE FETCH CON ASYNC Y AWAIT

// se ejecuta cuando el documento es completamente cargado. Cuando todo el HTML esté cargado y parseado, cargar los datos del api.json
document.addEventListener("DOMContentLoaded", () =>fetchData())
const fetchData = async () => {
    try {
        console.log("Se ejecuto la base de datos de google sheets")
        const respuesta = await fetch(url)
        let stringObtenido = await respuesta.text()
        const data = JSON.parse(stringObtenido.slice(47, -2))
        const datos =data.table
        console.log(datos)
        arrayCards.push(...datos.rows)
        console.log(arrayCards)
        printCards(arrayCards)
    }
    catch (error) {
        // si da error, registrarlo en la consola
        console.error("Algo salió mal: ", error)
        console.log("Se consumirá la base de datos locales")
        // En caso de que la base de datos falla, se consume el archivo local "backup.txt"
        const respuesta = await fetch("../backup.txt")
        let stringObtenido = await respuesta.text()
        const data = JSON.parse(stringObtenido)
        const datos =data.table
        console.log(datos)
        arrayCards.push(...datos.rows)
        console.log(arrayCards)
        printCards(arrayCards)
    }
}


const printCards = (arrayCards) =>{
    console.log("Se ejecuto el for each")
    noCard.classList.add("invisible")
    arrayCards.forEach( (row)=>{
        
        templateCard.querySelector(".card").setAttribute("id",row.c[0].v);
        templateCard.querySelector(".img").setAttribute("src",row.c[1].v)
        templateCard.querySelector(".nombre").textContent = row.c[2].v;
        
        // si no tiene precio
        if((row.c[3]) != null){templateCard.querySelector(".precio").textContent = `$ ${row.c[3].v}`;}
        else{templateCard.querySelector(".precio").textContent = ""}

        templateCard.querySelector(".descripcion").textContent = row.c[4].v;
        templateCard.querySelector(".stock").textContent = (row.c[5].v);

        // Si la columna n.6 de la row es diferente a null, entonces en le texto poner el contenido, pero si null poner " " 
        if((row.c[6]) != null){templateCard.querySelector(".categoria").textContent = row.c[6].v;}
        else{templateCard.querySelector(".categoria").textContent = " ";}
        

        if((row.c[7]) != null){templateCard.querySelector(".oferta-txt").textContent = row.c[7].v;}
        else{templateCard.querySelector(".oferta-txt").textContent = ""}
        
        

        if(templateCard.querySelector(".stock").textContent=== "0"){
            templateCard.querySelector(".button-card").textContent = "Sin stock"
            templateCard.querySelector(".card").classList.add("disable")
            templateCard.querySelector(".button-card").classList.add("disable-btn")
            templateCard.querySelector(".button-card").disabled=true
        }else{
            templateCard.querySelector(".button-card").disabled=false
            templateCard.querySelector(".card").classList.remove("disable")
            templateCard.querySelector(".button-card").innerHTML = `<img src="./assets/img/wsp.png">` + "Contactar"
        }
        
        const clone = templateCard.cloneNode(true)
        fragmento.appendChild(clone)
    })
    catalogo.appendChild(fragmento)
}

