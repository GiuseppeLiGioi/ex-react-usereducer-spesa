/*
🎯 Bonus 2: Usare useReducer per gestire lo stato del carrello
Sostituisci useState con useReducer per gestire lo stato del carrello.

Configura il reducer con queste azioni:

ADD_ITEM: Aggiunge un nuovo articolo al carrello con quantity = 1.
REMOVE_ITEM: Rimuove un articolo specifico dal carrello.
UPDATE_QUANTITY: Modifica la quantità di un articolo esistente nel carrello, assicurandoti di gestire i casi limite (es. valori negativi).
La struttura del reducer potrebbe essere:

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Logica per aggiungere un prodotto
      break;
    case 'REMOVE_ITEM':
      // Logica per rimuovere un prodotto
      break;
    case 'UPDATE_QUANTITY':
      // Logica per aggiornare la quantità
      break;
    default:
      return state;
  }
}
Inizializza lo stato con un array vuoto e usa useReducer per gestire le azioni del carrello.
Obiettivo: Migliorare la struttura del codice utilizzando un approccio più scalabile e organizzato.
*/

import { useState } from "react";


const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];


function App() {
 const [addedProducts, setAddedProducts] = useState([]);


const updateProductQuantity = (name, e) => {
  let qty =  parseInt(e.target.value) || 1;

  setAddedProducts(addedProducts.map((ap) => {
    if(ap.name === name){
      return {  
          ...ap,
          quantity: qty 
      }
      
    }else{
      return ap;
    }
  }))
}

const removeFromCart = (product) => {
  setAddedProducts((curr) => curr.filter((p) => p.name !== product.name))

}

 const addToCart = (product) => {
  const productIsInCart = addedProducts.find((p) => p.name === product.name)
  if(!productIsInCart){
    const productToAdd = {...product, quantity: 1}
  setAddedProducts((curr) => [...curr, productToAdd])

  }else{
   updateProductQuantity(productIsInCart.name, productIsInCart.quantity)
     
  }
}


const totale = addedProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity),0);



  return (
    <>
    <h2>LISTA DEI PRODOTTI</h2>
      <ul>

      
        {
           products.map((p, index) => (
              <div>
                <li key={index}>{p.name}{p.price}</li>
                <button onClick={() => addToCart(p)}>Aggiungi alla lista</button>
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
                <p>{p.name}-{p.price.toFixed(2)}<span><input type="number" min="1"placeholder="inserisci la quantità" onChange={(e) => updateProductQuantity(p.name, e)} value={p.quantity}/></span></p>
              </li>
              <button onClick={() => removeFromCart(p)}>Rimuovi dal carrello</button>
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
