import apiClient from "./core/client";
import token from "./core/token";
import API_URL from  "./config";

document.addEventListener("DOMContentLoaded", () => {
    init();
});

let registerForm = {};
let loginForm = {};

const init = async () => {
    const sessionData = token();
    if (sessionData && sessionData.token) {
      await showProducts();
    } else {
        document.querySelector('.form-wrapper').classList.remove('d-none');
        document.querySelector('.form-wrapper').classList.add('d-flex');
        document.querySelector('.product-wrapper').classList.add('d-none');
    }

    if (document.querySelector('#register-form')){
        const form = document.querySelector('#register-form');
        registerForm.form = form;
        registerForm.name = form.querySelector('#name');
        registerForm.email = form.querySelector('#email');
        registerForm.password = form.querySelector('#password');
    }

    if (document.querySelector('#login-form')){
        const form = document.querySelector('#login-form');
        loginForm.form = form;
        loginForm.email = form.querySelector('#email');
        loginForm.password = form.querySelector('#password');
    }

    initEvents();
};

/**
 * Init events
 */
const initEvents = () => {
    if (document.querySelector('#register-user')) {
        document.querySelector('#register-user').addEventListener('click', handleRegister);
    }

    if(document.querySelector('#login-user')) {
        document.querySelector('#login-user').addEventListener('click', handleLogin);
    }
};

const handleRegister = async evt => {
  const btn = evt.target;
  const form = btn.closest('form');

  if (registerForm.name.value && registerForm.email.value && registerForm.password.value) {
      const values = {
          name: registerForm.name.value,
          email: registerForm.email.value,
          password: registerForm.password.value
      };

      try {
          const result = await apiClient.setBearerToken()
              .getCliente()
              .post(`${API_URL}/register`, {
                  ...values
              });

          localStorage.setItem(
              "session",
              JSON.stringify({
                  token: result.data.access_token
              })
          );

          await showProducts();
      } catch (err) {

      } finally {
      }
  } else {
      console.log('Enter all required fields');
  }
};

const handleLogin = async evt => {
    const btn = evt.target;
    const form = btn.closest('form');

    if (loginForm.email.value && loginForm.password.value) {
        const values = {
            email: loginForm.email.value,
            password: loginForm.password.value
        };

        try {
            const result = await apiClient.setBearerToken()
                .getCliente()
                .post(`${API_URL}/login`, {
                    ...values
                });
            localStorage.setItem(
                "session",
                JSON.stringify({
                    token: result.data.access_token
                })
            );

            await showProducts();

        } catch (err) {

        } finally {
        }
    } else {

    }
};

const showProducts = async () => {
    // document.querySelectorAll('.form-wrapper').forEach(it => it.classList.add('d-none'));
    // document.querySelectorAll('.product-wrapper').forEach(it => it.classList.remove('d-none'));

    document.querySelector('.form-wrapper').classList.remove('d-flex');
    document.querySelector('.form-wrapper').classList.add('d-none');
    document.querySelector('.product-wrapper').classList.remove('d-none');

    const result = await apiClient.setBearerToken()
        .getCliente()
        .get(`${API_URL}/products`);

    const template = document.querySelector('#row-product-template');
    if (result && result.data) {
        const tbody = document.querySelector('.product-table tbody');

        const trWrapper = template.content.firstElementChild.cloneNode(true);

        result.data.map(p => {
            trWrapper.querySelectorAll('td').forEach((td, index) => {
                switch (index) {
                    case 0:
                        td.innerHTML = p.name;
                        break;
                    case 1:
                        td.innerHTML = p.description;
                        break;
                    case 2:
                        td.innerHTML = p.amount;
                        break;
                }
                tbody.appendChild(trWrapper);
            });
        });
    }
}
