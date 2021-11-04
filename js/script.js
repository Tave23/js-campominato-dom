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

   // contatore tentativi
   let tentativi = 0;
   const listaTentativi = [];

   // numero di bombe create
   const NUMBOMBE = 16; 
   const bombe = generaBombe();

   // massimo tentativi
   const maxAttemps = square - NUMBOMBE;

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
         
         // costante del valore all'interno della cella
         const cliccati = (parseInt(event.target.innerText));

         // verifico se ho cliccato una bomba
         if(bombe.includes(cliccati)){
            // fine gioco
            console.log('Hai perso!');
            fineGioco();
            
         } else { 
            console.log('continua');
            if(listaTentativi.includes(cliccati)){
             // tentativo +1
             tentativi++;

               // aggiungo il tentativo alla lista cliccati
             listaTentativi.push(cliccati);  

             // gli dò anche la classe per cambiare colore una volta cliccato
             quadrato.classList.add('clicked');

             // se vinci il gioco... 
             if(tentativi === maxAttemps){
                fineGioco();
             }
             
            
               
            }
         }
      }
   }


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

   function fineGioco(){
      // coloro tutte le bombe
      const quadrato = document.getElementsByClassName('quadrato');
      for (let y = 0; y < quadrato.length; y++) {
         // se l'indice della cella è incluso tra le bombe
         if(bombe.includes(y + 1)){
            quadrato[y].classList.add('bombs');
         }
   
         quadrato[y].removeEventListener('click', handleClickCell);
      }
   
      // messaggio di output
      let messaggio = '';
   
      if(tentativi === maxAttemps){
         messaggio = 'Complimenti, hai vinto';
      } else{
         messaggio = `Hai perso, hai fatto ${tentativi} tentativi`;
      }
   // inserisco il msg in un divs
      const output = document.createComment('div');
      output.innerHTML = `<h5>${messaggio}</h5>`;
      game.append(output);
   }

}

// funzione per generare una bomba random 1-16

function generaBombaRandom(min, max){
   return Math.floor(Math.random() * (max - min +1) + min);
}
   
