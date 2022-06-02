window.onload = () => {
  let inputNombre = document.querySelector("#contenedorNombre input");
  let selectCategoria = document.querySelector("#contenedorCategoria select");
  //let inputColores = documente.querySelector("#contenedorColores input");
  let textAreaDescripcion = document.querySelector(
    "#contenedorDescripcion textarea"
  );
  let selectMarca = document.querySelector("#contenedorMarca select");
  let inputPrecio = document.querySelector("#contenedorPrecio input");
  let inputImagen = document.querySelector("#contenedorImagen input");

  let divErrorNombre = document.querySelector("#contenedorNombre div");
  let divErrorCategoria = document.querySelector("#contenedorCategoria div");
  //let divErrorColores = document.querySelector("#contenedorColores div");
  let divErrorDescripcion = document.querySelector(
    "#contenedorDescripcion div"
  );
  let divErrorMarca = document.querySelector("#contenedorMarca div");
  let divErrorPrecio = document.querySelector("#contenedorPrecio div");
  let divErrorImagen = document.querySelector("#contenedorImagen div");

  function validacionNombre(event) {
    if (inputNombre.value == "") {
      divErrorNombre.innerHTML = "Debes de introducir un nombre de producto";
      if (!inputNombre.classList.contains("campoError")) {
        inputNombre.classList.add("campoError");
      }
    } else if (inputNombre.value.length < 5) {
      divErrorNombre.innerText =
        "El nombre debe de tener al menos 5 caracteres";
      if (!inputNombre.classList.contains("campoError")) {
        inputNombre.classList.add("campoError");
      }
    } else {
      divErrorNombre.innerText = "";
      inputNombre.classList.remove("campoError");
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

  function validacionDescripcion(event) {
    if (textAreaDescripcion.value == "") {
      divErrorDescripcion.innerHTML = "Debes de introducir una descripción";
      if (!textAreaDescripcion.classList.contains("campoError")) {
        textAreaDescripcion.classList.add("campoError");
      }
    } else if (textAreaDescripcion.value.length < 20) {
      divErrorDescripcion.innerText =
        "La descripcion debe tener al menos 20 caracteres";
      if (!textAreaDescripcion.classList.contains("campoError")) {
        textAreaDescripcion.classList.add("campoError");
      }
    } else {
      divErrorDescripcion.innerText = "";
      textAreaDescripcion.classList.remove("campoError");
    }
  }

  function validacionMarca(event) {
    if (selectMarca.value == "") {
      divErrorMarca.innerHTML = "Debes de seleccionar una marca";
      if (!selectMarca.classList.contains("campoError")) {
        selectMarca.classList.add("campoError");
      }
    } else {
      divErrorMarca.innerText = "";
      selectMarca.classList.remove("campoError");
    }
  }

  function validacionPrecio(event) {
    if (inputPrecio.value == "") {
      divErrorPrecio.innerHTML = "Debes de introducir un precio";
      if (!inputPrecio.classList.contains("campoError")) {
        inputPrecio.classList.add("campoError");
      }
    }
    else if (inputPrecio.value.isNaN()) {
      divErrorPrecio.innerHTML =
        "Debes de introducir un formato de precio valido";
      if (!inputPrecio.classList.contains("campoError")) {
        inputPrecio.classList.add("campoError");
      }
    } else {
      divErrorPrecio.innerText = "";
      inputPrecio.classList.remove("campoError");
    }
  }

  inputNombre.addEventListener("change", validacionNombre);
  inputNombre.addEventListener("blur", validacionNombre);
  selectCategoria.addEventListener("change", validacionCategoria);
  selectCategoria.addEventListener("blur", validacionCategoria);
  textAreaDescripcion.addEventListener("change", validacionDescripcion);
  textAreaDescripcion.addEventListener("blur", validacionDescripcion);
  selectMarca.addEventListener("change", validacionMarca);
  selectMarca.addEventListener("blur", validacionMarca);
  inputPrecio.addEventListener("change", validacionPrecio);
  inputPrecio.addEventListener("blur", validacionPrecio);
};
