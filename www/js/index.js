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

/**
 Obtener el último programa de radio.

 Calcular el último miércoles que pasó a partir de la fecha actual.

 @return Un objeto Date
 
 @todo Generalizar esta función para cualquier fecha y cualquier día.
 */
function get_ultimo_programa() {
    // d -> contiene la fecha actual para calcular desde cuando
    // obtener 
    var d = new Date();
    var difer = d.getDay() - 3; // 3 es miércoles en JS.
    
    if (difer < 0) {
        // d es lunes o martes.
        difer = 7 + d.getDay() - 3;
    }

    d.setTime(d.getTime() - (d.getDay() - difer * 24 * 60 * 60 * 1000));
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

function startup() {
    update_ultimo_programa_link();
}

if (document.readyState !== 'loading') {
    startup();
} else {
    document.addEventListener('DOMContentLoaded', startup);
}