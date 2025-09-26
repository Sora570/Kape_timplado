// ----------------- Load Products (Unified Table) -----------------
function loadProductsTable() {
    fetch('db/products_get.php')
        .then(r => r.json())
        .then(rows => {

            const productTbody = document.getElementById('product-table-list');
            if (!productTbody) {
                console.error('❌ Table body not found in DOM.');
                return;
            }

            // Clear table
            productTbody.innerHTML = '';

            if (!Array.isArray(rows) || rows.length === 0) {
                productTbody.innerHTML = `<tr><td colspan="5">No products found</td></tr>`;
                return;
            }

            rows.forEach(p => {
                const categoryName = p.category || p.categoryName || '';
                if (Array.isArray(p.sizes) && p.sizes.length > 0) {
                    p.sizes.forEach(s => {
                        productTbody.insertAdjacentHTML(
                            'beforeend',
                            `<tr data-id="${p.productID}">
                                <td>${p.productID}</td>
                                <td>${p.productName}</td>
                                <td>${categoryName}</td>
                                <td>${s.sizeName}</td>
                                <td>₱${s.price}</td>
                            </tr>`
                        );
                    });
                } else {
                    // Show a row even if no sizes returned
                    productTbody.insertAdjacentHTML(
                        'beforeend',
                        `<tr data-id="${p.productID}">
                            <td>${p.productID}</td>
                            <td>${p.productName}</td>
                            <td>${categoryName}</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>`
                    );
                }
            });
        })
        .catch(err => console.error('❌ Error loading products:', err));
}

// ----------------- Load Category Options -----------------
function loadCategoryOptions() {
    fetch("db/categories_get.php")
        .then(r => r.json())
        .then(rows => {
            const select = document.getElementById("category");
            if (!select) return;
            select.innerHTML = rows.map(c =>
                `<option value="${c.categoryID}">${c.categoryName}</option>`
            ).join("");
        });
}

// ----------------- Init on DOM Ready -----------------
window.addEventListener('load', () => {
  loadProductsTable();
  loadCategoryOptions();
});
