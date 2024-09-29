// =======================
// Globale variabler
// =======================

// Variabler til brugerens og computerens navne og score
let brugerNavn = "";
let computerNavn = "";
let spillerScore = 0;
let computerScore = 0;

// =======================
// Funktion: FunktionNavn
// =======================

// Funktion til at hente brugerens navn og vise det på skærmen
function hentNavn() {
  brugerNavn = prompt("Skriv dit navn:") || "Jane Doe"; // Standard navn
  opdaterBrugerNavn(brugerNavn);
  genererComputerNavn();
}

// Funktion til at opdatere brugerens navn
// TODO - kan muligvis undværeres
function opdaterBrugerNavn(_brugerNavn) {
  let usernameDiv = document.querySelector("#username");
  usernameDiv.innerHTML = `<h1>Spiller:</h1><p>${_brugerNavn}</p>`;
}

// Funktion til at generere et tilfældigt navn til computeren
function genererComputerNavn() {
  const navneListe = ["Robo", "Cyborg", "AI-master", "Botzilla", "Compu-king"];
  const randomIndex = Math.floor(Math.random() * navneListe.length);
  computerNavn = navneListe[randomIndex];
  opdaterComputerNavn(computerNavn);
}

// Funktion til at opdatere computerens navn
function opdaterComputerNavn(navn) {
  let computerDiv = document.querySelector("#computer-label");
  computerDiv.innerHTML = `<h1>Computer:</h1><p>${navn}</p>`;
}

// Funktion til at håndtere spillerens valg
function spillerValg(valg) {
  const computerValg = genererComputerValg();
  const vinder = vurderVinder(valg, computerValg);
  visResultat(vinder);
  opdaterValg(valg, computerValg);
}

// Funktion til at generere computerens valg
function genererComputerValg() {
  const valg = ["sten", "papir", "saks"];
  return valg[Math.floor(Math.random() * valg.length)];
}

// Funktion til at vurdere vinderen
function vurderVinder(brugerValg, computerValg) {
  if (brugerValg === computerValg) {
    return "Uafgjort!";
  } else if (
    (brugerValg === "sten" && computerValg === "saks") ||
    (brugerValg === "papir" && computerValg === "sten") ||
    (brugerValg === "saks" && computerValg === "papir")
  ) {
    spillerScore++;
    opdaterScore();
    return brugerNavn; // Bruger vinder
  } else {
    computerScore++;
    opdaterScore();
    return computerNavn; // Computer vinder
  }
}

// Funktion til at vise resultatet
function visResultat(vinder) {
  let resultatDiv = document.querySelector("#result");

  // Ryd tidligere klasser
  resultatDiv.classList.remove("resultat-vinder", "resultat-tab", "resultat-uafgjort");

  // Tjek om der er uafgjort, eller hvem vinderen er
  if (vinder === "Uafgjort!") {
    resultatDiv.innerHTML = "Det blev uafgjort!<br>NEVER GIVE UP O.G!";
    resultatDiv.classList.add("resultat-uafgjort"); // Tilføj uafgjort-stil
  } else if (vinder === brugerNavn) {
    resultatDiv.innerHTML = `${brugerNavn} vandt!<br>SIKKER SEJR VATO!<br>`;
    resultatDiv.classList.add("resultat-vinder"); // Tilføj bruger-vinder stil
  } else {
    resultatDiv.innerHTML = `${computerNavn} vandt! <br> NO CHANCE MI AMIGO!`;
    resultatDiv.classList.add("resultat-tab"); // Tilføj computer-vinder stil
  }
}

//Funktion til at opdatere score
function opdaterScore() {
  let scoreDiv = document.querySelector("#score");
  scoreDiv.textContent = `Spiller: ${spillerScore} | Computer: ${computerScore}`;
}

// Funktion til at opdatere valgene
function opdaterValg(brugerValg, computerValg) {
  document.getElementById("user-choice").textContent =
    `${brugerNavn}: ` + brugerValg.charAt(0).toUpperCase() + brugerValg.slice(1);
  document.getElementById("computer-choice").textContent =
    `${computerNavn}: ` + computerValg.charAt(0).toUpperCase() + computerValg.slice(1);
}

// Kalder funktionen første gang
hentNavn();

// Tilføjer event listeners til knapperne
document.getElementById("sten").addEventListener("click", function () {
  spillerValg("sten");
});
document.getElementById("papir").addEventListener("click", function () {
  spillerValg("papir");
});
document.getElementById("saks").addEventListener("click", function () {
  spillerValg("saks");
});
