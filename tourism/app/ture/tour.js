'use strict'

class Tura {
    constructor(naziv, opis, duzina, tagovi) {
        this.naziv = naziv;
        this.opis = opis;
        this.duzina = duzina;
        this.tagovi = tagovi;
    }
}

let tours = [];

function loadTours() {
    let data = localStorage.getItem("tours");
    if (data) {
        let parsed = JSON.parse(data);
        tours = parsed.map(t => new Tura(t.naziv, t.opis, t.duzina, t.tagovi));
    } else {
        let tura1 = new Tura("Petrovaradinska tvrđava", "Obilazak tvrđave i panoramski pogled na Dunav.", 3, ["istorijska", "gradska"]);
        let tura2 = new Tura("Fruška Gora", "Pešačka tura kroz nacionalni park i manastire.", 15, ["priroda", "planinarenje"]);
        let tura3 = new Tura("Beograd centar", "Šetnja kroz Knez Mihajlovu, Kalemegdan i Skadarliju.", 5, ["gradska", "istorijska"]);
        tours = [tura1, tura2, tura3];
        localStorage.setItem("tours", JSON.stringify(tours));
    }
}

function renderTable() {
    const tbody = document.querySelector(".tours-table tbody");
    tbody.innerHTML = "";

    tours.forEach((tura) => {
        let tr = document.createElement("tr");

        let tdNaziv = document.createElement("td");
        tdNaziv.textContent = tura.naziv;
        tr.appendChild(tdNaziv);

        let tdDuzina = document.createElement("td");
        tdDuzina.textContent = tura.duzina + " km";
        tr.appendChild(tdDuzina);

        tr.addEventListener("click", function() {
            displayDetails(tura);
        });

        tbody.appendChild(tr);
    });
}

function displayDetails(tura) {
    const detailsDiv = document.querySelector("#details");
    detailsDiv.innerHTML = "";

    let pNaziv = document.createElement("p");
    pNaziv.textContent = "Naziv: " + tura.naziv;

    let pDuzina = document.createElement("p");
    pDuzina.textContent = "Dužina: " + tura.duzina + " km";

    let pOpis = document.createElement("p");
    pOpis.textContent = "Opis: " + tura.opis;

    let pTagovi = document.createElement("p");
    pTagovi.textContent = "Tagovi: " + tura.tagovi.join(", ");

    detailsDiv.appendChild(pNaziv);
    detailsDiv.appendChild(pDuzina);
    detailsDiv.appendChild(pOpis);
    detailsDiv.appendChild(pTagovi);
}

function handleFormSubmission() {
    let submitBtn = document.querySelector('#submitBtn');
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const form = document.querySelector('#tourForm');
        const formData = new FormData(form);

        let naziv = formData.get('naziv');
        let duzina = parseInt(formData.get('duzina'));
        let opis = formData.get('opis');
        let tagovi = formData.get('tagovi').split(',').map(t => t.trim());

        const newTour = new Tura(naziv, opis, duzina, tagovi);
        tours.push(newTour);

        localStorage.setItem("tours", JSON.stringify(tours));

        renderTable();
        form.reset();
    });
}

window.addEventListener("DOMContentLoaded", function() {
    loadTours();
    renderTable();
    handleFormSubmission();
});