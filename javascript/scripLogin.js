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
        const response = await fetch('http://localhost:5500/login', { // en lugar de '/login.html'
            method: 'POST',
            
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contraseña }),
        });    

        const data = await response.json(); // Leer el mensaje del servidor

        if (response.ok) {
            window.location.href = '/index.html';
        } else {
            const errorText = await response.text();
            console.error('Error:', errorText);
            alert('Credenciales incorrectas o error en el servidor.');
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Error en el servidor. Inténtalo de nuevo más tarde.');
    }
}


