const user = {
    name: "Bob",
    age: 23,
    friends: ["Alex", "Nick", "John"]
}

const students = [
    {
        name: "Bob",
        age: 22,
        isMarried: true,
        scores: 85
    },
    {
        name: "Alex",
        age: 21,
        isMarried: true,
        scores: 90,
    },
    {
        name: "Nick",
        age: 20,
        isMarried: false,
        scores: 120
    },
    {
        name: "John",
        age: 19,
        isMarried: false,
        scores: 100
    },
    {
        name: "Helen",
        age: 20,
        isMarried: false,
        scores: 110
    },
    {
        name: "Ann",
        age: 20,
        isMarried: false,
        scores: 105
    },
];

// 1. Создайте поверхностную копию объекта user
const copyUser = {...user}

// Проверка:
console.log(user === copyUser)
console.log(user.friends===copyUser.friends)

// 2. Полная (глубокая) копия объекта user
const deepCopyUser = {...user, friends: [...user.friends]}

// Проверка:
console.log(user === deepCopyUser) 
console.log(user.friends === deepCopyUser.friends)

// 3. Поверхностная копия массива students
const copyStudents = [...students]

// Проверка:
console.log(students === copyStudents) 
console.log(students[0] === copyStudents[0])

// 4*. Полная (глубокая) копия массива students (map)
const deepCopyStudents = [...students].map(item => ({...item}))

// Проверка:
console.log(deepCopyStudents === students)
console.log((deepCopyStudents[0] === students[0]))

// NB!!! Далее все преобразования выполняем не модифицируя исходный массив students
// Вывод результатов - в консоль

// 5. Отсортируйте копию массива deepCopyStudents по алфавиту (sort)
const sortedByName = [...deepCopyStudents].sort(function(a, b) {
    if(a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
    } else {
        return 1
    } 
})

console.log(sortedByName)

// 5a. Отсортируйте deepCopyStudents по успеваемости (лучший идёт первым)(sort)
const sortedByScores = [...deepCopyStudents].sort(function(a, b) {
    if(a.scores < b.scores) {
        return 1
    } else {
        return -1
    } 
})

console.log(sortedByScores);

// 6. Сформируйте массив студентов, у которых 100 и более баллов (filter)
const bestStudents = [...deepCopyStudents].filter(item => item.scores > 100)
console.log(bestStudents)

// 6a. Получите массив ("вырежьте") из трёх лучших студентов из массива deepCopyStudents (splice)
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

const topStudents = [...bestStudents].splice(0, 3)
console.log(topStudents)

// 6b. Объедините массивы deepCopyStudents и topStudents так, чтоб сохранился порядок сортировки (spread-оператор || concat)
const newDeepCopyStudents = [...topStudents, ...deepCopyStudents]
// newDeepCopyStudents = topStudents.concat(deepCopyStudents)
console.log(newDeepCopyStudents)

// 7. Сформируйте массив холостых студентов (filter)
const notMarriedStudents = [...deepCopyStudents].filter(item => item.isMarried === false)
console.log(notMarriedStudents)

//8. Сформируйте массив имён студентов (map)
const studentsNames = deepCopyStudents.map(item => item.name)
console.log(studentsNames)

// 8a. Сформируйте строку из имён студентов, разделённых
// - пробелом (join)
// - запятой (join)

const namesWithSpace = [...deepCopyStudents].map(item => item.name).join(' ')
console.log(namesWithSpace)

const namesWithComma = [...deepCopyStudents].map(item => item.name).join(',')
console.log(namesWithComma)

// 9. Добавьте всем студентам свойство "isStudent" со значением true (map)
const trueStudents = [...deepCopyStudents].map(item => ({...item, isStudent: true}))
console.log(trueStudents)

// 10. Nick женился. Выполните соответствующие преобразование массива students (map)
const studentsWithMarriedNick = [...deepCopyStudents].map(item => item.name === 'Nick' ? {...item, isMarried: true} : item)
console.log(studentsWithMarriedNick)

// 11. Найдите студента по имени Ann (find)
const ann = [...deepCopyStudents].find(item => item.name.toLowerCase() === 'ann')
console.log(ann)

// 12. Найдите студента с самым высоким баллом (reduce)
// - c помощью reduce
// - *не испльзуя методы массивов и Math.max()*
const bestStudent = deepCopyStudents.reduce((acc, item) => acc.scores < item.scores ? item : acc)
console.log(bestStudent)

// 13. Найдите сумму баллов всех студентов (reduce)
const scoresSum = deepCopyStudents.reduce((acc, item) => {
    return acc + item.scores
}, 0)

console.log(scoresSum)

// 14. Д.З.:
// Напишите функцию addFriends, которая принимает параметром массив students
// и добавляет в каждому студенту свойство "friends",
// значением которого является массив имён всех остальных студентов из массива students,
// за исключением собственного имени студента. Т.е. в друзьях у Боба Боба быть не должно.

const addFriends = (students) => {
    let nameArr = [...students.map(item => item.name)]
    let arr = [...students.map(item => ({...item, freinds: nameArr.filter(name => name !== item.name)}))]
    return arr;
}

console.log(addFriends(students));