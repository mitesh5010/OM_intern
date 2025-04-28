const todoList =[{name : 'mitesh', dueDate:'04-03-2025'}];

renderList();

function renderList() {
  let todoHTML = '';
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i]
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const {name, dueDate} = todoObject;

    const html = `
    
    <div>${name}</div>
    <div>${dueDate}</div>
    <button onclick="todoList.splice(${i},1)
    renderList();" class="dlt-btn">
    Delete
    </button>
    `;
    todoHTML+=html;
  }
  document.querySelector('.list').innerHTML=todoHTML;
}
function addName() {
  const inputName =  document.querySelector('.js-input-name');
  const inputDate = document.querySelector('.js-date');
  const name = inputName.value;
  const dueDate = inputDate.value;

  todoList.push(
    {
      // name : name,
      // dueDate : date
      name,
      dueDate
    }
  );
  console.log(todoList);

  inputName.value = '';
  inputDate.value = '';
  renderList();
}