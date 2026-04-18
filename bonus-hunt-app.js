// Bonus Hunt Application JavaScript
// Application logic for the redesigned Bonus Hunt Tracker

document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    initializeBonusHuntFirebaseIntegration();
    initializeBonusHuntApp();
});

const HISTORY_STORAGE_KEY = 'bonusHuntHistory';
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

let selectedHistoryIndex = null;
let currentHistoryList = [];

let openingPhaseState = {
    currentBonusIndex: 0,
    bonuses: [],
    results: [],
    summarySaved: false
};

// Firebase session management
let currentFirebaseSession = null;
let sessionListenerUnsubscribe = null;
let isFirebaseEnabled = false;
let currentSessionId = null;
let currentShareableCode = null;

// ─── FIX 1: Single unified updateShareButton (was declared twice, causing the
//            code display to never appear correctly) ───────────────────────────
function updateShareButton() {
    const shareBtn = document.getElementById('shareSessionButton');
    const shareCodeDisplay = document.getElementById('shareCodeDisplay');
    const shareCodeSpan = document.getElementById('shareCode');

    const storedCode = localStorage.getItem('bonusHuntShareableCode');
    const code = currentShareableCode || storedCode;

    if (code) {
        if (shareBtn) shareBtn.style.display = 'flex';
        if (shareCodeDisplay && shareCodeSpan) {
            shareCodeDisplay.style.display = 'flex';
            shareCodeSpan.textContent = code;
        }
    } else {
        if (shareBtn) shareBtn.style.display = 'none';
        if (shareCodeDisplay) shareCodeDisplay.style.display = 'none';
    }
}

// ─── FIX 2: setupShareHandlers only — share button listener is NOT duplicated
//            in setupFormHandlers anymore ──────────────────────────────────────
function setupShareHandlers() {
    const copyCodeBtn = document.getElementById('copyCodeButton');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', copyShareCode);
    }

    const shareBtn = document.getElementById('shareSessionButton');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareSession);
    }
}

function copyShareCode() {
    const code = currentShareableCode || localStorage.getItem('bonusHuntShareableCode');
    if (!code) {
        showToast('Aucun code de partage disponible', 'error');
        return;
    }

    const shareUrl = `${window.location.origin}/bonus-hunt/${code}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast('Lien copié dans le presse-papier !', 'success');
        }).catch(() => {
            fallbackCopyText(shareUrl);
        });
    } else {
        fallbackCopyText(shareUrl);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('Lien copié dans le presse-papier !', 'success');
    } catch (err) {
        showToast('Impossible de copier le lien', 'error');
    }

    document.body.removeChild(textArea);
}

function shareSession() {
    const code = currentShareableCode || localStorage.getItem('bonusHuntShareableCode');
    if (!code) {
        showToast('Aucun code de partage disponible', 'error');
        return;
    }

    const shareUrl = `${window.location.origin}/bonus-hunt/${code}`;

    if (navigator.share) {
        navigator.share({
            title: 'Bonus Hunt',
            text: 'Regardez mon Bonus Hunt en cours !',
            url: shareUrl
        }).catch(err => console.log('Erreur de partage:', err));
    } else {
        copyShareCode();
    }
}

function initializeBonusHuntApp() {
    setupFormHandlers();
    setupSidebarToggle();
    setupShareHandlers();

    setupAppOverrides();

    setupEnhancedAnimations();
    setupGamingEffects();

    if (isFirebaseEnabled) {
        loadRequestedOrActiveSession().then(() => {
            renderBonusCollectionList();
            renderSessionHistory();
            updateKeyStats();
        });
    } else {
        renderBonusCollectionList();
        renderSessionHistory();
        updateKeyStats();
    }
}

async function loadRequestedOrActiveSession() {
    const loadedFromUrl = await loadSessionFromUrlParams();
    if (!loadedFromUrl) {
        await loadActiveSession();
    }
}

// ─── FIX 4: testFirebaseConnection removed from auto-init — it was creating
//            and deleting a fake Firestore session on every page load, wasting
//            quota. Firebase is now validated only by the initialize() call. ───
function initializeBonusHuntFirebaseIntegration() {
    if (typeof BonusHuntFirebase !== 'undefined') {
        try {
            isFirebaseEnabled = BonusHuntFirebase.initialize();

            if (isFirebaseEnabled) {
                console.log('Bonus Hunt Firebase integration initialized');
            } else {
                console.warn('Bonus Hunt Firebase initialization failed, using localStorage only');
            }
        } catch (error) {
            console.error('Error initializing Bonus Hunt Firebase:', error);
            isFirebaseEnabled = false;
            console.log('Falling back to localStorage mode');
        }
    } else {
        console.warn('Bonus Hunt Firebase module not loaded, using localStorage only');
    }
}

// ─── FIX 2 (continued): share button listener removed from here — it is
//            already added in setupShareHandlers above ────────────────────────
function setupFormHandlers() {
    const bonusForm = document.getElementById('bonusForm');
    if (bonusForm) {
        bonusForm.addEventListener('submit', handleBonusFormSubmit);
    }

    const gainForm = document.getElementById('gainForm');
    if (gainForm) {
        gainForm.addEventListener('submit', handleOpeningGainSubmit);
    }

    const cancelEditBtn = document.getElementById('cancelEditButton');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', () => {
            if (window.app && typeof window.app.cancelBonusEdit === 'function') {
                window.app.cancelBonusEdit();
            }
        });
    }
    // NOTE: share button listener intentionally NOT added here — see setupShareHandlers()
}

function setupSidebarToggle() {
    const toggle = document.getElementById('mobileSidebarToggle');
    const closeBtn = document.getElementById('sidebarClose');
    const overlay = document.getElementById('sidebarOverlay');

    const closeSidebar = () => document.body.classList.remove('sidebar-open');

    if (toggle) {
        toggle.addEventListener('click', () => document.body.classList.add('sidebar-open'));
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            document.body.classList.remove('sidebar-open');
        }
    });
}

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

function formatCurrency(value) {
    const number = Number(value);
    if (!isFinite(number)) {
        return '0,00€';
    }
    return `${currencyFormatter.format(number)}€`;
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

function formatSessionDate(dateString) {
    if (!dateString) return '';
    try {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    } catch (error) {
        return '';
    }
}

function refreshLucideIcons() {
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

function handleBonusFormSubmit(event) {
    event.preventDefault();

    if (!window.app) {
        console.error('window.app is not defined');
        showToast('Erreur: application non initialisée', 'error');
        return;
    }

    const bonusName = document.getElementById('bonusName').value;
    const spinPrice = parseFloat(document.getElementById('bonusStake').value);

    if (!bonusName.trim() || !spinPrice || spinPrice <= 0) {
        showToast('Veuillez remplir correctement tous les champs', 'warning');
        return;
    }

    const bonusValue = spinPrice * 100;
    const existingBonuses = Array.isArray(window.app.sessionData?.bonuses)
        ? window.app.sessionData.bonuses
        : [];

    if (window.app.editingBonusId) {
        const index = existingBonuses.findIndex(b => b.id === window.app.editingBonusId);
        if (index !== -1) {
            existingBonuses[index] = {
                ...existingBonuses[index],
                name: bonusName,
                stake: spinPrice,
                bonusPrice: bonusValue,
                bonusValue,
                updatedAt: new Date().toISOString()
            };
            showToast('Bonus mis à jour', 'success');
        }

        window.app.editingBonusId = null;
        window.app.setBonusFormState?.('add');
    } else {
        const bonus = {
            id: Date.now(),
            name: bonusName,
            stake: spinPrice,
            bonusPrice: bonusValue,
            bonusValue,
            result: null,
            createdAt: new Date().toISOString()
        };
        existingBonuses.push(bonus);
        showToast('Bonus ajouté avec succès', 'success');
    }

    syncDataToFirebase({ bonuses: existingBonuses });

    document.getElementById('bonusForm').reset();
    renderBonusCollectionList();
    updateBonusStats();
}

function renderBonusCollectionList() {
    const container = document.getElementById('bonusListContainer');
    if (!container) return;

    if (!window.app) {
        console.error('window.app is not defined in renderBonusCollectionList');
        container.innerHTML = '<div class="empty-state"><p>Erreur: application non initialisée</p></div>';
        return;
    }

    container.innerHTML = '';
    const bonuses = Array.isArray(window.app.sessionData?.bonuses) ? window.app.sessionData.bonuses : [];

    if (bonuses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="inbox"></i>
                <p>Aucun bonus ajouté. Commencez par ajouter un bonus !</p>
            </div>`;
        refreshLucideIcons();
        return;
    }

    const list = document.createElement('div');
    list.className = 'games-grid';

    bonuses.forEach(bonus => {
        const card = document.createElement('article');
        card.className = 'game-card';
        card.setAttribute('data-bonus-id', bonus.id);

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
        const stakeValue = isFinite(parseFloat(bonus.stake)) ? parseFloat(bonus.stake).toFixed(2) : '0.00';
        const bonusValue = Number.isFinite(bonus.bonusValue)
            ? bonus.bonusValue
            : Number(bonus.bonusPrice) || (parseFloat(bonus.stake) || 0) * 100;
        meta.innerHTML = `
            <span>Mise: ${stakeValue}€</span>
            <span>Bonus: ${formatCurrency(bonusValue)}</span>
        `;

        info.appendChild(name);
        info.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'game-actions';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'icon-button';
        editBtn.innerHTML = '<i data-lucide="pencil"></i>';
        editBtn.addEventListener('click', () => {
            if (window.app && typeof window.app.beginBonusEdit === 'function') {
                window.app.beginBonusEdit(bonus.id);
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'icon-button danger';
        deleteBtn.innerHTML = '<i data-lucide="trash-2"></i>';
        deleteBtn.addEventListener('click', () => removeBonus(bonus.id));

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(thumb);
        card.appendChild(info);
        card.appendChild(actions);

        list.appendChild(card);
    });

    container.appendChild(list);
    refreshLucideIcons();
}

function removeBonus(bonusId) {
    if (window.app && Array.isArray(window.app.sessionData?.bonuses)) {
        window.app.sessionData.bonuses = window.app.sessionData.bonuses.filter(b => b.id !== bonusId);
    }

    if (window.app && window.app.editingBonusId === bonusId && typeof window.app.cancelBonusEdit === 'function') {
        window.app.cancelBonusEdit();
    }

    syncDataToFirebase({ bonuses: window.app.sessionData.bonuses });

    renderBonusCollectionList();
    updateBonusStats();
    showToast('Bonus supprimé', 'success');
}

function updateBonusStats() {
    updateKeyStats();
}

function calculateBreakevenMultiplier(bonuses, startingBalance) {
    const totalStake = bonuses.reduce((sum, bonus) => sum + (parseFloat(bonus.stake) || 0), 0);
    if (totalStake <= 0 || startingBalance <= 0) {
        return null;
    }

    const totalBonusValue = totalStake * 100;
    if (totalBonusValue <= 0) {
        return null;
    }

    return (startingBalance / totalBonusValue) * 100;
}

function computeSessionMetadata({ bonuses = [], results = [], huntPrice = 0 }) {
    const safeBonuses = Array.isArray(bonuses) ? bonuses : [];
    const safeResults = Array.isArray(results) ? results : [];
    const safeHuntPrice = parseFloat(huntPrice) || 0;

    const totalInvested = safeBonuses.reduce((sum, b) => sum + (parseFloat(b.stake) || 0), 0);
    const totalCollected = safeResults.reduce((sum, r) => sum + (parseFloat(r.gain) || 0), 0);
    const netResult = totalCollected - safeHuntPrice;

    return {
        bonusCount: safeBonuses.length,
        totalInvested,
        totalCollected,
        netResult,
        breakevenMultiplier: calculateBreakevenMultiplier(safeBonuses, safeHuntPrice)
    };
}

function syncDataToFirebase(dataUpdates) {
    if (!isFirebaseEnabled) return;

    const sessionId = localStorage.getItem('bonusHuntCurrentSessionId');
    if (!sessionId) return;

    const metadata = computeSessionMetadata({
        bonuses: dataUpdates?.bonuses ?? window.app?.sessionData?.bonuses,
        results: dataUpdates?.results ?? openingPhaseState.results,
        huntPrice: window.app?.sessionData?.huntPrice
    });

    BonusHuntFirebase.updateData(sessionId, {
        ...dataUpdates,
        metadata
    }).catch(console.error);
}

function updateCompactBreakevenDisplay() {
    if (!window.app) return;
    const bonuses = Array.isArray(window.app.sessionData?.bonuses) ? window.app.sessionData.bonuses : [];
    const startingBalance = window.app.sessionData?.huntPrice || 0;
    const multiplier = calculateBreakevenMultiplier(bonuses, startingBalance);

    const chip = document.getElementById('compactBreakevenDisplay');
    if (chip) {
        if (multiplier) {
            chip.style.display = 'flex';
            chip.textContent = `Breakeven x${multiplier.toFixed(2)}`;
        } else {
            chip.style.display = 'none';
        }
    }

    const stat = document.getElementById('statBreakeven');
    if (stat) {
        stat.textContent = multiplier ? `x${multiplier.toFixed(2)}` : '--';
    }
}

function updateKeyStats() {
    const bonuses = Array.isArray(window.app?.sessionData?.bonuses) ? window.app.sessionData.bonuses : [];
    const bonusCount = bonuses.length;
    const startingBalance = window.app?.sessionData?.huntPrice ? parseFloat(window.app.sessionData.huntPrice) : 0;
    const totalGain = openingPhaseState.results.reduce((sum, result) => sum + (parseFloat(result.gain) || 0), 0);
    const netResult = totalGain - startingBalance;

    const huntPriceEl = document.getElementById('statHuntPrice');
    if (huntPriceEl) {
        huntPriceEl.textContent = formatCurrency(startingBalance);
    }

    const bonusCountEl = document.getElementById('bonusCount');
    if (bonusCountEl) {
        bonusCountEl.textContent = bonusCount;
    }

    const collectionCountEl = document.getElementById('collectionBonusCount');
    if (collectionCountEl) {
        collectionCountEl.textContent = bonusCount;
    }

    const netResultEl = document.getElementById('statNetResult');
    if (netResultEl) {
        if (openingPhaseState.results.length === 0) {
            netResultEl.textContent = '--';
            netResultEl.classList.remove('positive');
            netResultEl.classList.remove('negative');
        } else {
            netResultEl.textContent = formatNetResultDisplay(netResult);
            netResultEl.classList.toggle('positive', netResult > 0);
            netResultEl.classList.toggle('negative', netResult < 0);
        }
    }

    updateCompactBreakevenDisplay();
}

function handleOpeningGainSubmit(event) {
    event.preventDefault();
    const gainAmount = parseFloat(document.getElementById('gainAmount').value) || 0;
    const currentBonus = openingPhaseState.bonuses[openingPhaseState.currentBonusIndex];

    if (!currentBonus) return;

    const betAmount = parseAmount(currentBonus.stake);
    const normalizedStake = betAmount !== null ? betAmount : 0;
    const bonusValue = currentBonus.bonusValue || (normalizedStake * 100);

    const multiplierValue = normalizedStake > 0 ? (gainAmount / normalizedStake).toFixed(2) : '0';

    const result = {
        bonusId: currentBonus.id,
        bonusName: currentBonus.name,
        stake: normalizedStake,
        bonusPrice: bonusValue,
        bonusValue,
        gain: gainAmount,
        multiplier: multiplierValue,
        createdAt: new Date().toISOString()
    };

    openingPhaseState.results.push(result);
    addResultToOpeningList(result);
    updateKeyStats();

    syncDataToFirebase({ results: openingPhaseState.results });

    openingPhaseState.currentBonusIndex++;

    if (openingPhaseState.currentBonusIndex < openingPhaseState.bonuses.length) {
        displayCurrentBonus();
    } else {
        showSessionSummary();
    }

    document.getElementById('gainAmount').value = '';
    document.getElementById('gainMultiplier').value = '';
}

function parseAmount(value) {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : null;
    }
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function getBonusPriceFromBonus(bonus) {
    if (!bonus) return 0;
    const candidateKeys = ['bonusPrice', 'price', 'bonusCost', 'cost', 'buyPrice', 'purchasePrice', 'totalCost'];
    for (const key of candidateKeys) {
        const amount = parseAmount(bonus[key]);
        if (amount !== null) {
            return amount;
        }
    }
    const stakeAmount = parseAmount(bonus.stake);
    return stakeAmount !== null ? stakeAmount : 0;
}

function getBonusPriceForResult(result) {
    if (!result) return 0;

    const bonusValueAmount = parseAmount(result.bonusValue);
    if (bonusValueAmount !== null) {
        return bonusValueAmount;
    }

    const directAmount = parseAmount(result.bonusPrice);
    if (directAmount !== null) {
        return directAmount;
    }

    const stakeAmount = parseAmount(result.stake);
    if (stakeAmount !== null) {
        return stakeAmount * 100;
    }

    const linkedBonus = openingPhaseState.bonuses.find(b => b.id === result.bonusId);
    if (linkedBonus) {
        return linkedBonus.bonusValue || (linkedBonus.stake * 100);
    }

    return 0;
}

function displayCurrentBonus() {
    const currentBonus = openingPhaseState.bonuses[openingPhaseState.currentBonusIndex];

    if (!currentBonus) return;

    const providerEl = document.getElementById('openingBonusProvider');
    if (providerEl) {
        providerEl.style.display = 'none';
    }

    const nameEl = document.getElementById('openingBonusName');
    if (nameEl) {
        nameEl.textContent = currentBonus.name;
    }

    const bonusValue = currentBonus.bonusValue || (currentBonus.stake * 100);
    const betEl = document.getElementById('openingBetAmount');
    if (betEl) {
        betEl.textContent = formatCurrency(bonusValue);
    }

    const imageEl = document.getElementById('openingBonusImage');
    if (imageEl) {
        imageEl.src = getBonusArtwork(currentBonus);
        imageEl.alt = currentBonus.name || 'Slot';
    }

    document.getElementById('gainAmount').value = '';
    document.getElementById('gainMultiplier').value = '';
}

function addResultToOpeningList(result) {
    const container = document.getElementById('openingListContainer');
    if (!container) return;

    const emptyState = container.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }

    const resultIndex = openingPhaseState.results.indexOf(result);

    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.setAttribute('data-result-index', resultIndex);

    const resultInfo = document.createElement('div');
    resultInfo.className = 'result-info';
    renderResultInfo(resultInfo, result);

    const actions = document.createElement('div');
    actions.className = 'result-actions';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'icon-button result-edit-btn';
    editBtn.innerHTML = '<i data-lucide="edit-2"></i>';
    editBtn.addEventListener('click', () => editResult(resultIndex, resultItem));

    actions.appendChild(editBtn);

    resultItem.appendChild(resultInfo);
    resultItem.appendChild(actions);
    container.appendChild(resultItem);

    refreshLucideIcons();
}

function renderResultInfo(resultInfo, result) {
    const multiplierClass = result.gain > 0 ? 'positive' : 'negative';
    resultInfo.innerHTML = `
        <p class="result-name">${escapeHtml(result.bonusName)}</p>
        <div class="result-meta">
            <span class="result-gain">Gain: <span class="result-gain-value">${result.gain.toFixed(2)}</span>€</span>
            <span class="result-multiplier ${multiplierClass}">×<span class="result-multiplier-value">${result.multiplier}</span></span>
        </div>
    `;
}

function editResult(resultIndex, resultItem) {
    const result = openingPhaseState.results[resultIndex];
    if (!result) return;

    const resultInfo = resultItem.querySelector('.result-info');
    const editBtn = resultItem.querySelector('.result-edit-btn');
    if (editBtn) {
        editBtn.style.display = 'none';
    }

    const editForm = document.createElement('div');
    editForm.className = 'inline-edit-form';

    const gainInput = document.createElement('input');
    gainInput.type = 'number';
    gainInput.value = result.gain;
    gainInput.step = '0.01';

    const multiplierDisplay = document.createElement('span');
    multiplierDisplay.className = 'result-multiplier-display';
    multiplierDisplay.textContent = `×${result.multiplier}`;

    function updateMultiplier() {
        const newGain = parseFloat(gainInput.value) || 0;
        const newMultiplier = result.stake > 0 ? (newGain / result.stake).toFixed(2) : '0';
        multiplierDisplay.textContent = `×${newMultiplier}`;
        multiplierDisplay.classList.toggle('positive', newGain > 0);
        multiplierDisplay.classList.toggle('negative', newGain <= 0);
    }

    gainInput.addEventListener('input', updateMultiplier);

    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'btn btn-success';
    saveBtn.innerHTML = '<i data-lucide="check"></i>';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn btn-outline';
    cancelBtn.innerHTML = '<i data-lucide="x"></i>';

    editForm.appendChild(document.createTextNode('Gain: '));
    editForm.appendChild(gainInput);
    editForm.appendChild(document.createTextNode(' €'));
    editForm.appendChild(multiplierDisplay);
    editForm.appendChild(saveBtn);
    editForm.appendChild(cancelBtn);

    resultInfo.innerHTML = '';
    resultInfo.appendChild(editForm);
    gainInput.focus();

    saveBtn.addEventListener('click', () => {
        const newGain = parseFloat(gainInput.value) || 0;
        result.gain = newGain;
        result.multiplier = result.stake > 0 ? (newGain / result.stake).toFixed(2) : '0';

        syncDataToFirebase({ results: openingPhaseState.results });

        reloadResultDisplay(resultIndex, resultItem);
        updateSessionSummaryTotals();
    });

    cancelBtn.addEventListener('click', () => {
        reloadResultDisplay(resultIndex, resultItem);
    });

    refreshLucideIcons();
}

function reloadResultDisplay(resultIndex, resultItem) {
    const result = openingPhaseState.results[resultIndex];
    if (!result) return;

    resultItem.innerHTML = '';

    const resultInfo = document.createElement('div');
    resultInfo.className = 'result-info';
    renderResultInfo(resultInfo, result);

    const actions = document.createElement('div');
    actions.className = 'result-actions';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'icon-button result-edit-btn';
    editBtn.innerHTML = '<i data-lucide="edit-2"></i>';
    editBtn.addEventListener('click', () => editResult(resultIndex, resultItem));

    actions.appendChild(editBtn);

    resultItem.appendChild(resultInfo);
    resultItem.appendChild(actions);

    refreshLucideIcons();
}

function buildSummaryCardHTML(startingBalance, totalGain, netResult) {
    const netClass = netResult >= 0 ? 'positive' : 'negative';
    const netDisplay = netResult === 0 ? '0,00€' : formatNetResultDisplay(netResult);
    return `
        <h3>Session terminée</h3>
        <div class="summary-pills">
            <span>Solde initial: ${formatCurrency(startingBalance)}</span>
            <span>Gain total: ${formatCurrency(totalGain)}</span>
        </div>
        <p class="summary-net ${netClass}">Résultat net: ${netDisplay}</p>
    `;
}

function updateSessionSummaryTotals() {
    const totalGain = openingPhaseState.results.reduce((sum, result) => sum + (parseFloat(result.gain) || 0), 0);
    const startingBalance = window.app?.sessionData?.huntPrice ? parseFloat(window.app.sessionData.huntPrice) : 0;
    const netResult = totalGain - startingBalance;

    const summaryCard = document.querySelector('.session-summary-card');
    if (summaryCard) {
        summaryCard.innerHTML = buildSummaryCardHTML(startingBalance, totalGain, netResult);
    }

    updateKeyStats();
}

function showSessionSummary() {
    const totalGain = openingPhaseState.results.reduce((sum, result) => sum + (parseFloat(result.gain) || 0), 0);
    const startingBalance = window.app?.sessionData?.huntPrice ? parseFloat(window.app.sessionData.huntPrice) : 0;
    const netResult = totalGain - startingBalance;

    const openingPanel = document.querySelector('.opening-phase-panel');
    if (openingPanel) {
        openingPanel.style.display = 'none';
    }

    const container = document.getElementById('openingListContainer');
    if (container) {
        const summaryCard = document.createElement('div');
        summaryCard.className = 'session-summary-card';
        summaryCard.innerHTML = buildSummaryCardHTML(startingBalance, totalGain, netResult);
        container.prepend(summaryCard);
    }

    if (!openingPhaseState.summarySaved && openingPhaseState.results.length > 0) {
        if (!isFirebaseEnabled) {
            saveSessionToHistory({
                id: Date.now(),
                name: window.app?.sessionData?.name || 'Bonus Hunt',
                date: new Date().toISOString(),
                startingBalance,
                totalGain,
                netResult,
                bonuses: openingPhaseState.bonuses,
                results: openingPhaseState.results
            });
        } else {
            syncDataToFirebase({ results: openingPhaseState.results });
        }
        openingPhaseState.summarySaved = true;
        renderSessionHistory();
    }

    updateKeyStats();
    refreshLucideIcons();
}

function saveSessionToHistory(sessionSummary) {
    if (typeof localStorage === 'undefined') return;

    const history = getSessionHistoryLegacy();
    const safeSummary = {
        ...sessionSummary,
        bonuses: Array.isArray(sessionSummary.bonuses)
            ? sessionSummary.bonuses.map(bonus => ({ ...bonus }))
            : [],
        results: Array.isArray(sessionSummary.results)
            ? sessionSummary.results.map(result => ({ ...result }))
            : []
    };

    history.unshift(safeSummary);
    if (history.length > 10) {
        history.length = 10;
    }

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    selectedHistoryIndex = 0;
}

function getSessionHistory() {
    if (isFirebaseEnabled) return currentHistoryList;
    return getSessionHistoryLegacy();
}

function getSessionHistoryLegacy() {
    if (typeof localStorage === 'undefined') return [];
    try {
        const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

async function renderSessionHistory() {
    const listEl = document.getElementById('sessionHistoryList');
    if (!listEl) return;

    if (isFirebaseEnabled) {
        try {
            const sessions = await BonusHuntFirebase.getUserSessions(null, { limit: 100, fetchAll: true });

            currentHistoryList = sessions.map(s => {
                const data = s.data || {};
                const bonuses = Array.isArray(data.bonuses) ? data.bonuses : [];
                const results = Array.isArray(data.results) ? data.results : [];

                const startingBalance = parseFloat(data.huntPrice) || 0;
                const computedTotalGain = results.reduce((sum, r) => sum + (parseFloat(r.gain) || 0), 0);
                const totalGain = Number.isFinite(data?.metadata?.totalCollected)
                    ? data.metadata.totalCollected
                    : computedTotalGain;

                const computedNetResult = totalGain - startingBalance;
                const netResult = Number.isFinite(data?.metadata?.netResult)
                    ? data.metadata.netResult
                    : computedNetResult;

                return {
                    id: s.id,
                    name: data.name || 'Bonus Hunt',
                    date: s.createdAt?.toDate ? s.createdAt.toDate().toISOString() : s.createdAt,
                    startingBalance,
                    totalGain,
                    netResult,
                    bonuses,
                    results,
                    status: s.status
                };
            });
        } catch (e) {
            console.error('Error fetching history:', e);
            currentHistoryList = getSessionHistoryLegacy();
        }
    } else {
        currentHistoryList = getSessionHistoryLegacy();
    }

    const history = currentHistoryList;
    listEl.innerHTML = '';

    if (!history.length) {
        listEl.innerHTML = `
            <div class="empty-state compact">
                <i data-lucide="clock-3"></i>
                <p>Aucune session enregistrée</p>
            </div>`;
        const details = document.getElementById('sessionHistoryDetails');
        if (details) {
            details.innerHTML = '<h4>Aperçu</h4><p>Sélectionnez une session pour afficher les détails et revivre vos gains.</p>';
        }
        selectedHistoryIndex = null;
        refreshLucideIcons();
        return;
    }

    if (selectedHistoryIndex === null || selectedHistoryIndex >= history.length) {
        selectedHistoryIndex = 0;
    }

    history.forEach((session, index) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = `history-item${index === selectedHistoryIndex ? ' active' : ''}`;

        const statusIndicator = session.status && session.status !== 'completed' ? '<span class="status-dot active">● </span>' : '';

        item.innerHTML = `
            <div>
                <p class="history-date">${statusIndicator}${formatSessionDate(session.date) || '—'}</p>
                <p class="history-balance">Budget ${formatCurrency(session.startingBalance || 0)}</p>
            </div>
            <span class="history-net ${session.netResult >= 0 ? 'positive' : 'negative'}">${formatNetResultDisplay(session.netResult || 0)}</span>
        `;
        item.addEventListener('click', () => {
            showSessionDetails(index);
            if (window.innerWidth <= 1024) {
                document.body.classList.remove('sidebar-open');
            }
        });
        listEl.appendChild(item);
    });

    showSessionDetails(selectedHistoryIndex);
    refreshLucideIcons();
}

function showSessionDetails(index) {
    const history = getSessionHistory();
    const session = history[index];
    if (!session) return;

    selectedHistoryIndex = index;
    highlightActiveHistoryItem(index);

    const details = document.getElementById('sessionHistoryDetails');
    if (!details) return;

    const resultsPreview = Array.isArray(session.results) ? session.results.slice(0, 3) : [];
    const previewList = resultsPreview.length
        ? resultsPreview.map(result => `<li>${escapeHtml(result.bonusName || 'Slot')} · ${formatCurrency(result.gain || 0)}</li>`).join('')
        : '<li>Aucun résultat enregistré</li>';

    details.innerHTML = `
        <div class="history-detail-header">
            <h4>${escapeHtml(session.name || 'Bonus Hunt')}</h4>
            <span>${formatSessionDate(session.date) || ''}</span>
        </div>
        <div class="history-detail-stats">
            <span class="history-pill">Budget ${formatCurrency(session.startingBalance || 0)}</span>
            <span class="history-pill">Gains ${formatCurrency(session.totalGain || 0)}</span>
            <span class="history-pill ${session.netResult >= 0 ? 'positive' : 'negative'}">${formatNetResultDisplay(session.netResult || 0)}</span>
        </div>
        <ul class="history-mini-list">${previewList}</ul>
    `;
}

function highlightActiveHistoryItem(index) {
    const items = document.querySelectorAll('.history-item');
    items.forEach((item, idx) => {
        if (idx === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function escapeHtml(text) {
    if (typeof text !== 'string') {
        return text || '';
    }
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

window.BonusHuntApp = {
    showToast,
    formatCurrency,
    displayCurrentBonus
};

// --- Share Modal ---

function getSessionShareableLink(code) {
    if (!code) return null;
    return `${window.location.origin}/bonus-hunt/${code}`;
}

function handleShareSession() {
    const code = currentShareableCode || localStorage.getItem('bonusHuntShareableCode');
    if (!code) {
        showToast('Aucune session active à partager', 'warning');
        return;
    }

    const shareLink = getSessionShareableLink(code);
    if (!shareLink) {
        showToast('Impossible de générer le lien', 'error');
        return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareLink)
            .then(() => {
                showToast('Lien copié dans le presse-papier !', 'success');
                showShareModal(shareLink);
            })
            .catch(() => {
                showShareModal(shareLink);
            });
    } else {
        showShareModal(shareLink);
    }
}

function showShareModal(shareLink) {
    const modal = document.createElement('div');
    modal.className = 'share-modal-overlay';
    modal.innerHTML = `
        <div class="share-modal glass-card">
            <div class="share-modal-header">
                <h3>Partager votre session</h3>
                <button class="icon-button" onclick="this.closest('.share-modal-overlay').remove()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="share-modal-body">
                <p class="text-muted">Les spectateurs pourront suivre votre session en temps réel</p>
                <div class="share-link-container">
                    <input type="text" value="${shareLink}" readonly class="share-link-input" id="shareLinkInput">
                    <button class="btn btn-primary" onclick="copyShareLink()">
                        <i data-lucide="copy"></i>
                        Copier
                    </button>
                </div>
                <div class="share-info">
                    <i data-lucide="eye"></i>
                    <span>Mode spectateur en lecture seule</span>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    refreshLucideIcons();

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

window.copyShareLink = function() {
    const input = document.getElementById('shareLinkInput');
    if (input) {
        input.select();
        input.setSelectionRange(0, 99999);

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(input.value)
                .then(() => {
                    showToast('Lien copié !', 'success');
                })
                .catch(() => {
                    document.execCommand('copy');
                    showToast('Lien copié !', 'success');
                });
        } else {
            document.execCommand('copy');
            showToast('Lien copié !', 'success');
        }
    }
};

// --- App Overrides ---

function setupAppOverrides() {
    if (!window.app) return;

    window.app.goToCollection = async function() {
        const huntName = document.getElementById('huntName').value;
        const huntPrice = parseFloat(document.getElementById('huntPrice').value);

        if (!huntName.trim()) {
            alert('Veuillez entrer un nom pour le bonus hunt');
            return;
        }
        if (!huntPrice || huntPrice <= 0) {
            alert('Veuillez entrer un prix/budget valide');
            return;
        }

        this.sessionData.name = huntName;
        this.sessionData.huntPrice = huntPrice;
        this.updateSessionHeader();
        if (typeof updateKeyStats === 'function') {
            updateKeyStats();
        }

        if (isFirebaseEnabled) {
            try {
                let sessionId = localStorage.getItem('bonusHuntCurrentSessionId');
                if (sessionId) {
                    await BonusHuntFirebase.updateSession(sessionId, {
                        'data.name': huntName,
                        'data.huntPrice': huntPrice,
                        'status': 'collection'
                    });
                    startSessionListener(sessionId);
                } else {
                    const session = await BonusHuntFirebase.createSession({
                        name: huntName,
                        huntPrice: huntPrice,
                        status: 'collection'
                    });
                    sessionId = session.sessionId;
                    currentShareableCode = session.shareableCode;
                    localStorage.setItem('bonusHuntCurrentSessionId', sessionId);
                    localStorage.setItem('bonusHuntShareableCode', session.shareableCode);
                    startSessionListener(sessionId);
                }
                updateShareButton();
            } catch (e) {
                console.error('Firebase sync error:', e);
            }
        }

        this.currentStep = 2;
        this.switchView('view-collection', 2);
    };

    window.app.goToOpening = async function() {
        if (!this.sessionData.bonuses || this.sessionData.bonuses.length === 0) {
            alert('Veuillez ajouter au moins un bonus');
            return;
        }

        if (typeof openingPhaseState !== 'undefined') {
            openingPhaseState.bonuses = this.sessionData.bonuses;
            openingPhaseState.currentBonusIndex = 0;
            openingPhaseState.results = [];
            openingPhaseState.summarySaved = false;
        }

        const openingList = document.getElementById('openingListContainer');
        if (openingList) {
            openingList.innerHTML = `
                <div class="empty-state">
                    <i data-lucide="list"></i>
                    <p>Aucun résultat enregistré pour le moment.</p>
                </div>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        if (isFirebaseEnabled) {
            const sessionId = localStorage.getItem('bonusHuntCurrentSessionId');
            if (sessionId) {
                await BonusHuntFirebase.updatePhase(sessionId, 'opening');
                syncDataToFirebase({ bonuses: this.sessionData.bonuses });
            }
        }

        this.currentStep = 3;
        this.switchView('view-opening', 3);

        if (typeof displayCurrentBonus !== 'undefined') displayCurrentBonus();
        if (typeof updateKeyStats === 'function') updateKeyStats();
    };

    // ─── FIX 5 & 6: finishSession now saves to localStorage when Firebase is
    //               disabled, so session data is never silently lost ────────────
    window.app.finishSession = async function() {
        // Save to localStorage if Firebase is not available
        if (!isFirebaseEnabled && openingPhaseState.results.length > 0 && !openingPhaseState.summarySaved) {
            const totalGain = openingPhaseState.results.reduce((sum, r) => sum + (parseFloat(r.gain) || 0), 0);
            const startingBalance = parseFloat(this.sessionData.huntPrice) || 0;
            const netResult = totalGain - startingBalance;

            saveSessionToHistory({
                id: Date.now(),
                name: this.sessionData.name || 'Bonus Hunt',
                date: new Date().toISOString(),
                startingBalance,
                totalGain,
                netResult,
                bonuses: openingPhaseState.bonuses,
                results: openingPhaseState.results
            });
            openingPhaseState.summarySaved = true;
        }

        if (isFirebaseEnabled) {
            const sessionId = localStorage.getItem('bonusHuntCurrentSessionId');
            if (sessionId) {
                await BonusHuntFirebase.updatePhase(sessionId, 'completed');
                localStorage.removeItem('bonusHuntCurrentSessionId');
                if (sessionListenerUnsubscribe) {
                    sessionListenerUnsubscribe();
                    sessionListenerUnsubscribe = null;
                }
            }
        }

        alert('Session terminée ! Bravo.');
        location.reload();
    };
}

function rebuildOpeningResultsList(status) {
    const container = document.getElementById('openingListContainer');
    if (!container) return;

    container.innerHTML = '';

    if (status !== 'completed' && (!openingPhaseState.results || openingPhaseState.results.length === 0)) {
        container.innerHTML = `<div class="empty-state"><i data-lucide="list"></i><p>Aucun résultat enregistré pour le moment.</p></div>`;
        return;
    }

    (openingPhaseState.results || []).forEach(r => addResultToOpeningList(r));
}

function applyFirebaseSessionToApp(session, options = {}) {
    const { allowListener = true, showToastOnRestore = false } = options;

    if (!session || !session.data || !window.app) return;

    const status = session.status || 'creation';
    const sessionId = session.sessionId;

    window.app.sessionData = session.data;

    currentShareableCode = session.shareableCode;
    if (currentShareableCode) {
        localStorage.setItem('bonusHuntShareableCode', currentShareableCode);
    }

    if (allowListener && sessionId) {
        startSessionListener(sessionId);
    }

    if (status === 'collection') {
        window.app.currentStep = 2;
        window.app.switchView('view-collection', 2);
    } else if (status === 'opening' || status === 'completed') {
        openingPhaseState.bonuses = session.data.bonuses || [];
        openingPhaseState.results = session.data.results || [];
        openingPhaseState.currentBonusIndex = openingPhaseState.results.length;

        const openingPanel = document.querySelector('.opening-phase-panel');
        if (openingPanel) {
            openingPanel.style.display = '';
        }

        window.app.currentStep = 3;
        window.app.switchView('view-opening', 3);

        rebuildOpeningResultsList(status);

        if (status === 'completed') {
            openingPhaseState.summarySaved = true;
            showSessionSummary();
        } else if (openingPhaseState.currentBonusIndex < openingPhaseState.bonuses.length) {
            displayCurrentBonus();
        } else {
            showSessionSummary();
        }
    } else {
        window.app.currentStep = 1;
        window.app.switchView('view-creation', 1);

        const huntNameInput = document.getElementById('huntName');
        const huntPriceInput = document.getElementById('huntPrice');
        if (huntNameInput && session.data.name) huntNameInput.value = session.data.name;
        if (huntPriceInput && session.data.huntPrice) huntPriceInput.value = session.data.huntPrice;
    }

    window.app.updateSessionHeader();
    updateShareButton();

    if (showToastOnRestore) {
        showToast('Session restaurée', 'success');
    }

    refreshLucideIcons();
}

// ─── FIX 3: loadSessionFromUrlParams now reads the code from the URL path
//            (/bonus-hunt/ABC123) in addition to query params (?code=ABC123)
//            so shareable links actually work ─────────────────────────────────
async function loadSessionFromUrlParams() {
    if (!isFirebaseEnabled) return false;

    const url = new URL(window.location.href);
    const idParam = url.searchParams.get('sessionId') || url.searchParams.get('session') || url.searchParams.get('replay');
    const codeParam = url.searchParams.get('code');

    // Also check URL path for /bonus-hunt/ABC123 format
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    let pathCode = null;
    if (pathParts[0] === 'bonus-hunt' && pathParts[1] && pathParts[1].length === 6 && /^[A-Z0-9]+$/.test(pathParts[1])) {
        pathCode = pathParts[1];
    }

    const identifier = codeParam || idParam || pathCode;
    if (!identifier) return false;

    try {
        let session;

        if (codeParam || pathCode || (identifier.length === 6 && /^[A-Z0-9]+$/.test(identifier))) {
            session = await BonusHuntFirebase.getSessionByCode(identifier);
        } else {
            session = await BonusHuntFirebase.getSession(identifier);
        }

        if (!session) {
            showToast('Session introuvable', 'error');
            return false;
        }

        const sessionId = session.sessionId;
        if (sessionId && session.status !== 'completed') {
            localStorage.setItem('bonusHuntCurrentSessionId', sessionId);
        } else if (sessionId) {
            localStorage.setItem('bonusHuntLastViewedSessionId', sessionId);
        }

        applyFirebaseSessionToApp(session, {
            allowListener: session.status !== 'completed',
            showToastOnRestore: false
        });

        return true;
    } catch (error) {
        console.error('Error loading session from URL params', error);
        return false;
    }
}

async function loadActiveSession() {
    if (!isFirebaseEnabled) return;

    const sessionId = localStorage.getItem('bonusHuntCurrentSessionId');
    if (!sessionId) return;

    try {
        const session = await BonusHuntFirebase.getSession(sessionId);

        if (!session) {
            localStorage.removeItem('bonusHuntCurrentSessionId');
            return;
        }

        if (session.status === 'completed') {
            localStorage.removeItem('bonusHuntCurrentSessionId');
            return;
        }

        applyFirebaseSessionToApp(session, {
            allowListener: true,
            showToastOnRestore: true
        });
    } catch (e) {
        console.error('Error loading active session', e);
        if (e.message === 'Session not found') {
            localStorage.removeItem('bonusHuntCurrentSessionId');
        }
    }
}

function startSessionListener(sessionId) {
    if (sessionListenerUnsubscribe) {
        sessionListenerUnsubscribe();
        sessionListenerUnsubscribe = null;
    }

    if (isFirebaseEnabled) {
        sessionListenerUnsubscribe = BonusHuntFirebase.listen(sessionId, (data, error) => {
            if (error) {
                console.error('Session listener error:', error);
                return;
            }
            if (data) {
                onSessionUpdate(data);
            }
        });
    }
}

function onSessionUpdate(session) {
    if (!session || !session.data) return;

    window.app.sessionData = session.data;

    if (session.status === 'opening' || session.status === 'completed') {
        openingPhaseState.bonuses = session.data.bonuses || [];
        openingPhaseState.results = session.data.results || [];
        openingPhaseState.currentBonusIndex = openingPhaseState.results.length;
    }

    if (document.getElementById('view-collection').classList.contains('active')) {
        renderBonusCollectionList();
        updateBonusStats();
    } else if (document.getElementById('view-opening').classList.contains('active')) {
        const container = document.getElementById('openingListContainer');
        if (container) {
            container.innerHTML = '';

            if (session.status === 'completed') {
                // showSessionSummary will handle it
            } else if (openingPhaseState.results.length === 0) {
                container.innerHTML = `<div class="empty-state"><i data-lucide="list"></i><p>Aucun résultat enregistré pour le moment.</p></div>`;
            } else {
                openingPhaseState.results.forEach(r => addResultToOpeningList(r));
            }
        }

        displayCurrentBonus();
        updateKeyStats();

        if (session.status === 'completed') {
            showSessionSummary();
        }
    }

    refreshLucideIcons();
}
