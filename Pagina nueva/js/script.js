$(document).ready(function () {
  function showModal(message) {
    $("#modalMessage").text(message);
    $("#myModal").modal("show");
  }

  $(".btn-primary").click(function () {
    showModal("Producto añadido al carrito!");
  });
});
