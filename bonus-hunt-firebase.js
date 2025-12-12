// Bonus Hunt Firebase Module
// Firebase integration for Bonus Hunt sessions with CRUD operations and real-time sync

// Firebase configuration (same as tournament app)
const firebaseConfig = {
    apiKey: "AIzaSyB6aCO2sSWT-Symbty0K83sPzVXwRQAvAk",
    authDomain: "tournoi-de-slots.firebaseapp.com",
    projectId: "tournoi-de-slots",
    storageBucket: "tournoi-de-slots.appspot.com",
    messagingSenderId: "834358073654",
    appId: "1:834358073654:web:6d935be1322c9450e37b97",
    measurementId: "G-MZKD5K781T"
};

let db = null;
let currentSessionListener = null;

// Initialize Firebase
function initializeBonusHuntFirebase() {
    if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK not loaded. Bonus Hunt Firebase features will be unavailable.');
        return false;
    }

    try {
        if (!firebase.apps || firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        console.log('Bonus Hunt Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing Bonus Hunt Firebase:', error);
        return false;
    }
}

// Generate unique session ID
function generateSessionId() {
    return 'bh_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Generate short shareable code (ABC123)
function generateShareableCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Get a unique shareable code (retry if collision)
async function getUniqueShareableCode() {
    const MAX_ATTEMPTS = 10;
    
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const code = generateShareableCode();
        const existing = await getSessionByShareableCode(code);
        
        if (!existing) {
            return code;
        }
    }
    
    // Fallback with timestamp if all attempts fail
    return generateShareableCode() + Date.now().toString().slice(-2);
}

// Get current user ID (from localStorage or generate temporary one)
function getUserId() {
    let userId = localStorage.getItem('bonusHuntUserId');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('bonusHuntUserId', userId);
    }
    return userId;
}

// Create a new bonus hunt session
async function createBonusHuntSession(sessionData = {}) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    try {
        const sessionId = generateSessionId();
        const shareableCode = await getUniqueShareableCode();
        const userId = getUserId();
        const timestamp = new Date();

        const bonuses = Array.isArray(sessionData.bonuses) ? sessionData.bonuses : [];
        const results = Array.isArray(sessionData.results) ? sessionData.results : [];
        const huntPrice = parseFloat(sessionData.huntPrice) || 0;

        const totalInvested = bonuses.reduce((sum, b) => sum + (parseFloat(b.stake) || 0), 0);
        const totalCollected = results.reduce((sum, r) => sum + (parseFloat(r.gain) || 0), 0);

        const totalBonusValue = totalInvested * 100;
        const breakevenMultiplier = totalBonusValue > 0 && huntPrice > 0
            ? (huntPrice / totalBonusValue) * 100
            : null;

        const session = {
            sessionId,
            shareableCode,
            userId,
            status: sessionData.status || 'creation', // creation, collection, opening, completed
            createdAt: timestamp,
            updatedAt: timestamp,
            data: {
                huntPrice,
                bonuses,
                results,
                name: sessionData.name || 'Bonus Hunt',
                // Additional metadata
                metadata: {
                    bonusCount: bonuses.length,
                    totalInvested,
                    totalCollected,
                    netResult: totalCollected - huntPrice,
                    breakevenMultiplier,
                    provider: sessionData.provider || null,
                    description: sessionData.description || null
                }
            }
        };

        await db.collection('bonus-hunts').doc(sessionId).set(session);
        console.log('Bonus Hunt session created:', sessionId, 'with shareable code:', shareableCode);
        return session;
    } catch (error) {
        console.error('Error creating Bonus Hunt session:', error);
        throw error;
    }
}

// Get a specific bonus hunt session
async function getBonusHuntSession(sessionId) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    try {
        const doc = await db.collection('bonus-hunts').doc(sessionId).get();
        
        if (!doc.exists) {
            throw new Error('Session not found');
        }

        return doc.data();
    } catch (error) {
        console.error('Error getting Bonus Hunt session:', error);
        throw error;
    }
}

// Get session by shareable code
async function getSessionByShareableCode(code) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    try {
        const query = await db.collection('bonus-hunts')
            .where('shareableCode', '==', code)
            .limit(1)
            .get();

        if (query.empty) {
            return null;
        }

        const doc = query.docs[0];
        return doc.data();
    } catch (error) {
        console.error('Error getting session by shareable code:', error);
        throw error;
    }
}

// Update a bonus hunt session (partial updates supported)
async function updateBonusHuntSession(sessionId, updates) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    try {
        const updateData = {
            ...updates,
            updatedAt: new Date()
        };

        // If updating data object, merge it properly
        if (updates.data) {
            updateData.data = updates.data;
        }

        await db.collection('bonus-hunts').doc(sessionId).update(updateData);
        console.log('Bonus Hunt session updated:', sessionId);
        return true;
    } catch (error) {
        console.error('Error updating Bonus Hunt session:', error);
        throw error;
    }
}

// Update specific fields in the data object (merge semantics)
async function updateBonusHuntData(sessionId, dataUpdates) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    const isPlainObject = (value) => {
        if (!value || typeof value !== 'object') return false;
        if (Array.isArray(value)) return false;
        return Object.prototype.toString.call(value) === '[object Object]';
    };

    const flattenObject = (obj, prefix = '') => {
        const out = {};
        if (!isPlainObject(obj)) return out;

        for (const [key, value] of Object.entries(obj)) {
            const path = prefix ? `${prefix}.${key}` : key;

            if (isPlainObject(value)) {
                Object.assign(out, flattenObject(value, path));
            } else {
                out[path] = value;
            }
        }

        return out;
    };

    try {
        const updatePayload = {
            updatedAt: new Date()
        };

        // Flatten nested objects (e.g. metadata) and prefix them under `data.*`
        const flattened = flattenObject(dataUpdates);
        for (const [key, value] of Object.entries(flattened)) {
            // Allow callers to pass full Firestore paths (data.*) or relative paths
            const firestorePath = key.startsWith('data.') ? key : `data.${key}`;
            updatePayload[firestorePath] = value;
        }

        await db.collection('bonus-hunts').doc(sessionId).update(updatePayload);
        console.log('Bonus Hunt session data updated:', sessionId);
        return true;
    } catch (error) {
        console.error('Error updating Bonus Hunt session data:', error);
        throw error;
    }
}

// Delete a bonus hunt session
async function deleteBonusHuntSession(sessionId) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    try {
        await db.collection('bonus-hunts').doc(sessionId).delete();
        console.log('Bonus Hunt session deleted:', sessionId);
        return true;
    } catch (error) {
        console.error('Error deleting Bonus Hunt session:', error);
        throw error;
    }
}

// Get all sessions for current user
async function getUserBonusHuntSessions(userId = null, options = {}) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    const targetUserId = userId || getUserId();
    const safeOptions = options || {};
    const { limit = 50, status = null } = safeOptions;

    try {
        let query = db.collection('bonus-hunts')
            .where('userId', '==', targetUserId)
            .orderBy('updatedAt', 'desc');

        if (status) {
            query = query.where('status', '==', status);
        }

        if (limit) {
            query = query.limit(limit);
        }

        const snapshot = await query.get();
        const sessions = [];

        snapshot.forEach(doc => {
            sessions.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return sessions;
    } catch (error) {
        console.error('Error getting user Bonus Hunt sessions:', error);
        throw error;
    }
}

// Update session phase
async function updateBonusHuntPhase(sessionId, newPhase) {
    const validPhases = ['creation', 'collection', 'opening', 'completed'];
    
    if (!validPhases.includes(newPhase)) {
        throw new Error(`Invalid phase: ${newPhase}. Valid phases are: ${validPhases.join(', ')}`);
    }

    try {
        await updateBonusHuntSession(sessionId, {
            status: newPhase
        });
        console.log(`Bonus Hunt session ${sessionId} phase updated to: ${newPhase}`);
        return true;
    } catch (error) {
        console.error('Error updating Bonus Hunt phase:', error);
        throw error;
    }
}

// Add a bonus to a session
async function addBonusToSession(sessionId, bonusData) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    try {
        const session = await getBonusHuntSession(sessionId);
        const bonuses = session.data.bonuses || [];
        
        const bonus = {
            id: bonusData.id || Date.now(),
            name: bonusData.name,
            stake: parseFloat(bonusData.stake) || 0,
            bonusPrice: parseFloat(bonusData.bonusPrice) || 0,
            bonusValue: parseFloat(bonusData.bonusValue) || 0,
            provider: bonusData.provider || null,
            imageUrl: bonusData.imageUrl || null,
            createdAt: new Date().toISOString()
        };

        bonuses.push(bonus);

        const totalInvested = bonuses.reduce((sum, b) => sum + (parseFloat(b.stake) || 0), 0);
        const bonusCount = bonuses.length;

        await db.collection('bonus-hunts').doc(sessionId).update({
            'data.bonuses': bonuses,
            'data.metadata.bonusCount': bonusCount,
            'data.metadata.totalInvested': totalInvested,
            'updatedAt': new Date()
        });

        console.log('Bonus added to session:', sessionId);
        return bonus;
    } catch (error) {
        console.error('Error adding bonus to session:', error);
        throw error;
    }
}

// Add a result to a session
async function addBonusResult(sessionId, resultData) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    try {
        const session = await getBonusHuntSession(sessionId);
        const results = session.data.results || [];
        
        const result = {
            bonusId: resultData.bonusId,
            bonusName: resultData.bonusName,
            stake: parseFloat(resultData.stake) || 0,
            bonusPrice: parseFloat(resultData.bonusPrice) || 0,
            bonusValue: parseFloat(resultData.bonusValue) || 0,
            gain: parseFloat(resultData.gain) || 0,
            multiplier: resultData.multiplier || '0.00',
            createdAt: new Date().toISOString()
        };

        results.push(result);

        const totalCollected = results.reduce((sum, r) => sum + (parseFloat(r.gain) || 0), 0);
        const netResult = totalCollected - (session.data.huntPrice || 0);

        await db.collection('bonus-hunts').doc(sessionId).update({
            'data.results': results,
            'data.metadata.totalCollected': totalCollected,
            'data.metadata.netResult': netResult,
            'updatedAt': new Date()
        });

        console.log('Result added to session:', sessionId);
        return result;
    } catch (error) {
        console.error('Error adding result to session:', error);
        throw error;
    }
}

// Real-time listener for a session
function listenToBonusHuntSession(sessionId, callback) {
    if (!db) {
        console.error('Firebase not initialized');
        return null;
    }

    try {
        // Remove existing listener if any
        if (currentSessionListener) {
            currentSessionListener();
            currentSessionListener = null;
        }

        const unsubscribe = db.collection('bonus-hunts')
            .doc(sessionId)
            .onSnapshot(
                (doc) => {
                    if (doc.exists) {
                        callback(doc.data(), null);
                    } else {
                        callback(null, new Error('Session not found'));
                    }
                },
                (error) => {
                    console.error('Real-time listener error:', error);
                    callback(null, error);
                }
            );

        currentSessionListener = unsubscribe;
        console.log('Real-time listener attached for session:', sessionId);
        return unsubscribe;
    } catch (error) {
        console.error('Error setting up real-time listener:', error);
        return null;
    }
}

// Stop listening to session changes
function stopListeningToBonusHuntSession() {
    if (currentSessionListener) {
        currentSessionListener();
        currentSessionListener = null;
        console.log('Real-time listener stopped');
    }
}

// Local storage fallback functions
const LOCAL_STORAGE_KEY = 'bonusHuntSessions_local';

function saveToLocalStorage(sessionData) {
    try {
        const existingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        const index = existingData.findIndex(s => s.sessionId === sessionData.sessionId);
        
        if (index >= 0) {
            existingData[index] = sessionData;
        } else {
            existingData.push(sessionData);
        }
        
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingData));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(sessionId) {
    try {
        const existingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        return existingData.find(s => s.sessionId === sessionId) || null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function getAllFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    } catch (error) {
        console.error('Error reading all from localStorage:', error);
        return [];
    }
}

function deleteFromLocalStorage(sessionId) {
    try {
        const existingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        const filteredData = existingData.filter(s => s.sessionId !== sessionId);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredData));
        return true;
    } catch (error) {
        console.error('Error deleting from localStorage:', error);
        return false;
    }
}

// Export all functions for use in bonus-hunt-app.js
window.BonusHuntFirebase = {
    // Initialization
    initialize: initializeBonusHuntFirebase,
    isInitialized: () => db !== null,
    
    // CRUD operations
    createSession: createBonusHuntSession,
    getSession: getBonusHuntSession,
    getSessionByCode: getSessionByShareableCode,
    updateSession: updateBonusHuntSession,
    updateData: updateBonusHuntData,
    deleteSession: deleteBonusHuntSession,
    getUserSessions: getUserBonusHuntSessions,
    
    // Phase management
    updatePhase: updateBonusHuntPhase,
    
    // Bonus and result operations
    addBonus: addBonusToSession,
    addResult: addBonusResult,
    
    // Real-time sync
    listen: listenToBonusHuntSession,
    stopListening: stopListeningToBonusHuntSession,
    
    // Local storage fallback
    localStorage: {
        save: saveToLocalStorage,
        get: getFromLocalStorage,
        getAll: getAllFromLocalStorage,
        delete: deleteFromLocalStorage
    },
    
    // Utilities
    getUserId,
    generateSessionId,
    generateShareableCode,
    getUniqueShareableCode
};