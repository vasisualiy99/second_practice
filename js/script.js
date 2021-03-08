/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */



/* Задания на урок:
1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"
5) Фильмы должны быть отсортированы по алфавиту */





'use strict';
document.addEventListener('DOMContentLoaded', () => {
const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."  
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
      bg = document.querySelector('.promo__bg'),
      genre = bg.querySelector('.promo__genre'),
      movieList = document.querySelector('.promo__interactive-list'),
      addForm = document.querySelector('form.add'),
      addInput = addForm.querySelector('.adding__input'),
      checkbox = addForm.querySelector('[type="checkbox"]');
      
addForm.addEventListener('submit', (event) => {
    event.preventDefault();                                      // сбрасываем настройки браузер по умолчанию
    let newFilm = addInput.value;                              // создаём переменную, в которую помещаем введённые данные (value)
    const favorite = checkbox.checked;                           // создаём переменну, в которую помещаем булиновое значение о состоянии формы
    if (favorite) {
        console.log('Добавляем любимый фильм');
    }
    if (newFilm) {                                               // проверка на заполнение формы, если заполнен - всё ок, если пустой - ничего не происходит
        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`;
        }
        movieDB.movies.push(newFilm);                                // добавляем элемент в конец массива, используя метод push()
        sortArr(movieDB.movies);                                     // сортируем получившийся массив, используя функцию sortArr(), (она написана ниже...)
        createMovieList(movieDB.movies, movieList);                  // формируем новый список фильмов
    }
    event.target.reset();                                             // сброс  
});

const deleteAdv = (arr) => {
    arr.forEach(item => {
        item.remove();
    });
};

const makeChanges = () => {
    genre.textContent = 'Драма';
    bg.style.background = 'url("../lesson_30_p2/img/bg.jpg") center center/cover no-repeat';
};

const sortArr = (arr) => {
    arr.sort();
};

function createMovieList(films, parent) {
    parent.innerHTML = '';
    sortArr(films);
    films.forEach((film, i) => {
        parent.innerHTML += `
        <li class="promo__interactive-item">
            ${i + 1} ${film}
            <div class="delete"></div>
        </li>
        `;
    });
    document.querySelectorAll('.delete').forEach((bnt, i) => {
        bnt.addEventListener('click', () => {
            bnt.parentElement.remove();
            movieDB.movies.splice(i, 1);
            createMovieList(films, parent);
        });
    });
}

deleteAdv(adv);
makeChanges();
createMovieList(movieDB.movies, movieList);
});


