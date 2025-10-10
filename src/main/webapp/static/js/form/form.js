import { getSelectedR } from '../util/util.js';
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
    const xHiddenInput = document.getElementById('x-value');
    const yInput = document.getElementById('y-value');
    const errorMessage = document.getElementById('error-message');

    const x = xHiddenInput.value;
    const y = yInput.value.trim().replace(',', '.');
    const selectedR = getSelectedR();

    if (!x || !y || selectedR.length === 0) {
        errorMessage.textContent = 'Please select X, enter Y, and choose at least one R.';
        return;
    }
    errorMessage.textContent = '';

    const dataToSend = {
        x: x,
        y: y,
        r: selectedR
    };

    try {
        const response = await fetch('controller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            window.location.href = response.url;
        } else {
            const errorText = await response.text();
            console.error('Server error:', errorText);
            errorMessage.textContent = `Server error: ${errorText}`;
        }
    } catch (err) {
        console.error('Connection error:', err);
        errorMessage.textContent = 'Connection Error. Could not reach the server.';
    }
}