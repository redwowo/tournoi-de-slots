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
    
    // Set up form handlers
    setupFormHandlers();
}

function setupFormHandlers() {
    // Bonus form
    const bonusForm = document.getElementById('bonusForm');
    if (bonusForm) {
        bonusForm.addEventListener('submit', handleBonusFormSubmit);
    }
    
    // Gain form
    const gainForm = document.getElementById('gainForm');
    if (gainForm) {
        gainForm.addEventListener('submit', handleOpeningGainSubmit);
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

// Toast notification function
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
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Opening phase tracking
let openingPhaseState = {
    currentBonusIndex: 0,
    bonuses: [],
    results: []
};

// Bonus form handler
function handleBonusFormSubmit(event) {
    event.preventDefault();
    const bonusName = document.getElementById('bonusName').value;
    const bonusStake = parseFloat(document.getElementById('bonusStake').value);
    
    if (!bonusName.trim() || !bonusStake || bonusStake <= 0) {
        showToast('Veuillez remplir correctement tous les champs', 'warning');
        return;
    }
    
    const bonus = {
        id: Date.now(),
        name: bonusName,
        stake: bonusStake,
        result: null,
        createdAt: new Date().toISOString()
    };
    
    // Add to app state
    if (app.sessionData && Array.isArray(app.sessionData.bonuses)) {
        app.sessionData.bonuses.push(bonus);
    }
    
    addBonusToList(bonus);
    updateBonusStats();
    
    // Reset form
    document.getElementById('bonusName').value = '';
    document.getElementById('bonusStake').value = '';
    
    showToast('Bonus ajouté avec succès', 'success');
}

function addBonusToList(bonus) {
    const container = document.getElementById('bonusListContainer');
    
    if (!container) return;
    
    // Remove empty state if it exists
    const emptyState = container.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    const bonusItem = document.createElement('div');
    bonusItem.className = 'bonus-item';
    bonusItem.setAttribute('data-bonus-id', bonus.id);
    bonusItem.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        gap: 1rem;
    `;
    
    const bonusInfo = document.createElement('div');
    bonusInfo.style.cssText = 'flex: 1;';
    bonusInfo.innerHTML = `
        <div style="font-weight: bold; color: var(--heading-color);">${escapeHtml(bonus.name)}</div>
        <div style="font-size: 0.9rem; color: var(--muted-text);">Mise: ${bonus.stake.toFixed(2)}€</div>
    `;
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn btn-danger';
    removeBtn.style.cssText = 'padding: 0.5rem 0.75rem; flex-shrink: 0;';
    removeBtn.innerHTML = '<i data-lucide="trash-2"></i> Supprimer';
    removeBtn.onclick = function() {
        removeBonus(bonus.id);
    };
    
    bonusItem.appendChild(bonusInfo);
    bonusItem.appendChild(removeBtn);
    container.appendChild(bonusItem);
    
    // Recreate icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function removeBonus(bonusId) {
    if (app.sessionData && Array.isArray(app.sessionData.bonuses)) {
        app.sessionData.bonuses = app.sessionData.bonuses.filter(b => b.id !== bonusId);
    }
    
    const bonusItem = document.querySelector(`[data-bonus-id="${bonusId}"]`);
    if (bonusItem) {
        bonusItem.remove();
    }
    
    updateBonusStats();
    
    // Show empty state if no bonuses left
    const container = document.getElementById('bonusListContainer');
    if (container && container.children.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="inbox"></i>
                <p>Aucun bonus ajouté. Commencez par ajouter un bonus !</p>
            </div>
        `;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    showToast('Bonus supprimé', 'success');
}

function updateBonusStats() {
    const bonuses = app.sessionData && Array.isArray(app.sessionData.bonuses) ? app.sessionData.bonuses : [];
    const bonusCount = bonuses.length;
    const totalStake = bonuses.reduce((sum, b) => sum + (parseFloat(b.stake) || 0), 0);
    
    const countEl = document.getElementById('bonusCount');
    const stakeEl = document.getElementById('totalStake');
    
    if (countEl) {
        countEl.textContent = bonusCount;
    }
    if (stakeEl) {
        stakeEl.textContent = formatCurrency(totalStake);
    }
    
    updateCompactBreakevenDisplay();
}

function updateCompactBreakevenDisplay() {
    const container = document.getElementById('bonusListContainer');
    if (!container || !app.sessionData) return;
    
    const bonuses = Array.isArray(app.sessionData.bonuses) ? app.sessionData.bonuses : [];
    const totalStake = bonuses.reduce((sum, b) => sum + (parseFloat(b.stake) || 0), 0);
    const huntPrice = app.sessionData.huntPrice || 0;
    
    let multiplier = null;
    if (totalStake > 0 && huntPrice > 0) {
        multiplier = huntPrice / totalStake;
    }
    
    const parent = container.parentElement;
    if (!parent) return;
    
    let compactDisplay = parent.querySelector('#compactBreakevenDisplay');
    
    if (totalStake > 0 && multiplier !== null && isFinite(multiplier)) {
        if (!compactDisplay) {
            compactDisplay = document.createElement('div');
            compactDisplay.id = 'compactBreakevenDisplay';
            compactDisplay.style.cssText = `
                text-align: center;
                padding: 0.75rem 1rem;
                margin-bottom: 1rem;
                font-size: 1.1rem;
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
    const currentBonus = openingPhaseState.bonuses[openingPhaseState.currentBonusIndex];
    
    if (!currentBonus) return;
    
    const result = {
        bonusId: currentBonus.id,
        bonusName: currentBonus.name,
        stake: currentBonus.stake,
        gain: gainAmount,
        multiplier: gainAmount > 0 ? (gainAmount / currentBonus.stake).toFixed(2) : '0',
        createdAt: new Date().toISOString()
    };
    
    openingPhaseState.results.push(result);
    
    // Add to opening list display
    addResultToOpeningList(result);
    
    // Move to next bonus
    openingPhaseState.currentBonusIndex++;
    
    if (openingPhaseState.currentBonusIndex < openingPhaseState.bonuses.length) {
        displayCurrentBonus();
    } else {
        showSessionSummary();
    }
    
    // Reset form
    document.getElementById('gainAmount').value = '';
    document.getElementById('gainMultiplier').value = '';
}

function displayCurrentBonus() {
    const currentBonus = openingPhaseState.bonuses[openingPhaseState.currentBonusIndex];
    
    if (!currentBonus) return;
    
    document.getElementById('openingBonusName').textContent = currentBonus.name;
    document.getElementById('openingBetAmount').textContent = currentBonus.stake.toFixed(2) + '€';
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
    `;
    
    const resultInfo = document.createElement('div');
    resultInfo.style.cssText = 'flex: 1;';
    
    const multiplierColor = result.gain > 0 ? 'var(--success-color)' : '#ef4444';
    resultInfo.innerHTML = `
        <div style="font-weight: bold; color: var(--heading-color);">${escapeHtml(result.bonusName)}</div>
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
            <h3>Tous les Bonus Ouverts</h3>
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
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Export functions for potential external use
window.BonusHuntApp = {
    showToast,
    formatCurrency,
    displayCurrentBonus
};
