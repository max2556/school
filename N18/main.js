//var, let, const - объявление переменных, каждый со своей фишкой. Не важно

//НЕ ПОКАЗЫВАТЬ ЛЮДЯМ С ВЫСОКИМ УРОВНЕМ ЗНАНИЯ JavaScript. ПОЖАЛЕЙТЕ ЭТИХ НЕСЧАСТНЫХ, ИМ И ТАК ТЯЖЕЛО!!!
//НЕ ПОКАЗЫВАТЬ ЛЮДЯМ С ВЫСОКИМ УРОВНЕМ ЗНАНИЯ JavaScript. ПОЖАЛЕЙТЕ ЭТИХ НЕСЧАСТНЫХ, ИМ И ТАК ТЯЖЕЛО!!!
//НЕ ПОКАЗЫВАТЬ ЛЮДЯМ С ВЫСОКИМ УРОВНЕМ ЗНАНИЯ JavaScript. ПОЖАЛЕЙТЕ ЭТИХ НЕСЧАСТНЫХ, ИМ И ТАК ТЯЖЕЛО!!!
//НЕ ПОКАЗЫВАТЬ ЛЮДЯМ С ВЫСОКИМ УРОВНЕМ ЗНАНИЯ JavaScript. ПОЖАЛЕЙТЕ ЭТИХ НЕСЧАСТНЫХ, ИМ И ТАК ТЯЖЕЛО!!!
//НЕ ПОКАЗЫВАТЬ ЛЮДЯМ С ВЫСОКИМ УРОВНЕМ ЗНАНИЯ JavaScript. ПОЖАЛЕЙТЕ ЭТИХ НЕСЧАСТНЫХ, ИМ И ТАК ТЯЖЕЛО!!!

/*
Итак
Важные моменты:
1)Количество путей высчитывается по правилу Треугольника Паскаля(Биноминальный коэффициент Ньютона, тема 9-го класса)
2)Оптимизации нет, ничего нет, пустота...
3)На самом деле от меня требовалось написать только anal, но мне как бы немного пофиг, да
Конец
*/


var N, min, max; //N - сторона квадрата; min,max - ответ на задание
var minGen = 1;
var maxGen = 100;
var table = []; //переменная для будущего массива

var allPaths = [];
var maxPath, minPath;

window.onload = function() {
    createTable(); //создать таблицу чисел
    createAnotherTable(); //таблица путей
    createPaths(); //создать пути
    anal(); //анал
    drawPaths(); //отрисовать пути
    alert(N + ',' + min + ',' + max); //подержать в курсе
}





//заполняем массив, затем выводим на страницу
//можно было соединить генерацию и вывод в один цикл, но так нагляднее
function createTable() {
    //заполнение массива
    generateTable();
    //вывод
    drawTable();
}

function generateTable() {
    N = Math.floor(Math.random() * (17 - 2)) + 2; //Случайно создаем размер квадрата
    for (let i = 0; i < N; i++) {
        let row = []
        for (let j = 0; j < N; j++) {
            let element = Math.floor(Math.random() * (maxGen - minGen + 1)) + minGen; //как и значение каждой ячейки
            row.push(element);
        }
        table.push(row);
    }

}

function drawTable() {
    var body = document.getElementById('body'); //берем 'тело' из html

    var tbl = document.createElement("table"); //создаем основу для таблицы
    var tblBody = document.createElement("tbody"); //создаем тело таблицы


    for (let i = 0; i < N; i++) {
        let row = document.createElement("tr"); //для каждого ряда создаем линию
        for (let j = 0; j < N; j++) {
            let cell = document.createElement("td"); //для каждой ячейки создаем... ячейку
            let cellText = document.createTextNode(table[i][j]); //текст для ячейки, в нашем случае - число
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody); //вставляем тело таблицы в таблицу
    body.appendChild(tbl); //а таблицу в html 
    tbl.setAttribute("border", "1"); //дадим таблице контуры
    tbl.setAttribute("id", "mainTbl");
}
//А что? Две таблицы лучше одной(читать предисловие)
function createAnotherTable() {
    var body = document.getElementById('body'); //берем 'тело' из html
    var tbl = document.createElement("table"); //создаем основу для таблицы
    var tblBody = document.createElement("tbody"); //создаем тело таблицы
    for (let i = 0; i < N; i++) {
        let row = document.createElement("tr"); //для каждого ряда создаем линию
        for (let j = 0; j < N; j++) {
            let n = i + j;
            let k = j;
            var number = Math.floor(factorial(n) / (factorial(k) * (factorial(n - k))));
            let cell = document.createElement("td"); //для каждой ячейки создаем... ячейку
            let cellText = document.createTextNode(number); //текст для ячейки
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    NoP = number;
    tbl.appendChild(tblBody); //вставляем тело таблицы в таблицу
    body.appendChild(tbl); //а таблицу в html 
    tbl.setAttribute("border", "1"); //дадим таблице контуры
    tbl.setAttribute('class', 'pasc'); //Дал этой таблице класс, чтобы привязать стиль из Css файла
}

//Главная функция
function anal() {
    min = 999999999999; //так надо
    max = 0; //и так тоже

    var LoP = 2 * (N - 1) + 1; //Length of Path
    for (let i = 0; i < NoP; i++) { //В этом цикле перебираем все пути
        let x = 0; //координаты робота
        let y = 0;
        var sum = 0; //сумма чисел
        path = allPaths[i]; //берем путь через i
        for (let j = 0; j < LoP; j++) {
            let number = table[y][x]; //Подбираем монеты с клетки по адресу x,y
            sum += number; //вносим в сумму
            (path[j] === '0') ? x++ : y++; //Если следующее направление = 0 - двигаться вправо, иначе вниз
        }
        if (sum > max) { //проверка суммы на максимальное число
            max = sum;
            maxPath = path;
        }
        if (sum < min) { //на минимальное число
            min = sum;
            minPath = path;
        }
    }
}


//Создаем первый путь
function firstPath(l) {
    let path = '';
    while (path.length < l) {
        path = path + '0';
    }
    return path;
}
//Пережиток прошлого
function updatePath(path, k) {
    if (k + 1 > path.length / 2) {
        var prevPos = path.lastIndexOf('1', path.length - (k + 1));
        var newPos = prevPos + 1;
    } else {
        var prevPos = path.lastIndexOf('0', path.length - (k + 1));
        var newPos = prevPos + 1;
    }
    pathArr = path.split('');
    let buffer = pathArr[newPos];
    pathArr[newPos] = pathArr[prevPos];
    pathArr[prevPos] = buffer;
    path = pathArr.join('');
    return path;
}


//'Вот она - рыба моей мечты'
//Полный перебор путей, сделал через перенос в двоичную систему, т.к путя всего 2
//Логично? Да
//Эффективно? По-моему ни пи*зды не эффективно
//Сори
function createPaths() {
    let pLen = 2 * (N - 1); //Длина пути
    let k = Math.pow(2, pLen); //Количество возможных комбинаций
    let path = firstPath(pLen); //Создаем первый путь
    for (let i = 1; i < k; i++) {
        let result = parseInt(i).toString(2); //Не понял как работает, загуглил по запросу 'js decimal to binary' первая ссылка
        if (result.length < path.length) { //Добавляем лишние нули
            result = path.substr(0, path.length - result.length) + result;
        }
        //Проверяем - Дошли ли мы до нижнего правого угла?
        if (result.match(/0/g) != null && result.match(/1/g) != null) {
            if (result.match(/0/g).length === result.match(/1/g).length) {
                allPaths.push(result);
            }
        }
    }
}

//Отрисовываем наши волшебные пути
//Просто выпендриться тем, что я не умею распределять время
//Учитесь
function drawPaths() {
    var tbl = document.getElementById('mainTbl');
    var tblBody = tbl.children[0];
    var LoP = 2 * (N - 1) + 1;
    let x = 0;
    let y = 0;
    let path = minPath;
    for (let i = 0; i < LoP; i++) {
        let cell = tblBody.children[y].children[x];
        cell.style = 'background-color: green';
        (path[i] === '0') ? x++ : y++;
    }
    x = 0;
    y = 0;
    path = maxPath;
    for (let i = 0; i < LoP; i++) {
        let cell = tblBody.children[y].children[x];
        cell.style = 'background-color: red';
        (path[i] === '0') ? x++ : y++;
    }
    tblBody.children[0].children[0].style = 'background-color: yellow';
    tblBody.children[N - 1].children[N - 1].style = 'background-color: yellow';
}


//Взято из интернетов, но можно и самим сделать, объяснять не буду
function factorial(n) {
    if (n == 0 || n == 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}