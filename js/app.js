console.log("prato fiorito");

// Definiamo il numero massimo di tentativi consentiti
let maxTentativi = 0;

// Inizializziamo l'array delle bombe
let bombe = [];

// Inizializziamo la variabile dei tentativi
let tentativi = 0;

let punteggio = 0;

// Variabile per non assegnare punti doppi per la singola cella
let cellePremute = [];

// Selezioniamo il pulsante "startGame" dalla pagina HTML
const startButton = document.querySelector("#startGame");

// Selezioniamo l'elemento con classe "griglia" dalla pagina HTML
const grigliaElement = document.querySelector(".griglia");

// Selezioniamo il pulsante "restartGame" dalla pagina HTML
const restartButton = document.querySelector("#restartGame");

// Selezioniamo la select per la scelta della difficoltà
const selectDifficulty = document.querySelector("#difficulty");

// Nascondiamo il pulsante "restartGame" all'inizio
restartButton.style.display = "none";

let caselleNonBombePremute = 0;

// Dichiariamo la variabile per il lato della griglia
let latoGriglia = 7;

// Selezioniamo le celle in base alla difficoltà
selectDifficulty.addEventListener("change", function () {
  if (selectDifficulty.value === "facile") {
    latoGriglia = 7;
  } else if (selectDifficulty.value === "medio") {
    latoGriglia = 9;
  } else if (selectDifficulty.value === "difficile") {
    latoGriglia = 10;
  } else if (selectDifficulty.value === "impossibile") {
    latoGriglia = 15;
  }
});
console.log(latoGriglia);

// Aggiungiamo un evento al clic sul pulsante "startGame"
startButton.addEventListener("click", function () {
  // Rimuoviamo il pulsante "startGame" dalla pagina
  document.querySelector("#startGame").style.display = "none";
  document.querySelector("#difficultySelector").style.display = "none";
  document.querySelector("#difficulty").style.display = "none";

  // Calcoliamo il numero totale di celle nella griglia
  const numeroCelle = latoGriglia * latoGriglia;

  // Definiamo il numero massimo di tentativi consentiti
  maxTentativi = numeroCelle - 16;

  // Generiamo l'array delle bombe
  function generaBombe() {
    bombe = [];
    let i = 0;
    while (i < 16) {
      let numero = Math.floor(Math.random() * numeroCelle) + 1;
      if (!isNaN(numero) && !bombe.includes(numero)) {
        bombe.push(numero);
        i++;

        console.log(bombe);
      }
    }
  }

  generaBombe();

  // Mostriamo il pulsante "restartGame"
  restartButton.style.display = "block";

  // Mostriamo il pulsante "restartGame"
  restartButton.style.display = "block";

  // Aggiungiamo un evento al clic sul pulsante "restartGame"
  restartButton.addEventListener("click", function () {
    // Ricarichiamo la pagina
    location.reload();
  });
  // Creiamo le celle della griglia e le aggiungiamo alla pagina
  for (let i = 1; i <= numeroCelle; i++) {
    let num = i;
    const cella = document.createElement("div");

    cella.classList.add("cella");

    cella.id = "cella-" + num;

    cella.style.width = "calc(100% / " + latoGriglia + ")";

    cella.innerHTML = num;

    grigliaElement.appendChild(cella);
    // Aggiungiamo un evento al clic sulla cella
    cella.addEventListener("click", function () {
      if (cellePremute.includes(cella.id)) {
        // La cella è già stata premuta, non fare niente
        return;
      }
      cellePremute.push(cella.id);

      if (bombe.includes(i)) {
        // Se la cella è una bomba, cambiamo il colore della cella in rosso e mostriamo un messaggio di sconfitta
        cella.style.backgroundColor = "red";
        document.querySelector(".punteggio").innerHTML =
          "Punteggio: " + punteggio;
        // Troviamo tutte le celle della griglia
        const celleGriglia = document.querySelectorAll(".cella");

        // Iteriamo su tutte le celle della griglia
        celleGriglia.forEach((cella) => {
          // Verifichiamo se la cella è una bomba o meno
          if (bombe.includes(parseInt(cella.id.split("-")[1]))) {
             // Troviamo tutte le celle della griglia
        const celleGriglia = document.querySelectorAll(".cella");

        // Iteriamo su tutte le celle della griglia
        celleGriglia.forEach((cella) => {
          // Verifichiamo se la cella è una bomba o meno
          if (bombe.includes(parseInt(cella.id.split("-")[1]))) {
            // Se la cella è una bomba, cambiamo il colore della cella in rosso
            cella.style.backgroundColor = "red";
            cella.innerHTML = "💣";
          } else {
            // Se la cella non è una bomba, cambiamo il colore della cella in oro
            cella.style.backgroundColor = "green";
          }
        });
            // Se la cella è una bomba, cambiamo il colore della cella in rosso
            cella.style.backgroundColor = "red";
            cella.innerHTML = "💣";
          } else {
            // Se la cella non è una bomba, cambiamo il colore della cella in oro
            cella.style.backgroundColor = "green";
          }
        });
        setTimeout(function () {
          alert("BOOM! Hai perso il gioco!");
          location.reload();
        }, 200);
      } else {
        // Se la cella non è una bomba, cambiamo il colore della cella in verde e incrementiamo la variabile dei tentativi
        cella.style.backgroundColor = "green";
        cella.innerHTML = "💣";
        tentativi++;
        caselleNonBombePremute++;
        punteggio = caselleNonBombePremute;
        document.querySelector(".punteggio").innerHTML =
          "Punteggio: " + punteggio;
        // Verifichiamo se il giocatore ha vinto o meno
        if (tentativi === maxTentativi) {
           // Troviamo tutte le celle della griglia
        const celleGriglia = document.querySelectorAll(".cella");

        // Iteriamo su tutte le celle della griglia
        celleGriglia.forEach((cella) => {
          // Verifichiamo se la cella è una bomba o meno
          if (bombe.includes(parseInt(cella.id.split("-")[1]))) {
            // Se la cella è una bomba, cambiamo il colore della cella in rosso
            cella.style.backgroundColor = "red";
            cella.innerHTML = "💣";
          } else {
            // Se la cella non è una bomba, cambiamo il colore della cella in oro
            cella.style.backgroundColor = "gold";
          }
        });
          setTimeout(function () {
            alert("Complimenti! Hai vinto il gioco!");
            location.reload();
          }, 200);
        }
      }
    });
  }
});
