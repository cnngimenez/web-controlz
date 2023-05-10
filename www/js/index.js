/*
  Copyright (C) 2023  cnngimenez

  index.js

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

programa_dia = 3;  // 3 es miércoles en JS
 
/**
 Obtener el último programa de radio.

 Calcular el último miércoles que pasó a partir de la fecha actual.

 @return Un objeto Date

 @param from [Date] Un objeto Date con la fecha desde donde calcular.
 Usualmente, se utiliza `new Date()` para indicar la fecha actual.
 @todo Generalizar esta función para cualquier fecha y cualquier día.
 */
function get_ultimo_programa(from) {
    // d -> contiene la fecha actual para calcular desde cuando
    // obtener
    var d = new Date();
    if (from != undefined && from != null) {
        d = from;
    }
    var difer = d.getDay() - programa_dia;
    
    if (difer < 0) {
        // d es lunes o martes.
        difer = 7 + d.getDay() - 3;
    }

    d.setTime(d.getTime() - difer * 24 * 60 * 60 * 1000);
    d.setHours(13);
    d.setMinutes(0);
    d.setSeconds(0);
    
    return d;
}

function update_ultimo_programa_link() {
    var elt = document.getElementById('ultimoLink');
    var miercolesPrevio = get_ultimo_programa();
    var year = miercolesPrevio.getFullYear();

    // JS cuenta los meses desde cero.
    var month = miercolesPrevio.getMonth() + 1;
    
    if (month < 10) {
        month = "0" + month;
    }
    var day = miercolesPrevio.getDay();
    if (day < 10) {
        day = "0" + day;
    } 
    
    elt.href =
        "https://radiocut.fm/radiostation/uncocalf/listen/" +
        year + "/" + month + "/" + day + "/13/00/00/";
}

/* -------------------------------------------------- */

/**
 Agregar a un listado de agradecimientos un nombre.
 Agregar una coma si es necesario.

 @param nombre String El nombre a agregar. 
 */
function agregar_agradecimiento(nombre) {
    var elt = document.getElementById("agradecimientos");    
    if (elt.innerText == "") {
        // Primer nombre: sin coma.
        elt.prepend(nombre);
    } else {
        elt.prepend(nombre + ", ");
    }
}

/* -------------------------------------------------- */

/**
 Agregar un entrevistade a la tabla.
 
 @param datos Un Objeto JSON con los datos a ingresar. Ver el archivo JSON entrevistades.json.
 */
function agregar_entrevistade(datos) {
    var elt = document.getElementById("tabla-entrevistades");
    // No... no usamos ReactJS... :/
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>" + datos.entrevistade + "</td><td>"
        + datos.tema + "</td><td>"
        + datos.fecha + "</td>";
    elt.prepend(tr);
}

/**
 Cargar desde un JSON las personas entrevistadas para agregar a una tabla en
 la página.
 También, se agregan sus nombres en los agradecimientos.
 */
function cargar_entrevistades() {
    fetch("/datos/entrevistas.json").then( (response) => {
        response.json().then( (data) => {
            data.forEach( (entrevista) => {
                agregar_entrevistade(entrevista);
                agregar_agradecimiento(entrevista.entrevistade);
            });
        });
    });
}

function startup() {
    update_ultimo_programa_link();
    cargar_entrevistades();
}

if (document.readyState !== 'loading') {
    startup();
} else {
    document.addEventListener('DOMContentLoaded', startup);
}
