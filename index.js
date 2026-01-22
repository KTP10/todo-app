const input = document.querySelector("input");
const addBtn = document.querySelector(".add-btn");
const todos = document.querySelector(".todos");
const clear = document.querySelector(".clear-div");

function addTodos() {
  const inputText = input.value.trim();

  if (inputText === "") {
    return;
  } else {
    createTodo(inputText);
    saveTodosToLocal(inputText);
    toggleClearBtn();
  }
}

function saveTodosToLocal(todo) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

document.addEventListener("DOMContentLoaded", loadTodos);
function loadTodos() {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todo) => createTodo(todo));
  toggleClearBtn();
}

function removeTodoFromLocal(todo) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos = savedTodos.filter((t) => t !== todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function createTodo(text) {
  const todo = document.createElement("div");
  todo.classList.add("todo-li");
  todo.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "delete";
  todo.appendChild(deleteBtn);
  todos.appendChild(todo);

  input.value = "";

  deleteBtn.addEventListener("click", () => {
    todos.removeChild(todo);
    removeTodoFromLocal(text);
    toggleClearBtn();
  });
}

function toggleClearBtn() {
  if (todos.children.length > 1) {
    clear.classList.remove("hidden");
  } else {
    clear.classList.add("hidden");
  }
}

function clearTodos() {
  todos.innerHTML = "";
  clear.classList.add("hidden");
  localStorage.removeItem("todos");
}

addBtn.addEventListener("click", addTodos);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addBtn.click();
  }
});

clear.addEventListener("click", clearTodos);
