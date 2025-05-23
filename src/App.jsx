/*
🎯 Bonus 2: Usare useReducer per gestire lo stato del carrello
Sostituisci useState con useReducer per gestire lo stato del carrello.

Configura il reducer con queste azioni:

ADD_ITEM: Aggiunge un nuovo articolo al carrello con quantity = 1.
REMOVE_ITEM: Rimuove un articolo specifico dal carrello.
UPDATE_QUANTITY: Modifica la quantità di un articolo esistente nel carrello, assicurandoti di gestire i casi limite (es. valori negativi).
La struttura del reducer potrebbe essere:


Inizializza lo stato con un array vuoto e usa useReducer per gestire le azioni del carrello.
Obiettivo: Migliorare la struttura del codice utilizzando un approccio più scalabile e organizzato.
*/

import { useState, useReducer } from "react";


const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];


//questo è il reducer terminato, prima ho seguito la lezione ed una volta compresa, ho stilato il reducer
function cartReducer(addedProducts, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const addedProduct = addedProducts.find((p) => p.name === action.payload)
       if(addedProduct){
         action.payload.quantity = addedProduct.quantity + 1 //seguita spiegazione---così assumerà un valore da aggiornare
       }else{
        return [...addedProducts,
          {...action.payload, quantity: 1}
        ]
       }  
      case 'UPDATE_QUANTITY':
        return addedProducts.map((ap) => ap.name === action.payload.name ? {...ap, quantity: action.payload.quantity} : ap)
        break;
    case 'REMOVE_ITEM':
      return addedProducts.filter((p) => p.name !== action.payload)
      break;
    default:
      return state;
  }
}





function App() {
 const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

const totale = addedProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity),0);



  return (
    <>
    <h2>LISTA DEI PRODOTTI</h2>
      <ul>

      
        {
           products.map((p, index) => (
              <div>
                <li key={index}>{p.name}{p.price}</li>
                <button onClick={() => dispatchCart({type:"ADD_ITEM", payload: p})}>Aggiungi alla lista</button>
              </div>
              
            
           ))
        }
      </ul>

      {addedProducts.length > 0 && (
        <>
        <h2>CARRELLO DELLA SPESA</h2>
        <ul>
          {
            addedProducts.map((p, index) => (
              <>
              
              <li key={index}>
                <p>{p.name}-{p.price.toFixed(2)}<span><input type="number" min="1"placeholder="inserisci la quantità" onChange={(e) =>dispatchCart({type:'UPDATE_QUANTITY', payload: {name:p.name, quantity: parseInt(e.target.value)}})} value={p.quantity}/></span></p>
              </li>
              <button onClick={() => dispatchCart({type: 'REMOVE_ITEM', payload: p.name})}>Rimuovi dal carrello</button>
              </>
            ))
          }
        </ul>
        <p>Totale da pagare: {totale.toFixed(2)}</p>
        </>
      )}
    </>
  )

}

export default App
