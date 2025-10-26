/**
 * Logger Utility Module
 * Provides comprehensive logging functionality for the Super Mall Application
 * Logs are stored in localStorage and can be exported
 */

class Logger {
    static LOG_LEVELS = {
        DEBUG: 'DEBUG',
        INFO: 'INFO',
        WARN: 'WARN',
        ERROR: 'ERROR',
        FATAL: 'FATAL'
    };

    static MAX_LOGS = 1000; // Maximum number of logs to store
    static STORAGE_KEY = 'super_mall_logs';

    /**
     * Initialize logger
     */
    static init() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
        }
    }

    /**
     * Get all logs from storage
     */
    static getLogs() {
        try {
            const logs = localStorage.getItem(this.STORAGE_KEY);
            return logs ? JSON.parse(logs) : [];
        } catch (error) {
            console.error('Failed to retrieve logs:', error);
            return [];
        }
    }

    /**
     * Save log entry to storage
     */
    static saveLog(logEntry) {
        try {
            let logs = this.getLogs();
            
            // Add new log entry
            logs.push(logEntry);
            
            // Maintain max log limit
            if (logs.length > this.MAX_LOGS) {
                logs = logs.slice(-this.MAX_LOGS);
            }
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs));
        } catch (error) {
            console.error('Failed to save log:', error);
        }
    }

    /**
     * Create a log entry
     */
    static createLogEntry(level, message, metadata = {}) {
        return {
            timestamp: new Date().toISOString(),
            level: level,
            message: message,
            metadata: metadata,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
    }

    /**
     * Log debug message
     */
    static debug(message, metadata = {}) {
        const logEntry = this.createLogEntry(this.LOG_LEVELS.DEBUG, message, metadata);
        this.saveLog(logEntry);
        console.debug(`[DEBUG] ${message}`, metadata);
    }

    /**
     * Log info message
     */
    static info(message, metadata = {}) {
        const logEntry = this.createLogEntry(this.LOG_LEVELS.INFO, message, metadata);
        this.saveLog(logEntry);
        console.info(`[INFO] ${message}`, metadata);
    }

    /**
     * Log warning message
     */
    static warn(message, metadata = {}) {
        const logEntry = this.createLogEntry(this.LOG_LEVELS.WARN, message, metadata);
        this.saveLog(logEntry);
        console.warn(`[WARN] ${message}`, metadata);
    }

    /**
     * Log error message
     */
    static error(message, metadata = {}) {
        const logEntry = this.createLogEntry(this.LOG_LEVELS.ERROR, message, metadata);
        this.saveLog(logEntry);
        console.error(`[ERROR] ${message}`, metadata);
    }

    /**
     * Log fatal error message
     */
    static fatal(message, metadata = {}) {
        const logEntry = this.createLogEntry(this.LOG_LEVELS.FATAL, message, metadata);
        this.saveLog(logEntry);
        console.error(`[FATAL] ${message}`, metadata);
    }

    /**
     * Clear all logs
     */
    static clearLogs() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
        console.info('All logs cleared');
    }

    /**
     * Export logs as JSON file
     */
    static exportLogs() {
        const logs = this.getLogs();
        const dataStr = JSON.stringify(logs, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `super_mall_logs_${new Date().toISOString()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.info('Logs exported successfully', { module: 'logger' });
    }

    /**
     * Get logs filtered by level
     */
    static getLogsByLevel(level) {
        const logs = this.getLogs();
        return logs.filter(log => log.level === level);
    }

    /**
     * Get logs within a time range
     */
    static getLogsByTimeRange(startTime, endTime) {
        const logs = this.getLogs();
        return logs.filter(log => {
            const logTime = new Date(log.timestamp);
            return logTime >= startTime && logTime <= endTime;
        });
    }

    /**
     * Get logs by module
     */
    static getLogsByModule(moduleName) {
        const logs = this.getLogs();
        return logs.filter(log => log.metadata.module === moduleName);
    }

    /**
     * Display logs in console
     */
    static displayLogs(filter = null) {
        let logs = this.getLogs();
        
        if (filter) {
            logs = logs.filter(filter);
        }
        
        console.table(logs);
    }
}

// Initialize logger on load
Logger.init();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Logger;
}
