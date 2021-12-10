//Кнопка редактирования профиля
const editProfilePopup = document.getElementById('popup-edit-profile');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = editProfilePopup.querySelector('.popup__close-button');


profileEditButton.addEventListener('click', editProfile);
profileCloseButton.addEventListener('click', () => hidePopup(editProfilePopup));

function editProfile() {
    // 1. Получаем имя и профессию
    const profileTitle = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__subtitle');

    // 2. Находим форму в DOM
    const formElement = document.querySelector('form[name="form-info"]');
    formElement.addEventListener('submit', formProfileSave);

    // 3. Находим поля формы в DOM
    let nameInput = formElement.querySelector('input[name="username"]');
    let jobInput = formElement.querySelector('input[name="about"]');

    // 4. Подставляем значения из профиля
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;

    // 5. Открываем popup
    showPopup(editProfilePopup);

    function formProfileSave(evt) {
        evt.preventDefault();

        // 6.Вставляем новые значения
        profileTitle.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;

        // 7. Закрываем popup
        hidePopup(editProfilePopup);
    }
}

function showPopup(obj) {
    obj.classList.add('popup_opened');
}

function hidePopup(obj) {
    obj.classList.remove('popup_opened');
}

//Лайк карточки
const elementsLike = document.querySelectorAll('.elements__like');
elementsLike.forEach(function (elementLike) {
    elementLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });
});

function removeCard(evt) {
    evt.target.parentElement.remove();
}

//Кнопка добавления карточки
const addCardPopup = document.getElementById('popup-add-card');
const showAddCardPopup = document.querySelector('.profile__add-button');
const cardCloseButton = addCardPopup.querySelector('.popup__close-button');
const cardTemplate = document.getElementById('card');

const cardContainer = document.querySelector('.elements__list');

showAddCardPopup.addEventListener('click', function () {
    clearCardForm();
    showPopup(addCardPopup)
});

cardCloseButton.addEventListener('click', () => hidePopup(addCardPopup));

// 1. Находим форму в DOM
const formCard = document.querySelector('form[name="form-card"]');
formCard.addEventListener('submit', formCardSave);

// 2. Находим поля формы в DOM
let nameInput = formCard.querySelector('input[name="name"]');
let linkInput = formCard.querySelector('input[name="link"]');


function formCardSave(evt) {
    evt.preventDefault();

    let card = createCardFromTemplate();
    cardContainer.insertAdjacentHTML('afterbegin', card.innerHTML);

    const elementRemoveButton = document.querySelectorAll('.elements__remove-button')[0];

    elementRemoveButton.addEventListener('click', removeCard);

    // 3. Закрываем popup
    hidePopup(addCardPopup);

    // 4. Очищаем форму
    clearCardForm();

    function createCardFromTemplate() {
        let card = cardTemplate.cloneNode(true);

        let cardImage = card.content.querySelector('.elements__image');
        let cardText = card.content.querySelector('.elements__title');
        const cardLike = card.content.querySelector('.elements__like');

        //2. Подставить данные из объекта
        cardImage.src = linkInput.value;
        cardImage.alt = nameInput.value;
        cardText.textContent = nameInput.value;

        return card;
    }


}

function clearCardForm() {
    nameInput.value = "";
    // linkInput.value = "";
    // console.log(nameInput)
}

// const initialCards = [
//     {
//         name: 'Архыз',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//         name: 'Челябинская область',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//         name: 'Иваново',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//         name: 'Камчатка',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//         name: 'Холмогорский район',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//         name: 'Байкал',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
// ];
//
//

