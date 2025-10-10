import { getSelectedR } from '../util/util.js';

export function validateForm() {
    const xHiddenInput = document.getElementById('x-value');
    const yInput = document.getElementById('y-value');
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = '';

    if (xHiddenInput.value === '') {
        errorMessage.textContent = 'Error: Please, select X-value.';
        return false;
    }

    const yValue = yInput.value.trim().replace(',', '.');
    if (yValue === '' || isNaN(yValue)) {
        errorMessage.textContent = 'Y must be a number';
        return false;
    }

    const yNum = parseFloat(yValue);
    if (yNum <= -3 || yNum >= 3) {
        errorMessage.textContent = 'Y must be from -3 to 3 (exclusive)';
        return false;
    }

    if (getSelectedR().length === 0) {
        errorMessage.textContent = 'Error: Please, select R-value.';
        return false;
    }

    return true;
}
