$(document).ready(function () {
  $("#contactForm").on("submit", function (event) {
    event.preventDefault();
    var isValid = true;

    if ($("#name").val().trim() === "") {
      isValid = false;
      alert("El nombre es obligatorio.");
    }
    if ($("#email").val().trim() === "") {
      isValid = false;
      alert("El email es obligatorio.");
    }
    if ($("#message").val().trim() === "") {
      isValid = false;
      alert("El mensaje es obligatorio.");
    }

    if (isValid) {
      alert("Formulario enviado correctamente.");
    }
  });
});
