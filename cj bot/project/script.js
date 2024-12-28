document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (!form || !thankYouMessage) {
        console.error('Form or thank you message elements not found!');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        
        if (!nameInput || !phoneInput) {
            console.error('Name or phone input not found!');
            return;
        }

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name && phone) {
            console.log('Showing thank you message'); // Для отладки
            
            // Показываем сообщение
            thankYouMessage.style.display = 'block';
            
            // Очищаем форму
            form.reset();

            // Скрываем сообщение через 3 секунды
            setTimeout(function() {
                thankYouMessage.style.display = 'none';
            }, 3000);
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
});