// Bonus Hunt History Application
// Fichier principal pour la page d'historique des sessions

const ITEMS_PER_PAGE = 12;
let allSessions = [];
let filteredSessions = [];
let currentPage = 1;
let currentFilters = {
    date: '',
    result: '',
    machine: ''
};
let isFirebaseEnabled = false;

// Détection des changements de thème depuis localStorage
function detectThemePreference() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
        lucide.createIcons();
    }
}

// Formatage des valeurs monétaires
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
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    } catch (error) {
        return '';
    }
}

function formatDuration(startDate, endDate) {
    try {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        const diffMs = end - start;
        
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    } catch (error) {
        return '--';
    }
}

// Initialisation principale
function initializeHistoryApp() {
    detectThemePreference();
    
    // Vérifier Firebase
    if (typeof BonusHuntFirebase !== 'undefined' && BonusHuntFirebase.initialize()) {
        isFirebaseEnabled = true;
        console.log('Firebase enabled for history');
    } else {
        console.warn('Firebase not available, using localStorage');
    }
    
    setupEventListeners();
    loadAndDisplayHistory();
}

// Configuration des événements
function setupEventListeners() {
    // Filtrage
    document.getElementById('applyFilters')?.addEventListener('click', applyFilters);
    document.getElementById('resetFilters')?.addEventListener('click', resetFilters);
    
    // Pagination
    document.getElementById('prevPage')?.addEventListener('click', () => changePage(-1));
    document.getElementById('nextPage')?.addEventListener('click', () => changePage(1));
    
    // Actions
    document.getElementById('exportHistory')?.addEventListener('click', exportHistory);
    document.getElementById('clearOldSessions')?.addEventListener('click', clearOldSessions);
    
    // Changement de thème
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    
    // Filtres directes
    document.getElementById('filterDate')?.addEventListener('change', applyFilters);
    document.getElementById('filterResult')?.addEventListener('change', applyFilters);
    document.getElementById('filterMachine')?.addEventListener('change', applyFilters);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

// Chargement et affichage
async function loadAndDisplayHistory() {
    showLoadingState();
    
    try {
        allSessions = await loadAllSessions();
        filteredSessions = [...allSessions];
        
        // Remplir le filtre machine
        populateMachineFilter();
        
        // Calculer et afficher les KPIs
        calculateKPIs();
        
        // Afficher les sessions
        displaySessions();
        
    } catch (error) {
        console.error('Error loading history:', error);
        showErrorState();
    }
}

async function loadAllSessions() {
    if (isFirebaseEnabled) {
        try {
            const sessions = await BonusHuntFirebase.getUserSessions(null, null);
            const completedSessions = sessions.filter(s => s.status === 'completed');
            
            return completedSessions.map(session => ({
                id: session.id || session.sessionId,
                name: session.data?.name || 'Bonus Hunt',
                date: session.createdAt?.toDate ? session.createdAt.toDate().toISOString() : session.createdAt,
                updatedAt: session.updatedAt?.toDate ? session.updatedAt.toDate().toISOString() : session.updatedAt,
                startingBalance: session.data?.huntPrice || 0,
                totalGain: session.data?.metadata?.totalCollected || 0,
                netResult: session.data?.metadata?.netResult || 0,
                bonuses: session.data?.bonuses || [],
                results: session.data?.results || [],
                breakeven: session.data?.metadata?.breakevenMultiplier || 0,
                status: session.status
            }));
        } catch (error) {
            console.error('Firebase error, falling back to localStorage:', error);
            return loadFromLocalStorage();
        }
    } else {
        return loadFromLocalStorage();
    }
}

function loadFromLocalStorage() {
    try {
        const historyKey = 'bonusHuntHistory';
        const stored = localStorage.getItem(historyKey);
        if (!stored) return [];
        
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed.map(session => ({
            ...session,
            breakeven: calculateBreakevenMultiplier(session.bonuses || [], session.startingBalance || 0)
        })) : [];
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return [];
    }
}

function calculateBreakevenMultiplier(bonuses, startingBalance) {
    const totalStake = bonuses.reduce((sum, bonus) => sum + (parseFloat(bonus.stake) || 0), 0);
    if (totalStake <= 0 || startingBalance <= 0) return 0;
    
    const totalBonusValue = totalStake * 100;
    return (startingBalance / totalBonusValue) * 100;
}

function populateMachineFilter() {
    const machineFilter = document.getElementById('filterMachine');
    if (!machineFilter) return;
    
    const machines = new Set();
    allSessions.forEach(session => {
        session.bonuses?.forEach(bonus => {
            if (bonus.name) {
                machines.add(bonus.name);
            }
        });
    });
    
    // Remplir les options
    machineFilter.innerHTML = '<option value="">Toutes les machines</option>';
    Array.from(machines).sort().forEach(machine => {
        const option = document.createElement('option');
        option.value = machine;
        option.textContent = machine;
        machineFilter.appendChild(option);
    });
}

// Calcul des KPIs
function calculateKPIs() {
    const totalSessions = allSessions.length;
    const totalWins = allSessions.reduce((sum, session) => 
        session.netResult > 0 ? sum + session.netResult : sum, 0);
    const totalLosses = allSessions.reduce((sum, session) => 
        session.netResult < 0 ? sum + Math.abs(session.netResult) : sum, 0);
    const totalNet = allSessions.reduce((sum, session) => sum + session.netResult, 0);
    const averageResult = totalSessions > 0 ? totalNet / totalSessions : 0;
    
    document.getElementById('totalSessions').textContent = totalSessions;
    document.getElementById('totalWins').textContent = formatCurrency(totalWins);
    document.getElementById('totalLosses').textContent = formatCurrency(totalLosses);
    document.getElementById('averageResult').textContent = formatNetResultDisplay(averageResult);
}

// Filtrage
function applyFilters() {
    currentFilters.date = document.getElementById('filterDate')?.value || '';
    currentFilters.result = document.getElementById('filterResult')?.value || '';
    currentFilters.machine = document.getElementById('filterMachine')?.value || '';
    
    filteredSessions = allSessions.filter(session => {
        // Filtre date
        if (!matchesDateFilter(session, currentFilters.date)) {
            return false;
        }
        
        // Filtre résultat
        if (!matchesResultFilter(session, currentFilters.result)) {
            return false;
        }
        
        // Filtre machine
        if (!matchesMachineFilter(session, currentFilters.machine)) {
            return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    displaySessions();
}

function matchesDateFilter(session, dateFilter) {
    if (!dateFilter || !session.date) return true;
    
    const sessionDate = new Date(session.date);
    const now = new Date();
    
    switch (dateFilter) {
        case 'today':
            return sessionDate.toDateString() === now.toDateString();
        case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return sessionDate >= weekAgo;
        case 'month':
            return sessionDate.getMonth() === now.getMonth() && 
                   sessionDate.getFullYear() === now.getFullYear();
        case 'year':
            return sessionDate.getFullYear() === now.getFullYear();
        default:
            return true;
    }
}

function matchesResultFilter(session, resultFilter) {
    if (!resultFilter) return true;
    
    const netResult = session.netResult || 0;
    
    switch (resultFilter) {
        case 'positive':
            return netResult > 0;
        case 'negative':
            return netResult < 0;
        case 'breakeven':
            return netResult === 0;
        default:
            return true;
    }
}

function matchesMachineFilter(session, machineFilter) {
    if (!machineFilter) return true;
    
    return session.bonuses?.some(bonus => 
        bonus.name && bonus.name.toLowerCase().includes(machineFilter.toLowerCase())
    );
}

function resetFilters() {
    document.getElementById('filterDate').value = '';
    document.getElementById('filterResult').value = '';
    document.getElementById('filterMachine').value = '';
    
    currentFilters = { date: '', result: '', machine: '' };
    filteredSessions = [...allSessions];
    currentPage = 1;
    
    displaySessions();
}

// Affichage des sessions
function displaySessions() {
    const grid = document.getElementById('sessionsGrid');
    if (!grid) return;
    
    if (filteredSessions.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i data-lucide="clock-3"></i>
                <p>Aucune session ne correspond à vos filtres</p>
                <p class="text-muted">Essayez de modifier vos critères de recherche</p>
            </div>`;
        hidePagination();
        refreshLucideIcons();
        return;
    }
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const sessionsToShow = filteredSessions.slice(startIndex, endIndex);
    
    grid.innerHTML = '';
    sessionsToShow.forEach((session, index) => {
        const sessionCard = createSessionCard(session, startIndex + index);
        grid.appendChild(sessionCard);
    });
    
    updatePagination();
    refreshLucideIcons();
}

function createSessionCard(session, index) {
    const card = document.createElement('div');
    card.className = 'session-card glass-card';
    
    const winCount = session.bonuses?.filter(b => b.result && b.result.gain > 0).length || 0;
    const lossCount = session.bonuses?.filter(b => b.result && b.result.gain === 0).length || 0;
    const pendingCount = session.bonuses?.filter(b => !b.result).length || 0;
    
    const netClass = session.netResult > 0 ? 'positive' : session.netResult < 0 ? 'negative' : '';
    
    card.innerHTML = `
        <div class="session-header">
            <div>
                <h3 class="session-name">${session.name || 'Bonus Hunt'}</h3>
                <p class="session-date">${formatSessionDate(session.date)}</p>
                <p class="session-duration">Durée: ${formatDuration(session.date, session.updatedAt)}</p>
            </div>
            <div class="session-result ${netClass}">
                ${formatNetResultDisplay(session.netResult)}
            </div>
        </div>
        
        <div class="session-stats">
            <div class="stat-item">
                <span class="stat-label">Bonus Collectés</span>
                <span class="stat-value">${session.bonuses?.length || 0}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Breakeven</span>
                <span class="stat-value">x${(session.breakeven || 0).toFixed(2)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Budget</span>
                <span class="stat-value">${formatCurrency(session.startingBalance)}</span>
            </div>
        </div>
        
        <div class="session-summary">
            <div class="summary-item">
                <span class="summary-dot win"></span>
                <span>${winCount} gains</span>
            </div>
            <div class="summary-item">
                <span class="summary-dot loss"></span>
                <span>${lossCount} pertes</span>
            </div>
            <div class="summary-item">
                <span class="summary-dot pending"></span>
                <span>${pendingCount} en attente</span>
            </div>
        </div>
        
        <div class="session-actions">
            <button class="btn btn-outline btn-sm" onclick="viewSessionDetails('${session.id}')">
                <i data-lucide="eye"></i>
                Détails
            </button>
            <button class="btn btn-primary btn-sm" onclick="replaySession('${session.id}')">
                <i data-lucide="play"></i>
                Rejouer
            </button>
        </div>
    `;
    
    return card;
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredSessions.length / ITEMS_PER_PAGE);
    const hasMultiplePages = totalPages > 1;
    
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
    
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
    
    document.getElementById('paginationControls').style.display = hasMultiplePages ? 'flex' : 'none';
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredSessions.length / ITEMS_PER_PAGE);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displaySessions();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function hidePagination() {
    document.getElementById('paginationControls').style.display = 'none';
}

// Actions
function viewSessionDetails(sessionId) {
    const session = allSessions.find(s => s.id === sessionId);
    if (!session) return;
    
    // Pour l'instant, afficher dans une alerte (pourrait être une modal)
    const details = `
Session: ${session.name}
Date: ${formatSessionDate(session.date)}
Budget: ${formatCurrency(session.startingBalance)}
Gain Total: ${formatCurrency(session.totalGain)}
Résultat Net: ${formatNetResultDisplay(session.netResult)}
Bonus Collectés: ${session.bonuses?.length || 0}
Machines: ${session.bonuses?.map(b => b.name).join(', ') || 'Aucune'}
    `;
    
    alert(details);
}

function replaySession(sessionId) {
    const session = allSessions.find(s => s.id === sessionId);
    if (!session) return;
    
    // Sauvegarder la session dans localStorage pour le mode rejouer
    localStorage.setItem('bonusHuntReplaySession', JSON.stringify(session));
    
    // Rediriger vers la page principale avec paramètre de rejouer
    window.location.href = `/bonus-hunt.html?replay=${sessionId}`;
}

async function exportHistory() {
    try {
        const data = {
            exportedAt: new Date().toISOString(),
            totalSessions: filteredSessions.length,
            sessions: filteredSessions
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `bonus-hunt-history-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        showToast('Historique exporté avec succès', 'success');
    } catch (error) {
        console.error('Export error:', error);
        showToast('Erreur lors de l\'export', 'error');
    }
}

function clearOldSessions() {
    if (!confirm('Cette action supprimera les sessions de plus de 30 jours. Continuer ?')) {
        return;
    }
    
    // Pour Firebase, on ne supprime pas automatiquement
    if (isFirebaseEnabled) {
        showToast('Les sessions Firebase ne sont pas supprimées automatiquement', 'warning');
        return;
    }
    
    // Pour localStorage
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    allSessions = allSessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= thirtyDaysAgo;
    });
    
    // Sauvegarder dans localStorage
    localStorage.setItem('bonusHuntHistory', JSON.stringify(allSessions));
    
    filteredSessions = [...allSessions];
    currentPage = 1;
    
    displaySessions();
    calculateKPIs();
    showToast('Anciennes sessions supprimées', 'success');
}

// États d'affichage
function showLoadingState() {
    const grid = document.getElementById('sessionsGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="loading-state">
                <i data-lucide="loader-2" class="spin"></i>
                <p>Chargement de l'historique...</p>
            </div>`;
        refreshLucideIcons();
    }
}

function showErrorState() {
    const grid = document.getElementById('sessionsGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="empty-state">
                <i data-lucide="alert-circle"></i>
                <p>Erreur lors du chargement</p>
                <button class="btn btn-primary" onclick="loadAndDisplayHistory()">Réessayer</button>
            </div>`;
        refreshLucideIcons();
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