const registerBtn = document.getElementById('registrar');
const container = document.getElementById('container');
const loginBtn = document.getElementById('login');


registerBtn.addEventListener('click', ()=>{
    container.classList.add("active");
});


loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active");
});

async function login(event) {
    event.preventDefault();

    const correo = document.querySelector('input[name="correo"]').value;
    const contraseña = document.querySelector('input[name="contraseña"]').value;

    try {
        const response = await fetch('http://127.0.0.1:5500/p3/html/login.html', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contraseña }),
        });

        const data = await response.json(); // Leer el mensaje del servidor

        if (response.ok) {
            window.location.href = '/index.html'; // Redirige si las credenciales son correctas
        } else {
            alert(data.mensaje); // Muestra el mensaje de error específico
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Error en el servidor. Inténtalo de nuevo más tarde.');
    }
}


