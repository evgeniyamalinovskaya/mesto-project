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
    getData(way, method, id = '') {
        return fetch(`${this._config.url}${way}${id}`, {  //добавляем аргумент
            method: method,
            headers: this._config.headers
        })
            .then(res =>this._parseResponse(res));
    };

//Функция создания Профиля, обновления (редактирования) аватарки и создания карточки (функция принимает объекты)
    createData(way, formInfo, method) {
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
