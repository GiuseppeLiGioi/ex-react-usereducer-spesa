/*
📌 Milestone 3: Modificare il carrello
Al click successivo del bottone "Aggiungi al carrello", se il prodotto è già presente:
Usa una funzione updateProductQuantity per incrementare la proprietà quantity del prodotto esistente.
Per ogni prodotto nel carrello, aggiungi un bottone "Rimuovi dal carrello":
Al click, usa una funzione removeFromCart per rimuovere il prodotto dal carrello.
Sotto alla lista del carrello, mostra il totale da pagare:
Calcola il totale moltiplicando il prezzo per la quantità di ogni prodotto e somma tutti i risultati.
Obiettivo: Gestire l’aggiunta, la rimozione e il calcolo del totale del carrello in modo dinamico.
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
 const [total, setTotal] = useState(0);
const updateProductQuantity = (name, quantity) => {

  setAddedProducts(addedProducts.map((ap) => {
    if(ap.name === name){
      return {
        ...ap,
        quantity: quantity + 1
      }
      
    }else{
      return ap;
    }
  }))
}
const removeFromCart = (product) => {
  setAddedProducts((curr) => curr.filter((p) => p.name !== product.name))
    setTotal((curr) => curr-= product.price)
}

 const addToCart = (product) => {
  const productIsInCart = addedProducts.find((p) => p.name === product.name)
  if(!productIsInCart){
    const productToAdd = {...product, quantity: 1}
  setAddedProducts((curr) => [...curr, productToAdd])
  setTotal((curr) => curr+= product.price)
  }else{
   updateProductQuantity(productIsInCart.name, productIsInCart.quantity)
     setTotal((curr) => curr+= product.price)
  }
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
              <>
              
              <li key={index}>
                <p>{p.name}-{p.quantity}-{p.price.toFixed(2)}</p>
              </li>
              <button onClick={() => removeFromCart(p)}>Rimuovi dal carrello</button>
              </>
            ))
          }
        </ul>
        <p>Totale da pagare: {total.toFixed(2)}</p>
        </>
      )}
    </>
  )

}

export default App
