const inputBox = document.querySelector(".input-text");
const inputButton = document.querySelector(".input-btn");
const todoList = document.querySelector('.todo-list');

inputButton.addEventListener("click", () => {
    const todoText = inputBox.value.trim();
    if (todoText === "") return "";
    addTodo(todoText);
    inputBox.value = "";
});

function addTodo(text) {
    const li = document.createElement("li");

    const div = document.createElement("div");
    const checkImg = document.createElement("img");
    checkImg.src = "./images/unchecked.png";
    checkImg.alt = "check";
    checkImg.classList.add("check");

    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = text;

    div.appendChild(checkImg);
    div.appendChild(span);

    const trashImg = document.createElement("img");
    trashImg.src = "./images/trash.png";
    trashImg.alt = "trash";
    trashImg.classList.add("trash");

    li.appendChild(div);
    li.appendChild(trashImg);
    todoList.appendChild(li);

    span.addEventListener("click", () => {
        if (checkImg.src.includes("unchecked.png")) {
            checkImg.src = "./images/checked.png";
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        } else {
            checkImg.src = "./images/unchecked.png";
            span.style.textDecoration = "none";
            span.style.color = "black";
        }
    });

    trashImg.addEventListener("click", () => {
        li.remove();
    })
}