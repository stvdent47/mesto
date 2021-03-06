# Проект 4: Место

### Обзор
Данный проект представляет собой одностраничный сайт с профилем пользователя (название, описание и аватар) и карточками мест (изображание + название места).  Для реализации проекта использовался нативный JavaScript и методология БЭМ для стилей.

Реализовано:
- отзывчивая верстка (резиновая + адаптивная, используя flexbox и grid layout);
- при открытии страницы с сервера подгружаются карточки мест и информация о пользователе;
- редактирование имени и описания через модальное окно (с их последующей отправкой на сервер);
- добавление и удаление карточек через модальное окно (с их последующей отправкой на сервер); карточку может удалить только тот пользователь, который ее добавил (в противном случае иконка удаления скрыта);
- добавление/удаление лайка на/с сервера;
- открытие изображений карточек в полном размере;
- кастомная валидация полей ввода в реальном времени, чтобы улучшить пользовательский опыт: пользователь сразу видит, если он допустил ошибку при заполнении какого-либо поля и какую именно ошибку. Стандартное отображение ошибок ввода браузером было изменено на кастомное решение (красный текст под полем ввода). При неверном заполнении пользователем хотя бы одного поля кнопка сохранения профиля/добавления карточки блокируется;
- проект реализован с помощью классов (согласано ООП);
- сборка проекта вебпаком.

Проект доступен по ссылке: https://stvdent47.github.io/mesto/
