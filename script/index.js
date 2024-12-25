// programma di natale ==> lingua del programma inglese (fa più figo)
// data di inizio: 25 dicembre 2024
// file js collegati -> penso di utilizzare più file js non solamente index.js

// mi abilito ad utilizzare un griglia a due dimensioni 2D (globale) 
// array multidimensionale
let grid = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 0],
];

// funzione per la creazione di una casella
// !crea 1 sola cella!
function genCell() {
    // genero riga e la cella (aggiungo 1 per evitare che esca 0)
    let row = Math.floor(Math.random() * 4) + 1;
    let cell = Math.floor(Math.random() * 4) + 1;

    // genero un numero tra 2 e 4
    const numGenerateable = [2, 4];
    let prob = Math.random(); // da qua esce un valore compreso da 0 a 1
    // sapendo che prob è 0 < prob < 1 assegno ad n il valore a seconda della probabilità
    let n = prob < 0.666 ? numGenerateable[0] : numGenerateable[1];

    // console.log(`${row} - ${cell}`);
    document.getElementById(`${row} - ${cell}`).innerHTML = n;
}

// gestione della funzione per creare la tabella 4x4
// ho la possibilità di richiamarla quando voglio
function genBoard() {
    // variabili necessarie per gli id
    let r = 0;
    let c = 0;
    // inizializzo la tabella
    let gameBoard = document.getElementById('game-board');
    // per generare la riga
    for (let i = 0; i < 4; i++) {
        // incremento
        r++;
        c = 0;
        const newTr = document.createElement('tr');
        // per generare le 4 celle per la riga appena creata
        for (let j = 0; j < 4; j++) {
            // incremento
            c++;
            const newTd = document.createElement('td');
            newTd.textContent = 'ciao';
            newTd.id = `${r} - ${c}`;
            // collego subito alla riga
            newTr.appendChild(newTd);
        }
        // riga alla tabella
        gameBoard.appendChild(newTr);
    }
    // appendo tutto al body
    document.body.appendChild(gameBoard);
}

// gestione dei tasti funzione, usando la funzione move
// tasti grezzi su, giu, destra, sinistra => prima versione
// funzione move passando che tasto ha premuto
function move(key) {
    console.log(key);

    // uso uno switch per direzionare le giuste funzioni
    switch (key) {
        case 'up':
            moveUp();
            break;
        case 'down':
            moveDown();
            break;
        case 'right':
            moveRight();
            break;
        case 'left':
            moveLeft();
            break;
        default:
            alert('ERRORE: Il tasto da te premuto non può avere effetto nel gioco! Riprova!');
            break;
    }
}

// QUI CI SONO TUTTE LE FUNZIONI PER LO SPOSTAMENTO
// ⛔️ ATTENZIONE TOCCARE CON CURA ⛔️
function moveUp() {
    for (let col = 0; col < 4; col++) {
      let currentCol = []; // "estraggo" la colonna
      for (let row = 0; row < 4; row++) {
        currentCol.push(grid[row][col]);
      }
  
      // rimuovo gli zeri
      let filteredCol = [];
      for (let i = 0; i < currentCol.length; i++) {
        if (currentCol[i] !== 0) {
          filteredCol.push(currentCol[i]);
        }
      }
  
      // unisco i numeri uguali
      for (let i = 0; i < filteredCol.length - 1; i++) {
        if (filteredCol[i] === filteredCol[i + 1]) {
          filteredCol[i] *= 2; // somma
          filteredCol[i + 1] = 0; // elimino il secondo numero
        }
      }
  
      // pusho la nuova figa colonna
      let newCol = [];
      for (let i = 0; i < filteredCol.length; i++) {
        if (filteredCol[i] !== 0) {
          newCol.push(filteredCol[i]);
        }
      }
      console.log(newCol)
  
      // riempo con degli 0 i posti che sarebbero 'undefined'
      while (newCol.length < 4) {
        newCol.push(0);
      }
  
      console.log(`Colonna modificata (${col}):`, newCol);
  
      // aggiorna la griglia 2D
      for (let row = 0; row < 4; row++) {
        grid[row][col] = newCol[row];
      }

      // aggiorna la griglia ufficiale
      relGridUpDown(col, newCol);
    }
    console.log("Griglia aggiornata:", grid);
}
// ----------------- //
function moveDown() {
    for (let col = 0; col < 4; col++) {
        let currentCol = []; // "estraggo" la colonna
        for (let row = 0; row < 4; row++) {
            currentCol.push(grid[row][col]);
        }
  
    // rimuovo gli zeri
    let filteredCol = [];
    for (let i = 0; i < currentCol.length; i++) {
        if (currentCol[i] !== 0) {
            filteredCol.push(currentCol[i]);
        }
    }
  
    // unisco i numeri uguali (partendo dalla fine della colonna)
    for (let i = filteredCol.length - 1; i > 0; i--) {
        if (filteredCol[i] === filteredCol[i - 1]) {
            filteredCol[i] *= 2; // somma
            filteredCol[i - 1] = 0; // elimina il secondo numero
    }
    }
  
    // rimuovo gli zeri dopo l'unione
    let newCol = [];
    for (let i = filteredCol.length - 1; i >= 0; i--) {
        if (filteredCol[i] !== 0) {
            newCol.push(filteredCol[i]);
        }
    }
  
    // riempo con degli 0 fino a 4
    while (newCol.length < 4) {
        newCol.unshift(0); // aggiungo zeri all'inizio
    }
  
    console.log(`colonna modificata (${col}):`, newCol);
  
    // aggiorno la griglia
    for (let row = 0; row < 4; row++) {
        grid[row][col] = newCol[row];
    }

    // aggiorna la griglia ufficiale
    relGridUpDown(col, newCol);
    }
    console.log("griglia aggiornata:", grid);
}
// ----------------- //
function moveRight() {
    for (let row = 0; row < 4; row++) {
        let currentRow = []; // "estraggo" la riga
        for (let col = 0; col < 4; col++) {
            currentRow.push(grid[row][col]);
        }

        // rimuovo gli zeri
        let filteredRow = [];
        for (let i = 0; i < currentRow.length; i++) {
            if (currentRow[i] !== 0) {
            filteredRow.push(currentRow[i]);
            }
        }

        // unisco i numeri uguali (partendo dalla fine della riga)
        for (let i = filteredRow.length - 1; i > 0; i--) {
            if (filteredRow[i] === filteredRow[i - 1]) {
            filteredRow[i] *= 2; // somma
            filteredRow[i - 1] = 0; // elimina il secondo numero
            }
        }

        // rimuovo gli zeri dopo l'unione
        let newRow = [];
        for (let i = filteredRow.length - 1; i >= 0; i--) {
            if (filteredRow[i] !== 0) {
            newRow.push(filteredRow[i]);
            }
        }

        // riempio con degli 0 fino a 4
        while (newRow.length < 4) {
            newRow.unshift(0); // aggiungo zeri all'inizio
        }

        console.log(`riga modificata (${row}):`, newRow);

        // aggiorno la griglia
        for (let col = 0; col < 4; col++) {
            grid[row][col] = newRow[col];
        }

        relGridRightLeft(row, newRow);
    }
    console.log("griglia aggiornata:", grid);
}
// ----------------- //
function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let currentRow = []; // "estraggo" la riga
        for (let col = 0; col < 4; col++) {
            currentRow.push(grid[row][col]);
        }

        // rimuovo gli zeri
        let filteredRow = [];
        for (let i = 0; i < currentRow.length; i++) {
            if (currentRow[i] !== 0) {
                filteredRow.push(currentRow[i]);
            }
        }

        // unisco i numeri uguali (partendo dall'inizio della riga)
        for (let i = 0; i < filteredRow.length - 1; i++) {
            if (filteredRow[i] === filteredRow[i + 1]) {
                filteredRow[i] *= 2; // somma
                filteredRow[i + 1] = 0; // elimina il secondo numero
            }
        }

        // rimuovo gli zeri dopo l'unione
        let newRow = [];
        for (let i = 0; i < filteredRow.length; i++) {
            if (filteredRow[i] !== 0) {
                newRow.push(filteredRow[i]);
            }
        }

        // riempio con degli 0 fino a 4
        while (newRow.length < 4) {
            newRow.push(0); // aggiungo zeri alla fine
        }

        console.log(`riga modificata (${row}):`, newRow);

        // aggiorno la griglia
        for (let col = 0; col < 4; col++) {
            grid[row][col] = newRow[col];
        }

        relGridRightLeft(row, newRow);
    }
    console.log("griglia aggiornata:", grid);
}

// funzione per aggiornare la griglia nella tabella html
function relGridUpDown(col, newCol) {
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        grid[rowIndex][col] = newCol[rowIndex];
        document.getElementById(`${rowIndex + 1} - ${col + 1}`).innerHTML = grid[rowIndex][col]; // aggiorna la cella
    }
}

function relGridRightLeft(row, newRow) {
    for (let col = 0; col < 4; col++) {
        grid[row][col] = newRow[col];
        document.getElementById(`${row + 1} - ${col + 1}`).innerHTML = grid[row][col]; // aggiorna la cella
    }
}