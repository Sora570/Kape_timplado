// ----------------- Load Customers -----------------
function loadCustomers() {
    fetch("db/customers_get.php")
        .then(r => r.json())
        .then(rows => {
            const tbody = document.getElementById("customer-table-list");
            tbody.innerHTML = "";

            rows.forEach(c => {
                tbody.innerHTML += `
                    <tr data-id="${c.customerID}">
                        <td>${c.customerID}</td>
                        <td>${c.name}</td>
                        <td>${c.streetNumber || ""}</td>
                        <td>${c.address}</td>
                        <td>${c.barangay || ""}</td>
                        <td>${c.city || ""}</td>
                        <td>${c.region || ""}</td>
                        <td>${c.zip || ""}</td>
                        <td>${c.contactNumber}</td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error("Error loading customers:", err));
}

// ----------------- Add/Edit Customer -----------------
document.getElementById("customer-form")?.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(e.target);

    const isEdit = document.getElementById("isEdit")?.value === "true";
    const url = isEdit ? "db/customers_update.php" : "db/customers_add.php";

    fetch(url, { method: "POST", body: fd })
        .then(r => r.text())
        .then(t => {
            if (t.includes("success")) {
                e.target.reset();
                document.getElementById("isEdit").value = "false";
                document.getElementById("customerRegisterForm").style.display = "none";
                loadCustomers();
            } else {
                alert("Error: " + t);
            }
        })
        .catch(err => console.error("Error saving customer:", err));
});

// ----------------- Edit Customer (prefill form) -----------------
document.getElementById("editCustomer")?.addEventListener("click", () => {
    if (!selectedCustomerId) return;

    const fd = new FormData();
    fd.append("customerID", selectedCustomerId);

    fetch("db/customers_getOne.php", { method: "POST", body: fd })
        .then(r => r.json())
        .then(c => {
            if (!c) return;

            const modal = document.getElementById("customerRegisterForm");
            modal.style.display = "block";

            document.getElementById("customerID").value = c.customerID;
            document.getElementById("customerName").value = c.name;
            document.getElementById("streetNumber").value = c.streetNumber;
            document.getElementById("address").value = c.address;
            document.getElementById("barangay").value = c.barangay;
            document.getElementById("city").value = c.city;
            document.getElementById("region").value = c.region;
            document.getElementById("zip").value = c.zip;
            document.getElementById("customerNumber").value = c.contactNumber;


            document.getElementById("isEdit").value = "true";
        });
});


// ----------------- Search Customers -----------------
function setupCustomerSearch() {
    const searchInput = document.getElementById("customerSearch");
    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const q = searchInput.value.toLowerCase();
        document.querySelectorAll("#customerTable tbody tr").forEach(tr => {
            tr.style.display = tr.textContent.toLowerCase().includes(q) ? "" : "none";
        });
    });
}

// ----------------- Init Customer Modal -----------------
function initCustomerModal() {
    const addBtn = document.getElementById("add-customer");
    const modal = document.getElementById("customerRegisterForm");
    const closeBtn = document.getElementById("customerRegisterForm-close");

    if (!addBtn || !modal) {
        console.warn("Customer modal elements not found in DOM.");
        return;
    }

    // Open modal when clicking "Add Customer"
    addBtn.addEventListener("click", () => {
        modal.style.display = "block";
        document.getElementById("customer-form").reset();
        document.getElementById("isEdit").value = "false";
    });

    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            document.getElementById("customer-form")?.reset();
            document.getElementById("isEdit").value = "false";
        });
    }

    // Close modal if clicking outside the form
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    console.log("✅ Customer modal initialized");
}

// ----------------- Customer Context Menu -----------------
const customerContextMenu = document.getElementById("customerContextMenu");
let selectedCustomerId = null;

// Show context menu
document.querySelector("#customerTable tbody")?.addEventListener("contextmenu", e => {
    e.preventDefault();
    const row = e.target.closest("tr");
    if (!row) return;

    selectedCustomerId = row.dataset.id;

    // Position menu at cursor (with scroll support)
    customerContextMenu.style.top = `${e.pageY}px`;
    customerContextMenu.style.left = `${e.pageX}px`;
    customerContextMenu.style.display = "block";

    // Prevent overflow
    const rect = customerContextMenu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
        customerContextMenu.style.left = `${window.innerWidth - rect.width - 10}px`;
    }
    if (rect.bottom > window.innerHeight) {
        customerContextMenu.style.top = `${window.innerHeight - rect.height - 10}px`;
    }
});

// Hide menu on click
document.addEventListener("click", () => {
    customerContextMenu.style.display = "none";
});

// Edit customer
document.getElementById("editCustomer")?.addEventListener("click", () => {
    if (!selectedCustomerId) return;

    const fd = new FormData();
    fd.append("customerID", selectedCustomerId);

    fetch("db/customers_getOne.php", { method: "POST", body: fd })
        .then(r => r.json())
        .then(c => {
            if (!c) return;

            // Open modal
            const modal = document.getElementById("customerRegisterForm");
            modal.style.display = "block";

            // Prefill form
            document.getElementById("customerID").value = c.customerID;
            document.getElementById("customerName").value = c.name;
            document.getElementById("streetNumber").value = c.streetNumber;
            document.getElementById("address").value = c.address;
            document.getElementById("barangay").value = c.barangay;
            document.getElementById("city").value = c.city;
            document.getElementById("region").value = c.region;
            document.getElementById("zip").value = c.zip;
            document.getElementById("customerNumber").value = c.contactNumber;

            // mark form as edit mode
            document.getElementById("isEdit").value = "true";
        });
});

// Delete customer
document.getElementById("deleteCustomer")?.addEventListener("click", () => {
    if (!selectedCustomerId) return;
    if (!confirm("Delete customer " + selectedCustomerId + "?")) return;

    const fd = new FormData();
    fd.append("customerID", selectedCustomerId);

    fetch("db/customers_delete.php", { method: "POST", body: fd })
        .then(r => r.text())
        .then(t => {
            if (t === "success") {
                loadCustomers();
            } else {
                alert("Error: " + t);
            }
        });
});

// ----------------- Init -----------------
document.addEventListener("DOMContentLoaded", () => {
    loadCustomers();
    initCustomerModal();
    setupCustomerSearch();
});