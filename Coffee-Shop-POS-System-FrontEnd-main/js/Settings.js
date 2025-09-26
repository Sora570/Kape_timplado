// Global
let categories = [];
let products = [];
let selectedCategoryId = null;

// DOM refs
const categoryList = document.getElementById('categoryList');
const productTableBody = document.querySelector('#productListTable tbody');
const selectedCategoryName = document.getElementById('selectedCategoryName');
const backBtn = document.getElementById('backToCategories');
const addProductBtn = document.getElementById('addProductBtn');

// ---------- Load Categories ----------
function loadCategories() {
  fetch('db/categories_getAll.php')
    .then(r => r.json())
    .then(rows => {
      categories = rows;
      categoryList.innerHTML = '';
      rows.forEach(c => {
        const li = document.createElement('li');
        li.textContent = c.categoryName;
        li.className = 'category-item';
        li.dataset.id = c.categoryID;
        categoryList.appendChild(li);
      });
      attachCategoryListeners();
    })
    .catch(err => console.error('Error loading categories:', err));
}

// ----------------- Load Sizes -----------------
function loadSizes() {
  fetch("db/sizes_get.php")
    .then(r => r.json())
    .then(rows => {
      const list = document.getElementById("sizeList");
      if (!list) return;
      if (!Array.isArray(rows) || rows.length === 0) {
        list.innerHTML = "<li>No sizes found</li>";
        return;
      }
      list.innerHTML = rows.map(s =>
        `<li>${s.sizeName} - ₱${s.defaultPrice ?? 0}</li>`
      ).join("");
    })
    .catch(err => console.error("❌ Failed to load sizes:", err));
}

// ---------- Add Category ----------
document.getElementById("addCategory")?.addEventListener("click", () => {
  const name = document.getElementById("newCategory").value.trim();
  if (!name) {
    alert("Please enter a category name");
    return;
  }

  const fd = new FormData();
  fd.append("categoryName", name);

  fetch("db/categories_add.php", { method: "POST", body: fd })
    .then(r => r.json())
    .then(res => {
      if (res.status === "success") {
        alert("Category added!");
        document.getElementById("newCategory").value = "";
        loadCategories(); // refresh category list
      } else {
        alert("Error: " + res.message);
      }
    })
    .catch(err => console.error("❌ Add category failed:", err));
});

// ---------- Attach click to categories ----------
function attachCategoryListeners() {
  document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
      selectedCategoryId = parseInt(item.dataset.id);
      selectedCategoryName.textContent = item.textContent;
      backBtn.classList.remove('hidden');
      addProductBtn.classList.remove('hidden');
      loadProductsForCategory(selectedCategoryId);
    });
  });
}

// ---------- Load Products ----------
function loadProducts() {
  fetch('db/products_getAll.php')
    .then(r => r.json())
    .then(rows => {
      products = rows;
      if (selectedCategoryId) {
        loadProductsForCategory(selectedCategoryId);
      } else {
        productTableBody.innerHTML = '';
      }
    })
    .catch(err => console.error('Error loading products:', err));
}

// ---------- Filter products by category ----------
function loadProductsForCategory(categoryId) {
  productTableBody.innerHTML = '';
  products
    .filter(p => p.categoryID == categoryId)
    .forEach(p => {
      const tr = document.createElement('tr');
      tr.dataset.id = p.productID;
      tr.innerHTML = `
        <td>${p.productID}</td>
        <td>${p.productName}</td>
        <td>${p.isActive ? 'Yes' : 'No'}</td>
        <td>
          <button class="editProductBtn" data-id="${p.productID}">Edit</button>
          <button class="deleteProductBtn" data-id="${p.productID}">Delete</button>
        </td>`;
      productTableBody.appendChild(tr);
    });

  // ✅ Attach event listeners after rendering rows
  document.querySelectorAll('.editProductBtn').forEach(btn =>
    btn.addEventListener('click', () => openEditForm(btn.dataset.id))
  );
  document.querySelectorAll('.deleteProductBtn').forEach(btn =>
    btn.addEventListener('click', () => deleteProduct(btn.dataset.id))
  );
}

// ----------------- RENDER PRODUCTS -----------------
function renderProducts(products) {
  tbody.innerHTML = "";

  products.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.productID}</td>
      <td>${p.productName}</td>
      <td>${p.isActive == 1 ? "Yes" : "No"}</td>
      <td class="item-actions">
        <button class="edit-btn" data-id="${p.productID}">Edit</button>
        <button class="delete-btn" data-id="${p.productID}">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });

  // Bind buttons AFTER rows are added
  document.querySelectorAll(".edit-btn").forEach(btn =>
    btn.addEventListener("click", () => openEditForm(btn.dataset.id))
  );
  document.querySelectorAll(".delete-btn").forEach(btn =>
    btn.addEventListener("click", () => deleteProduct(btn.dataset.id))
  );
}

// ----------------- Load Category Options -----------------
async function loadCategoryOptions(selectId = "productCategory") {
  const select = document.getElementById(selectId);
  if (!select) {
    console.warn("loadCategoryOptions: select not found:", selectId);
    return [];
  }

  try {
    const res = await fetch("db/categories_get.php"); // fetch all categories
    if (!res.ok) {
      console.error("loadCategoryOptions: fetch failed", res.status);
      return [];
    }
    const rows = await res.json();
    // Fill the dropdown with <option> tags
    select.innerHTML = rows.map(c =>
      `<option value="${c.categoryID}">${c.categoryName}</option>`
    ).join("");

    console.log(`loadCategoryOptions(${selectId}): loaded ${rows.length} options`);
    return rows;
  } catch (err) {
    console.error("loadCategoryOptions error:", err);
    return [];
  }
}

// ----------------- OPEN EDIT FORM -----------------
function openEditForm(productID) {
  fetch(`db/products_getOne.php`, {
    method: "POST",
    body: new URLSearchParams({ productID })
  })
    .then(r => r.json())
    .then(p => {
      if (!p) return;
      document.getElementById("settings-product-form-view").style.display = "block";
      document.getElementById("settings-products-view").style.display = "none";
      document.getElementById("productFormTitle").textContent = "Edit Product";
      document.getElementById("productID").value = p.productID;
      document.getElementById("productName").value = p.productName;
      document.getElementById("productCategory").value = p.categoryID;
      document.getElementById("isActive").checked = p.isActive == 1;

      // Populate sizes/prices
      const sizeContainer = document.getElementById("sizePriceContainer");
      sizeContainer.innerHTML = "";
      p.sizes.forEach(s => {
        sizeContainer.innerHTML += `
          <div class="size-price-row">
            <label>${s.sizeName}</label>
            <input type="number" 
                   name="size_${s.sizeID}" 
                   data-sizeid="${s.sizeID}" 
                   value="${s.price}" 
                   step="0.01">
          </div>`;
      });
    });
}

// ----------------- DELETE PRODUCT -----------------
function deleteProduct(productID) {
  if (!confirm("Delete this product?")) return;
  const fd = new FormData();
  fd.append("productID", productID);

  fetch("db/products_delete.php", { method: "POST", body: fd })
    .then(r => r.text())
    .then(res => {
      if (res.trim() === "success") {
        // ✅ Reload only the current category's products
        loadProducts();
      } else {
        alert("Delete failed: " + res);
      }
    })
    .catch(err => console.error('Delete error:', err));
}


// ----------------- ADD PRODUCT BUTTON -----------------
document.getElementById("addProductBtn")?.addEventListener("click", () => {
  document.getElementById("settings-product-form-view").style.display = "block";
  document.getElementById("settings-products-view").style.display = "none";
  document.getElementById("productFormTitle").textContent = "Add Product";
  document.getElementById("productForm").reset();
  document.getElementById("productID").value = "";
});

// ----------------- CANCEL BUTTON -----------------
document.getElementById("cancelProductBtn")?.addEventListener("click", () => {
  document.getElementById("settings-product-form-view").style.display = "none";
  document.getElementById("settings-products-view").style.display = "block";
});


// ---------- Back Button ----------
backBtn.addEventListener('click', () => {
  selectedCategoryId = null;
  selectedCategoryName.textContent = 'Select a category';
  backBtn.classList.add('hidden');
  addProductBtn.classList.add('hidden');
  productTableBody.innerHTML = '';
  loadCategories();
});

// ---------- Add Product ----------
addProductBtn.addEventListener('click', () => {
  openProductForm();
});

// ---------- Open Form ----------
function openProductForm(product = null) {
  const form = document.getElementById('productForm');
  form.reset();
  document.getElementById('productFormTitle').textContent = product ? 'Edit Product' : 'Add Product';
  document.getElementById('productID').value = product ? product.productID : '';
  document.getElementById('productName').value = product ? product.productName : '';

  const categorySelect = document.getElementById('productCategory');
  categorySelect.innerHTML = '';
  categories.forEach(c => {
    categorySelect.innerHTML += `<option value="${c.categoryID}" ${product && c.categoryID == product.categoryID ? 'selected' : ''}>${c.categoryName}</option>`;
  });

  document.getElementById('isActive').checked = product ? product.isActive == 1 : true;

  // Load sizes for price input
  fetch('db/sizes_getAll.php')
    .then(r => r.json())
    .then(sizes => {
      const container = document.getElementById('sizePriceContainer');
      container.innerHTML = '';
      sizes.forEach(s => {
        const priceVal = product && product.sizes ? (product.sizes.find(sz => sz.sizeID == s.sizeID)?.price || '') : '';
        container.innerHTML += `
          <div class="size-price-row">
            <label>${s.sizeName}</label>
            <input type="number" step="0.01" data-sizeid="${s.sizeID}" value="${priceVal}" placeholder="Price">
          </div>`;
      });
    });

  document.getElementById('settings-product-form-view').style.display = 'block';
}


// ---------- Add Size ----------
document.getElementById("addSizeBtn")?.addEventListener("click", () => {
  const name = document.getElementById("newSizeName").value.trim();
  if (!name) {
    alert("Please enter a size name");
    return;
  }

  const fd = new FormData();
  fd.append("sizeName", name);

  fetch("db/sizes_add.php", { method: "POST", body: fd })
    .then(r => r.json())
    .then(res => {
      if (res.status === "success" || res === "success") {
        alert("Size added!");
        document.getElementById("newSizeName").value = "";
        loadSizes(); // refresh size list
      } else {
        alert("Error: " + (res.message || res));
      }
    })
    .catch(err => console.error("❌ Add size failed:", err));
});

// ---------- Save Product ----------
document.getElementById('productForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nameField = document.getElementById('productName');
  const categoryField = document.getElementById('productCategory');

  // Get values from inputs FIRST
  const productID = document.getElementById('productID').value.trim();
  const name = document.getElementById('productName').value.trim();

  // ✅ Get categoryID safely
  const categorySelect = document.getElementById('productCategory');
  const categoryID = categorySelect ? categorySelect.value.trim() : '';

  // ✅ Get isActive flag
  const isActiveChecked = document.getElementById('isActive')?.checked ? 1 : 0;

  // Debugging to verify
  console.log('Product Name:', name);
  console.log('Category ID:', categoryID);

  // Validate before sending
  if (!name || !categoryID) {
    alert('Please fill out product name and select a category.');
    return;
  }

  // Build FormData
  const fd = new FormData();
  fd.append('productID', productID);
  fd.append('productName', name);
  fd.append('categoryID', categoryID);
  fd.append('isActive', isActiveChecked);

  // Collect sizes and prices if present
  const sizeRows = document.querySelectorAll('#sizePriceContainer .size-price-row');
  const sizes = [];
  sizeRows.forEach(row => {
    const sizeLabel = row.querySelector('label')?.textContent.trim();  
    const priceInput = row.querySelector('input[type="number"]');
    const price = priceInput?.value.trim();
    const sizeID = priceInput?.dataset.sizeid;  // from data-sizeid
    if (sizeLabel && sizeID && price !== undefined) {
      // For create flow (db/product_save.php expects JSON array)
      if (price !== '') {
        sizes.push({ sizeID, sizeLabel, price });
      }
      // For update flow (db/products_update.php expects size_* fields)
      fd.append(`size_${sizeID}`, price === '' ? '0' : price);
    }
  });
  fd.append('sizes', JSON.stringify(sizes));

  // Determine which endpoint to use (insert or update)
  const url = productID ? 'db/products_update.php' : 'db/product_save.php';

  // Submit to backend
  fetch(url, { method: 'POST', body: fd })
    .then(res => res.json()) // ⬅️ Parse as JSON instead of .text()
    .then(response => {
      console.log('Save response:', response); // Debugging

      if (response.status === 'success') {
        alert('Product saved successfully!');
        loadProducts(); // Refresh product tables
        document.getElementById('productForm').reset();
        document.getElementById('settings-product-form-view').style.display = 'none';
        document.getElementById('settings-products-view').style.display = 'block';
      } else {
        alert('Error saving product: ' + (response.message || 'Unknown error'));
      }
    })
    .catch(err => {
      console.error('Error saving product:', err);
      alert('Server error while saving product.');
    });
});

// ---------- Initial Load ----------
document.getElementById('refreshSettingsBtn').addEventListener('click', () => {
  loadCategories();
  loadProducts();
});

// On page load
loadCategories();
loadProducts();
