// constanti 
const game = document.querySelector('.main-wrapper');
const letsPlay = document.querySelector('#gioca');
const arrayQuadrati = document.getElementsByClassName('quadrato')

// evento al click di "letsPlay"
letsPlay.addEventListener('click',function() {
   
   // svuoto game
   game.innerHTML = '';
   
   // inizializzo la variabile del value della selection
   let square = '';

   // faccio partire la funzione
   init();
   
})
// funzione init
function init(){
// prendo 
   let valoreScelta = parseInt(document.getElementById('livello').value);
// variabili con le relative dimensioni della tabella
   if (valoreScelta === 1) square = 100;
   else if (valoreScelta === 2) square = 81;
   else if (valoreScelta === 3) square = 49;

   console.log('numero di caselle spawnate: ',square);
   // creo il container e gli ggiungo la classe
   const container = document.createElement('div');
   container.classList.add('container');
   // inserisco tutto nel main-wrapper
   game.append(container);
   
   // inserisco i numeri con il ciclo for
   for(i = 0; i < square; i++){

      const quadrato = createSquare();
      // console.log('questo è un quadratino', quadrato);
      quadrato.addEventListener('click', handleClickCell);      
      
      // al click faccio partire la funzione "handle..."
      function handleClickCell(event){
         console.log(parseInt(event.target.innerText));
         
         // variabile dei bottoni cliccati 
         const cliccati = (parseInt(event.target.innerText));

         // gli dò anche la classe per cambiare colore una volta cliccato
         quadrato.classList.add('clicked');

         // se non è un bomba continua, altrimenti hai perso!
         if(!bombe.includes(cliccati)){
            console.log('continua');
         } else {
            alert('Hai perso!');
         }

      }

   }
// numero di bombe create
   const NUMBOMBE = 16; 
   const bombe = generaBombe();

   // funzione colora bombe
   colorBombs();
// creo i quadrati di ogni numero
   function createSquare() {
      
      const quadrato = document.createElement('div');
      quadrato.className = 'quadrato';
      // gli dò delle dimensioni in base al valore che ha scelto l'utente
      if (valoreScelta === 1){
         square = 100;
         quadrato.style.width = `calc(100% / 10)`;
         quadrato.style.height = `calc(100% / 10)`;
      } else if (valoreScelta === 2) {
         square = 81;
         quadrato.style.width = `calc(100% / 9)`;
         quadrato.style.height = `calc(100% / 9)`;
      } else if (valoreScelta === 3) {
         square = 49;
         quadrato.style.width = `calc(100% / 7)`;
         quadrato.style.height = `calc(100% / 7)`;
      }

      console.log('livello scelto: ', valoreScelta);
      container.append(quadrato);
      quadrato.append(i + 1);

      // restituisco il quadrato
      return quadrato;
   }

// funzione che crea 16 bombe a caso
   function generaBombe(){
      let bombe = [];
      console.log('numero di bombe: ', NUMBOMBE);
      console.log('le bombe sono: ', bombe);

      while(bombe.length < NUMBOMBE) {
         const singBomba = generaBombaRandom(1, square);
         if(!bombe.includes(singBomba)) bombe.push(singBomba);
      }
       
      // restituisco l'array con le bombe
      return bombe;
   }

   // funzione colora-bombe
   function colorBombs(){
      console.log(arrayQuadrati);

   }

}


// funzione per generare una bomba random 1-16

function generaBombaRandom(min, max){
   return Math.floor(Math.random() * (max - min +1) + min);
}
   
