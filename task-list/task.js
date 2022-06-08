//UI Variables

const form = document.querySelector('form')

const taskList = document.querySelector('ul')

const clearBtn = document.querySelector('.clear-tasks.btn')

const taskFilter = document.querySelector('#filter')

const taskInput = document.querySelector('#task')

// Load all event listeners function
const loadEventListeners = () => {
    //DOM LOAD 
    document.addEventListener('DOMContentLoaded',getTasksFromStorage)

    form.addEventListener('submit', addTask);
    clearBtn.addEventListener('click', clearBtnHandler);
    taskList.addEventListener('click',deleteItem)
    taskFilter.addEventListener('keyup',filterTasks)

}

//Local Storage
const storeLocally = (input) => {
    let storedTasks;
    if (localStorage.getItem('storedTasks') === null){
        
        storedTasks = []
    } else {
        storedTasks = JSON.parse(localStorage.getItem('storedTasks'))
    }

    storedTasks.push(input)

    localStorage.setItem('storedTasks',JSON.stringify(storedTasks))
}

const getTasksFromStorage = () => {
    let storedTasks;
    if (localStorage.getItem('storedTasks') === null){
        
        storedTasks = []
    } else {
        console.log(JSON.parse(localStorage.getItem('storedTasks')));
        storedTasks = JSON.parse(localStorage.getItem('storedTasks'))
    }

    storedTasks.forEach( (task) => {
        const li = document.createElement('li');
        //materialize classname
        li.className= 'collection-item';
    
        //create text node
        li.appendChild(document.createTextNode(task))
    
        //create link
        const link = document.createElement('a')
        //secondary moves it to the side
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa-solid fa-xmark"> </i>'
        //append link to li
        li.appendChild(link);
    
        //now append li to ul
        taskList.appendChild(li)
    })
}

//adding tasks

const addTask = (e) => {
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Find Something To Do!')

    } else {

    const li = document.createElement('li');
    //materialize classname
    li.className= 'collection-item';

    //create text node
    li.appendChild(document.createTextNode(taskInput.value))

    //create link
    const link = document.createElement('a')
    //secondary moves it to the side
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa-solid fa-xmark"> </i>'
    //append link to li
    li.appendChild(link);

    //now append li to ul
    taskList.appendChild(li)

    storeLocally(taskInput.value)

    //Clear inputs
    taskInput.value = ''
    }
}

//delete item 
const removeTaskFromLS = (item) => {
    let storedTasks;
    if (localStorage.getItem('storedTasks') === null || localStorage.getItem('storedTasks') === [] ){
        
        storedTasks = []
    } else {
        storedTasks = JSON.parse(localStorage.getItem('storedTasks'))
    }

    let text = item.textContent.trim(' ');

    storedTasks.forEach((item, index) => {

        if (text == item) {
            storedTasks.splice(index,1)
        }
    })

    localStorage.setItem('storedTasks', JSON.stringify(storedTasks))
}

const deleteItem = (e) => {
    
    if (e.target.parentElement.classList.contains('delete-item')){
        //remove li
        e.target.parentElement.parentElement.remove()
        
        //remove from ls
        removeTaskFromLS(e.target.parentElement.parentElement)

    }


}


//Delete button
const clearLS = () => {
    localStorage.clear();
}

const clearBtnHandler = () => {
    if(confirm('Are you sure?')){
    // taskList.innerHTML= ''

        while(taskList.firstChild){
            taskList.firstChild.remove()
        }

    }

    clearLS()

}


//filter tasks
const filterTasks = (e) => {
    //whatever is typed in
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach( (task) => {
        const taskText = task.firstChild.textContent
        
        if (taskText.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }

    })


}




//Load js
loadEventListeners()