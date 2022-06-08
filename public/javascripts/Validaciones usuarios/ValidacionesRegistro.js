window.onload = () => {
  let inputNombre = document.querySelector("#contenedorNombre input");
  let inputApellido = document.querySelector("#contenedorApellido input");
  let inputNombreUsuario = document.querySelector(
    "#contenedorNombreUsuario input"
  );
  let inputCorreo = document.querySelector("#contenedorEmail input");
  let inputContraseña = document.querySelector("#contenedorPassword input");
  let inputConfirmarPass = document.querySelector(
    "#contenedorConfirmarPass input"
  );
  let selectCategoria = document.querySelector("#contenedorCategoria select");
  let inputImagen = document.querySelector("#contenedorImagen input");

  let divErrorNombre = document.querySelector("#contenedorNombre div");
  let divErrorApellido = document.querySelector("#contenedorApellido div");
  let divErrorNombreUsuario = document.querySelector(
    "#contenedorNombreUsuario div"
  );
  let divErrorCorreo = document.querySelector("#contenedorEmail div");
  let divErrorContraseña = document.querySelector("#contenedorPassword div");
  let divErrorConfirmarPass = document.querySelector(
    "#contenedorConfirmarPass div"
  );
  let divErrorCategoria = document.querySelector("#contenedorCategoria div");
  let divErrorImagen = document.querySelector("#contenedorImagen div");

  function validacionNombre(event) {
    if (inputNombre.value == "") {
      divErrorNombre.innerHTML = "Debes de introducir un nombre";
      if (!inputNombre.classList.contains("campoError")) {
        inputNombre.classList.add("campoError");
      }
    } else if (inputNombre.value.length < 2) {
      divErrorNombre.innerText =
        "El nombre debe de tener al menos 2 caracteres";
      if (!inputNombre.classList.contains("campoError")) {
        inputNombre.classList.add("campoError");
      }
    } else {
      divErrorNombre.innerText = "";
      inputNombre.classList.remove("campoError");
    }
  }

  function validacionApellido(event) {
    if (inputApellido.value == "") {
      divErrorApellido.innerHTML = "Debes de introducir un apellido";
      if (!inputApellido.classList.contains("campoError")) {
        inputApellido.classList.add("campoError");
      }
    } else if (inputApellido.value.length < 2) {
      divErrorApellido.innerText =
        "El apellido debe de tener al menos 2 caracteres";
      if (!inputApellido.classList.contains("campoError")) {
        inputApellido.classList.add("campoError");
      }
    } else {
      divErrorApellido.innerText = "";
      inputApellido.classList.remove("campoError");
    }
  }

  async function validacionNombreUsuario() {
    if (inputNombreUsuario.value == "") {
      divErrorNombreUsuario.innerHTML =
        "Debes de introducir un nombre de usuario";
      if (!inputNombreUsuario.classList.contains("campoError")) {
        inputNombreUsuario.classList.add("campoError");
      }
    } else if (inputNombreUsuario.value.length < 2) {
      divErrorNombreUsuario.innerText =
        "El nombre de usuario debe de tener al menos 2 caracteres";
      if (!inputNombreUsuario.classList.contains("campoError")) {
        inputNombreUsuario.classList.add("campoError");
      }
    } else {
      let response = await fetch(
        "http://localhost:3000/api/users/" + inputNombreUsuario.value
      );
      let usuario = await response.json();
      if (usuario) {
        divErrorNombreUsuario.innerText =
          "Este nombre de usuario ya esta ocupado";
        if (!inputNombreUsuario.classList.contains("campoError")) {
          inputNombreUsuario.classList.add("campoError");
        }
      } else {
        divErrorNombreUsuario.innerText = "";
        inputNombreUsuario.classList.remove("campoError");
      }
    }
  }

  function validacionContraseña(event) {
    if (inputContraseña.value == "") {
      divErrorContraseña.innerHTML = "Debes de introducir una contraseña";
      if (!inputContraseña.classList.contains("campoError")) {
        inputContraseña.classList.add("campoError");
      }
    } else if (inputContraseña.value.length < 8) {
      divErrorContraseña.innerText =
        "La contraseña debe tener al menos 8 caracteres";
      if (!inputContraseña.classList.contains("campoError")) {
        inputContraseña.classList.add("campoError");
      }
    } else {
      divErrorContraseña.innerText = "";
      inputContraseña.classList.remove("campoError");
    }
  }

  function validacionConfirmaPass(event) {
    if (inputContraseña.value != inputConfirmarPass.value) {
      divErrorConfirmarPass.innerHTML = "Ambas contraseñas deben de coincidir";
      if (!inputConfirmarPass.classList.contains("campoError")) {
        inputConfirmarPass.classList.add("campoError");
      }
    } else {
      divErrorConfirmarPass.innerText = "";
      inputConfirmarPass.classList.remove("campoError");
    }
  }

  function validacionCategoria(event) {
    if (selectCategoria.value == "") {
      divErrorCategoria.innerHTML = "Debes de seleccionar una categoria";
      if (!selectCategoria.classList.contains("campoError")) {
        selectCategoria.classList.add("campoError");
      }
    } else {
      divErrorCategoria.innerText = "";
      selectCategoria.classList.remove("campoError");
    }
  }

  function validacionImagen(event) {
    let extensionesValidas = ["jpg", "jpeg", "png", "gif"];

    if (inputImagen.files.length < 1) {
      divErrorImagen.innerHTML = "Debes de seleccionar una imagen";
      if (!inputImagen.classList.contains("campoError")) {
        inputImagen.classList.add("campoError");
      }
    } else {
      let tipo = inputImagen.files[0].type.split("/");
      let extension = tipo[1];

      if (extensionesValidas.includes(extension)) {
        divErrorImagen.innerText = "";
        inputImagen.classList.remove("campoError");
      } else {
        divErrorImagen.innerHTML = "Extension de archivo no valida";
        if (!inputImagen.classList.contains("campoError")) {
          inputImagen.classList.add("campoError");
        }
      }
    }
  }

  inputNombre.addEventListener("change", validacionNombre);
  inputNombre.addEventListener("blur", validacionNombre);
  inputApellido.addEventListener("change", validacionApellido);
  inputApellido.addEventListener("blur", validacionApellido);
  inputNombreUsuario.addEventListener("change", validacionNombreUsuario);
  inputNombreUsuario.addEventListener("blur", validacionNombreUsuario);
  //Validacion nombre usuario
  //Validacion email
  inputContraseña.addEventListener("change", validacionContraseña);
  inputContraseña.addEventListener("blur", validacionContraseña);
  inputConfirmarPass.addEventListener("change", validacionConfirmaPass);
  inputConfirmarPass.addEventListener("blur", validacionConfirmaPass);
  selectCategoria.addEventListener("change", validacionCategoria);
  selectCategoria.addEventListener("blur", validacionCategoria);
  inputImagen.addEventListener("change", validacionImagen);
  inputImagen.addEventListener("blur", validacionImagen);
};
