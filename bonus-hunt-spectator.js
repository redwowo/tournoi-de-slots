// Bonus Hunt Spectator Mode JavaScript
// Real-time spectator view for bonus hunt sessions

const PROVIDER_ARTWORKS = {
    'hacksaw': '/hacksawlogo.png',
    'hacksaw gaming': '/hacksawlogo.png',
    'pragmatic': '/pragmaticplaylogo.png',
    'pragmatic play': '/pragmaticplaylogo.png',
    'nolimit': '/nolimitcitylogo.png',
    'nolimit city': '/nolimitcitylogo.png',
    'bgaming': '/BGaminglogo.png',
    'relax': '/slot.png',
    'relax gaming': '/slot.png',
    'push gaming': '/slot.png'
};

let currentSession = null;
let sessionListener = null;
let isFirebaseInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    initializeTheme();
    initializeSpectatorMode();
});

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.className = savedTheme;
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', savedTheme === 'dark' ? 'sun' : 'moon');
        }
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.className;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.className = newTheme;
            localStorage.setItem('theme', newTheme);
            
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', newTheme === 'dark' ? 'sun' : 'moon');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }
}

async function initializeSpectatorMode() {
    // Get sessionId from URL
    const sessionId = getSessionIdFromUrl();
    
    if (!sessionId) {
        showError('Aucun identifiant de session fourni');
        return;
    }

    // Initialize Firebase
    if (typeof BonusHuntFirebase !== 'undefined') {
        isFirebaseInitialized = BonusHuntFirebase.initialize();
    }

    if (!isFirebaseInitialized) {
        showError('Connexion Firebase impossible');
        return;
    }

    // Load session
    try {
        await loadSession(sessionId);
    } catch (error) {
        console.error('Error loading session:', error);
        showError('Session introuvable');
    }
}

function getSessionIdFromUrl() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1] || null;
}

async function loadSession(sessionId) {
    try {
        const session = await BonusHuntFirebase.getSession(sessionId);
        
        if (!session) {
            showError('Session introuvable');
            return;
        }

        currentSession = session;
        updateUI(session);

        // Start real-time listener
        startRealtimeListener(sessionId);
        
    } catch (error) {
        console.error('Error loading session:', error);
        showError('Erreur lors du chargement de la session');
    }
}

function startRealtimeListener(sessionId) {
    if (sessionListener) {
        sessionListener();
    }

    sessionListener = BonusHuntFirebase.listen(sessionId, (data, error) => {
        if (error) {
            console.error('Real-time listener error:', error);
            showToast('Erreur de connexion temps réel', 'error');
            return;
        }

        if (data) {
            currentSession = data;
            updateUI(data);
        }
    });
}

function updateUI(session) {
    if (!session || !session.data) return;

    const data = session.data;
    
    // Update title
    const title = document.getElementById('sessionTitle');
    if (title) {
        title.textContent = data.name || 'Bonus Hunt';
    }

    // Update status
    updateSessionStatus(session.status);

    // Update KPIs
    updateKPIs(session);

    // Show appropriate section based on status
    showSectionForStatus(session.status, data);

    // Refresh icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function updateSessionStatus(status) {
    const statusBadge = document.getElementById('sessionStatus');
    const statusText = document.getElementById('statusText');
    
    if (!statusBadge || !statusText) return;

    const statusMap = {
        'creation': { text: 'Création', icon: 'sparkles' },
        'collection': { text: 'Collection', icon: 'folder-plus' },
        'opening': { text: 'Ouverture', icon: 'play' },
        'completed': { text: 'Terminée', icon: 'check-circle' }
    };

    const statusInfo = statusMap[status] || statusMap['creation'];
    statusText.textContent = statusInfo.text;
    
    const icon = statusBadge.querySelector('i');
    if (icon) {
        icon.setAttribute('data-lucide', statusInfo.icon);
    }
}

function updateKPIs(session) {
    const data = session.data;
    
    // Hunt price
    const huntPrice = parseFloat(data.huntPrice) || 0;
    const huntPriceEl = document.getElementById('statHuntPrice');
    if (huntPriceEl) {
        huntPriceEl.textContent = formatCurrency(huntPrice);
    }

    // Bonus count
    const bonusCount = (data.bonuses || []).length;
    const bonusCountEl = document.getElementById('bonusCount');
    if (bonusCountEl) {
        bonusCountEl.textContent = bonusCount;
    }

    // Breakeven
    const breakeven = calculateBreakeven(data.bonuses || [], huntPrice);
    const breakevenEl = document.getElementById('statBreakeven');
    if (breakevenEl) {
        breakevenEl.textContent = breakeven ? `x${breakeven.toFixed(2)}` : '--';
    }

    // Net result
    const results = data.results || [];
    const totalGain = results.reduce((sum, r) => sum + (parseFloat(r.gain) || 0), 0);
    const netResult = totalGain - huntPrice;
    const netResultEl = document.getElementById('statNetResult');
    if (netResultEl) {
        if (results.length > 0) {
            netResultEl.textContent = formatNetResultDisplay(netResult);
            netResultEl.classList.toggle('positive', netResult > 0);
            netResultEl.classList.toggle('negative', netResult < 0);
        } else {
            netResultEl.textContent = '--';
            netResultEl.classList.remove('positive', 'negative');
        }
    }
}

function showSectionForStatus(status, data) {
    // Hide all sections first
    document.getElementById('bonusCollectionSection').style.display = 'none';
    document.getElementById('bonusOpeningSection').style.display = 'none';
    document.getElementById('sessionCompletedSection').style.display = 'none';
    document.getElementById('errorSection').style.display = 'none';

    switch (status) {
        case 'creation':
            // Show empty state or nothing
            break;
        case 'collection':
            document.getElementById('bonusCollectionSection').style.display = 'block';
            renderBonusCollection(data.bonuses || []);
            break;
        case 'opening':
            document.getElementById('bonusOpeningSection').style.display = 'block';
            renderBonusResults(data.results || [], data.bonuses || []);
            break;
        case 'completed':
            document.getElementById('sessionCompletedSection').style.display = 'block';
            renderSessionSummary(data);
            break;
    }
}

function renderBonusCollection(bonuses) {
    const container = document.getElementById('bonusListContainer');
    const countEl = document.getElementById('collectionBonusCount');
    
    if (countEl) {
        countEl.textContent = bonuses.length;
    }

    if (!container) return;

    if (bonuses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="inbox"></i>
                <p>Aucun bonus collecté pour le moment</p>
            </div>
        `;
        return;
    }

    const list = document.createElement('div');
    list.className = 'games-grid';

    bonuses.forEach(bonus => {
        const card = document.createElement('article');
        card.className = 'game-card spectator-card';

        const thumb = document.createElement('div');
        thumb.className = 'game-thumb';
        const img = document.createElement('img');
        img.src = getBonusArtwork(bonus);
        img.alt = bonus.name || 'Slot';
        img.loading = 'lazy';
        thumb.appendChild(img);

        const info = document.createElement('div');
        info.className = 'game-info';

        const name = document.createElement('p');
        name.className = 'game-name';
        name.textContent = bonus.name;

        const meta = document.createElement('div');
        meta.className = 'game-meta';
        const stakeValue = parseFloat(bonus.stake).toFixed(2);
        const bonusValue = bonus.bonusValue || (parseFloat(bonus.stake) * 100);
        meta.innerHTML = `
            <span>Mise: ${stakeValue}€</span>
            <span>Bonus: ${formatCurrency(bonusValue)}</span>
        `;

        info.appendChild(name);
        info.appendChild(meta);

        card.appendChild(thumb);
        card.appendChild(info);

        list.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(list);
}

function renderBonusResults(results, bonuses) {
    const container = document.getElementById('openingListContainer');
    const countEl = document.getElementById('openingResultCount');
    
    if (countEl) {
        countEl.textContent = results.length;
    }

    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="list"></i>
                <p>Aucun bonus ouvert pour le moment</p>
            </div>
        `;
        return;
    }

    const list = document.createElement('div');
    list.className = 'opening-results-list';

    results.forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const bonus = bonuses.find(b => b.id === result.bonusId) || {};
        const artwork = getBonusArtwork(bonus);

        resultItem.innerHTML = `
            <div class="result-thumb">
                <img src="${artwork}" alt="${result.bonusName}" loading="lazy">
            </div>
            <div class="result-info">
                <h4>${result.bonusName}</h4>
                <div class="result-meta">
                    <span>Mise: ${parseFloat(result.stake).toFixed(2)}€</span>
                    <span>Gain: ${formatCurrency(result.gain)}</span>
                    <span class="multiplier">x${result.multiplier}</span>
                </div>
            </div>
        `;

        list.appendChild(resultItem);
    });

    container.innerHTML = '';
    container.appendChild(list);
}

function renderSessionSummary(data) {
    const container = document.getElementById('sessionSummary');
    if (!container) return;

    const results = data.results || [];
    const huntPrice = parseFloat(data.huntPrice) || 0;
    const totalGain = results.reduce((sum, r) => sum + (parseFloat(r.gain) || 0), 0);
    const netResult = totalGain - huntPrice;
    const netClass = netResult >= 0 ? 'positive' : 'negative';
    const netDisplay = formatNetResultDisplay(netResult);

    container.innerHTML = `
        <div class="summary-pills">
            <span>Solde initial: ${formatCurrency(huntPrice)}</span>
            <span>Gain total: ${formatCurrency(totalGain)}</span>
        </div>
        <p class="summary-net ${netClass}">Résultat net: ${netDisplay}</p>
    `;
}

function calculateBreakeven(bonuses, huntPrice) {
    const totalStake = bonuses.reduce((sum, bonus) => sum + (parseFloat(bonus.stake) || 0), 0);
    if (totalStake <= 0 || huntPrice <= 0) {
        return null;
    }

    const totalBonusValue = totalStake * 100;
    if (totalBonusValue <= 0) {
        return null;
    }

    return (huntPrice / totalBonusValue) * 100;
}

function getBonusArtwork(bonus) {
    if (!bonus) {
        return '/slot.png';
    }

    const customImage = (bonus.imageUrl || '').trim();
    if (customImage) {
        return customImage;
    }

    const providerKey = (bonus.provider || '').toLowerCase();
    if (providerKey && PROVIDER_ARTWORKS[providerKey]) {
        return PROVIDER_ARTWORKS[providerKey];
    }

    return '/slot.png';
}

function formatCurrency(value) {
    const number = Number(value);
    if (!isFinite(number)) {
        return '0,00€';
    }
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number) + '€';
}

function formatNetResultDisplay(value) {
    if (!isFinite(value)) {
        return '--';
    }
    if (value === 0) {
        return '0,00€';
    }
    const sign = value > 0 ? '+' : '-';
    return `${sign}${formatCurrency(Math.abs(value))}`;
}

function showError(message) {
    const errorSection = document.getElementById('errorSection');
    if (errorSection) {
        errorSection.style.display = 'block';
        const messageEl = errorSection.querySelector('.text-muted');
        if (messageEl) {
            messageEl.textContent = message;
        }
    }

    // Hide other sections
    document.getElementById('bonusCollectionSection').style.display = 'none';
    document.getElementById('bonusOpeningSection').style.display = 'none';
    document.getElementById('sessionCompletedSection').style.display = 'none';

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        console.log(`[${type}] ${message}`);
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (sessionListener) {
        sessionListener();
    }
});
