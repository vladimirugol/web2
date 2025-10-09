import { getSelectedR } from '../util/util.js';
import { tableToHistory } from './history.js';
import { redrawGraph } from '../plot/graphHandler.js';

const xHiddenInput = document.getElementById('x-value');
const xButtons = document.querySelectorAll('.x-button');
const rCheckboxes = document.querySelectorAll('.r-checkbox');
const resultsBody = document.getElementById('results-body');
const errorMessage = document.getElementById('error-message');

export function setupXButtons() {
    xButtons.forEach(button => {
        button.addEventListener('click', () => {
            xButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            xHiddenInput.value = button.value;
        });
    });
}

export function setupRCheckboxes() {
    rCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const currentR = getSelectedR();
            redrawGraph(currentR);
        });
    });
}

export async function sendData() {
    const x = xHiddenInput.value;
    const yInput = document.getElementById('y-value');
    const y = yInput.value.trim().replace(',', '.');
    const selectedR = getSelectedR();

    const requests = selectedR.map(r => {
        return fetch('controller?format=params', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ x, y, r })
        }).then(resp => {
            if (!resp.ok) throw new Error(`HTTP error! ${resp.status}`);
            return resp.text();
        });
    });

    try {
        const htmlRows = await Promise.all(requests);
        htmlRows.forEach(html => resultsBody.insertAdjacentHTML('afterbegin', html));

        const history = tableToHistory();
        sessionStorage.setItem('resultsHistory', JSON.stringify(history));
        redrawGraph(getSelectedR());

    } catch (err) {
        console.error('Error sending data:', err);
        errorMessage.textContent = 'Connection Error. One or more requests failed.';
    }
}
