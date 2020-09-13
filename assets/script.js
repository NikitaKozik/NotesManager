'use strict';

document.addEventListener('DOMContentLoaded', () => {


    const notes = [

    ];


    //Создаем DOM
    function Notes(id) {

        return `
            <div class="entry">
            
                <div class="entry__title">
                    <span>${notes[id].title}</span>
                    <span>Опубликовано: ${notes[id].date}</span>
                </div>

                <div class="entry__content">

                    ${notes[id].content}

                </div>

            </div>
        `;
    }


    //Выводим массив notes в виде табов

    //Прячем все элементы массива по дефолту
    function hideNotes() {
        document.querySelectorAll('.entry').forEach(item => {
            item.classList.add('hide');
        });
        document.querySelectorAll('.entries__navigation li').forEach(item => {
            item.classList.remove('entries__anchor__active');
        });
    }

    //Показать последний созданный элемент массива / определенный элемент
    function showNotes(id = notes.length - 1) {
        document.querySelectorAll('.entry')[id].classList.remove('hide');
        document.querySelectorAll('.entries__navigation li')[id].classList.add('entries__anchor__active');
    }

    //Делегируем
    document.querySelector('.entries__navigation').addEventListener('click', (event) => {
        const target = event.target;
        if (target) {
            document.querySelectorAll('.entries__navigation li').forEach((btn, id) => {
                if (target == btn) {
                    hideNotes();
                    showNotes(id);

                    if (displayForm()) {
                        removeForm();
                    }
                }
            });
        }
    });

    //Показываем сформировавшийся DOM на странице
    function render() {
        document.querySelector('.container').innerHTML = '';
        document.querySelector('.entries__navigation').innerHTML = '';
        //если кол-во элементов в массиво равно 0, то выводим сообщение, если что-то есть, 
        //то выводим наш созданный DOM в контейнер и сайдбар
        if (notes.length <= 0) {
            document.querySelector('.container').innerHTML = `
            <div class="no_notes__message">В данные момент у вас нет заметок, но вы можете 
            <a href="#" data-modal>создать одну</a></div>
            `;
        } else {
            notes.forEach((item, id) => {
                document.querySelector('.container').innerHTML += Notes(id);
                document.querySelector('.entries__navigation').innerHTML += `<li>${notes[id].title}</li>`;
            });
            //Обновляем
            hideNotes();
            showNotes();
        }
    }

    render();

    //Добавляем заметку

    //Скрыть и показать форму
    function displayForm() {
        document.querySelector('.container').classList.add('hide');
        document.querySelector('.form').classList.remove('hide');
        return true;
    }

    function removeForm() {
        document.querySelector('.container').classList.remove('hide');
        document.querySelector('.form').classList.add('hide');
    }

    //Биндим на кнопку
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', displayForm);
    });

    //Работаем с формой
    function addNote() {
        const form = document.querySelector('.new__note__form'),
            newNoteTitle = document.querySelector('.note__title'),
            newNoteContent = document.querySelector('.note__content'),
            newNoteSubmit = document.querySelector('.note__new');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            //Выводим дату
            function printDate() {
                const cd = new Date(),
                    printDate = `${cd.getDate()}.${cd.getMonth() + 1}.${cd.getFullYear()} ${cd.getHours()}:${cd.getMinutes()}`;
                return printDate;
            }

            //Создаем новый элемент в массиве
            let newNote = {
                'title': newNoteTitle.value,
                'date': printDate(printDate),
                'content': newNoteContent.value
            };

            //Проверка и в случае успеха пушим наш элемент в массив
            if (newNoteTitle.value == '', newNoteContent.value == '') {
                alert('ошибка');
            } else {
                notes.push(newNote);
                console.log(notes);
                render();
                removeForm();
            }
            form.reset();
        });

    }

    addNote();

});