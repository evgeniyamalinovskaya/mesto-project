//Информация (ссылка, токен, группа, тип данных)
const apiConfig = {
    url: 'https://nomoreparties.co/v1/plus-cohort7', //ссылка
    headers: {
        authorization: '41dbe325-3fa7-4285-bba8-932cc50cf0e5', // токен
        'Content-Type': 'application/json' //тип данных для создания
    }
}

const ways = {
    profile: '/users/me',
    cards: '/cards',
    cardsDelete: '/cards/',
    cardsLikes: '/cards/likes/',
    avatar: '/users/me/avatar'
}

export default class Api {
    constructor(config) {
        this._config = config;
    }

//Вспомогательная функция ответа
    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
    }

//Функция получения данных Профиля и Карточки, добавления лайка, удаления лайка, удаления карточки (возвращает результат выполнения функции fetch)     
    methodWithoutBody(way, method, id = '') {
        return fetch(`${this._config.url}${way}${id}`, {  //добавляем аргумент
            method: method,
            headers: this._config.headers
        })
            .then(res =>this._parseResponse(res));
    };

//Функция создания Профиля, обновления (редактирования) аватарки и создания карточки (функция принимает объекты)
    patch(way, formInfo, method) {
        /* const formAvatar = {avatar: image};
        const formInfo = {
            name: username,
            about: about
        };
        const formCard = {
            name: name,
            link: link
        }; */
        return fetch(`${this._config.url}${way}`, {
            method: method,                    //для отправки данных на сервер
            headers: this._config.headers,
            body: JSON.stringify(formInfo)
        })
            .then(res =>this._parseResponse(res));
    };
}
