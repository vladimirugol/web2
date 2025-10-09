
import { graphDrawer } from './canvas.js';
import { getSelectedR } from '../util/util.js';
import { sendData } from '../form/form.js';
import { validateForm } from '../form/validation.js';

function handleCanvasClick(event) {
    const selectedR = getSelectedR();
    if (selectedR.length === 0) {
        document.getElementById('error-message').textContent = 'Error: Please, select R-value.';
        return;
    }
    const rValue = selectedR[0];
    const rect = graphDrawer.canvas.getBoundingClientRect();
    const pixelX = event.clientX - rect.left;
    const pixelY = event.clientY - rect.top;

    const scale = graphDrawer.R_PIXELS / rValue;
    const mathX = (pixelX - graphDrawer.centerX) / scale;
    const mathY = (graphDrawer.centerY - pixelY) / scale;

    const xHiddenInput = document.getElementById('x-value');
    const yInput = document.getElementById('y-value');
    xHiddenInput.value = mathX.toFixed(3);
    yInput.value = mathY.toFixed(3);
    const xButtons = document.querySelectorAll('.x-button');
    xButtons.forEach(btn => btn.classList.remove('active'));
    if (validateForm()) {
        sendData();
    } else {
        console.error("Validation failed for click-based data.");
    }
}
export function setupCanvasClickListener() {
    if (graphDrawer.canvas) {
        graphDrawer.canvas.addEventListener('click', handleCanvasClick);
    } else {
        console.error("Canvas element not found for click listener setup.");
    }
}