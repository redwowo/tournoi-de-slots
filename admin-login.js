function getAdminNextUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('next') || '/admin-panel.html';
}

async function submitAdminLogin() {
  const input = document.getElementById('adminLoginCode');
  const errorDiv = document.getElementById('adminLoginError');
  const submitBtn = document.getElementById('adminLoginSubmit');

  if (!input || !errorDiv || !submitBtn) return;

  const code = String(input.value || '').trim();

  errorDiv.textContent = '';

  if (!code) {
    errorDiv.textContent = 'Veuillez entrer le code.';
    input.focus();
    return;
  }

  submitBtn.disabled = true;

  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ code })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      errorDiv.textContent = data?.error || 'Code incorrect.';
      input.value = '';
      input.focus();
      return;
    }

    window.location.replace(getAdminNextUrl());
  } catch (error) {
    errorDiv.textContent = "Impossible de vérifier le code. Réessayez.";
  } finally {
    submitBtn.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('adminLoginCode');
  const submitBtn = document.getElementById('adminLoginSubmit');

  if (input) {
    input.focus();
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        submitAdminLogin();
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      submitAdminLogin();
    });
  }
});
