// ----------------- Login function -----------------
const loginBtn = document.getElementById("log");
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault(); // prevent form reload
    loginBtn?.click();
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username-login")?.value.trim();
    const password = document.getElementById("password-login")?.value.trim();

    if (!username || !password) {
      showToast("Please enter both username and password", "error");
      return;
    }

    const fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);

    fetch("db/login_check.php", { method: "POST", body: fd })
      .then(r => r.json())
      .then(res => {
        if (res.status === "success") {
          showToast("Login successful!", "success");

          if (res.role === "admin") {
            window.location.href = "index.php"; // Admin dashboard
          } else if (res.role === "cashier") {
            window.location.href = "cashier.html"; // Cashier page (future)
          } else {
            showToast("Unknown role, contact admin.", "error");
          }

        } else {
          showToast("Login failed: " + (res.message || "Unknown error"), "error");
        }
      })
      .catch(err => {
        console.error("Login error", err);
        showToast("Server error, please try again.", "error");
      });
  });
}

// ----------------- Toast helper -----------------
function showToast(message, type) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  if (!toast || !toastMessage) return;

  toastMessage.innerText = message;
  toast.className = "toast";

  if (type === "success") {
    toast.classList.add("show", "toast-success");
  } else if (type === "error") {
    toast.classList.add("show", "toast-error");
  }

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
