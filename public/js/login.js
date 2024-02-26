
const loginForm = document.querySelector('form');

loginForm.addEventListener('submit',  async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const errorEmail = document.querySelector('.errorEmail');
    const errorPassword = document.querySelector('.errorPassword');

    const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username, password }),
    });
    const data = await response.json();
    
    if(data.success == true){
        window.location.assign('/api/v1/student-dashboard')
    } else{
        errorEmail.textContent = data.error.email;
        errorPassword.textContent = data.error.password;
    }
      
});
