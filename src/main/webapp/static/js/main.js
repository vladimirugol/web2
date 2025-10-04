document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('data-form');
    const xHiddenInput = document.getElementById('x-value');
    const xButtons = document.querySelectorAll('.x-button');
    const yInput = document.getElementById('y-value');
    const rCheckboxes = document.querySelectorAll('.r-checkbox');
    const errorMessage = document.getElementById('error-message');
    const resultsBody = document.getElementById('results-body');
    const themeButton = document.getElementById("theme");
    const themes = ['default', 'blue', 'red', 'purple', 'orange'];
    const submitButton = document.getElementById("submit-button");
    document.body.className = themes[0];

    themeButton.addEventListener('click', function() {
        const currentTheme = document.body.className;
        let newTheme;
        do {
            const randomIndex = Math.floor(Math.random() * themes.length);
            newTheme = themes[randomIndex];
        } while (newTheme === currentTheme);
        document.body.className = newTheme;
    });

    graphDrawer.init('graph-canvas');
    loadHistoryAndDraw();
    xButtons.forEach(button => {
        button.addEventListener('click', () => {
            xButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            xHiddenInput.value = button.value;
        });
    });

    rCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const currentR = getSelectedR();
            graphDrawer.drawCanvas(currentR.length > 0 ? currentR[0] : null);
            const history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
            graphDrawer.drawPointsForCurrentR(history, currentR);
        });
    });

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (validateForm()) {
            sendData();
        }
    });

    function tableToHistory() {
        const history = [];
        const rows = document.querySelectorAll('#results-body tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 6) {
                history.push({
                    x: cells[0].textContent,
                    y: cells[1].textContent,
                    r: cells[2].textContent,
                    hit: cells[3].textContent.trim() === '✓' ? 'Hit' : 'Miss',
                    currentTime: cells[4].textContent,
                    execMs: cells[5].textContent
                });
            }
        });
        return history;
    }
    function validateForm() {
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

    async function sendData() {
        const x = xHiddenInput.value;
        const y = yInput.value.trim().replace(',', '.');
        const selectedR = getSelectedR();

        const requests = selectedR.map(r => {
            const requestData = {
                x: x,
                y: y,
                r: r
            };
            return fetch('/web2-1.0-SNAPSHOT/controller?format=params', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            });
        });

        try {
            const htmlRows = await Promise.all(requests);
            htmlRows.forEach(html => {
                resultsBody.insertAdjacentHTML('afterbegin', html);
            });
            const history = tableToHistory();
            sessionStorage.setItem('resultsHistory', JSON.stringify(history));
            const firstR = getSelectedR()[0] || null;
            graphDrawer.drawCanvas(firstR);
            graphDrawer.redrawAllPoints(history);

        } catch (error) {
            console.error('Error sending data:', error);
            errorMessage.textContent = 'Connection Error. One or more requests failed.';
        }
    }

    function updateTableFromHistory(history) {
        resultsBody.innerHTML = '';
        history.forEach(item => {
            const row = document.createElement('tr');
            const keys = ['x', 'y', 'r', 'hit', 'currentTime', 'execMs'];
            keys.forEach(key => {
                const td = document.createElement('td');
                let text = item[key] !== undefined ? item[key] : '';
                if (key === 'hit') {
                    text = text.trim().toLowerCase() === 'hit' ? 'true' : 'false';
                }
                td.textContent = text;
                row.appendChild(td);
            });
            resultsBody.prepend(row);
        });
    }

    function getSelectedR() {
        const checked = form.querySelectorAll('input[name="r"]:checked');
        return Array.from(checked).map(checkbox => parseFloat(checkbox.value));
    }

    function loadHistoryAndDraw() {
        let history = JSON.parse(sessionStorage.getItem('resultsHistory')) || [];
        if (history.length === 0) {
            history = tableToHistory();
            sessionStorage.setItem('resultsHistory', JSON.stringify(history));
        }
        updateTableFromHistory(history);
        const currentR = getSelectedR();
        const firstR = currentR.length > 0 ? currentR[0] : null;
        graphDrawer.drawCanvas(firstR);
        if (firstR !== null) {
            graphDrawer.redrawAllPoints(history);
        }
    }
});