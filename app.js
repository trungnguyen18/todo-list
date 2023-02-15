// design data

//- tên công việc
//- trạng thái
const TODOLIST_APP_UNITOP = "TODOLIST_APP_UNITOP";
let data = [
    // {
    //     task: 'run 2km',
    //     is_complete: true
    // },
    // {
    //     task: 'Read book',
    //     is_complete: false
    // },
]

// lưu vào trong 

const saveData = (data) => {
    localStorage.setItem(TODOLIST_APP_UNITOP, JSON.stringify(data));
}

// saveData(data);

const loadData = () => {
    let data = JSON.parse(localStorage.getItem(TODOLIST_APP_UNITOP));
    data = data ? data : [];
    return data;
}

// data = loadData();


// add task
const addTask = (new_task) => {
    let data;
    data = loadData();
    data = [...data, new_task];
    saveData(data);
}


const createTaskItem = (task, is_complete, index) => {
    return `
        <li class="task-item" index="${index}" is-complete=${is_complete}>
            <span onclick="markTaskComplete(${index})">${task}</span>
            <div class="task-action">
                <button onclick="pushEditTask(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                </button>
                <button onclick="deleteTask(this,${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>     
                </button>                     
            </div>
        </li>
        `;
}

//renderTask()
const renderTask = () => {
    let data, taskHtml, ulTask, taskResult, countTaskComplete;
    ulTask = document.querySelector("ul.tasks");
    taskResult = document.querySelector('.task-result');
    data = loadData();
    countTaskComplete = 0;
    // console.log(data);
    taskHtml = data.map((element, index) => {
        if(element.is_complete == true) countTaskComplete++;
        return createTaskItem(element.task, element.is_complete, index);
    });
    taskResult.textContent = countTaskComplete>=1?`Yeah, ${countTaskComplete} task complete!`:'';
    ulTask.innerHTML = taskHtml.join("");
}



// markTaskComplete()
const markTaskComplete = (index) => {
    let data;
    data = loadData();
    data[index].is_complete = data[index].
        is_complete == true ? false : true;
    saveData(data);
    // console.log(data[index]);
    renderTask();
}

// /deleteTask()
const deleteTask = (element, index) => {
    let data;
    let confirm_delete = confirm('Bạn có thực sự muốn xóa công việc này?');
    if (confirm_delete == false) return false;
    // console.log(confirm_delete);
    data = loadData();
    data.splice(index, 1);
    saveData(data);
    element.closest('.task-item').remove();
    // renderTask();
}

const pushEditTask = (index) => {
    let data = loadData();
    const inputTask = document.getElementById('task');
    inputTask.value = data[index].task;
    //thay đổi nút thành edit add
    const btn_edit = document.getElementById('btn_Task');
    btn_edit.innerText = 'Edit Task';
    //truyền tham số index lên input
    inputTask.setAttribute('index', index)
}
const editTask = (task, index) => {
    let data;
    const btn_update = document.getElementById('btn_Task');
    data = loadData();
    data[index].task = task;
    btn_update.innerText = 'Add Task';
    saveData(data);
}
const formaddTask = document.forms.addTask;
formaddTask.addEventListener('submit', (e) => {
    let new_task;
    const task = document.querySelector('#task');
    //kiểm tra validation form ô input
    if(task.value.length < 2){
        alert('Nhập từ 2 ký tự trở lên!');
        return false;
    }
    let index_task = task.getAttribute('index');
    // console.log(index_task);
    if (index_task) {
        editTask(task.value, index_task);
        task.removeAttribute('index');
    } else {
        new_task = {
            task: task.value,
            is_complete: false
        };
        addTask(new_task);
    }

     renderTask();
     task.value = '';
    e.preventDefault();

})

document.addEventListener('keyup', (e)=>{
    // console.log(e.which == 27);
    if(e.which == 27){
        const task = document.querySelector('#task');
        task.removeAttribute('index');
        task.value = "";
        const btn_update = document.getElementById('btn_Task');
        btn_update.textContent = "Add Task";
    }
})
renderTask();