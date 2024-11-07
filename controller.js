
import { TaskOperations } from "./service.js";

function init(){
  loadData();
  bindEvents();
  TaskOperations.getLastId();
}
function bindEvents(){
  document.querySelector('#add').addEventListener('click',addTask);
  document.querySelector('#delete').disabled=true;
  document.querySelector('#delete').addEventListener('click',deleteForever);
  document.querySelector('#save').disabled=true;
  document.querySelector('#save').addEventListener('click',saveTask);
  document.querySelector('#update').disabled=true;
  document.querySelector('#update').addEventListener('click',updateTask);
}

window.addEventListener('load',init);

function saveTask(){
  if(localStorage){
    TaskOperations.save();
    alert('Save Successfully');
    document.querySelector('#save').disabled=true;
  }else{
    alert('Browser not support local Storage');
  }
}

function loadData(){
  if(localStorage.task){
    const tasks=TaskOperations.load();
    printAllTask(tasks);
  }else{
    alert('Nothing to print');
  }
}

function enableDelete(){
  document.querySelector('#delete').disabled=TaskOperations.enableDeleteButton()==0;
}

function deleteForever(){
  const tasks=TaskOperations.delete();
  printAllTask(tasks);
  enableDelete();
  saveTask();
}

function addTask(){
  const taskObj={};
  taskObj.id=TaskOperations.getLastId();
  taskObj.task=document.querySelector('#inputBox').value;
  const task=TaskOperations.add(taskObj);
  document.querySelector('#save').disabled=false;
  printTask(task);
  clearFields();
}

function printAllTask(tasks){
  document.querySelector('#tbody').innerHTML='';
  // console.log(tasks);
  tasks.forEach(task=>printTask(task));
}

function printTask(task){
  const tbody=document.querySelector('#tbody');
  const tr=tbody.insertRow();
  for(let key in task){
    if(key=='ismarkedDeleted'){
      continue;
    }
    const td=tr.insertCell();
    if(key=='operation'){
      td.appendChild(createIcon('fa-solid fa-trash me-4 hover',toggleMarkDeleted,task.id));
      td.appendChild(createIcon('fa-solid fa-pen-to-square me-4 hover',edit,task.id));
      td.appendChild(createIcon('fa-regular fa-circle-check me-4 hover',completed,task.id));
    }else if(key=='completed'){
      if(task[key]==true){
        // markcomp.classList.add('green');
        // console.log(markcomp);
        // completed(task.id);
        let id=task.id-1;
        let check=document.querySelectorAll('.fa-regular');
        check[id].classList.toggle('green');
      }
    }else{
      td.innerText=task[key];
    }
  }
}

let markcomp;
function completed(events){
  TaskOperations.markComplete(this.getAttribute('task-id'));
  markcomp=events.target;
  markcomp.classList.toggle('green');
  document.querySelector('#save').disabled=false;
}

function clearFields(){
  document.querySelector('#inputBox').value='';
}

function toggleMarkDeleted(events){
  const id=this.getAttribute('task-id');
  const tr=events.target.parentNode.parentNode;
  tr.classList.toggle('table-danger');
  TaskOperations.markDelete(id);
  enableDelete();
}

let editObject;
function edit(){
  let id=this.getAttribute('task-id');
  editObject=TaskOperations.edit(id);
  document.querySelector('#inputBox').value=editObject.task;
  document.querySelector('#update').disabled=false;
  document.querySelector('#add').disabled=true;

}

function updateTask(){
  document.querySelector('#tbody').innerHTML='';
  editObject.task=document.querySelector('#inputBox').value;
  printAllTask(TaskOperations.tasks);
  document.querySelector('#update').disabled=true;
  document.querySelector('#add').disabled=false;
  saveTask();
  clearFields();
}

function createIcon(className,fn,id){
  const icon=document.createElement('i');
  icon.className=className;
  icon.addEventListener('click',fn);
  icon.setAttribute('task-id',id);
  return icon;
}
