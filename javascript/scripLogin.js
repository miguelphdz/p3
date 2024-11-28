const SUPABASE_URL = 'https://vnkohvizfizhindrprxj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZua29odml6Zml6aGluZHJwcnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1Mzk2NzQsImV4cCI6MjA0NzExNTY3NH0.bdnM5VJcQqsMPSQgdLmZQ-d6OLxT1Je-s5N2uPgWWAw';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function login(event) {
    event.preventDefault();

    const correo = document.querySelector('input[name="correo"]').value;
    const contraseña = document.querySelector('input[name="contraseña"]').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: correo,
        password: contraseña,
    });

    if (error) {
        console.error("Error al iniciar sesión:", error.message);
        alert("Error al iniciar sesión: " + error.message);
    } else {
        console.log("Inicio de sesión exitoso:", data);
        alert("Bienvenido/a. Inicio de sesión exitoso.");
        // Redirige al usuario a la página principal de la tienda después del inicio de sesión
        window.location.href = "./home.html";
    }
}