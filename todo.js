const todoForm = document.querySelector("#todo-form");
const formInput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const cardbodyf = document.querySelectorAll(".card-body")[0];
const cardbodys = document.querySelectorAll(".card-body")[1];
const filterInput = document.querySelector("#filter");
const clearbutton = document.querySelector("#clear-todos");

allEvents();
function allEvents() {
  todoForm.addEventListener("submit", addTodo);
}

function addTodo(e) {
  const newTodo = formInput.value.trim(); //yazının başında veya sonunda boşluk varsa onları kaldırır.
  if (newTodo === "") {
    showAlert("danger", "lütfen bir todo giriniz!");
  } else {
    addTodotoUI(newTodo); //arayüze (UI) yeni element ekleyecek olan fonksiyon
    addTodotoStorage(newTodo); //arayüze eklediğimiz todoları local storage'a da eklemeliyiz.
  }

  e.preventDefault();
}
function showAlert(type, message) {
  // <div class="alert alert-danger">
  //   <strong>Success!</strong> Indicates a successful or positive action.
  // </div>;
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.innerHTML = message; //alert.textcontent = message;
  todoForm.appendChild(alert);
  setTimeout(function () {
    alert.remove();
  }, 800); //bu içindeki fonksiyonun 800ms saniye sonra çalışacağı anlamına gelir.
}
function addTodotoUI(newTodo) {
  //  <li class="list-group-item d-flex justify-content-between">
  //                     Todo 1
  //                     <a href="#" class="delete-item">
  //                         <i class="fa fa-remove"></i>
  //                     </a>
  //                 </li>
  //list item oluşturma
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";
  //link oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class='fa fa-remove'></i>";
  //text node ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  todolist.appendChild(listItem);
  formInput.value = ""; //değer eklendikten sonra input içinden siliniyor.
}
function getTodosFromStorage() {
  //bu şekilde todos arrayini oluşturmuş oluyoruz, storagedan todoları alma.
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function addTodotoStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
