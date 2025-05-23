/*
🎯 Bonus 1: Modifica dinamica delle quantità
Al posto di mostrare solo il numero quantity, usa un input di tipo number:
Quando l’utente modifica il valore dell’input, usa la funzione updateProductQuantity per aggiornare la quantità del prodotto.
Migliora la funzione updateProductQuantity per gestire:
Numeri decimali: Forza la quantità a essere un numero intero.
Valori inferiori a 1: Non permettere quantità negative o pari a zero.
Obiettivo: Consentire una modifica precisa e dinamica delle quantità direttamente nel carrello.
*/

import { useState, useEffect } from "react";


const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {
 const [addedProducts, setAddedProducts] = useState([]);
 const [total, setTotal] = useState(0);

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
const updateTotal = () => {
  const newTotal = addedProducts.reduce((acc, product) => {
    return acc + (product.price * product.quantity)
  },0)
  setTotal(newTotal)
}
const removeFromCart = (product) => {
  setAddedProducts((curr) => curr.filter((p) => p.name !== product.name))
    setTotal((curr) => curr-= parseInt(product.price * product.quantity))
}

 const addToCart = (product) => {
  const productIsInCart = addedProducts.find((p) => p.name === product.name)
  if(!productIsInCart){
    const productToAdd = {...product, quantity: 1}
  setAddedProducts((curr) => [...curr, productToAdd])
  setTotal((curr) => curr+= parseInt(product.price * product.quantity))
  }else{
   updateProductQuantity(productIsInCart.name, productIsInCart.quantity)
     setTotal((curr) => curr+= parseInt(product.price * product.quantity))
  }
}

useEffect(() => {
updateTotal();
}, [addedProducts])


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
        <p>Totale da pagare: {total.toFixed(2)}</p>
        </>
      )}
    </>
  )

}

export default App
