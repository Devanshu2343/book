const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.static(path.join(__dirname, 'book_items.html')));





app.use(express.json());


function calculateTotal(cartItems) {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price;
  });
  return total;
}


app.post('/checkout', (req, res) => {
  const cartItems = req.body;
  const totalValue = calculateTotal(cartItems);
  const orderId = generateOrderId();

  console.log('Received cart items:', cartItems);
  console.log('Total value of items:', totalValue);
  console.log('Order ID:', orderId);
  res.json({ 
    message: 'Your order has been placed!',
    orderId: orderId,
    totalValue: totalValue
  });
});


function generateOrderId() {
  return Math.random().toString(36).substr(2, 9);
}


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
