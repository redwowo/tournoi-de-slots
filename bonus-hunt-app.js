// Bonus Hunt Application JavaScript
// This file contains the main application logic for the Bonus Hunt Tracker

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize the Bonus Hunt application
    initializeBonusHuntApp();
});

function initializeBonusHuntApp() {
    console.log('Bonus Hunt App initialized');
    
    // Set up event listeners for data-action attributes
    setupActionListeners();
    
    // Set up form handlers
    setupFormHandlers();
    
    // Initialize UI components
    initializeUIComponents();
    
    // Load existing data if any
    loadExistingData();
    
    // Set up machine form handler
    setupMachineFormHandler();
    setupCollectionBreakevenCard();
}

function setupActionListeners() {
    // Handle all elements with data-action attributes
    document.addEventListener('click', function(event) {
        const actionElement = event.target.closest('[data-action]');
        if (actionElement) {
            const action = actionElement.getAttribute('data-action');
            handleAction(action, actionElement, event);
        }
    });
}

function handleAction(action, element, event) {
    event.preventDefault();
    
    switch (action) {
        case 'navigate-home':
            // Navigation is handled by the href attribute
            break;
            
        case 'create-session':
            showCreateSessionDialog();
            break;
            
        case 'export-data':
            exportSessionData();
            break;
            
        case 'show-help':
            showHelpDialog();
            break;
            
        case 'toggle-spectator':
            toggleSpectatorMode();
            break;
            
        case 'toggle-theme':
            // Theme is handled by navigation script
            break;
            
        case 'change-session':
            handleSessionChange(element.value);
            break;
            
        case 'clear-bonus-list':
            clearBonusList();
            break;
            
        case 'start-opening':
            startOpeningPhase();
            break;
            
        case 'record-win':
            recordBonusResult('won');
            break;
            
        case 'record-loss':
            recordBonusResult('lost');
            break;
            
        case 'refresh-history':
            refreshSessionHistory();
            break;
            
        case 'search':
            handleSearch(element.value);
            break;
            
        case 'close-spectator-modal':
            closeSpectatorModal();
            break;
            
        case 'toggle-legal':
            toggleLegalNotice();
            break;
            
        default:
            console.log('Unknown action:', action);
    }
}

function setupFormHandlers() {
    // Session form
    const sessionForm = document.getElementById('sessionForm');
    if (sessionForm) {
        sessionForm.addEventListener('submit', handleSessionFormSubmit);
    }
    
    // Balance form
    const balanceForm = document.getElementById('balanceForm');
    if (balanceForm) {
        balanceForm.addEventListener('submit', handleBalanceFormSubmit);
    }
    
    // Bonus form
    const bonusForm = document.getElementById('bonusForm');
    if (bonusForm) {
        bonusForm.addEventListener('submit', handleBonusFormSubmit);
    }
    
    // Gain form
    const gainForm = document.getElementById('gainForm');
    if (gainForm) {
        gainForm.addEventListener('submit', handleGainFormSubmit);
    }
}

function handleSessionFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const sessionData = {
        name: formData.get('sessionName') || document.getElementById('sessionName').value,
        balance: parseFloat(formData.get('sessionBalance') || document.getElementById('sessionBalance').value),
        createdAt: new Date().toISOString()
    };
    
    createNewSession(sessionData);
}

function handleBalanceFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const balanceData = {
        current: parseFloat(formData.get('currentBalance') || document.getElementById('currentBalance').value),
        target: parseFloat(formData.get('targetBalance') || document.getElementById('targetBalance').value)
    };
    
    updateBalanceSettings(balanceData);
}

function handleBonusFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bonusData = {
        game: formData.get('bonusGame') || document.getElementById('bonusGame').value,
        amount: parseFloat(formData.get('bonusAmount') || document.getElementById('bonusAmount').value),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    addBonusToList(bonusData);
}

function handleGainFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const gainData = {
        amount: parseFloat(formData.get('gainAmount') || document.getElementById('gainAmount').value),
        multiplier: parseFloat(formData.get('gainMultiplier') || document.getElementById('gainMultiplier').value)
    };
    
    recordGain(gainData);
}

function initializeUIComponents() {
    // Initialize KPI displays
    updateKPIDisplays();
    
    // Initialize charts placeholder
    initializeCharts();
    
    // Set up filter listeners
    setupFilterListeners();
}

function updateKPIDisplays() {
    // These will be updated with actual data when the app is fully implemented
    const kpiValues = {
        initialBalance: '0,00€',
        breakEven: '0,00€',
        bonusCount: '0',
        profitLoss: '0,00€'
    };
    
    Object.keys(kpiValues).forEach(kpi => {
        const element = document.getElementById(kpi + 'Value');
        if (element) {
            element.textContent = kpiValues[kpi];
        }
    });
}

function initializeCharts() {
    // Placeholder for Chart.js initialization
    const chartCanvas = document.getElementById('progressionChart');
    if (chartCanvas && typeof Chart !== 'undefined') {
        // Chart will be initialized when data is available
        console.log('Chart.js loaded and ready');
    }
}

function setupFilterListeners() {
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', function(event) {
            handleSearch(event.target.value);
        });
    }
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

// Placeholder functions for future implementation
function showCreateSessionDialog() {
    showToast('Création de session - À implémenter', 'info');
}

function exportSessionData() {
    showToast('Export des données - À implémenter', 'info');
}

function showHelpDialog() {
    showToast('Aide - À implémenter', 'info');
}

function toggleSpectatorMode() {
    const spectatorModal = document.getElementById('spectatorModal');
    if (spectatorModal) {
        spectatorModal.style.display = 'flex';
    }
}

function closeSpectatorModal() {
    const spectatorModal = document.getElementById('spectatorModal');
    if (spectatorModal) {
        spectatorModal.style.display = 'none';
    }
}

function handleSessionChange(sessionId) {
    console.log('Session changed to:', sessionId);
    // Implementation will go here
}

function clearBonusList() {
    if (confirm('Êtes-vous sûr de vouloir vider la liste des bonus ?')) {
        showToast('Liste des bonus vidée', 'success');
        // Implementation will go here
    }
}

function startOpeningPhase() {
    showToast('Phase d\'ouverture démarrée', 'success');
    // Implementation will go here
}

function recordBonusResult(result) {
    showToast(`Bonus marqué comme: ${result === 'won' ? 'Gagné' : 'Perdu'}`, 'success');
    // Implementation will go here
}

function recordGain(gainData) {
    showToast('Gain enregistré', 'success');
    // Implementation will go here
}

function refreshSessionHistory() {
    showToast('Historique actualisé', 'success');
    // Implementation will go here
}

function handleSearch(searchTerm) {
    console.log('Searching for:', searchTerm);
    // Implementation will go here
}

function applyFilters() {
    console.log('Applying filters');
    // Implementation will go here
}

function toggleLegalNotice() {
    const legalSlide = document.getElementById('legalNoticeSlide');
    if (legalSlide) {
        legalSlide.classList.toggle('visible');
    }
}

function createNewSession(sessionData) {
    console.log('Creating new session:', sessionData);
    showToast('Session créée avec succès', 'success');
    // Implementation will go here
}

function updateBalanceSettings(balanceData) {
    console.log('Updating balance settings:', balanceData);
    showToast('Paramètres de balance mis à jour', 'success');
    // Implementation will go here
}

function addBonusToList(bonusData) {
    console.log('Adding bonus:', bonusData);
    showToast('Bonus ajouté à la liste', 'success');
    // Implementation will go here
}

function loadExistingData() {
    console.log('Loading existing data');
    // Implementation will go here
}

// Toast notification function
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Opening phase tracking
let openingPhaseState = {
    currentMachineIndex: 0,
    machines: [],
    results: []
};

// Breakeven calculation state
let breakEvenState = {
    savedBonusIndices: new Set(),
    startBalance: 0,
    endBalance: null,
    totalSavedStakes: 0
};

const collectionBreakevenState = {
    lastMultiplier: null
};

// Machine form handler for the multi-step wizard
function setupMachineFormHandler() {
    const machineForm = document.getElementById('machineForm');
    if (machineForm) {
        machineForm.addEventListener('submit', handleMachineFormSubmit);
    }
    
    // Also setup gain form if we're in opening phase
    const gainForm = document.getElementById('gainForm');
    if (gainForm) {
        gainForm.addEventListener('submit', handleOpeningGainSubmit);
    }
}

function handleMachineFormSubmit(event) {
    event.preventDefault();
    const machineName = document.getElementById('machineName').value;
    const machineStake = parseFloat(document.getElementById('machineStake').value);
    
    if (!machineName.trim() || !machineStake || machineStake <= 0) {
        showToast('Veuillez remplir correctement tous les champs', 'warning');
        return;
    }
    
    const machine = {
        id: Date.now(),
        name: machineName,
        stake: machineStake,
        result: null,
        createdAt: new Date().toISOString()
    };
    
    // Add to app state
    if (app.sessionData && Array.isArray(app.sessionData.machines)) {
        app.sessionData.machines.push(machine);
    }
    
    addMachineToList(machine);
    updateMachineStats();
    
    // Reset form
    document.getElementById('machineName').value = '';
    document.getElementById('machineStake').value = '';
    
    showToast('Machine ajoutée avec succès', 'success');
}

function addMachineToList(machine) {
    const container = document.getElementById('machineListContainer');
    
    if (!container) return;
    
    // Remove empty state if it exists
    const emptyState = container.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    const machineItem = document.createElement('div');
    machineItem.className = 'machine-item';
    machineItem.setAttribute('data-machine-id', machine.id);
    machineItem.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        gap: 1rem;
    `;
    
    const machineInfo = document.createElement('div');
    machineInfo.style.cssText = 'flex: 1;';
    machineInfo.innerHTML = `
        <div style="font-weight: bold; color: var(--heading-color);">${escapeHtml(machine.name)}</div>
        <div style="font-size: 0.9rem; color: var(--muted-text);">Mise: ${machine.stake.toFixed(2)}€</div>
    `;
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn btn-danger';
    removeBtn.style.cssText = 'padding: 0.5rem 0.75rem; flex-shrink: 0;';
    removeBtn.innerHTML = '<i data-lucide="trash-2"></i> Supprimer';
    removeBtn.onclick = function() {
        removeMachine(machine.id);
    };
    
    machineItem.appendChild(machineInfo);
    machineItem.appendChild(removeBtn);
    container.appendChild(machineItem);
    
    // Recreate icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function removeMachine(machineId) {
    if (app.sessionData && Array.isArray(app.sessionData.machines)) {
        app.sessionData.machines = app.sessionData.machines.filter(m => m.id !== machineId);
    }
    
    const machineItem = document.querySelector(`[data-machine-id="${machineId}"]`);
    if (machineItem) {
        machineItem.remove();
    }
    
    updateMachineStats();
    
    // Show empty state if no machines left
    const container = document.getElementById('machineListContainer');
    if (container && container.children.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="inbox"></i>
                <p>Aucune machine ajoutée. Commencez par ajouter une machine !</p>
            </div>
        `;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    showToast('Machine supprimée', 'success');
}

function updateMachineStats() {
    const machines = app.sessionData && Array.isArray(app.sessionData.machines) ? app.sessionData.machines : [];
    const machineCount = machines.length;
    const totalStake = machines.reduce((sum, m) => sum + (parseFloat(m.stake) || 0), 0);
    
    const countEl = document.getElementById('machineCount');
    const stakeEl = document.getElementById('totalStake');
    
    if (countEl) {
        countEl.textContent = machineCount;
    }
    if (stakeEl) {
        stakeEl.textContent = formatCurrency(totalStake);
    }
    if (typeof app !== 'undefined' && typeof app.updateCollectionBreakevenUI === 'function') {
        app.updateCollectionBreakevenUI();
    }
}

function setupCollectionBreakevenCard() {
    const currentBalanceInput = document.getElementById('currentBalanceInput');
    if (!currentBalanceInput) return;
    
    currentBalanceInput.addEventListener('input', handleCurrentBalanceInput);
    syncCurrentBalanceInput();
    updateCollectionBreakevenCard();
}

function syncCurrentBalanceInput() {
    if (typeof app === 'undefined' || !app.sessionData) return;
    const input = document.getElementById('currentBalanceInput');
    if (!input) return;
    
    const startBalance = Number(app.sessionData.balance) || 0;
    let currentBalance = app.sessionData.currentBalance;
    
    if (typeof currentBalance !== 'number' || isNaN(currentBalance)) {
        currentBalance = startBalance;
    }
    
    app.sessionData.currentBalance = currentBalance;
    input.value = currentBalance.toFixed(2);
}

function handleCurrentBalanceInput(event) {
    if (typeof app === 'undefined' || !app.sessionData) return;
    
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
        app.sessionData.currentBalance = value;
    } else {
        app.sessionData.currentBalance = null;
    }
    
    if (typeof app.updateHeaderBalance === 'function') {
        app.updateHeaderBalance();
    }
    
    updateCollectionBreakevenCard();
}

function updateCollectionBreakevenCard() {
    const card = document.getElementById('collectionBreakevenCard');
    if (!card || typeof app === 'undefined' || !app.sessionData) return;
    
    const machines = Array.isArray(app.sessionData.machines) ? app.sessionData.machines : [];
    const startBalance = Number(app.sessionData.balance) || 0;
    const currentBalance = (typeof app.sessionData.currentBalance === 'number' && !isNaN(app.sessionData.currentBalance))
        ? app.sessionData.currentBalance
        : startBalance;
    
    const totalStake = machines.reduce((sum, machine) => sum + (parseFloat(machine.stake) || 0), 0);
    const huntCostRaw = startBalance - currentBalance;
    const huntCost = Math.max(0, huntCostRaw);
    let requiredMultiplier = null;
    
    if (totalStake > 0) {
        requiredMultiplier = Math.max(0, huntCost / totalStake);
    } else {
        collectionBreakevenState.lastMultiplier = null;
    }
    
    const huntCostEl = document.getElementById('collectionHuntCost');
    const savedValueEl = document.getElementById('collectionSavedValue');
    const multiplierEl = document.getElementById('collectionMultiplier');
    const multiplierHintEl = document.getElementById('collectionMultiplierHint');
    const difficultyChip = document.getElementById('collectionDifficulty');
    const difficultyTextEl = document.getElementById('collectionDifficultyText');
    
    if (huntCostEl) {
        huntCostEl.textContent = formatCurrency(huntCostRaw);
    }
    if (savedValueEl) {
        savedValueEl.textContent = formatCurrency(totalStake);
    }
    
    if (multiplierEl) {
        if (requiredMultiplier !== null && isFinite(requiredMultiplier)) {
            multiplierEl.textContent = `${requiredMultiplier.toFixed(2)}x`;
            if (multiplierHintEl) {
                multiplierHintEl.textContent = huntCostRaw <= 0
                    ? 'Breakeven déjà atteint'
                    : 'Objectif nécessaire pour rentrer dans ses frais';
            }
        } else {
            multiplierEl.textContent = '—';
            if (multiplierHintEl) {
                multiplierHintEl.textContent = 'Ajoutez des machines pour commencer';
            }
        }
    }
    
    const difficultyInfo = getBreakevenDifficultyInfo(requiredMultiplier);
    
    if (difficultyChip) {
        difficultyChip.style.background = difficultyInfo.background;
        difficultyChip.style.borderColor = difficultyInfo.color;
        difficultyChip.style.color = difficultyInfo.color;
    }
    if (difficultyTextEl) {
        difficultyTextEl.textContent = (requiredMultiplier !== null && totalStake > 0)
            ? difficultyInfo.label
            : 'Ajoutez des machines pour commencer';
        if (requiredMultiplier !== null && isFinite(requiredMultiplier)) {
            difficultyTextEl.style.color = difficultyInfo.color;
        } else {
            difficultyTextEl.style.color = '';
        }
    }
    
    updateTrendBadge(requiredMultiplier);
    updateCompactBreakevenDisplay(requiredMultiplier, totalStake);
}

function updateCompactBreakevenDisplay(multiplier, totalStake) {
    const container = document.getElementById('machineListContainer');
    if (!container) return;
    
    const parent = container.parentElement;
    if (!parent) return;
    
    let compactDisplay = parent.querySelector('#compactBreakevenDisplay');
    
    if (totalStake > 0 && multiplier !== null && isFinite(multiplier)) {
        if (!compactDisplay) {
            compactDisplay = document.createElement('div');
            compactDisplay.id = 'compactBreakevenDisplay';
            compactDisplay.style.cssText = `
                display: none;
                text-align: center;
                padding: 0.5rem 1rem;
                margin-bottom: 1rem;
                font-size: 1rem;
                font-weight: 600;
                color: var(--primary-color);
                background: rgba(59, 130, 246, 0.08);
                border: 1px solid rgba(59, 130, 246, 0.2);
                border-radius: 8px;
            `;
            parent.insertBefore(compactDisplay, container);
        }
        
        compactDisplay.style.display = 'block';
        compactDisplay.textContent = `x${Math.round(multiplier)}`;
    } else if (compactDisplay) {
        compactDisplay.style.display = 'none';
    }
}

function updateTrendBadge(multiplier) {
    const trendBadge = document.getElementById('collectionTrendBadge');
    if (!trendBadge) return;
    
    const trend = getBreakevenTrend(multiplier);
    trendBadge.classList.remove('trend-easier', 'trend-harder', 'trend-stable');
    trendBadge.classList.add(`trend-${trend}`);
    
    let label = '→ Stable';
    if (trend === 'easier') {
        label = '↓ Plus facile';
    } else if (trend === 'harder') {
        label = '↑ Plus difficile';
    }
    
    trendBadge.textContent = label;
}

function getBreakevenTrend(multiplier) {
    if (multiplier === null || !isFinite(multiplier)) {
        collectionBreakevenState.lastMultiplier = null;
        return 'stable';
    }
    
    const previous = collectionBreakevenState.lastMultiplier;
    collectionBreakevenState.lastMultiplier = multiplier;
    
    if (previous === null || !isFinite(previous)) {
        return 'stable';
    }
    
    const delta = multiplier - previous;
    if (Math.abs(delta) < 0.01) {
        return 'stable';
    }
    
    return delta < 0 ? 'easier' : 'harder';
}

function getBreakevenDifficultyInfo(multiplier) {
    if (typeof multiplier !== 'number' || !isFinite(multiplier)) {
        return {
            label: 'En attente des données',
            color: 'var(--muted-text)',
            background: 'var(--bg-color)'
        };
    }
    
    if (multiplier <= 0) {
        return {
            label: '✓ Breakeven atteint',
            color: '#10b981',
            background: '#d1fae5'
        };
    }
    
    if (multiplier <= 30) {
        return {
            label: '✓ Facile (≤30x)',
            color: '#10b981',
            background: '#d1fae5'
        };
    }
    
    if (multiplier <= 60) {
        return {
            label: '◐ Moyen (40-60x)',
            color: '#fbbf24',
            background: '#fef3c7'
        };
    }
    
    if (multiplier < 100) {
        return {
            label: '⚠ Difficile (60-100x)',
            color: '#f97316',
            background: '#ffedd5'
        };
    }
    
    return {
        label: '✗ Très Difficile (≥100x)',
        color: '#ef4444',
        background: '#fee2e2'
    };
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function handleOpeningGainSubmit(event) {
    event.preventDefault();
    const gainAmount = parseFloat(document.getElementById('gainAmount').value) || 0;
    const currentMachine = openingPhaseState.machines[openingPhaseState.currentMachineIndex];
    
    if (!currentMachine) return;
    
    const result = {
        machineId: currentMachine.id,
        machineName: currentMachine.name,
        stake: currentMachine.stake,
        gain: gainAmount,
        multiplier: gainAmount > 0 ? (gainAmount / currentMachine.stake).toFixed(2) : '0',
        createdAt: new Date().toISOString()
    };
    
    openingPhaseState.results.push(result);
    
    // Add to opening list display
    addResultToOpeningList(result);
    
    // Move to next machine
    openingPhaseState.currentMachineIndex++;
    
    if (openingPhaseState.currentMachineIndex < openingPhaseState.machines.length) {
        displayCurrentMachine();
    } else {
        showSessionSummary();
    }
    
    // Reset form
    document.getElementById('gainAmount').value = '';
    document.getElementById('gainMultiplier').value = '';
}

function displayCurrentMachine() {
    const currentMachine = openingPhaseState.machines[openingPhaseState.currentMachineIndex];
    
    if (!currentMachine) return;
    
    document.getElementById('openingMachineName').textContent = currentMachine.name;
    document.getElementById('openingBetAmount').textContent = currentMachine.stake.toFixed(2) + '€';
    document.getElementById('gainAmount').value = '';
    document.getElementById('gainMultiplier').value = '';
}

function addResultToOpeningList(result) {
    const container = document.getElementById('openingListContainer');
    if (!container) return;
    
    // Remove empty state if it exists
    const emptyState = container.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    const resultIndex = openingPhaseState.results.indexOf(result);
    const isSaved = breakEvenState.savedBonusIndices.has(resultIndex);
    
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.setAttribute('data-result-index', resultIndex);
    resultItem.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: var(--bg-color);
        border: 2px solid var(--border-color);
        border-radius: 8px;
        gap: 1rem;
        margin-bottom: 0.5rem;
        transition: all 0.3s ease;
        ${isSaved ? 'border-color: var(--success-color); background: rgba(16, 185, 129, 0.1);' : ''}
    `;
    
    const resultInfo = document.createElement('div');
    resultInfo.style.cssText = 'flex: 1;';
    
    const multiplierColor = result.gain > 0 ? 'var(--success-color)' : '#ef4444';
    resultInfo.innerHTML = `
        <div style="font-weight: bold; color: var(--heading-color);">${escapeHtml(result.machineName)}</div>
        <div style="font-size: 0.9rem; color: var(--muted-text);">Mise: ${result.stake.toFixed(2)}€ | Gain: ${result.gain.toFixed(2)}€</div>
        <div style="font-size: 0.9rem; color: ${multiplierColor}; font-weight: bold;">×${result.multiplier}</div>
    `;
    
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.style.cssText = `
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: 1px solid var(--border-color);
        background: ${isSaved ? 'var(--success-color)' : 'var(--bg-color)'};
        color: ${isSaved ? 'white' : 'var(--text-color)'};
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
        flex-shrink: 0;
    `;
    saveBtn.textContent = isSaved ? '✓ Saved' : 'Save';
    saveBtn.onclick = function() {
        toggleBonusSaved(resultIndex);
    };
    
    resultItem.appendChild(resultInfo);
    resultItem.appendChild(saveBtn);
    container.appendChild(resultItem);
}

function showSessionSummary() {
    // Calculate totals
    const totalStake = openingPhaseState.results.reduce((sum, r) => sum + r.stake, 0);
    const totalGain = openingPhaseState.results.reduce((sum, r) => sum + r.gain, 0);
    const profitLoss = totalGain - totalStake;
    
    // Disable the gain form
    const gainForm = document.getElementById('gainForm');
    if (gainForm) {
        gainForm.style.opacity = '0.5';
        gainForm.style.pointerEvents = 'none';
    }
    
    // Show summary message
    const summaryMsg = `
        <div style="text-align: center; padding: 2rem; background: var(--bg-color); border-radius: 8px; margin-top: 2rem;">
            <h3>Toutes les Machines Ouvertes</h3>
            <p>Mise totale: ${totalStake.toFixed(2)}€</p>
            <p>Gain total: ${totalGain.toFixed(2)}€</p>
            <p style="font-size: 1.2rem; font-weight: bold; color: ${profitLoss >= 0 ? 'var(--success-color)' : '#ef4444'};">
                Résultat: ${profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)}€
            </p>
            <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--muted-text);">
                Sélectionnez les bonuses à conserver puis calculez le breakeven
            </p>
            <button class="btn btn-success" style="margin-top: 1rem; width: auto;" onclick="app.goToBreakeven()">
                <i data-lucide="target"></i> Calculer le Breakeven
            </button>
        </div>
    `;
    
    const container = document.getElementById('openingListContainer');
    if (container) {
        container.innerHTML = summaryMsg + container.innerHTML;
    }
}

// Breakeven calculation functions
function initializeBreakeven() {
    // Set the start balance
    const startBalance = app.sessionData ? app.sessionData.balance : 0;
    breakEvenState.startBalance = startBalance;
    
    document.getElementById('breakEvenStartBalance').value = startBalance.toFixed(2);
    
    // Update the saved bonuses list
    updateBreakevenBonusList();
    
    // Calculate if we have an end balance
    calculateBreakeven();
}

function toggleBonusSaved(resultIndex) {
    if (breakEvenState.savedBonusIndices.has(resultIndex)) {
        breakEvenState.savedBonusIndices.delete(resultIndex);
    } else {
        breakEvenState.savedBonusIndices.add(resultIndex);
    }
    
    // Update the visual state in opening list
    updateOpeningListSavedState();
    
    // Update breakeven bonus list
    updateBreakevenBonusList();
    
    // Recalculate
    calculateBreakeven();
}

function updateOpeningListSavedState() {
    const items = document.querySelectorAll('[data-result-index]');
    items.forEach((item) => {
        const resultIndex = parseInt(item.getAttribute('data-result-index'));
        const isSaved = breakEvenState.savedBonusIndices.has(resultIndex);
        const btn = item.querySelector('button');
        
        if (isSaved) {
            item.style.borderColor = 'var(--success-color)';
            item.style.background = 'rgba(16, 185, 129, 0.1)';
            if (btn) {
                btn.style.background = 'var(--success-color)';
                btn.style.color = 'white';
                btn.textContent = '✓ Saved';
            }
        } else {
            item.style.borderColor = 'var(--border-color)';
            item.style.background = 'var(--bg-color)';
            if (btn) {
                btn.style.background = 'var(--bg-color)';
                btn.style.color = 'var(--text-color)';
                btn.textContent = 'Save';
            }
        }
    });
}

function updateBreakevenBonusList() {
    const container = document.getElementById('breakEvenBonusList');
    if (!container) return;
    
    container.innerHTML = '';
    
    let totalSavedStakes = 0;
    
    if (breakEvenState.savedBonusIndices.size === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="inbox"></i>
                <p>Aucune bonus sauvegardée. Retournez à l'étape Ouverture et sélectionnez les bonuses à conserver.</p>
            </div>
        `;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } else {
        breakEvenState.savedBonusIndices.forEach((resultIndex) => {
            if (resultIndex < openingPhaseState.results.length) {
                const result = openingPhaseState.results[resultIndex];
                totalSavedStakes += result.stake;
                
                const bonusItem = document.createElement('div');
                bonusItem.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid var(--success-color);
                    border-radius: 8px;
                    gap: 1rem;
                    margin-bottom: 0.5rem;
                `;
                
                const bonusInfo = document.createElement('div');
                bonusInfo.style.cssText = 'flex: 1;';
                bonusInfo.innerHTML = `
                    <div style="font-weight: bold; color: var(--heading-color);">${escapeHtml(result.machineName)}</div>
                    <div style="font-size: 0.9rem; color: var(--muted-text);">Mise: ${result.stake.toFixed(2)}€</div>
                `;
                
                bonusItem.appendChild(bonusInfo);
                container.appendChild(bonusItem);
            }
        });
    }
    
    breakEvenState.totalSavedStakes = totalSavedStakes;
}

function calculateBreakeven() {
    const startBalance = parseFloat(document.getElementById('breakEvenStartBalance').value) || 0;
    const endBalance = parseFloat(document.getElementById('breakEvenEndBalance').value);
    const huntCost = startBalance - endBalance;
    const savedStakes = breakEvenState.totalSavedStakes;
    
    const huntCostEl = document.getElementById('breakEvenHuntCost');
    const savedValueEl = document.getElementById('breakEvenSavedValue');
    const resultEl = document.getElementById('breakEvenResult');
    const errorEl = document.getElementById('breakEvenError');
    const multiplierEl = document.getElementById('breakEvenMultiplier');
    const difficultyEl = document.getElementById('breakEvenDifficulty');
    
    // Hide error and result initially
    errorEl.style.display = 'none';
    resultEl.style.display = 'none';
    
    // Update displayed values
    if (huntCostEl) {
        huntCostEl.textContent = formatCurrency(huntCost);
    }
    if (savedValueEl) {
        savedValueEl.textContent = formatCurrency(savedStakes);
    }
    
    // Validate inputs
    if (isNaN(endBalance) || endBalance === null || endBalance === '') {
        if (errorEl) {
            errorEl.style.display = 'none';
        }
        return;
    }
    
    if (huntCost < 0) {
        if (errorEl) {
            errorEl.style.display = 'block';
            document.getElementById('breakEvenErrorMessage').textContent = 'Le solde de fin ne peut pas être supérieur au solde de départ';
        }
        return;
    }
    
    if (savedStakes <= 0) {
        if (errorEl) {
            errorEl.style.display = 'block';
            document.getElementById('breakEvenErrorMessage').textContent = 'Veuillez sélectionner au moins une bonus sauvegardée';
        }
        return;
    }
    
    // Calculate required multiplier
    const requiredMultiplier = huntCost / savedStakes;
    
    const difficultyInfo = getBreakevenDifficultyInfo(requiredMultiplier);
    
    // Display result
    if (resultEl) {
        resultEl.style.display = 'block';
        resultEl.style.background = difficultyInfo.background;
        resultEl.style.borderColor = difficultyInfo.color;
        
        if (multiplierEl) {
            multiplierEl.textContent = requiredMultiplier.toFixed(2) + 'x';
            multiplierEl.style.color = difficultyInfo.color;
        }
        
        if (difficultyEl) {
            difficultyEl.textContent = difficultyInfo.label;
            difficultyEl.style.color = difficultyInfo.color;
        }
    }
}

// Export functions for potential external use
window.BonusHuntApp = {
    showToast,
    createNewSession,
    addBonusToList,
    recordBonusResult,
    recordGain,
    initializeBreakeven,
    calculateBreakeven,
    toggleBonusSaved
};