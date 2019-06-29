const inputElement = document.getElementById("input");
const ulElement = document.getElementById("list");
let TodoList = [];

inputElement.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.keyCode === 13) {
    TodoList.unshift({
      content: inputElement.value,
      done: false,
      selected: false
    });
    inputElement.value = "";
    upgradeView();
  }
});

function upgradeView() {
  ulElement.innerHTML = "";
  for (let index = 0; index < TodoList.length; index++) {
    const TodoItem = TodoList[index];
    const liElement = document.createElement("li");
    liElement.className = "item";
    ulElement.append(liElement);
    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.id = "TodoItem" + index;
    checkboxElement.checked = TodoItem.selected;
    liElement.append(checkboxElement);

    const labelElement = document.createElement("label");
    liElement.append(labelElement);

    if (TodoItem.done) {
      liElement.className = "ToDoDone";
    }
    labelElement.setAttribute("for", "TodoItem" + index);
    labelElement.innerText = TodoItem.content;

    if (!TodoItem.done) {
      const buttonDoneElement = document.createElement("button");
      buttonDoneElement.className = "b6";
      buttonDoneElement.innerText = "Done";
      liElement.append(buttonDoneElement);
      buttonDoneElement.addEventListener("click", () => {
        TodoItem.done = !TodoItem.done;
        upgradeView();
      });
    } else {
      const buttonRemoveElement = document.createElement("button");
      buttonRemoveElement.className = "b7";
      buttonRemoveElement.innerText = "Remove";
      liElement.append(buttonRemoveElement);
      buttonRemoveElement.addEventListener("click", () => {
        TodoList = TodoList.filter(
          currentTodoItem => currentTodoItem !== TodoItem
        );
        upgradeView();
      });
    }
    checkboxElement.addEventListener("change", () => {
      TodoItem.selected = checkboxElement.checked;
    });
  }
}

document.getElementById("doneAction").addEventListener("click", () => {
  for (const TodoItem of TodoList) {
    if (TodoItem.selected) {
      TodoItem.done = true;
      TodoItem.selected = false;
    }
  }
  upgradeView();
});
document.getElementById("restoreAction").addEventListener("click", () => {
  for (const TodoItem of TodoList) {
    if (TodoItem.selected) {
      TodoItem.done = false;
      TodoItem.selected = false;
    }
  }
  upgradeView();
});
document.getElementById("removeAction").addEventListener("click", () => {
  TodoList = TodoList.filter(TodoItem => !TodoItem.selected);
  upgradeView();
});

document.getElementById("test").addEventListener("click", () => {
  for (const TodoItem of TodoList) {
    TodoItem.selected = true;
  }
  upgradeView();
});
