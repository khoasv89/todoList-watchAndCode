//Created todoList object
var todoList = {
  //empty array used to add todos
  todos: [],
  //adds todos to array 
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  //edit todo
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  //remove todo
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  //mark or unmark a single todo 
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  //mark or unmark all todos
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of completed todos
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    //actually mark todos
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
    }
  };
//create object handlers
var handlers = {
  //handles user input to list from interface
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  //handles user change to todo from input
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  //handles user interface to delete an item
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  //handles user interface to mark an item as completed
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  // handles user interface to mark all items at once
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};
// controls the way things are viewed on page
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    //creates list item element when todos are added
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
   
      var todoTextWithCompletion = '';
      //displays marked or unmarked item  
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  //makes a delete button appear beside each list item
  createDeleteButton: function() {
  var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
  return deleteButton;  
},
  //removes item when delete button is clicked
  setUpEventListeners: function() {
   var todosUl = document.querySelector('ul');

   todosUl.addEventListener('click', function(event) {
     var elementClicked = event.target;
     if (elementClicked.className === 'deleteButton'){
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
     }
   }); 
  }
};

view.setUpEventListeners();
