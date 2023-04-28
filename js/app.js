import { resources } from "./info/index.js";

const formulario = document.querySelector("form");
const busqueda = document.querySelector("input");
const select = document.querySelector("select");
const btnEnviar = document.querySelector(".btn-search");
const alertasDiv = document.querySelector(".alertas");
const contenedor = document.querySelector(".content");


let categorias = ["HTML", "CSS", "CSS TOOLS", "IMAGES", "IMAGES TOOLS",
    "ICONS", "FONTS", "JS", "JS LIBRARIES", "REACT", "APIS", "NODEJS-EXPRESS", "GIT",
    "NODEJS-DATABASE", "SQL", "TUTORIALS", "REGULAR EXPRESSIONS", "HOSTINGS",
    "MARKDOWN", "DOCUMENTATION", "UX", "COLOR PALETTES", "INTERVIEWS", "CODING PRACTICE",
    "USEFUL TOOLS", "OTHERS", "ERRORS | SOLUTIONS", "VSCODE EXTENSIONS", "DATA STRUCTURES & ALGORITHMS",
    "PYTHON", "JAVA",
];

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
    limpiarHTML(alertasDiv)
    const valor = busqueda.value
    if (!valor) {
        crearAlerta("Search input cannot be empty", "error");
        return;
    }


    const coincidencias = resources.filter(res => {
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
    limpiarHTML(alertasDiv)

    coincidencias.forEach(item => {
        const card = document.createElement('div');
        card.classList.add("card");
        const urlP = document.createElement('p');
        urlP.classList.add("url-name");
        urlP.textContent = item.name;
        const urlAnchor = document.createElement('a');
        urlAnchor.rel = "noopener noreferrer";
        urlAnchor.href = item.url;
        urlAnchor.target = "_blank";
        urlAnchor.textContent = "Open";

        card.append(urlP, urlAnchor);
        contenedor.appendChild(card);
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
    categorias = categorias.sort();
    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });
}

function mostrarResultadosPorCategoria(e) {
    const categoriaSeleccionada = e.target.value;
    console.log(categoriaSeleccionada)

    let coincidencias = resources.filter(res => {
        if (res.category === categoriaSeleccionada) {
            return res;
        }
    });
    mostrarResultados(coincidencias);
}
