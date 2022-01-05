'use strict'

const userForm = new UserForm(); 

    userForm.loginFormCallback = function (data) {
        ApiConnector.login(data, response => {
            if (response.success) {
                location.reload();
            } else {
                this.setLoginErrorMessage('Ошибка! Введенные логин или пароль не существуют');
            }
        })
    }

    userForm.registerFormCallback = function (data) {
        ApiConnector.login(data, response => {
            if (response.success) {
                location.reload();
            } else {
                this.setRegisterErrorMessage('Ошибка! Введенные данные некорректны');
            }
        })
    }
        


      
    

    



