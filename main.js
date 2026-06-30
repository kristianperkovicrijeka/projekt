document.addEventListener("DOMContentLoaded", () => {
    // 1. Dinamički pozdrav prema dobu dana u zaglavlju
    const porukaPozdrava = document.getElementById("poruka-pozdrava");
    const trenutniSat = new Date().getHours();
    let pozdrav = "Dobrodošli učenici! 🎓";

    if (trenutniSat >= 5 && trenutniSat < 12) {
        pozdrav = "Dobro jutro! Spremni za nove školske pobjede? 🌅";
    } else if (trenutniSat >= 12 && trenutniSat < 18) {
        pozdrav = "Dobar dan! Trebaš pomoć oko zadaće ili gradiva? 👨‍🏫";
    } else if (trenutniSat >= 18 && trenutniSat < 22) {
        pozdrav = "Dobra večer! Idealno vrijeme za ponavljanje pred ispite. 📚";
    } else {
        pozdrav = "Kasno je, vrijeme je za odmor! Vidimo se sutra na satovima. 🌙";
    }

    if (porukaPozdrava) {
        porukaPozdrava.innerText = pozdrav;
    }
    // 2. Dohvaćanje vremenske prognoze na dnu stranice
    const vrijemePodaci = document.getElementById("vrijeme-podaci");
    const apiURL = "http://127.0.0.1:5001/index.html"; 

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Mreža ne odgovara pravilno ili server nije dostupan.");
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                vrijemePodaci.innerText = data.error;
            } else {
                vrijemePodaci.innerHTML = `
                    <span style="font-size: 1.5rem; font-weight: bold; color: #28a745;">${data.temperatura}°C</span><br>
                    <small>Brzina vjetra: ${data.brzina_vjetra} km/h</small><br>
                `;
            }
        })
        .catch(error => {
            console.error("Greška pri dohvaćanju prognoze:", error);
            vrijemePodaci.innerHTML = `
                <span style='color: #dc3545; font-weight: bold;'>Flask poslužitelj nije pokrenut.</span><br>
            `;
        });
});