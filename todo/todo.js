// enpoint - http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/todos

// Нужно сделать приложение с полным CRUD (create, read, update,delete) для тудушек.
// Вверху страницы у нас есть два инпута (тайтл и боди тудушки) 
// и кнопка сохранить туду (при сохранении отправляем POST request на наш ендпоинт).
// Как приходит ответ - отображаем его в листе тудушек.

// В самой тудушке показываем - тайтл, боди, кнопку удалить в верхнем углу, 
// время создания тудушки в формате dd.mm.yyyy 
// (для работы с временем читаем Date - https://learn.javascript.ru/datetime)

// Так же у нас должна быть кнопка - завершить туду
// При нажатии на тайтл или боди туду у нас справа отображается блок редактирования тудушки
// там мы можем изменить тайтл или боди, и сохранить изменения 
// после нажатия на кнопку сохранить изменения у нас отправляется PUT request на наш ендпоинт. 
// после этого, мы отображаем изменения в листе.

// При нажатии на удаление (крестик) у нас отправляется DELETE request на наш endpoint
// Как приходит результат - удаляем и в листе.

// Модель тудушки, которую вы отправляете при создании должна содержать в себе следующие поля:
//  title: string;
//  body: string;
//  isComplete: boolean (изначально - false).

// В ответе от сервера вы уже получите модель туду вот такого вида
//  id: string;
//  title: string;
//  body: string;
//  isComplete: boolean;
//  createDate?: Date;
//  completeDate?: Date;

// Пока у тудушки isComplete false - бекграунд тудушки - желтый.
// Для того, чтоб выполнить тудушку, нам нужно отправить PUT запрос 
// на наш ендпоинт со всеми данными туду плюс изменить поле isComplete на true
// Как только получаем ответ, меняем цвет тудушки на зеленый.

// Поле редактирования видно только тогда, когда мы нажали на тудушку.
// После сохранения изменений - поле пропадает

// при загрузке нашего приложения, мы сразу отправляем запрос GET на получение всех тудушек


class Todos {
    
    #endpoint = 'http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/todos';
    
    getTodos() {
        return fetch(this.#endpoint).then(r => r.json());
    }

    createTodos(todo) {
        return fetch(this.#endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
    }

    updateTodos(todo, id) {
        return fetch(`${this.#endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        });
    }

    deleteTodos(id) {
        console.log('delete id: ', id);
        return fetch(`${this.#endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(r => r.json());
    }
}