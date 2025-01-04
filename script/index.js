// programma di natale ==> lingua del programma inglese (fa più figo)
// data di inizio: 25 dicembre 2024
// file js collegati -> penso di utilizzare più file js non solamente index.js

// mi abilito ad utilizzare un griglia a due dimensioni 2D (globale) 
// array multidimensionale
let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let score = 0;

// funzione per la creazione di una casella
// !crea 1 sola cella!
// funzione per la creazione di una casella
function genCell() {
    // trovo tutte le celle vuote
    let celleVuote = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                celleVuote.push({ row, col });
            }
        }
    }

    // se ci sono celle vuote, scelgo una a caso
    if (celleVuote.length > 0) {
        let scelta = celleVuote[Math.floor(Math.random() * celleVuote.length)];
        let row = scelta.row;
        let col = scelta.col;

        // genera un numero tra 2 e 4
        const numGenerateable = [2, 4];
        let prob = Math.random();
        let n = prob <= 0.666 ? numGenerateable[0] : numGenerateable[1];

        // aggiorna la griglia
        grid[row][col] = n;

        // trova la cella nella tabella e aggiorna il contenuto
        let cellElement = document.getElementById(`${row + 1} - ${col + 1}`);
        if (cellElement) {
            cellElement.innerHTML = n; // imposta il valore della cella
        }
    } else {
        console.log("Nessuna cella vuota disponibile.");
    }
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
            newTd.textContent = 0;
            newTd.id = `${r} - ${c}`;
            // collego subito alla riga
            newTr.appendChild(newTd);
        }
        // riga alla tabella
        gameBoard.appendChild(newTr);
    }
    // genero due celle random
    genCell();
    genCell();
}

// attribuire il data-value ad ogni cella
// utile per il css
function relTable() {
    document.querySelectorAll('#game-board td').forEach(cell => {
        const value = parseInt(cell.innerText, 10); // ottengo il valore della cella (in base 10 ovvio)
        cell.setAttribute('data-value', value);    // imposto il valore nel data-value
    });    

    document.querySelectorAll('#game-board-natalizia td').forEach(cell => {
        const value = parseInt(cell.innerText, 10); // ottengo il valore della cella (in base 10 ovvio)
        cell.setAttribute('data-value', value);    // imposto il valore nel data-value
    });  
}


// gestione dei tasti funzione, usando la funzione move
// tasti grezzi su, giu, destra, sinistra => prima versione
// funzione move passando che tasto ha premuto
function move(key) {
    // controllo se hai perso
    let isGameOverResult = isGameOver();
    console.log(isGameOverResult);

    if (isGameOverResult) {
        alert('hai perso');
    }

    // salvo lo stato originale della griglia
    const originalGrid = JSON.stringify(grid);

    // movimento con uno switch
    switch (key) {
        case 'up':
            moveUp();
            break;
        case 'down':
            moveDown();
            break;
        case 'left':
            moveLeft();
            break;
        case 'right':
            moveRight();
            break;
    }

    // confronto lo stato della griglia prima e dopo
    const newGrid = JSON.stringify(grid);

    if (originalGrid !== newGrid) {
        // genro una nuova cella solo se la griglia è cambiata
        genCell();
    }
    
    updateScore(); // aggiorno lo score
    relTable();
}

// QUI CI SONO TUTTE LE FUNZIONI PER LO SPOSTAMENTO
// ⛔️ ATTENZIONE TOCCARE CON CURA ⛔️
function moveUp() {
    for (let col = 0; col < 4; col++) {
        let currentCol = [];
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
        
        // unisco i numeri uguali (partendo dall'inizio della colonna)
        let i = 0;
        while (i < filteredCol.length - 1) {
            if (filteredCol[i] === filteredCol[i + 1]) {
                filteredCol[i] *= 2; // somma
                score += filteredCol[i]; // incremento lo score
                filteredCol[i + 1] = 0; // azzera il secondo numero
                i += 2; // salto l'elemento appena unito
            } else {
                i++; // solo se non unisco i numeri, passo al prossimo
            }
        }
        
        // rimuovo gli zeri dopo l'unione
        let newCol = [];
        for (let i = 0; i < filteredCol.length; i++) {
            if (filteredCol[i] !== 0) {
                newCol.push(filteredCol[i]);
            }
        }
        
        // riempio con degli 0 fino a 4
        while (newCol.length < 4) {
            newCol.push(0); // aggiungo zeri alla fine
        }
        
        console.log(`Colonna modificata (${col}):`, newCol);
        
        // aggiorno la griglia
        for (let row = 0; row < 4; row++) {
            grid[row][col] = newCol[row];
        }
        
        // aggiorna la griglia ufficiale
        relGridUpDown(col, newCol);
    }
    console.log("Griglia aggiornata:", grid);
    
    // controllo se hai vinto
    let is2048 = checkVictory();
    
    if (is2048) {
        return;
    }
}
// ----------------- //
function moveDown() {
    for (let col = 0; col < 4; col++) {
        let currentCol = [];
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
        let i = filteredCol.length - 1;
        while (i > 0) {
            if (filteredCol[i] === filteredCol[i - 1]) {
                filteredCol[i] *= 2; // somma
                score += filteredCol[i]; // incremento lo score
                filteredCol[i - 1] = 0; // azzera il secondo numero
                i -= 2; // salto l'elemento appena unito
            } else {
                i--; // solo se non unisco i numeri, passo al prossimo
            }
        }
        
        // rimuovo gli zeri dopo l'unione
        let newCol = [];
        for (let i = 0; i < filteredCol.length; i++) {
            if (filteredCol[i] !== 0) {
                newCol.push(filteredCol[i]);
            }
        }
        
        // riempio con degli 0 fino a 4
        while (newCol.length < 4) {
            newCol.unshift(0); // aggiungo zeri all'inizio
        }
        
        console.log(`Colonna modificata (${col}):`, newCol);
        
        // aggiorno la griglia
        for (let row = 0; row < 4; row++) {
            grid[row][col] = newCol[row];
        }
        
        // aggiorna la griglia ufficiale
        relGridUpDown(col, newCol);
    }
    console.log("Griglia aggiornata:", grid);
    
    // controllo se hai vinto
    let is2048 = checkVictory();
    
    if (is2048) {
        return;
    }
}
// ----------------- //
function moveRight() {
    for (let row = 0; row < 4; row++) {
        let currentRow = [];
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
        let i = filteredRow.length - 1;
        while (i > 0) {
            if (filteredRow[i] === filteredRow[i - 1]) {
                filteredRow[i] *= 2; // somma
                score += filteredRow[i]; // incremento lo score
                filteredRow[i - 1] = 0; // azzera il secondo numero
                i -= 2; // salto l'elemento appena unito
            } else {
                i--; // solo se non unisco i numeri, passo al prossimo
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
            newRow.unshift(0); // aggiungo zeri all'inizio
        }
        
        console.log(`Riga modificata (${row}):`, newRow);
        
        // aggiorno la griglia
        for (let col = 0; col < 4; col++) {
            grid[row][col] = newRow[col];
        }
        
        // aggiorna la griglia ufficiale
        relGridRightLeft(row, newRow);
    }
    console.log("Griglia aggiornata:", grid);
    
    // controllo se hai vinto
    let is2048 = checkVictory();
    
    if (is2048) {
        return;
    }
}
// ----------------- //
function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let currentRow = [];
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
                score += filteredRow[i]; // incremento lo score
                filteredRow[i + 1] = 0; // azzera il secondo numero
                i++; // salto l'elemento appena unito
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
        
        console.log(`Riga modificata (${row}):`, newRow);
        
        // aggiorno la griglia
        for (let col = 0; col < 4; col++) {
            grid[row][col] = newRow[col];
        }
        
        // aggiorna la griglia ufficiale
        relGridRightLeft(row, newRow);
    }
    console.log("Griglia aggiornata:", grid);
    
    // controllo se hai vinto
    let is2048 = checkVictory();
    
    if (is2048) {
        return;
    }
}

// funzione per aggiornare la griglia nella tabella html
function relGridUpDown(col, newCol) {
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        grid[rowIndex][col] = newCol[rowIndex];
        document.getElementById(`${rowIndex + 1} - ${col + 1}`).innerHTML = grid[rowIndex][col]; // aggiorna la cella
    }
    relTable();
}

function relGridRightLeft(row, newRow) {
    for (let col = 0; col < 4; col++) {
        grid[row][col] = newRow[col];
        document.getElementById(`${row + 1} - ${col + 1}`).innerHTML = grid[row][col]; // aggiorna la cella
    }
    relTable();
}

// ⛔️ game over ⛔️
function isGameOver() {
    // Controlla le mosse orizzontali
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[row][col] === grid[row][col + 1] || grid[row][col] === 0 || grid[row][col + 1] === 0) {
                return false; // c'è una mossa orizzontale valida
            }
        }
    }

    // Controlla le mosse verticali
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (grid[row][col] === grid[row + 1][col] || grid[row][col] === 0 || grid[row + 1][col] === 0) {
                return false; // c'è una mossa verticale valida
            }
        }
    }

    document.querySelector('.play-btn').style.display = 'flex';

    // Se non ci sono più mosse, il gioco è finito
    return true;
}

// 🤑 vittoria 🤑 
function checkVictory() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 2048) { // controllo se esiste il numero 2048 nella griglia
                alert("Hai vinto!"); // messaggio
                document.querySelector('.play-btn').style.display = 'flex';
                return true; // vittoria raggiunta
            }
        }
    }

    return false; // fake, nessuna vittoria
}


// qui sotto vado a iniziare la funzione main che conterrà tutto il necessario
// main() non mi passo valori
// viene avviata dal bottone 'play'
function main() {
    let moveBtns = document.querySelector('.move-btns');

    // li RIrendo visibili
    moveBtns.style.display = 'flex';
    genBoard();
    relTable();
}

// le due funzioni per le due modalità di gioco
// classica e natalizia
function classic() {
    let modLabel = document.getElementById('mod-label');
    let btnClassic = document.getElementById('classic-btn');
    let btnChristman = document.getElementById('christmas-btn');
    let score = document.getElementById('score');

    // modifica le cose basilari
    modLabel.textContent = '2048 Versione Classica';
    btnClassic.style.display = 'none';
    btnChristman.style.display = 'none';
    score.style.display = 'block';

    // richiamo alle funzioni
    main();
}

function christmas() {
    let modLabel = document.getElementById('mod-label');
    let btnClassic = document.getElementById('classic-btn');
    let btnChristman = document.getElementById('christmas-btn');
    let score = document.getElementById('score');

    // modifica le cose basilari
    modLabel.textContent = '2048 Versione Classica';
    btnClassic.style.display = 'none';
    btnChristman.style.display = 'none';
    score.style.display = 'block';

    // richiamo alle funzioni
    main();
    let gameBoard = document.getElementById('game-board');
    gameBoard.id = ('game-board-natalizia')
}


// FUNZIONI SPECIALI
function gen2of1024() {
    // posiziona direttamente due celle con valore 1024
    grid[0][0] = 1024;
    grid[1][1] = 1024;
}


// FRECCETTE DA TASTIERA
document.addEventListener('keydown', function(event) {
    // verifico quale tasto è stato premuto
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
        default:
            break;
    }
});

// AGGIORNARE LA PAGINA TASTO RIPROVA
function retry () {
    window.location.reload();
}

function updateScore () {
    document.getElementById('score').innerText = score;
}


// BOTTONI SPECIALI PER L'UTENTE (MAX=1 PER GAME)
// elimina tutti i 2 e 4 nella grid
function delete2and4 () {
    grid.forEach((row, rowIndex) => {
        console.log(row);
        // essendo il grid un array multidirezionale "row" === una riga
        row.forEach((element, colIndex) => {
            console.log(element);
            if (element === 2 || element === 4) {
                grid[rowIndex][colIndex] = 0;
            }
        });
    });
    console.log(grid);
    updateTable() // serve per assegnare 0 alla cella
    relTable();
}

// questa funzione serve per assegnare 0 alla cella se è già 0 nel grid
function updateTable() {
    grid.forEach((row, rowIndex) => {
        row.forEach((element, colIndex) => {
            let cellElement = document.getElementById(`${rowIndex + 1} - ${colIndex + 1}`);
            cellElement.textContent = element === 0 ? "" : element; // mostra vuoto per 0
        });
    });
}