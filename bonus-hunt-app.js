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
        bonusPrice: bonusStake,
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
    const bonusPriceValue = typeof bonus.bonusPrice === 'number' ? bonus.bonusPrice : parseFloat(bonus.bonusPrice);
    const priceToDisplay = Number.isFinite(bonusPriceValue) ? bonusPriceValue : bonus.stake;
    bonusInfo.innerHTML = `
        <div style="font-weight: bold; color: var(--heading-color);">${escapeHtml(bonus.name)}</div>
        <div style="font-size: 0.9rem; color: var(--muted-text);">Prix: ${priceToDisplay.toFixed(2)}€</div>
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
    
    if (countEl) {
        countEl.textContent = bonusCount;
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
    const directAmount = parseAmount(result.bonusPrice);
    if (directAmount !== null) {
        return directAmount;
    }
    const linkedBonus = openingPhaseState.bonuses.find(b => b.id === result.bonusId);
    return getBonusPriceFromBonus(linkedBonus);
}

function handleOpeningGainSubmit(event) {
    event.preventDefault();
    const gainAmount = parseFloat(document.getElementById('gainAmount').value) || 0;
    const currentBonus = openingPhaseState.bonuses[openingPhaseState.currentBonusIndex];
    
    if (!currentBonus) return;
    
    const betAmount = parseAmount(currentBonus.stake);
    const normalizedStake = betAmount !== null ? betAmount : 0;
    const bonusPrice = getBonusPriceFromBonus(currentBonus);
    const multiplierValue = normalizedStake > 0 ? (gainAmount / normalizedStake).toFixed(2) : '0';

    const result = {
        bonusId: currentBonus.id,
        bonusName: currentBonus.name,
        stake: normalizedStake,
        bonusPrice,
        gain: gainAmount,
        multiplier: multiplierValue,
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
    const bonusPriceValue = getBonusPriceForResult(result);
    const priceDisplay = Number.isFinite(bonusPriceValue) ? bonusPriceValue.toFixed(2) : '0.00';
    resultInfo.innerHTML = `
        <div style="font-weight: bold; color: var(--heading-color);">${escapeHtml(result.bonusName)}</div>
        <div style="font-size: 0.9rem; color: var(--muted-text);">Prix du bonus: ${priceDisplay}€ | Mise: ${result.stake.toFixed(2)}€ | Gain: <span class="result-gain-value">${result.gain.toFixed(2)}</span>€</div>
        <div style="font-size: 0.9rem; color: ${multiplierColor}; font-weight: bold;">×<span class="result-multiplier-value">${result.multiplier}</span></div>
    `;
    
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn btn-outline';
    editBtn.style.cssText = 'padding: 0.5rem 0.75rem; flex-shrink: 0;';
    editBtn.innerHTML = '<i data-lucide="edit-2"></i> Modifier';
    editBtn.onclick = function() {
        editResult(resultIndex, resultItem);
    };
    
    resultItem.appendChild(resultInfo);
    resultItem.appendChild(editBtn);
    container.appendChild(resultItem);
}

function editResult(resultIndex, resultItem) {
    const result = openingPhaseState.results[resultIndex];
    if (!result) return;
    
    const resultInfo = resultItem.querySelector('div');
    const currentGain = result.gain;
    const currentMultiplier = result.multiplier;
    
    const editForm = document.createElement('div');
    editForm.style.cssText = `
        display: flex;
        gap: 0.5rem;
        align-items: center;
        padding: 0.5rem;
        background: rgba(59, 130, 246, 0.05);
        border-radius: 4px;
    `;
    
    const gainInput = document.createElement('input');
    gainInput.type = 'number';
    gainInput.value = currentGain;
    gainInput.step = '0.01';
    gainInput.style.cssText = `
        width: 100px;
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: var(--bg-color);
        color: var(--text-color);
    `;
    
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'btn btn-success';
    saveBtn.style.cssText = 'padding: 0.5rem 0.75rem; flex-shrink: 0;';
    saveBtn.innerHTML = '<i data-lucide="check"></i> OK';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn btn-outline';
    cancelBtn.style.cssText = 'padding: 0.5rem 0.75rem; flex-shrink: 0;';
    cancelBtn.innerHTML = '<i data-lucide="x"></i>';
    
    const multiplierColor = result.gain > 0 ? 'var(--success-color)' : '#ef4444';
    const multiplierDisplay = document.createElement('span');
    multiplierDisplay.style.cssText = `
        min-width: 50px;
        text-align: center;
        font-weight: bold;
        color: ${multiplierColor};
    `;
    multiplierDisplay.textContent = '×' + currentMultiplier;
    
    editForm.appendChild(document.createTextNode('Gain: '));
    editForm.appendChild(gainInput);
    editForm.appendChild(document.createTextNode('€'));
    editForm.appendChild(multiplierDisplay);
    editForm.appendChild(saveBtn);
    editForm.appendChild(cancelBtn);
    
    const editBtn = resultItem.querySelector('button');
    editBtn.style.display = 'none';
    
    resultInfo.innerHTML = '';
    resultInfo.appendChild(editForm);
    
    function updateMultiplier() {
        const newGain = parseFloat(gainInput.value) || 0;
        const newMultiplier = (newGain / result.stake).toFixed(2);
        multiplierDisplay.textContent = '×' + newMultiplier;
        const newMultiplierColor = newGain > 0 ? 'var(--success-color)' : '#ef4444';
        multiplierDisplay.style.color = newMultiplierColor;
    }
    
    gainInput.addEventListener('input', updateMultiplier);
    gainInput.focus();
    
    saveBtn.onclick = function() {
        const newGain = parseFloat(gainInput.value) || 0;
        result.gain = newGain;
        result.multiplier = (newGain / result.stake).toFixed(2);
        
        reloadResultDisplay(resultIndex, resultItem);
        updateSessionSummaryTotals();
    };
    
    cancelBtn.onclick = function() {
        reloadResultDisplay(resultIndex, resultItem);
    };
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function reloadResultDisplay(resultIndex, resultItem) {
    const result = openingPhaseState.results[resultIndex];
    if (!result) return;
    
    resultItem.innerHTML = '';
    
    const resultInfo = document.createElement('div');
    resultInfo.style.cssText = 'flex: 1;';
    
    const multiplierColor = result.gain > 0 ? 'var(--success-color)' : '#ef4444';
    const bonusPriceValue = getBonusPriceForResult(result);
    const priceDisplay = Number.isFinite(bonusPriceValue) ? bonusPriceValue.toFixed(2) : '0.00';
    resultInfo.innerHTML = `
        <div style="font-weight: bold; color: var(--heading-color);">${escapeHtml(result.bonusName)}</div>
        <div style="font-size: 0.9rem; color: var(--muted-text);">Prix du bonus: ${priceDisplay}€ | Mise: ${result.stake.toFixed(2)}€ | Gain: <span class="result-gain-value">${result.gain.toFixed(2)}</span>€</div>
        <div style="font-size: 0.9rem; color: ${multiplierColor}; font-weight: bold;">×<span class="result-multiplier-value">${result.multiplier}</span></div>
    `;
    
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn btn-outline';
    editBtn.style.cssText = 'padding: 0.5rem 0.75rem; flex-shrink: 0;';
    editBtn.innerHTML = '<i data-lucide="edit-2"></i> Modifier';
    editBtn.onclick = function() {
        editResult(resultIndex, resultItem);
    };
    
    resultItem.appendChild(resultInfo);
    resultItem.appendChild(editBtn);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function updateSessionSummaryTotals() {
    const totalBonusPrice = openingPhaseState.results.reduce((sum, r) => sum + getBonusPriceForResult(r), 0);
    const totalGain = openingPhaseState.results.reduce((sum, r) => sum + (parseFloat(r.gain) || 0), 0);
    const profitLoss = totalGain - totalBonusPrice;
    
    const summaryDiv = document.querySelector('.bonus-list > div:first-child');
    if (summaryDiv && summaryDiv.querySelector('h3')) {
        summaryDiv.innerHTML = `
            <h3>Tous les Bonus Ouverts</h3>
            <p>Prix total des bonus: ${totalBonusPrice.toFixed(2)}€</p>
            <p>Gain total: ${totalGain.toFixed(2)}€</p>
            <p style="font-size: 1.2rem; font-weight: bold; color: ${profitLoss >= 0 ? 'var(--success-color)' : '#ef4444'};">
                Résultat net: ${profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)}€
            </p>
        `;
    }
}

function showSessionSummary() {
    // Calculate totals
    const totalBonusPrice = openingPhaseState.results.reduce((sum, r) => sum + getBonusPriceForResult(r), 0);
    const totalGain = openingPhaseState.results.reduce((sum, r) => sum + (parseFloat(r.gain) || 0), 0);
    const profitLoss = totalGain - totalBonusPrice;
    
    // Hide the machine frame (opening-phase-panel)
    const openingPanel = document.querySelector('.opening-phase-panel');
    if (openingPanel) {
        openingPanel.style.display = 'none';
    }
    
    // Update the progress panel header to be more prominent
    const progressPanel = document.querySelector('.panel[style*="margin-top: 2rem;"]');
    if (progressPanel) {
        progressPanel.style.marginTop = '0';
    }
    
    // Show summary message
    const summaryMsg = `
        <div style="text-align: center; padding: 2rem; background: var(--bg-color); border-radius: 8px; margin-bottom: 2rem;">
            <h3>Tous les Bonus Ouverts</h3>
            <p>Prix total des bonus: ${totalBonusPrice.toFixed(2)}€</p>
            <p>Gain total: ${totalGain.toFixed(2)}€</p>
            <p style="font-size: 1.2rem; font-weight: bold; color: ${profitLoss >= 0 ? 'var(--success-color)' : '#ef4444'};">
                Résultat net: ${profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)}€
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
