//Ventana modal//
function modal () {
    let modal = document.getElementById('modal')
    modal.style.opacity="1"
    modal.style.visibility="visible"
}
function closeModal () {
    let modal = document.getElementById('modal')
    modal.style.opacity="0"
    modal.style.visibility="hidden"
}


//Variables globales//
let carrito = []
let productos = []
let contenedorCarrito = document.getElementById('contenedorCarrito')
let contenedorProductos = document.getElementById('contenedorProductos')

let totalCarrito = document.getElementById('precioTotal')
let totalProductos = document.getElementById('productosTotal')

let searchBar = document.getElementById('searchBar')

//cargarProductos(listaProductos)


//Función para cargar productos de productos.js//
fetch('js/productos.json')
    .then(response => response.json())
    .then(data => {
        data.sort((a) => {
            if (a.stock == 'si') {
                return -1
            } else {
                return 1
            }
        })
        cargarProductos(data)
        data.forEach(el => productos.push(el))
        recuperar()
    })
    .catch(error => console.log(error))


function cargarProductos(array) {
    contenedorProductos.innerHTML = '';
    for (const producto of array) {
        let div = document.createElement('div');
        let stock = producto.stock;
        div.className = 'producto';
        if (stock == 'si') {
            div.innerHTML = `<img src="${producto.img}"></img>
                            <h5>${producto.nombre}</h5>
                            <div>
                                <p>Precio: $${producto.precio}</p>
                                <a id="agregarCarrito${producto.id}"><i class="fa-solid fa-xl fa-plus"></i></a>
                            </div>
                            <span class="disponible">En stock</span>`
        } else {
            div.innerHTML = `<img src="${producto.img}"></img>
                            <h5>${producto.nombre}</h5>
                            <p>Precio: $${producto.precio}</p>
                            <a id="agregarCarrito${producto.id}" class="invisible"></a>
                            <span class="no-disponible">Sin stock</span>`
        }
        contenedorProductos.appendChild(div);
        let agregarBtn = document.getElementById(`agregarCarrito${producto.id}`)
        agregarBtn.addEventListener('click', () => {
            agregarCarrito(producto.id)
        })
    }
}


//Función agrega al carrito//
function agregarCarrito (id) {
    let productoRepetido = carrito.find(el => el.id == id)
    if (productoRepetido) {
        productoRepetido.cantidad = productoRepetido.cantidad + 1
        document.getElementById(`cantidad${productoRepetido.id}`).innerHTML = `<p id="cantidad${productoRepetido.id}">${productoRepetido.cantidad}</p>`
        actualizarCarrito()
        Toastify({
            text: `${productoRepetido.nombre} agregado al carrito`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #8036c5, #b028da)",
              }
        }).showToast();    
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }
    else {
        let agregarProd = productos.find(el => el.id == id)
        carrito.push(agregarProd)
        actualizarCarrito()
        let div = document.createElement('div')
        div.className = 'carritoProd'
        div.innerHTML = `<p>${agregarProd.nombre}</p>
                        <p>$${agregarProd.precio}</p>
                        <p id="cantidad${agregarProd.id}">${agregarProd.cantidad}</p>
                        <a class ="del" id="quitarCarrito${agregarProd.id}"><i class="fa-solid fa-minus"></i></a>`
        contenedorCarrito.appendChild(div)
    
        let eliminarBtn = document.getElementById(`quitarCarrito${agregarProd.id}`)
        eliminarBtn.addEventListener('click', () => {
            eliminarBtn.parentElement.remove()
            carrito = carrito.filter(el => el.id != agregarProd.id)
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })
        Toastify({
            text: `${agregarProd.nombre} agregado al carrito`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #8036c5, #b028da)",
              }
        }).showToast();    
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


//Función para actualizar precio del carrito//
function actualizarCarrito () {
    totalProductos.innerText = carrito.reduce((acc, el) => acc + el.cantidad, 0)
    totalCarrito.innerText = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}


//Función para recuperar el array de los productos del carrito / LocalStorage//
function recuperar () {
    let recuperarCarrito = JSON.parse(localStorage.getItem('carrito'))
    if(recuperarCarrito) {
        recuperarCarrito.forEach(el => agregarCarrito(el.id))
    }
}


//Buscador de productos//
searchBar.addEventListener('input', ()=>{
    if (searchBar.value == "") {
        cargarProductos(productos)
    }else{
        cargarProductos(productos.filter(el => el.nombre.toLowerCase().includes(searchBar.value.toLowerCase())))
    }
})