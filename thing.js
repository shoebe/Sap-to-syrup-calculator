const init_volume_e = document.getElementById('init_volume');
const init_perc_sugar_e = document.getElementById('init_perc_sugar');
const final_perc_sugar_e = document.getElementById('final_perc_sugar');
const evaporation_rate_e = document.getElementById('evaporation_rate');

const calc_button_e = document.getElementById('calc_button');
const default_button_e = document.getElementById('default_button');
const volume_final_label_e = document.getElementById('volume_final_label');
const volume_final_e = document.getElementById('volume_final');
const time_taken_e = document.getElementById('time_taken');

const table_body_e = document.getElementById('table_body');

calc_button_e.addEventListener("click", update_table);
default_button_e.addEventListener("click", set_default_values);

function set_default_values() {
    init_volume_e.value = 100;
    init_perc_sugar_e.value = "7.00";
    final_perc_sugar_e.value = "67.00";
    evaporation_rate_e.value = "0.30";
}

function update_table() {
    let init_volume = init_volume_e.value;
    let init_perc_sugar = init_perc_sugar_e.value / 100.0;
    let final_perc_sugar = final_perc_sugar_e.value / 100.0;
    let evaporation_rate = evaporation_rate_e.value;

    let volume_final = init_volume * init_perc_sugar / final_perc_sugar;
    volume_final_e.value = volume_final.toFixed(2);

    volume_final_label_e.innerHTML = "Final volume (L) (when liquid is at " + final_perc_sugar * 100 + "% sugar)";

    let time_to_final = (init_volume - volume_final) / evaporation_rate;
    time_taken_e.value = Math.floor(time_to_final / 60.0) + " h " + Math.floor(time_to_final % 60) + " mins";


    let sugar_content = Number(init_perc_sugar);

    table_body_e.replaceChildren();
    let i = 1000;

    let b = false;

    while (true) {
        let volume_liquid = init_volume * init_perc_sugar / sugar_content;
        if (volume_liquid < volume_final) {
            b = true;
            sugar_content = final_perc_sugar;
            volume_liquid = volume_final;
        }
        let time_to_boil_min = (volume_liquid - volume_final) / evaporation_rate;

        let row = document.createElement("tr");

        let s = document.createElement("td");
        s.innerHTML = (sugar_content * 100.0).toFixed(2);
        row.appendChild(s);

        let v = document.createElement("td");
        v.innerHTML = volume_liquid.toFixed(2);
        row.appendChild(v);

        let t = document.createElement("td");
        t.innerHTML = Math.floor(time_to_boil_min / 60.0) + " h " + Math.floor(time_to_boil_min % 60) + " mins";

        row.appendChild(t);

        table_body_e.appendChild(row);

        i--;
        if (i <= 0 || b) {
            break;
        }

        sugar_content += 0.02;
    }
}

set_default_values();
update_table();