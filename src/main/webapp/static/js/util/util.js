export function getSelectedR() {
    const form = document.getElementById('data-form');
    const checked = form.querySelectorAll('input[name="r"]:checked');
    return Array.from(checked).map(ch => parseFloat(ch.value));
}
