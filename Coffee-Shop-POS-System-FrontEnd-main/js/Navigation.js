function hideAllSections() {
    document.getElementById("DashboardForm").style.display = "none";
    document.getElementById("ProductsForm").style.display = "none";
    document.getElementById("TransactionsForm").style.display = "none";
    document.getElementById("SettingsForm").style.display = "none"; 
}

function setActiveNav(anchorId) {
    const allItems = document.querySelectorAll('.navigation ul li');
    allItems.forEach(li => li.classList.remove('hovered'));
    const anchor = document.getElementById(anchorId);
    if (anchor && anchor.parentElement && anchor.parentElement.tagName === 'LI') {
        anchor.parentElement.classList.add('hovered');
    }
}

document.getElementById("Dashboard-button").addEventListener("click", function () {
    hideAllSections();
    document.getElementById("DashboardForm").style.display = "block";
    setActiveNav('Dashboard-button');
});


document.getElementById("ProductsForm-button").addEventListener("click", function () {
    hideAllSections();
    document.getElementById("ProductsForm").style.display = "block";
    setActiveNav('ProductsForm-button');

    // ✅ Initialize Product modal when Products tab is opened
    if (!window.productsInit) {
        if (typeof initProductsModal === "function") {
            initProductsModal();
            window.productsInit = true; // prevents re-binding
        }
    }
});

document.getElementById("TransactionsForm-button").addEventListener("click", function () {
    hideAllSections();
    document.getElementById("TransactionsForm").style.display = "block";
    setActiveNav('TransactionsForm-button');
});

document.getElementById("SettingsForm-button").addEventListener("click", function () {
    hideAllSections();
    document.getElementById("SettingsForm").style.display = "block";
    setActiveNav('SettingsForm-button');
});

document.getElementById("product").addEventListener("click", function (){
    document.getElementById("DashboardForm").style.display = "none";
    document.getElementById("ProductsForm").style.display = "block";
    setActiveNav('ProductsForm-button');
});

document.getElementById("transactions").addEventListener("click", function (){
    document.getElementById("DashboardForm").style.display = "none";
    document.getElementById("TransactionsForm").style.display = "block";
    setActiveNav('TransactionsForm-button');
});
  
// Ensure the default selected nav is correct on load
window.addEventListener('load', function () {
    setActiveNav('Dashboard-button');
});

// ----------------- Sign Out -----------------
document.getElementById('SignOutForm-button')?.addEventListener('click', function (e) {
    e.preventDefault();
    fetch('db/logout.php', { method: 'POST' })
        .finally(() => {
            window.location.href = 'loginRegister.html';
        });
});
  
