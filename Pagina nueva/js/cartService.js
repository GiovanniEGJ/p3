function agregarAlCarro(producto) {
  const memoria = JSON.parse(localStorage.getItem("compras"));
  let cuenta = 0;
  if (!memoria) {
    const nuevoItem = getNuevoProductoMemoria(producto);
    localStorage.setItem("compras", JSON.stringify([nuevoItem]));
    cuenta = 1;
  } else {
    const indiceProducto = memoria.findIndex(
      (compras) => compras.id === producto.id
    );
    const nuevaMemoria = memoria;
    if (indiceProducto === -1) {
      nuevaMemoria.push(getNuevoProductoMemoria(producto));
      cuenta = 1;
    } else {
      nuevaMemoria[indiceProducto].cantidad++;
      cuenta = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("compras", JSON.stringify(nuevaMemoria));
    actualizarNumeroCarro();
    return cuenta;
  }
}

function restarAlCarro(producto) {
  const memoria = JSON.parse(localStorage.getItem("compras"));
  const indiceProducto = memoria.findIndex(
    (compras) => compras.id === producto.id
  );
  if (memoria[indiceProducto].cantidad === 1) {
    memoria.splice(indiceProducto, 1);
  } else {
    memoria[indiceProducto].cantidad--;
  }
  localStorage.setItem("compras", JSON.stringify(memoria));
  actualizarNumeroCarro();
}

function getNuevoProductoMemoria(producto) {
  const nuevoItem = producto;
  nuevoItem.cantidad = 1;
  return nuevoItem;
}

const cuentaCarro = document.getElementById("carroNum");
function actualizarNumeroCarro() {
  const memoria = JSON.parse(localStorage.getItem("compras"));
  if (memoria && memoria.length > 0) {
    const cuenta = memoria.reduce(
      (acum, current) => acum + current.cantidad,
      0
    );
    cuentaCarro.innerText = cuenta;
  } else {
    cuentaCarro.innerText = 0;
  }
}

actualizarNumeroCarro();
