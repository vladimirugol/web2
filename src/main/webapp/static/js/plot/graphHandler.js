import { graphDrawer } from './canvas.js';
export function initGraphDrawer(canvasId) {
    graphDrawer.init(canvasId);
}

export function drawInitialGraph(history, currentR) {
    const firstR = currentR.length > 0 ? currentR[0] : null;
    graphDrawer.drawCanvas(firstR);
    if (firstR !== null) {
        graphDrawer.redrawAllPoints(history);
    }
}

export function redrawGraph(currentR) {
    const history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
    const firstR = currentR.length > 0 ? currentR[0] : null;
    graphDrawer.drawCanvas(firstR);
    graphDrawer.drawPointsForCurrentR(history, firstR);
}
