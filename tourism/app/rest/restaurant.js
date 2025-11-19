    'use strict'

    class Restoran {
        constructor(naziv, opis, kuhinje) {
            this.naziv = naziv;
            this.opis = opis;
            this.kuhinje = kuhinje;
        }
    }

    let restaurants = [];
    let currentCuisines = [];

    function loadRestaurants() {
        let data = localStorage.getItem("restaurants");
        if (data) {
            let parsed = JSON.parse(data);
            restaurants = parsed.map(r => new Restoran(r.naziv, r.opis, r.kuhinje));
        } else {
            let r1 = new Restoran("Italijanski kutak", "Autentični ukusi Italije u centru grada.", ["Italijanska"]);
            let r2 = new Restoran("Azijski raj", "Fuzija ukusa Dalekog istoka.", ["Azijska", "Tajlandska"]);
            let r3 = new Restoran("Gurmanova oaza", "Domaća atmosfera i velike porcije.", ["Srpska", "Balkanska"]);
            restaurants = [r1, r2, r3];
            localStorage.setItem("restaurants", JSON.stringify(restaurants));
        }
    }

    function renderTable() {
        const tbody = document.querySelector(".restaurants-table tbody");
        if (!tbody) return;
        tbody.innerHTML = "";

        restaurants.forEach((restoran) => {
            let tr = document.createElement("tr");

            let tdNaziv = document.createElement("td");
            tdNaziv.textContent = restoran.naziv;
            tr.appendChild(tdNaziv);

            let tdKuhinje = document.createElement("td");
            tdKuhinje.textContent = restoran.kuhinje.join(", ");
            tr.appendChild(tdKuhinje);

            tr.addEventListener("click", function () {
                displayDetails(restoran);
            });

            tbody.appendChild(tr);
        });
    }

    function displayDetails(restoran) {
        const detailsDiv = document.querySelector("#details");
        if (!detailsDiv) return;
        detailsDiv.innerHTML = "";

        let pNaziv = document.createElement("p");
        pNaziv.innerHTML = restoran.naziv;

        let pKuhinja = document.createElement("p");
        pKuhinja.innerHTML = "<strong>Tip kuhinje:</strong> " + restoran.kuhinje.join(", ");

        let pOpis = document.createElement("p");
        pOpis.innerHTML = "<strong>Opis:</strong> " + restoran.opis;

        detailsDiv.appendChild(pNaziv);
        detailsDiv.appendChild(pKuhinja);
        detailsDiv.appendChild(pOpis);
    }

    function renderCuisineChips(){

        const chipsDiv = document.querySelector("#cuisineChips");
        if (!chipsDiv) return;
        chipsDiv.innerHTML = "";

        currentCuisines.forEach((k, index) => {
            const span = document.createElement("span");
            span.className = "chip";
            span.textContent = k;

            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = "x";
            btn.addEventListener("click", function () {
                currentCuisines.splice(index, 1);
                renderCuisineChips();
            });

            span.appendChild(btn);
            chipsDiv.appendChild(span);
        });
    }

    function setupCuisineAdding() {
        const addBtn = document.querySelector("#addCuisineBtn");
        const input = document.querySelector("#kuhinjaInput");

        if (!addBtn || !input) return;

        addBtn.addEventListener("click", function () {
            let value = input.value.trim();
            if (!value) return;

            currentCuisines.push(value);
            input.value = "";
            renderCuisineChips();
        });
    }

    function handleFormSubmission() {
        const form = document.querySelector("#restaurantForm");
        if (!form) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let naziv = document.querySelector("#naziv").value.trim();
            let opis = document.querySelector("#opis").value.trim();
            // tip i duzina ne koristimo u modelu, zadatak traži: naziv, opis, tipovi kuhinje

            if (!naziv || !opis || currentCuisines.length === 0) {
                alert("Molimo popunite Naziv, Opis i bar jednu kuhinju.");
                return;
            }

            const newRestaurant = new Restoran(naziv, opis, [...currentCuisines]);
            restaurants.push(newRestaurant);
            localStorage.setItem("restaurants", JSON.stringify(restaurants));

            renderTable();
            form.reset();
            currentCuisines = [];
            renderCuisineChips();
        });
    }

    window.addEventListener("DOMContentLoaded", function () {
        loadRestaurants();
        renderTable();
        setupCuisineAdding();
        handleFormSubmission();
    });
