// 1) Реализовать функцию которая принимает имя и возраст студента и возвращает объект с полями name, age, marks(пустой массив);

// 2)Реализовать функцию которая будет управлять студентами



// функция должна принимать массив студентов созданных с помощью предыдущей
// функции должна возвращать объект у которого будут следующие методы:
// добавления нового студента
// удаление студента по имени
// добавление оценки студенту за занятие(№ занятия === индекс оценки в массиве)
// получение средней оценки студента по имени
// получение средней оценки группы за занятие
// получение отсортированного по именам списка студентов
// получение отсортированного по среднему балу списка студентов






// 3) Работоспособность всех методов продемонстрировать ниже

// function Group(){
//     var students = [];

//     return function(){
//         return students;
//     }
// }


// function Student(name, age, marks){
//     return {
//         name: name,
//         age: age,
//         marks: [],
//     }
// }


// console.log(Student('Ed', '22'));
// console.log(Student('Vova', '20'));
// console.log(Student('Katia', '21'));

function acceptStudent(name, age){
    return {
        name : name,     
        age : age,      
        marks : []
    };   
}

function cloneStudents(arr) {
	return arr.slice(0);
}

function studentManagement (students) {
    
    var students = cloneStudents(students);

    var management = {

        addStudent : function (student) {
            students.push(student);
        },

        deleteStudent : function (name) {
            var index = students.findIndex(function(item){
				return item.name === name;
			});
			if(index != -1){
				students.splice(index, 1);
			} 
        },

        acceptStudent : function(name){
			var student = students.find(function(item){
				return item.name === name;
			});
			return student ? student : null;
        },
        
        addMark : function(name, lesson, mark){
			var student = management.acceptStudent(name);
			
			if(student){
				student.marks[lesson-1] = mark;
			}
        },
        
        averageMark : function(name){
			
			var student = management.acceptStudent(name);

            var sumMarks = student.marks.reduce (function (sum, current) {
                
                return sum + current;
            });

            return sumMarks / student.marks.length;
        },
        
        averageGroupMark : function(lesson){
            
            var sumMarks = students.reduce (function (sum, current){

                return sum + (current.marks[lesson-1] || 0);
            },0);

            return sumMarks / students.length;
        },
        
        getSortByName : function(){
			
			return students.sort (function(student1, student2){
				
			return (student1.name > student2.name) ?  1 : -1;
			});
        },
        
        getSortByAverageMark : function(){
			
			return students.sort(function(student1, student2){
				
				var student1AverageMark = management.averageMark(student1.name);
				var student2AverageMark = management.averageMark(student2.name);

				return (student1AverageMark < student2AverageMark) ? 1 : -1;
			});
		}
    };

    return management;    
}






/////////////////////////////////////////////





var students = [
    acceptStudent('Eva', 23),
    acceptStudent('Kate', 20),
    acceptStudent('Dima', 20),
    acceptStudent('Ivan', 20),
    acceptStudent('Sonny', 22),
    acceptStudent('Maks', 21)
];

var managementGroup = studentManagement(students);


managementGroup.addStudent(acceptStudent('Tom', 19));  //добавление студента


managementGroup.deleteStudent('Dima');  //удаление студента


//добавление оценок
managementGroup.addMark('Eva', 1, 4);
managementGroup.addMark('Eva', 2, 7);

managementGroup.addMark('Kate', 1, 7);
managementGroup.addMark('Kate', 2, 9);

managementGroup.addMark('Tom', 1, 7);
managementGroup.addMark('Tom', 2, 7);

managementGroup.addMark('Ivan', 1, 10);
managementGroup.addMark('Ivan', 2, 10);

managementGroup.addMark('Sonny', 1, 7);
managementGroup.addMark('Sonny', 2, 8);

managementGroup.addMark('Maks', 1, 9);
managementGroup.addMark('Maks', 2, 8);


console.log(managementGroup.averageMark('Tom'));  //средняя оценка одного


//средние оценки группы(за занятие)
console.log(managementGroup.averageGroupMark(1));
console.log(managementGroup.averageGroupMark(2));


console.log(managementGroup.getSortByName().slice());  //массив студентов отсортированый по именам


console.log(managementGroup.getSortByAverageMark().slice());  //массив студентов отсортированый по среднему балу