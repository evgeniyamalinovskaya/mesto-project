//Стандартные карточки
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Кнопки редактирование профиля
const editProfilePopup = document.querySelector('.popup_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = editProfilePopup.querySelector('.popup__close-button');
// Получаем имя и профессию редактирование профиля
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
// Форму в DOM редактирования профиля
const formElement = document.querySelector('form[name="form-info"]');
// Находим поля формы в DOM редактирования профиля
const nameInput = formElement.querySelector('input[name="username"]');
const jobInput = formElement.querySelector('input[name="about"]');

// Кнопки добавление карточек
const addCardPopup = document.querySelector('.popup_card');
const showAddCardPopup = document.querySelector('.profile__add-button');
const cardCloseButton = addCardPopup.querySelector('.popup__close-button');
// Форму в DOM добавления карточки
const formCard = document.querySelector('form[name="form-card"]');

// Увеличение картинки
const imagePopup = document.querySelector('.popup_image');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');


// Находим поля формы в DOM добавления карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.elements__list');

//  Находим поля формы в DOM увеличения карточки
const zoomedImagePopup = document.querySelector('.popup__image');
const imageText = document.querySelector('.popup__caption');

// Добавить стандартные карточки
const standartCards = initialCards.map(function (card) {
    return createCard(card.name, card.link);
});
cardContainer.prepend(...standartCards);

// Открытие формы, изменение данных профиля
profileEditButton.addEventListener('click', editProfile);

formElement.addEventListener('submit', saveProfileForm);

function editProfile() {
    // Открываем popup
    openPopup(editProfilePopup);

    // Подставляем значения из профиля
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

function saveProfileForm(evt) {
    evt.preventDefault();

    // Вставляем новые значения
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    // Сохранение данных
    closePopup(editProfilePopup);
}

// Функция закрытия popup профиля
profileCloseButton.addEventListener('click', () => closePopup(editProfilePopup));

// Универсальная функция открытия всех popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// Универсальная функция закрытия всех popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// Добавление карточки
showAddCardPopup.addEventListener('click', function () {
    clearCardForm();
    openPopup(addCardPopup);
});

formCard.addEventListener('submit', saveCardForm);

// 2. Находим поля формы в DOM
let placeInput = formCard.querySelector('input[name="name"]');
let linkInput = formCard.querySelector('input[name="link"]');

// Функция сохранения карточки
function saveCardForm(evt) {
    evt.preventDefault();

    createCard(placeInput.value, linkInput.value);

    // 3. Сохранение данных
    closePopup(addCardPopup);

    // 4. Очищаем форму карточки
    clearCardForm();
}
// Функция добавления карточки в поля формы
function createCard(placeValue, linkValue) {
    let card = cardTemplate.querySelector('.elements__card').cloneNode(true);
    let cardImage = card.querySelector('.elements__image');
    let cardText = card.querySelector('.elements__title');
    let cardLike = card.querySelector('.elements__like');
    let cardRemove = card.querySelector('.elements__remove-button');

    // Подставить данные из объекта
    cardImage.src = linkValue;
    cardImage.alt = placeValue;
    cardText.textContent = placeValue;

    // Добавление лайка карточке
    cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
    });

    //Удаление карточки
    cardRemove.addEventListener('click',function (evt) {
    evt.target.closest('.elements__card').remove();
    });

    // Открытие Картинки на карточках
    cardImage.addEventListener('click', zoomImagePopup);

    function zoomImagePopup() {
        // Открываем popup
        openPopup(imagePopup);

        // Подставляем данные из объекта
        zoomedImagePopup.src = linkValue;
        zoomedImagePopup.alt = placeValue;
        imageText.textContent = placeValue;
    }
    return card;
}

// Функция закрытия popup увеличение карточек
imageCloseButton.addEventListener('click', () => closePopup(imagePopup));

// Функция закрытия popup добавления карточек
cardCloseButton.addEventListener('click', () => closePopup(addCardPopup));

// Функция очистки поля в форме карточки
function clearCardForm() {
    placeInput.value = "";
    linkInput.value = "";
    console.log(placeInput);
}
