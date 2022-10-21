// FILTRAR EL CONTENIDO POR BUSCADOR
const buscador = document.getElementById("buscador")
const cruzBuscador = document.querySelector(".buscador__div")

// escuchamos cada tipeo que se hace
document.addEventListener("keyup", busca =>{
        // si lo ingresado coincide con 
        // .target Devuelve el elemento del DOM que disparó el evento (inicialmente). Osea, lo tipeado
        if(busca.target.matches("#buscador")){
            // se seleccionan todos los cards, y en cada uno se ejecuta la funcion cardProducto
            document.querySelectorAll(".card").forEach(cardProducto =>{
                // card producto verifica si en cada card contiene un texto que coincida con lo ingresado
                cardProducto.textContent.toLowerCase().includes(busca.target.value.toLowerCase())
                // si coincide, le remueve la clase que lo esconde
                ?cardProducto.classList.remove("invisible")
                // si no coincide le agrega la clase que lo esconde
                :cardProducto.classList.add("invisible")
            })
        }
        
})

buscador.addEventListener("focus", ()=>{
    cruzBuscador.classList.remove("invisible")
})

cruzBuscador.addEventListener("click", ()=>{
    cruzBuscador.classList.add("invisible")
    buscador.value = null;
    document.querySelectorAll(".card").forEach(cardProducto =>{
        cardProducto.classList.remove("invisible")
        
    })
})