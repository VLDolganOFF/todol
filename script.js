const dom = {
  new: document.getElementById('new'),
  add: document.getElementById('add'),
  tasks: document.getElementById('tasks'),
  count: document.getElementById('count')
}

//array
const tasks = [];

//chek button click

dom.add.onclick = () => {
  const newTaskText = dom.new.value
  if(newTaskText && isNotHaveTask(newTaskText,tasks)) {
    addTask(newTaskText, tasks)
    dom.new.value = '';
    tasksRender(tasks);
  }
};

//Add task function

function addTask(text, list){
  const timestamp = Date.now();
  const task = {
    id: timestamp,
    text, //text: text
    isComplete: false
  };

  list.push(task);
};

//checking for identical tasks
function isNotHaveTask(text, list) {
  let isNotHave = true;
  list.forEach((task) => {
    if(task.text === text){
      alert('This task already exsits')
      isNotHave = false;
    };
  });
  return isNotHave;
};

//Task-List output function

function tasksRender(list){
  let htmlList = '';

  list.forEach((task) => {
    const cls = task.isComplete ?'todo__task todo__task_complete':'todo__task'

    const checked = task.isComplete ?'checked':''


    const taskHtml = `
    <div id="${task.id}" class="${cls}">
      <label class="todo__checkbox">
        <input type="checkbox" ${checked}>
          <div class="todo__checkbox-div"></div>
          </label>
          <div class="todo__task-text">${task.text}</div>
          <div class="todo__task-del">-</div>
          </div>
          `
    htmlList = htmlList + taskHtml;
    
  })

  dom.tasks.innerHTML = htmlList;
  renderTasksCount(list);
}


//Checking task's checkbox click

dom.tasks.onclick = (event) => {
  const target = event.target
  const isChecboxEl = target.classList.contains('todo__checkbox-div')
  const isDeleteEl = target.classList.contains('todo__task-del')

  if(isChecboxEl) {
    const task = target.parentElement.parentElement
    const taskId = task.getAttribute('id')
    changeTaskStatus(taskId, tasks)
    tasksRender(tasks)
  }
  if (isDeleteEl) {
    const task = target.parentElement
    const taskId = task.getAttribute('id')
    deleteTask(taskId, tasks)
    tasksRender(tasks)
    console.log(tasks.length)
  }
}

// task's status func

function changeTaskStatus(id, list) {
  list.forEach((task) => {
    if(task.id == id) {
      task.isComplete = !task.isComplete
    }
  })
}

// delete task func

function deleteTask(id, list) {
  list.forEach((task, idx) => {
    if(task.id == id){
      list.splice(idx, 1)
    }
  })
}

// Task's count

function renderTasksCount(list) {
  dom.count.innerHTML = list.length
}
