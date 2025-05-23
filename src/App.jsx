/*
📌 Milestone 2: Aggiungere prodotti al carrello
Aggiungi uno stato locale addedProducts (inizialmente un array vuoto) per rappresentare i prodotti nel carrello.
Per ogni prodotto della lista, aggiungi un bottone "Aggiungi al carrello":
Al click del bottone, usa una funzione addToCart per:
Aggiungere il prodotto al carrello se non è già presente, con una proprietà quantity = 1.
Se il prodotto è già nel carrello, ignora l’azione.
Sotto alla lista dei prodotti, mostra una lista dei prodotti nel carrello se addedProducts contiene almeno un elemento.
Per ogni prodotto nel carrello, mostra:
Nome
Prezzo
Quantità

Obiettivo: L’utente può aggiungere prodotti al carrello e vedere una lista dei prodotti aggiunti.
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

 const addToCart = (product) => {
  const productIsInCart = addedProducts.some((p) => p.name === product.name)
  if(!productIsInCart){
    const productToAdd = {...product, quantity: 1}
  setAddedProducts((curr) => [...curr, productToAdd])
  }else{
    return;
  }
  console.log(addedProducts)

  
 }

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
              <li key={index}>
                <p>{p.name}-{p.quantity}-{p.price.toFixed(2)}</p>
              </li>
            ))
          }
        </ul>
        </>
      )}
    </>
  )
}

export default App
