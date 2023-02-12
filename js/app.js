console.log("prato fiorito");

// Dichiariamo la variabile per il lato della griglia
let latoGriglia = 10;

// Calcoliamo il numero totale di celle nella griglia
let numeroCelle = latoGriglia * latoGriglia;

// Definiamo il numero massimo di tentativi consentiti
let maxTentativi = numeroCelle - 16;

// Inizializziamo l'array delle bombe
let bombe = [];

// Inizializziamo la variabile dei tentativi
let tentativi = 0;

let punteggio = 0;

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

// Aggiungiamo un evento al clic sul pulsante "startGame"
startButton.addEventListener("click", function () {
  // Rimuoviamo il pulsante "startGame" dalla pagina
  document.querySelector("#startGame").style.display = "none";
  document.querySelector('#difficultySelector').style.display= 'none';
  document.querySelector('#difficulty').style.display= 'none';

  // Selezioniamo le celle in base alla difficolta
  if (selectDifficulty.value === "1") {
    latoGriglia = 7;
    numeroCelle = 49;
  } else if (selectDifficulty.value === "2") {
    latoGriglia = 9;
    numeroCelle = 81;
  } else if (selectDifficulty.value === "3") {
    latoGriglia = 10;
    numeroCelle = 100;
  }
  


  // Impostiamo il lato della griglia in base alla difficoltà selezionata
  if (selectDifficulty.value === "1") {
    latoGriglia = 10;
    numeroCelle = 49;
  } else if (selectDifficulty.value === "2") {
    latoGriglia = 9;
    numeroCelle = 81;
  } else if (selectDifficulty.value === "3") {
    latoGriglia = 7;
    numeroCelle = 100;
  }

  // Ricalcoliamo il numero massimo di tentativi consentiti
  maxTentativi = numeroCelle - 16;

  // Generiamo l'array delle bombe
  function generaBombe() {
    bombe = [];
    for (let i = 0; i < 16; i++) {
      let numero = i + 1;
      // Verifichiamo che il numero non sia già presente nell'array e che non si ripeta la posizione
      while (
        bombe.includes(numero) ||
        bombe.includes(numero - 1) ||
        bombe.includes(numero + 1) ||
        bombe.includes(numero + latoGriglia) ||
        bombe.includes(numero - latoGriglia)
      ) {
        numero = Math.floor(Math.random() * numeroCelle) + 1;
      }
      bombe.push(numero);
      console.log(bombe);
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
      // Verifichiamo se la cella è una bomba o meno
      if (bombe.includes(i)) {
        // Se la cella è una bomba, cambiamo il colore della cella in rosso e mostriamo un messaggio di sconfitta
        cella.style.backgroundColor = "red";
        document.querySelector(".punteggio").innerHTML ='Punteggio: ' + punteggio;
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
        document.querySelector(".punteggio").innerHTML = 'Punteggio: ' + punteggio;
        // Verifichiamo se il giocatore ha vinto o meno
        if (tentativi === maxTentativi) {
          setTimeout(function () {
            alert("Complimenti! Hai vinto il gioco!");
            location.reload();
          }, 200);
        }
      }
    });
  }
});
