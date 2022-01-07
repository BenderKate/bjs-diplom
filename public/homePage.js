'use strict'

// Выход из личного кабинета

const logoutButton = new LogoutButton();

    logoutButton.action = function () {
        ApiConnector.logout (callback => {
            if (callback.success) {
                location.reload();
            }
        })
    }


// Получение информации о пользователе

ApiConnector.current(callback => {
    if (callback.success) {
        ProfileWidget.showProfile(callback);
    }
});


// Получение текущих курсов валют

const ratesBoard = new RatesBoard();

function exchangeRates() {
    ApiConnector.getStocks(callback => {
        if (callback.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data);
        }
    })
}

exchangeRates()
setInterval(exchangeRates, 60000);


// Операции с деньгами

const moneyManager = new MoneyManager();

   moneyManager.addMoneyCallback = function (data) {
       ApiConnector.addMoney(data, callback => {
           if (callback.success) {
               ProfileWidget.showProfile(data);
               moneyManager.setMessage(true, 'Успешно! Баланс пополнен')
           } else {
               moneyManager.setMessage(false, 'Ошибка! Баланс не был пополнен')
           }
       })
   }

   moneyManager.conversionMoneyCallback = function (data) {
       ApiConnector.convertMoney(data, callback => {
           if (callback.success) {
               ProfileWidget.showProfile(fromAmount);
               moneyManager.setMessage(true, 'Успешно! Валюта конвертирована')
           } else {
               moneyManager.setMessage(false, 'Ошибка! Валюта не была конвертирована')
           }
       })
   }

   moneyManager.sendMoneyCallback = function (data) {
       ApiConnector.transferMoney(data, callback => {
           if (callback.success) {
               ProfileWidget.showProfile(amount);
               moneyManager.setMessage(true, 'Успешно! Перевод осуществлен')
           } else {
               moneyManager.setMessage(false, 'Ошибка! Перевод не был осуществлен')
           }
       })
   }

// Работа с избранным

const favoritesWidget = new FavoritesWidget();
    
    ApiConnector.getFavorites(callback => {
        if (callback.success) {
            RatesBoard.clearTable();
            RatesBoard.fillTable(data);
            MoneyManager.updateUserList(data); 
        }       
    })

    favoritesWidget.addUserCallback = function (data) {
        ApiConnector.addUserToFavorites(data, callback => {
        if (callback.success) {
            RatesBoard.clearTable();
            RatesBoard.fillTable(data);
            MoneyManager.updateUserList(data);
            favoritesWidget.setMessage(true, 'Успешно! Пользователь добавлен в список избранных')
        } else {
            favoritesWidget.setMessage(false, 'Ошибка! Не удалось добавить в список избранных')
        }
        }) 
    }

    favoritesWidget.removeUserCallback = function (data) {
        ApiConnector.removeUserFromFavorites(data, callback => {
        if (callback.success) {
            RatesBoard.clearTable();
            RatesBoard.fillTable(data);
            MoneyManager.updateUserList(data);
            favoritesWidget.setMessage(true, 'Успешно! Пользователь удален из списка избранных')
        } else {
            favoritesWidget.setMessage(false, 'Ошибка! Не удалось удалить из списка избранных')
        }
        }) 
    }



   


