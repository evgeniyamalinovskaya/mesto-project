//Информация (ссылка, токен, группа, тип данных)
const config = {
    url: 'https://nomoreparties.co/v1/plus-cohort7', //ссылка
    headers: {
        authorization: '41dbe325-3fa7-4285-bba8-932cc50cf0e5', // токен
        'Content-Type': 'application/json' //тип данных для создания
    }
};

//Вспомогательная функция ответа
const parseResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error (`Произошла ошибка со статус-кодом ${res.status}`));
}

//Функция получения данных Профиля (возвращает результат выполнения функции fetch)
const getProfile = () => {
    return fetch (`${config.url}/users/me`, {  //добавляем аргумент
        headers: config.headers,
    })
        .then (res => parseResponse (res))
};

//Функция создания Профиля (функция принимает объекты)
const createTaskProfile = (username, about) => {
    const formInfo = {
        name: username,
        about: about
    };
    return fetch (`${config.url}/users/me`, {
        method: 'PATCH',                   //для частичного обновления ресурса(при обновлении профиля пользователя)
        headers: config.headers,
        body: JSON.stringify(formInfo)
    })
        .then (res => parseResponse (res))
};

//Функция получения данных Карточки (возвращает результат выполнения функции fetch)
const getCard = () => {
    return fetch (`${config.url}/cards`, {
        headers: config.headers,
    })
        .then (res => parseResponse (res))
};

//Функция создания карточки (функция принимает объекты)
const createTaskCard = (name, link) => {
    const formCard = {
        name: name,
        link: link
    };
    return fetch (`${config.url}/cards`, {
        method: 'POST',                    //для отправки данных на сервер
        headers: config.headers,
        body: JSON.stringify(formCard)
    })
        .then (res => parseResponse (res))
};

//Функция удаления карточки
const deleteTaskCard = (id) => {
    return fetch (`${config.url}/cards/${id}`, {
        method: 'DELETE',                       //для удаления ресурса с сервера
        headers: config.headers,
    })
        .then (res => parseResponse (res))
};

//Функция добавления лайка
const addLike = (id) => {
    return fetch (`${config.url}/cards/likes/${id}`, {
        method: 'PUT',                          //предназначен для полного обновления указанного ресурса
        headers: config.headers,
    })
        .then (res => parseResponse (res))
};

//Функция удаления лайка
const deleteLike = (id) => {
    return fetch (`${config.url}/cards/likes/${id}`, {
        method: 'DELETE',                          //для удаления ресурса с сервера
        headers: config.headers,
    })
        .then (res => parseResponse (res))
};

//Функция обновления (редактирования) аватарки (функция принимает объекты)
const createImageAvatar = (image) => {
    const formAvatar = { avatar: image };
    return fetch (`${config.url}/users/me/avatar`, {
        method: 'PATCH',                    //для отправки данных на сервер
        headers: config.headers,
        body: JSON.stringify(formAvatar)
    })
        .then (res => parseResponse (res))
};

// export {config, parseResponse, getProfile, createTaskProfile, getCard, createTaskCard, deleteTaskCard, addLike, deleteLike, createImageAvatar}
export default {parseResponse, getProfile, createTaskProfile, getCard, createTaskCard, deleteTaskCard, addLike, deleteLike, createImageAvatar}