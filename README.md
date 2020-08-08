# Проект 4: Место

### Обзор
Данный проект представляет собой страницу с профилем (название и описание) и карточками мест (изображание + название места). При открытии страницы первые шесть карточек мест добавляются самостоятельно по умолчанию с помощью JavaScript из стандртного объекта. В проекте используется отзывчивая верстка, которая комбинирует в себе два подхода верстки: резиновая и адаптивная верстка. Для построения адаптивной верстки использовались брейкпоинты, на которых верстка могла сломаьться. Чтобы достичь отзывчивой верстки были использованы flex и grid layout. Основой дизайна послужил макет, который был выгружен в Figma.
Реализовано:
- функционал редактирования имени и описания через модальное окно.
- функционал добавления новой карточки через модальное окно.
- функционал удаления карточки.
- функционал добавления/удаления лайка.
- функционал открытия изображений карточек в полном размере.
- валидация полей ввода в реальном времени, чтобы улучшить пользовательский опыт: пользователь сразу видит, если он допустил ошибку при заполнении какого-либо поля и какую именно ошибку. Стандартное отображение ошибок ввода браузером было изменено на кастомное решение (красный текст под полем ввода). При неверном заполнении пользователем хотя бы одного поля кнопка сохранения профиля/добавления карточки блокируется.

Проект доступен по ссылке: https://stvdent47.github.io/mesto/index.html