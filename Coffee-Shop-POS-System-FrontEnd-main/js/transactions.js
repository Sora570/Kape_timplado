function loadTransactions() {
  fetch('db/transactions_get.php')
    .then(r => r.json())
    .then(rows => {
      const tbody = document.querySelector('#transactionsTable tbody');
      tbody.innerHTML = '';
      rows.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${t.transactionID}</td>
          <td>${t.cashier || 'Unknown'}</td>
          <td>${t.orderSummary}</td>
          <td>₱${parseFloat(t.totalAmount).toFixed(2)}</td>
          <td>${t.paymentMethod}</td>
          <td>${t.status}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => console.error('Error loading transactions:', err));
}

document.addEventListener('DOMContentLoaded', loadTransactions);