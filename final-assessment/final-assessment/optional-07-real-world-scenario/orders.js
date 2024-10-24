// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}


// TODO: buatlah variabel yang menampung data orders
let orders = [];

// TODO: selesaikan fungsi addOrder
function addOrder(customerName, items) {
  let id = generateUniqueId();
  let totalPrice = 0;
  let status = 'Menunggu';

  for (let i=0;i<items.length;i++) {
    totalPrice += items[i].price;
  }

  const newOrder = {
    'id': id,
    'customerName': customerName,
    'items': items,
    'totalPrice': totalPrice,
    'status': status
  }

  orders.push(newOrder);
}

// TODO: selesaikan fungsi updateOrderStatus
function updateOrderStatus(orderId, status) {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
  }
}

// TODO: selesaikan fungsi calculateTotalRevenue dari order yang berstatus Selesai
function calculateTotalRevenue() {
  let totalRevenue = 0;

  for (let i=0;i<orders.length;i++){
    if (orders[i].status === 'Selesai'){
      totalRevenue += orders[i].totalPrice;
    }
  }

  return totalRevenue;
}

// TODO: selesaikan fungsi deleteOrder
function deleteOrder(id) {
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
  }
}

export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
