
import { setupXButtons, setupRCheckboxes} from './form/form.js';
import { getSelectedR} from './util/util.js';
import { validateForm } from './form/validation.js';
import { sendData } from './form/form.js';
import { loadHistoryAndDraw } from './form/history.js';
import { initGraphDrawer } from './plot/graphHandler.js';
import { setupThemeButton } from './theme/theme.js';
import { setupCanvasClickListener } from './plot/interaction.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('data-form');
    const submitButton = document.getElementById('submit-button');
    const errorMessage = document.getElementById('error-message');
    setupThemeButton();
    initGraphDrawer('graph-canvas');
    setupCanvasClickListener();
    loadHistoryAndDraw();
    setupXButtons();
    setupRCheckboxes();
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (validateForm()) {
            sendData();
        }
    });
});
