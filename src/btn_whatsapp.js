const catalogoDeCards = document.querySelector(".catalogo__div")

const btnCard = document.querySelectorAll(".button-card");


catalogoDeCards.addEventListener("click", (elementoClickeado) => {
    getCard(elementoClickeado)
})


const getCard = (elementoClickeado) => {
    if(elementoClickeado.target.classList.contains("button-card")){
        catchParent(elementoClickeado.target.parentElement)
    }
    elementoClickeado.stopPropagation()
}

const catchParent = (card) => {
    console.log(card)
    let catchNombre = card.querySelector("h3").textContent
    const arrayNombre = [catchNombre.split(" ")]
    console.log(arrayNombre)
    const nombreWhatsapp = [];
    arrayNombre[0].forEach(palabra =>{
        nombreWhatsapp.push(`%20${palabra}`)
    })
    
    let msj = nombreWhatsapp.join("");
    console.log(msj)
    let mensaje_final = `Hola,%20te%20queria%20preguntar%20sobre%20el%20producto${msj}`

    let mensaje = "https://api.whatsapp.com/send/?phone=542323313642&text=" + mensaje_final

    console.log(mensaje)
    

    open(mensaje)
}
