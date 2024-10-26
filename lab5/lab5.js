document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const note = key.getAttribute('data-note');

        const audio = new Audio(`notes/Key${note}.wav`);
        audio.play();
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 200);
    });
});
