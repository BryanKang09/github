let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList =[]
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all"
let ongoingList = []
let doneList = []

addButton.addEventListener("click",addTask);

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event) // to give param.
    })
}

function addTask(){
    let task = {
        id: randomNoGen(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    render();
    console.log(task)
}

function render(){
    let list = [];
    if (mode == "all"){
        list = taskList;
    }else if(mode == "ongoing"){
        list = ongoingList;
    }else if(mode == "done"){
        list = doneList;
    }

    let resultHTML = '';
    for (let i = 0; i < list.length; i++){
        if (list[i].isComplete==true){
            resultHTML =`<div class="task">
                    <div class="task-done">
                        ${list[i].taskContent}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`
        }else{
            resultHTML +=
                `<div class="task">
                            <div>
                                ${list[i].taskContent}
                            </div>
                            <div>
                                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                                <button onclick="deleteTask('${list[i].id}')">Delete</button>
                            </div>
                        </div>        `
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
    
}

function toggleComplete(id){
    for (let i=0; i<taskList.length; i++){
        if (taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
        
    }
    filter({ target: { id: mode } });
    console.log(taskList);
}



function deleteTask(id){
    for (let i=0; i<taskList.length; i++){
        if (taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
      
    }
    filter({ target: { id: mode } });
    console.log(taskList);  
}

function filter(event){
    mode = event.target.id;
    ongoingList = [];
    doneList = [];

    if (mode == "all"){
        render();
    }else if(mode == "ongoing"){
        for (let i=0;i<taskList.length;i++){
            if (taskList[i].isComplete == false){
                ongoingList.push(taskList[i]);
            }
        }
        render();
    }else if(mode == "done"){
        for (let i=0;i<taskList.length;i++){
            if (taskList[i].isComplete == true){
                doneList.push(taskList[i])
            }
        }
        render();
    }
    // render();
    // console.log(ongoingList)
}

function randomNoGen(){
    number = Math.random()*2.7
    return number
}