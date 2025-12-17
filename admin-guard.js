(function () {
  const pathname = window.location.pathname;
  const isAdminPanel = pathname.endsWith('/admin-panel.html') || pathname === '/admin-panel.html';
  const isAdminLogin = pathname.endsWith('/admin-login.html') || pathname === '/admin-login.html';

  if (!isAdminPanel && !isAdminLogin) return;

  const params = new URLSearchParams(window.location.search);
  const requestedNext = params.get('next');

  const getNextUrl = () => {
    if (requestedNext) return requestedNext;
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  };

  const redirectToLogin = () => {
    const nextUrl = encodeURIComponent(getNextUrl());
    window.location.replace(`/admin-login.html?next=${nextUrl}`);
  };

  const verify = async () => {
    const response = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({})
    });

    if (!response.ok) {
      return { valid: false };
    }

    const data = await response.json();
    return { valid: Boolean(data?.valid), expiresAt: data?.expiresAt };
  };

  if (isAdminPanel) {
    document.documentElement.style.visibility = 'hidden';

    verify()
      .then((result) => {
        if (result.valid) {
          document.documentElement.style.visibility = '';
          return;
        }
        redirectToLogin();
      })
      .catch(() => {
        redirectToLogin();
      });

    return;
  }

  // Admin login page: if already authenticated, redirect to the requested page.
  verify()
    .then((result) => {
      if (!result.valid) return;
      const nextUrl = requestedNext || '/admin-panel.html';
      window.location.replace(nextUrl);
    })
    .catch(() => {});
})();
