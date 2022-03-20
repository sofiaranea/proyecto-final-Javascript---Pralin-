let listaProductos = [
    {id: 0, nombre: 'Torta 100% Chocolate', precio: 2870, cantidad: 1, img:'assets/img/100choco.jpg', stock: 'si'},
    {id: 1, nombre: 'Torta Ferrero Nutella', precio: 2700, cantidad: 1, img:'assets/img/ferreronut.jpg', stock: 'no'},
    {id: 2, nombre: 'Torta Red Velvet', precio: 3360, cantidad: 1, img:'assets/img/redvelvet.jpg', stock: 'si'},
    {id: 3, nombre: 'Torta Brownie Bon', precio: 2650, cantidad: 1, img:'assets/img/browniebon.jpg', stock: 'no'},
    {id: 4, nombre: 'Brownies', precio: 2200, cantidad: 1, img:'assets/img/brownies.jpg', stock: 'si'},
    {id: 5, nombre: 'Alfacookies', precio: 1180, cantidad: 1, img:'assets/img/alfacookies.png', stock: 'no'},
    {id: 6, nombre: 'Lemonies', precio: 2150, cantidad: 1, img:'assets/img/lemonies.jpg', stock: 'si'},
    {id: 7, nombre: 'Cheescake Frutos Rojos', precio: 2780, cantidad: 1, img:'assets/img/cheescakefr.jpg', stock: 'si'}
]

//Filtro para ordenar productos según stock//
listaProductos.sort((a) => {
    if (a.stock == 'si') {
        return -1
    } else {
        return 1
    }
})