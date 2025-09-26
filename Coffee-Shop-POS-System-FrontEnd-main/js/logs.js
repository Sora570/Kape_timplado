document.addEventListener("DOMContentLoaded", () => {
    setupLogSearch();
    loadLogs();
});

let allLogs = [];

function loadLogs() {
    fetch("db/logs_get.php")
        .then(r => r.json())
        .then(rows => {
            allLogs = rows;
            renderLogs(allLogs);
        })
        .catch(err => console.error("Error loading logs:", err));
}

function renderLogs(logs) {
    const tbody = document.getElementById("logs-table-list");
    tbody.innerHTML = "";

    logs.forEach(log => {
        tbody.innerHTML += `
            <tr>
                <td>${log.logID}</td>
                <td>${log.userEmail}</td>
                <td>${log.actionType}</td>
                <td>${log.details}</td>
                <td>${log.createdAt || log.timestamp || ""}</td>
            </tr>
        `;
    });
}

function setupLogSearch() {
    const searchInput = document.getElementById("logSearch");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = allLogs.filter(l =>
            l.userEmail.toLowerCase().includes(query) ||
            l.actionType.toLowerCase().includes(query) ||
            l.details.toLowerCase().includes(query) ||
            l.createdAt.toLowerCase().includes(query)
        );
        renderLogs(filtered);
    });
}