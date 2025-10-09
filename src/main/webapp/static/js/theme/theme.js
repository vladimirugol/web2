const themes = ['default', 'blue', 'red', 'purple', 'orange'];

export function setupThemeButton() {
    const themeButton = document.getElementById('theme');
    document.body.className = themes[0];

    themeButton.addEventListener('click', () => {
        const currentTheme = document.body.className;
        let newTheme;
        do {
            newTheme = themes[Math.floor(Math.random() * themes.length)];
        } while (newTheme === currentTheme);
        document.body.className = newTheme;
    });
}
