//Информация (ссылка, токен, группа, тип данных)
// const config = {
//     url: 'https://nomoreparties.co/v1/plus-cohort7', //ссылка
//     headers: {
//         authorization: '41dbe325-3fa7-4285-bba8-932cc50cf0e5', // токен
//         'Content-Type': 'application/json' //тип данных для создания
//     }
// };

export default class Api {
    constructor() {
        this._config = {
            url: 'https://nomoreparties.co/v1/plus-cohort7', //ссылка
            headers: {
                authorization: '41dbe325-3fa7-4285-bba8-932cc50cf0e5', // токен
                'Content-Type': 'application/json' //тип данных для создания
            }
        }
    }

//Вспомогательная функция ответа
    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    }

//Функция получения данных Профиля (возвращает результат выполнения функции fetch)
    getProfile()  {
        return fetch(`${this._config.url}/users/me`, {  //добавляем аргумент
            headers: this._config.headers,
        })
            .then(res =>this._parseResponse(res));
    };

//Функция создания Профиля (функция принимает объекты)
    createTaskProfile(username, about) {
        const formInfo = {
            name: username,
            about: about
        };
        return fetch(`${this._config.url}/users/me`, {
            method: 'PATCH',                   //для частичного обновления ресурса(при обновлении профиля пользователя)
            headers: this._config.headers,
            body: JSON.stringify(formInfo)
        })
            .then(res =>this._parseResponse(res));
    };

//Функция получения данных Карточки (возвращает результат выполнения функции fetch)
    getCard() {
        return fetch(`${this._config.url}/cards`, {
            headers: this._config.headers,
        })
            .then(res =>this._parseResponse(res));
    };

//Функция создания карточки (функция принимает объекты)
    createTaskCard(name, link) {
        const formCard = {
            name: name,
            link: link
        };
        return fetch(`${this._config.url}/cards`, {
            method: 'POST',                    //для отправки данных на сервер
            headers: this._config.headers,
            body: JSON.stringify(formCard)
        })
            .then(res =>this._parseResponse(res));
    };

//Функция удаления карточки
    deleteTaskCard(id) {
        return fetch(`${this._config.url}/cards/${id}`, {
            method: 'DELETE',                       //для удаления ресурса с сервера
            headers: this._config.headers,
        })
            .then(res =>this._parseResponse(res));
    };

//Функция добавления лайка
    addLike(id) {
        return fetch(`${this._config.url}/cards/likes/${id}`, {
            method: 'PUT',                          //предназначен для полного обновления указанного ресурса
            headers: this._config.headers,
        })
            .then(res =>this._parseResponse(res));
    };

//Функция удаления лайка
    deleteLike(id) {
        return fetch(`${this._config.url}/cards/likes/${id}`, {
            method: 'DELETE',                          //для удаления ресурса с сервера
            headers: this._config.headers,
        })
            .then(res =>this._parseResponse(res));
    };

//Функция обновления (редактирования) аватарки (функция принимает объекты)
    createImageAvatar(image) {
        const formAvatar = {avatar: image};
        return fetch(`${this._config.url}/users/me/avatar`, {
            method: 'PATCH',                    //для отправки данных на сервер
            headers: this._config.headers,
            body: JSON.stringify(formAvatar)
        })
            .then(res =>this._parseResponse(res));
    };
}

