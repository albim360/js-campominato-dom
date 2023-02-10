console.log("prato fiorito");

// Dichiariamo la variabile per il lato della griglia
let latoGriglia = 10;

// Calcoliamo il numero totale di celle nella griglia
let numeroCelle = latoGriglia * latoGriglia;

let bombe = [];

// Selezioniamo il pulsante "startGame" dalla pagina HTML
const startButton = document.querySelector("#startGame");

// Selezioniamo l'elemento con classe "griglia" dalla pagina HTML
const grigliaElement = document.querySelector(".griglia");

// Selezioniamo il pulsante "restartGame" dalla pagina HTML
const restartButton = document.querySelector("#restartGame");

// Nascondiamo il pulsante "restartGame" all'inizio
restartButton.style.display = "none";

// Aggiungiamo un evento al clic sul pulsante "startGame"
startButton.addEventListener("click", function () {
  // Rimuoviamo il pulsante "startGame" dalla pagina
  document.querySelector("#startGame").remove();

  for (let i = 0; i < 16; i++) {
    const numero = Math.floor(Math.random() * numeroCelle) + 1;
    bombe.push(numero);

    console.log(bombe)
  }


  // Mostriamo il pulsante "restartGame"
  restartButton.style.display = "block";

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
  const cella = document.querySelectorAll(".cella");

  // Iteriamo su ogni cella e associamo l'evento "click"
  cella.forEach(function (cella) {
    cella.addEventListener("click", function () {
      cella.classList.add("bg-green");
      // Logghiamo l'ID della cella cliccata
      console.log(cella.id.split("-")[1]);
      if (cella.id == bombe){
        alert('Hai perso!')
      }
    });
  });
});


// Aggiungiamo un evento al clic sul pulsante "restartGame"
restartButton.addEventListener("click", function () {
  grigliaElement.innerHTML = "";

  for (let i = 0; i < numeroCelle; i++) {
    let num = i + 1;
    let divString =
      "<div class='cella' id='cella-" +
      num +
      "' style='width: calc(100% / " +
      latoGriglia +
      ")'>" +
      num +
      "</div>";
    grigliaElement.innerHTML += divString;
  }

  const cella = document.querySelectorAll(".cella");
  cella.forEach(function (cella) {
    cella.addEventListener("click", function () {
      cella.classList.add("bg-green");
    });
  });
});
