'use strict'

// Выход из личного кабинета

const logoutButton = new LogoutButton();

    logoutButton.action = function () {
        ApiConnector.logout (response => {
            if (response.success) {
                location.reload();
            }
        })
    }


// Получение информации о пользователе

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});


// Получение текущих курсов валют

const ratesBoard = new RatesBoard();

function exchangeRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}

exchangeRates()
setInterval(exchangeRates, 60000);


// Операции с деньгами

const moneyManager = new MoneyManager();

   moneyManager.addMoneyCallback = function (data) {
       ApiConnector.addMoney(data, response => {
           if (response.success) {
               ProfileWidget.showProfile(response.data);
               moneyManager.setMessage(true, 'Успешно! Баланс пополнен')
           } else {
               moneyManager.setMessage(false, response.error)
           }
       })
   }

   moneyManager.conversionMoneyCallback = function (data) {
       ApiConnector.convertMoney(data, response => {
           if (response.success) {
               ProfileWidget.showProfile(response.data);
               moneyManager.setMessage(true, 'Успешно! Валюта конвертирована')
           } else {
               moneyManager.setMessage(false, response.error)
           }
       })
   }

   moneyManager.sendMoneyCallback = function (data) {
       ApiConnector.transferMoney(data, response => {
           if (response.success) {
               ProfileWidget.showProfile(response.data);
               moneyManager.setMessage(true, 'Успешно! Перевод осуществлен')
           } else {
               moneyManager.setMessage(false, response.error)
           }
       })
   }

// Работа с избранным

const favoritesWidget = new FavoritesWidget();

    
    ApiConnector.getFavorites(response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUserList(response.data); 
        }       
    })

    favoritesWidget.addUserCallback = function (data) {
        ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUserList(response.data);
            favoritesWidget.setMessage(true, 'Успешно! Пользователь добавлен в список избранных')
        } else {
            favoritesWidget.setMessage(false, response.error)
        }
        }) 
    }

    favoritesWidget.removeUserCallback = function (data) {
        ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUserList(response.data);
            favoritesWidget.setMessage(true, 'Успешно! Пользователь удален из списка избранных')
        } else {
            favoritesWidget.setMessage(false, response.error)
        }
        }) 
    }



   


