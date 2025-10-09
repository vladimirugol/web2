import { getSelectedR } from '../util/util.js';
import { drawInitialGraph } from '../plot/graphHandler.js';

const resultsBody = document.getElementById('results-body');

export function tableToHistory() {
    const history = [];
    const rows = document.querySelectorAll('#results-body tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 6) {
            const hitStatusText = cells[3].textContent.trim();
            const isHit = (hitStatusText === '✓' || hitStatusText.toLowerCase() === 'true');
            history.push({
                x: cells[0].textContent,
                y: cells[1].textContent,
                r: cells[2].textContent,
                isHit,
                currentTime: cells[4].textContent,
                execMs: cells[5].textContent
            });
        }
    });
    return history;
}

export function updateTableFromHistory(history) {
    resultsBody.innerHTML = '';
    history.forEach(item => {
        const row = document.createElement('tr');
        ['x', 'y', 'r', 'isHit', 'currentTime', 'execMs'].forEach(key => {
            const td = document.createElement('td');
            td.textContent = (key === 'isHit') ? (item[key] ? 'true' : 'false') : item[key];
            row.appendChild(td);
        });
        resultsBody.prepend(row);
    });
}

export function loadHistoryAndDraw() {
    let history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
    if (history.length === 0) {
        history = tableToHistory();
        sessionStorage.setItem('resultsHistory', JSON.stringify(history));
    }
    updateTableFromHistory(history);
    const currentR = getSelectedR();
    drawInitialGraph(history, currentR);
}
