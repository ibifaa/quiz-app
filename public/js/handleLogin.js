
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginForm = document.querySelector('#form');


    loginForm.addEventListener('submit', function(event){

        event.preventDefault();
        const loginPayload = {
            username: username.value,
            password: password.value
        }

        const url = 'login-form';

        const headers = {
            method: 'post',
            body: JSON.stringify(loginPayload),
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
              redirect:'follow',
            },
        };

        fetch(url, headers)
        .then(function (res) {
          return res.json();
          })
          .then(function (data) {
            console.log(data);
            const user = {
              id: json.data.id,
              name: json.data.name,
              token: json.token,
              email: json.data.username,
            };
            localStorage.setItem('user', JSON.stringify(user));
              
          })
          .catch(function (error) {
            console.log(error);
          });
        
    });

