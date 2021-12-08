//Кнопка редактирования профиля
let profileEditButton = document.querySelector('.profile__edit-button');
let profileCloseButton = document.querySelector('.popup__close-button');

let popup = document.querySelector('.popup');

profileEditButton.addEventListener('click', editProfile);
profileCloseButton.addEventListener('click', () => hidePopup(popup));

function editProfile() {
    // 1. Получаем имя и профессию
    const profileTitle = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__subtitle');

    // 2. Находим форму в DOM
    const formElement = document.querySelector('form[name="form-info"]');
    formElement.addEventListener('submit', formSubmitHandler);

    // 3. Находим поля формы в DOM
    let nameInput = formElement.querySelector('input[name="username"]');
    let jobInput = formElement.querySelector('input[name="about"]');

    // 4. Подставляем значения из профиля
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;

    // 5. Открываем popup
    showPopup(popup);


    function formSubmitHandler(evt) {
        evt.preventDefault();

        // 6.Вставляем новые значения
        profileTitle.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;

        // 7. Закрываем popup
        hidePopup(popup);
    }
}

function showPopup(obj) {
    obj.classList.add('popup_opened');
}

function hidePopup(obj) {
    obj.classList.remove('popup_opened');
}
