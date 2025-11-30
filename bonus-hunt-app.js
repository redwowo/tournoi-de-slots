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

// Export functions for potential external use
window.BonusHuntApp = {
    showToast,
    createNewSession,
    addBonusToList,
    recordBonusResult,
    recordGain
};