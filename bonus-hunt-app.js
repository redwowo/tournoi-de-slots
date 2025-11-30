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
    const machines = app.sessionData && app.sessionData.machines ? app.sessionData.machines : [];
    const machineCount = machines.length;
    const totalStake = machines.reduce((sum, m) => sum + m.stake, 0);
    
    const countEl = document.getElementById('machineCount');
    const stakeEl = document.getElementById('totalStake');
    
    if (countEl) {
        countEl.textContent = machineCount;
    }
    if (stakeEl) {
        stakeEl.textContent = totalStake.toFixed(2) + '€';
    }
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
    
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        gap: 1rem;
        margin-bottom: 0.5rem;
    `;
    
    const resultInfo = document.createElement('div');
    resultInfo.style.cssText = 'flex: 1;';
    
    const multiplierColor = result.gain > 0 ? 'var(--success-color)' : '#ef4444';
    resultInfo.innerHTML = `
        <div style="font-weight: bold; color: var(--heading-color);">${escapeHtml(result.machineName)}</div>
        <div style="font-size: 0.9rem; color: var(--muted-text);">Mise: ${result.stake.toFixed(2)}€ | Gain: ${result.gain.toFixed(2)}€</div>
        <div style="font-size: 0.9rem; color: ${multiplierColor}; font-weight: bold;">×${result.multiplier}</div>
    `;
    
    resultItem.appendChild(resultInfo);
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
            <h3>Session Terminée</h3>
            <p>Mise totale: ${totalStake.toFixed(2)}€</p>
            <p>Gain total: ${totalGain.toFixed(2)}€</p>
            <p style="font-size: 1.2rem; font-weight: bold; color: ${profitLoss >= 0 ? 'var(--success-color)' : '#ef4444'};">
                Résultat: ${profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)}€
            </p>
        </div>
    `;
    
    const container = document.getElementById('openingListContainer');
    if (container) {
        container.innerHTML = summaryMsg + container.innerHTML;
    }
}

// Export functions for potential external use
window.BonusHuntApp = {
    showToast,
    createNewSession,
    addBonusToList,
    recordBonusResult,
    recordGain
};