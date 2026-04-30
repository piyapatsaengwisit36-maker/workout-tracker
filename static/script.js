/**
 * Workout Tracker - Frontend JavaScript
 * Handles interactive features and AJAX functionality
 */

// ============================================
// Document Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

// ============================================
// Event Listeners
// ============================================
function initializeEventListeners() {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.display = 'none';
        }, 5000);
    });

    // Add event listeners for forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

// ============================================
// Form Handling
// ============================================
function handleFormSubmit(e) {
    // Add any client-side validation here if needed
    // Current validation is done on the backend
}

// ============================================
// Fetch Workouts API
// ============================================
async function fetchUserWorkouts(exercise = null) {
    try {
        let url = '/workouts/api/workouts';
        if (exercise) {
            url += `?exercise=${encodeURIComponent(exercise)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch workouts');
        }

        const workouts = await response.json();
        return workouts;
    } catch (error) {
        console.error('Error fetching workouts:', error);
        return null;
    }
}

// ============================================
// Fetch Analytics
// ============================================
async function fetchAnalytics() {
    try {
        const response = await fetch('/analytics/api/volume');
        if (!response.ok) {
            throw new Error('Failed to fetch analytics');
        }

        const analytics = await response.json();
        return analytics;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return null;
    }
}

async function fetchPersonalRecords() {
    try {
        const response = await fetch('/analytics/api/personal-records');
        if (!response.ok) {
            throw new Error('Failed to fetch personal records');
        }

        const records = await response.json();
        return records;
    } catch (error) {
        console.error('Error fetching personal records:', error);
        return null;
    }
}

async function fetchExerciseStats() {
    try {
        const response = await fetch('/analytics/api/exercise-stats');
        if (!response.ok) {
            throw new Error('Failed to fetch exercise stats');
        }

        const stats = await response.json();
        return stats;
    } catch (error) {
        console.error('Error fetching exercise stats:', error);
        return null;
    }
}

// ============================================
// Utility Functions
// ============================================

/**
 * Format a number to 2 decimal places
 */
function formatNumber(num) {
    return parseFloat(num).toFixed(2);
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(date) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return [d.getFullYear(), month, day].join('-');
}

/**
 * Calculate volume
 */
function calculateVolume(sets, reps, weight) {
    return sets * reps * weight;
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="close" onclick="this.parentElement.style.display='none';">&times;</button>
    `;

    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// Export Functions (for use in templates)
// ============================================

window.WorkoutApp = {
    fetchUserWorkouts,
    fetchAnalytics,
    fetchPersonalRecords,
    fetchExerciseStats,
    calculateVolume,
    formatNumber,
    formatDate,
    showNotification
};
