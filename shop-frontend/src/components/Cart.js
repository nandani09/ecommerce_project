import React from "react";

function Cart({ cartItems, removeFromCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
            <img src={item.image || "/images/placeholder.png"} alt={item.name} style={{ width: "50px", height: "50px" }} />
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
