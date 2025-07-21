import { resources } from "./dataIndex.js";
import { categorias } from "./categories.js"

const formulario = document.querySelector("form");
const busqueda = document.querySelector("input");
const select = document.querySelector("select");
const btnEnviar = document.querySelector(".btn-search");
const alertasDiv = document.querySelector(".alertas");
const contenedor = document.querySelector(".content");


document.addEventListener('DOMContentLoaded', () => {
    cargarEventListeners();
    llenarSelect();
    crearAlerta("Search a resource by its name or Select a category to show related resources");
});

function cargarEventListeners() {
    formulario.addEventListener("submit", enviarFormulario);
    btnEnviar.addEventListener("submit", enviarFormulario);
    select.addEventListener("change", mostrarResultadosPorCategoria);
}

function enviarFormulario(e) {
    e.preventDefault();
    limpiarHTML(alertasDiv);
    contenedor.classList.add('hide');

    const valor = busqueda.value
    if (!valor) {
        crearAlerta("Search input cannot be empty", "error");
        return;
    }

    const coincidencias = resources.filter(res => {
        /* 
        The match() method matches a string against a regular expression **
        "gi" son las banderas de la expresión regular:
        g (global): Busca todas las coincidencias en lugar de detenerse en la primera.
        i (insensitive): Hace que la búsqueda no distinga entre mayúsculas y minúsculas. 
        */
        if (res.name.match(new RegExp(valor, "gi"))) {
            return res.name;
        }
    });

    if (coincidencias.length < 1) {
        crearAlerta("No matches found", "error");
        return;

    }
    mostrarResultados(coincidencias);
}


function mostrarResultados(coincidencias) {
    limpiarHTML(contenedor);
    limpiarHTML(alertasDiv);
    contenedor.classList.remove('hide');

    coincidencias.forEach(item => {
        const link = document.createElement('a');
        link.classList.add("link");
        link.rel = "noopener noreferrer";
        link.href = item.url;
        link.target = "_blank";
        link.textContent = item.name;
        contenedor.appendChild(link);

    });
}

function crearAlerta(msj, tipo) {
    const parrafo = document.createElement("p");
    parrafo.classList.add("alerta");

    if (tipo === "error") {
        parrafo.classList.add("alerta-error");
    }
    parrafo.textContent = msj;

    limpiarHTML(contenedor)
    alertasDiv.appendChild(parrafo);
}

function limpiarHTML(contenedor) {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function llenarSelect() {
    const categoriasSelect = categorias.sort();
    categoriasSelect.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });
}

function mostrarResultadosPorCategoria(e) {
    const categoriaSeleccionada = e.target.value;
    // console.log(categoriaSeleccionada)

    let coincidencias = resources.filter(res => {
        if (res.category === categoriaSeleccionada) {
            return res;
        }
    });
    mostrarResultados(coincidencias);
}
