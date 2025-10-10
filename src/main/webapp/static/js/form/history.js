import { getSelectedR } from '../util/util.js';
import { drawInitialGraph} from '../plot/graphHandler.js'
const resultsBody = document.getElementById('results-body');

export function updateTableFromHistory(history) {
    resultsBody.innerHTML = '';

    if (!history || history.length === 0) {
        resultsBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No results yet. Submit a point to see results here.</td></tr>`;
        return;
    }
    history.slice().reverse().forEach(item => {
        const row = document.createElement('tr');


        row.innerHTML = `
            <td>${item.x}</td>
            <td>${item.y}</td>
            <td>${item.r}</td>
            <td>${item.hit ? 'true' : 'false'}</td>
            <td>${item.currentTime}</td>
            <td>${item.execMs} ns</td>
        `;
        resultsBody.appendChild(row);
    });
}

export function loadHistoryAndDraw() {
   let rawHistory = initialResults;
       const cleanedHistory = rawHistory.map(item => ({
           x: parseFloat(item.x),
           y: parseFloat(item.y),
           r: parseFloat(item.r),
           hit: item.hit === true || item.hit === "true" || item.hit === "Yes",
           currentTime: item.currentTime,
           execMs: item.execMs
       }));

       updateTableFromHistory(cleanedHistory);

       const currentR = getSelectedR();
       drawInitialGraph(cleanedHistory, currentR);
}
