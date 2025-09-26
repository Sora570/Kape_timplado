const fd = new FormData();
fd.append('cashierID', cashierID);
fd.append('orderSummary', JSON.stringify(orderDetails));
fd.append('totalAmount', total);
fd.append('paymentMethod', selectedMethod);
fd.append('status', 'Completed');

fetch('db/transactions_add.php', { method: 'POST', body: fd })
  .then(r => r.text())
  .then(t => console.log(t));