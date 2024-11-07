class TaskModel{
  constructor(id=0,task='',operation=''){
    this.id=id;
    this.task=task;
    this.operation=operation;
    this.ismarkedDeleted=false;
    this.completed=false;
  }
}
export default TaskModel;