let todoList = [];
let btnChecked;
let liElem;
function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoListElement = document.getElementById("todo-list");

  if (todoInput.value !== "") {
    const todoItem = {
      id: Date.now(),
      name: todoInput.value,
    };
    todoList.push(todoItem);
    todoInput.value = "";
    renderTodoList(todoListElement);
    saveTodoList();
  }
}

function renderTodoList(todoListElement) {
  todoListElement.innerHTML = "";
  todoList.forEach((todoItem, idx) => {
    num = idx + 1;
    liElem = document.querySelectorAll(".todoItem");
    const todoItemElement = document.createElement("li");
    todoItemElement.className = "todoItem";

    const createBtns = document.createElement("div");
    createBtns.className = "btn-section";

    const renameButton = document.createElement("button");
    renameButton.innerText = "✍🏼";
    renameButton.addEventListener("click", () => {
      const newName = prompt("Enter new name:");
      if (newName !== null && newName !== "") {
        todoItem.name = newName;
        renderTodoList(todoListElement);
        saveTodoList();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "🗑️";
    deleteButton.addEventListener("click", () => {
      todoList = todoList.filter((item) => item.id !== todoItem.id);
      renderTodoList(todoListElement);
      saveTodoList();
    });

    btnChecked = document.querySelectorAll(".checked");
    const checkedBtn = document.createElement("button");
    checkedBtn.innerText = "✅";
    checkedBtn.className = "checked";
    btnChecked.forEach((item, idx) => {
      item.addEventListener("click", () => {
        liElem[idx].classList.toggle("checking");
        console.log(idx);
      });
    });
    todoItemElement.innerText = `${num}. ${todoItem.name}`;
    createBtns.appendChild(checkedBtn);
    createBtns.appendChild(renameButton);
    createBtns.appendChild(deleteButton);
    todoItemElement.appendChild(createBtns);
    todoListElement.appendChild(todoItemElement);
  });
}

function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTodoList() {
  const storedTodoList = localStorage.getItem("todoList");
  if (storedTodoList !== null) {
    todoList = JSON.parse(storedTodoList);
    renderTodoList(document.getElementById("todo-list"));
  }
}

loadTodoList();

console.log(todoList);
console.log(todoItemAll);
console.log(liElem);
