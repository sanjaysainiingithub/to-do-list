import TaskModel from "./task-model.js";


export const TaskOperations={
  tasks:[],
  add(obj){
    const task=new TaskModel();
    task.id=obj.id;
    task.task=obj.task;
    this.tasks.push(task);
    return task;
  },

  load(){
    // this.tasks.remove();
    const obj=JSON.parse(localStorage.task);
    const data=obj.data;
    data.forEach(t=>{
      const task=new TaskModel();
      task.id=t.id;
      task.task=t.task;
      task.operation=t.operation;
      task.ismarkedDeleted=t.ismarkedDeleted;
      task.completed=t.completed;
      this.tasks.push(task);
    })
    return this.tasks;
  },

  save(){
    const obj={data:this.tasks};
    const json=JSON.stringify(obj);
    localStorage.task=json;
  },

  enableDeleteButton(){
    return this.tasks.filter(task=>task.ismarkedDeleted==true).length;
  },

  delete(){
    return this.tasks=this.tasks.filter(task=>task.ismarkedDeleted==false);
  },

  edit(id){
    return this.search(id);
  },

  search(id){
    return this.tasks.find(obj=>obj.id==id);
  },

  markDelete(id){
    const taskObj=this.search(id);
    taskObj.ismarkedDeleted=!taskObj.ismarkedDeleted;
  },
  getLastId(){
    if(this.tasks.length==0){
      return 1;
    }else{
      return(this.tasks[this.tasks.length-1].id)+1;
    }  
  },

  markComplete(id){
    const obj=this.search(id);
    obj.completed=!obj.completed;
  }
}