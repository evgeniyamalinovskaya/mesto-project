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
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.elements__list');

// Добавить стандартные карточки
initialCards.forEach( function (card) {
    console.log(card.name)
    console.log(card.link)
    addCard(card.name, card.link);
})

// Редактирование профиля
const editProfilePopup = document.getElementById('popup-edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = editProfilePopup.querySelector('.popup__close-button');

// 3. Находим форму в DOM
const formElement = document.querySelector('form[name="form-info"]');

profileEditButton.addEventListener('click', editProfile);
profileCloseButton.addEventListener('click', () => toggleEditProfilePopup(editProfilePopup));

function editProfile() {
    // 1. Открываем popup
    toggleEditProfilePopup(editProfilePopup);

    formElement.addEventListener('submit', formProfileSave);

    // 2. Получаем имя и профессию
    let profileTitle = document.querySelector('.profile__title');
    let profileJob = document.querySelector('.profile__subtitle');

    // 3. Находим поля формы в DOM
    let nameInput = formElement.querySelector('input[name="username"]');
    let jobInput = formElement.querySelector('input[name="about"]');

    // 4. Подставляем значения из профиля
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;

    function formProfileSave(evt) {
        evt.preventDefault();

        // 6.Вставляем новые значения
        profileTitle.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;

        // 7. Закрываем popup
        toggleEditProfilePopup(editProfilePopup);
    }
}

function toggleEditProfilePopup(editProfilePopup) {
    editProfilePopup.classList.toggle('popup_opened');
}

// Добавление карточки
const addCardPopup = document.getElementById('popup-add-card');
const showAddCardPopup = document.querySelector('.profile__add-button');
const cardCloseButton = addCardPopup.querySelector('.popup__close-button');


showAddCardPopup.addEventListener('click', function () {
    clearCardForm();
    toggleCardPopup(addCardPopup)
});

cardCloseButton.addEventListener('click', () => toggleCardPopup(addCardPopup));

// 1. Находим форму в DOM
const formCard = document.querySelector('form[name="form-card"]');
formCard.addEventListener('submit', formCardAdd);

// 2. Находим поля формы в DOM
let nameInput = formCard.querySelector('input[name="name"]');
let linkInput = formCard.querySelector('input[name="link"]');

function formCardAdd(evt) {
    evt.preventDefault();

    addCard(nameInput.value, linkInput.value);

    // 3. Закрываем popup
    toggleCardPopup(addCardPopup);

    // 4. Очищаем форму
    clearCardForm();

}

function addCard(nameValue, linkValue) {
    let card = cardTemplate.querySelector('.elements__card').cloneNode(true);

    let cardImage = card.querySelector('.elements__image');
    let cardText = card.querySelector('.elements__title');

    card.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });

    card.querySelector('.elements__remove-button').addEventListener('click', function (evt) {
        evt.target.parentElement.remove();
    });

    // Подставить данные из объекта
    cardImage.src = linkValue;
    cardImage.alt = nameValue;
    cardText.textContent = nameValue;

    cardContainer.prepend(card);
}

function toggleCardPopup(cardPopup) {
    cardPopup.classList.toggle('popup_opened');
}

function clearCardForm() {
    nameInput.value = "";
    // linkInput.value = "";
    // console.log(nameInput)
}

