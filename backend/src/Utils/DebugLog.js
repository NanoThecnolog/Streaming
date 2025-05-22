"use strict";
/**
 * Função para debug no console.log em desenvolvimento
 * @param args Argumentos para debugar no console
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugLog = debugLog;
function debugLog(...args) {
    if (process.env.DEBUG === "development") {
        console.log(...args);
    }
}
