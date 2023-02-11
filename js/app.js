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

// Nascondiamo il pulsante "restartGame" all'inizio
restartButton.style.display = "none";

let caselleNonBombePremute = 0;

// Aggiungiamo un evento al clic sul pulsante "startGame"
startButton.addEventListener("click", function () {
// Rimuoviamo il pulsante "startGame" dalla pagina
document.querySelector("#startGame").style.display = "none";

// Generiamo l'array delle bombe
function generaBombe() {
bombe = [];
for (let i = 0; i < 16; i++) {
let numero = Math.floor(Math.random() * numeroCelle) + 1;
  // Verifichiamo che il numero non sia già presente nell'array e che non si ripeta la posizione
  while (bombe.includes(numero) || (i === 0 && numero === 1) || bombe.includes(numero - 1) || bombe.includes(numero + 1) || bombe.includes(numero + latoGriglia) || bombe.includes(numero - latoGriglia)) {
    numero = Math.floor(Math.random() * numeroCelle) + 1;
  }

  bombe.push(numero);
  console.log(bombe);
}
}

generaBombe();

// Mostriamo il pulsante "restartGame"
restartButton.style.display = "block";

restartButton.addEventListener("click", function () {
// Reset del gioco
bombe = [];
tentativi = 0;
punteggio = 0;
caselleNonBombePremute = 0;
grigliaElement.innerHTML = "";
startButton.click();
});

// Creiamo un ciclo per generare tutte le celle della griglia
for (let i = 0; i < numeroCelle; i++) {
let num = i + 1;
// Creiamo una stringa HTML per ogni cella
let divString =
"<div class='cella' id='cella-" +
   num +
   "' style='width: calc(100% / " +
   latoGriglia +
   ")'>" +
num +
"</div>";
// Aggiungiamo la stringa HTML all'elemento della griglia
grigliaElement.innerHTML += divString;
}

// Selezioniamo tutti gli elementi con classe "cella" dalla pagina HTML
const celle = document.querySelectorAll(".cella");

// Iteriamo su ogni cella e associamo l'evento "click"
celle.forEach(function (cella) {
  cella.addEventListener("click", function () {
  if (cella.classList.contains("bg-green") || cella.classList.contains("bg-red")) {
  // Se la cella è già stata cliccata, esci dalla funzione
  return;
  }
  // Se la cella non è una bomba, coloriamola di verde e incrementiamo il punteggio
  if (!bombe.includes(parseInt(cella.id.split("-")[1]))) {
  cella.classList.add("bg-green");
  caselleNonBombePremute++;
  // Se sono state premute tutte le caselle non bombe, l'utente ha vinto
  if (caselleNonBombePremute === numeroCelle - 16) {
  alert("Hai vinto! Punteggio: " + caselleNonBombePremute);
  }
  } else {
  // Se la cella è una bomba, coloriamola di rosso e terminiamo il gioco
  cella.classList.add("bg-red");
  alert("Hai perso! Punteggio: " + caselleNonBombePremute);
  
    // Reset del gioco
    setTimeout(function() {
      bombe = [];
      tentativi = 0;
      punteggio = 0;
      caselleNonBombePremute = 0;
      grigliaElement.innerHTML = "";
      startButton.click();
    },);
  }
  tentativi++;
  
  // Se il numero di tentativi raggiunge il massimo consentito, terminiamo il gioco
  if (tentativi === maxTentativi) {
    alert("Hai perso! Punteggio: " + caselleNonBombePremute);
  
    // Reset del gioco
    setTimeout(function() {
      bombe = [];
      tentativi = 0;
      punteggio = 0;
      caselleNonBombePremute = 0;
      grigliaElement.innerHTML = "";
      startButton.click();
    }, );
  }
});
})});  