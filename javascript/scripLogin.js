const registerBtn = document.getElementById('registrar');
const container = document.getElementById('container');
const loginBtn = document.getElementById('login');


registerBtn.addEventListener('click', ()=>{
    container.classList.add("active");
});


loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active");
});


