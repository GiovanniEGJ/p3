const contenedorTarjetas = document.getElementById("productos-container");
const unidadesCompra = document.getElementById("unidades");
const precioCompra = document.getElementById("precio");
const carroVacioCompra = document.getElementById("carro-vacio");
const totalesCompra = document.getElementById("totales");
const reiniciarCompra = document.getElementById("reiniciar");

function crearTarjetasProductosInicio() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("compras"));
  console.log(productos);
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevoProducto = document.createElement("div");
      nuevoProducto.classList = "tarjeta-producto";
      nuevoProducto.innerHTML = `
<img src="img/${producto.id}.jpg">
<h3>${producto.nombre}</h3>
<p>$${producto.precio}</p>
<div>
<button>-</button>
<span class="cantidad">${producto.cantidad}</span>
<button>+</button>
</div>
`;
      contenedorTarjetas.appendChild(nuevoProducto);
      nuevoProducto
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaProducto =
            e.target.parentElement.getElementsByTagName("span")[0];
          cuentaProducto.innerText = agregarAlCarro(producto);
          actualizarTotales();
        });

      nuevoProducto
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => {
          restarAlCarro(producto);
          crearTarjetasProductosInicio();
          actualizarTotales();
        });
    });
  }
}

crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("compras"));
  let unidades = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
    unidadesCompra.innerText = unidades;
    precioCompra.innerText = precio;
  }
  mensajeCarroVacio();
}

function mensajeCarroVacio() {
  const productos = JSON.parse(localStorage.getItem("compras"));
  carroVacioCompra.classList.toggle(
    "ocultar",
    productos && productos.length > 0
  );
  totalesCompra.classList.toggle(
    "ocultar",
    !(productos && productos.length > 0)
  );
}

mensajeCarroVacio();

reiniciarCompra.addEventListener("click", reiniciarCarro);
function reiniciarCarro() {
  localStorage.removeItem("compras");
  actualizarTotales();
  crearTarjetasProductosInicio();
}
