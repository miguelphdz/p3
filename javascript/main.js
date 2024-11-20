document.querySelectorAll('.navPuntos a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // Evita el desplazamiento automático por defecto
        const targetId = link.getAttribute('href').slice(1); // Obtiene el ID del elemento objetivo
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Desplazamiento suave
                block: 'nearest'   // Ajusta la posición (puedes usar 'start', 'center', 'end', o 'nearest')
            });
        }
    });
});
