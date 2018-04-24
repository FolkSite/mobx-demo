import mobx, {
  autorun,
  computed,
  observable
} from 'mobx'

class tasksStore {
  constructor() {
    this.tasks = observable([]);
    // this.pendingRequests = observable(0);
    autorun(() => {
      this.render();
    });
  }

  @computed get completedTodosCount() {
    return this.tasks.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed get report() {
    if (this.tasks.length === 0)
      return '<none>';
    return `Next task: "${this.tasks[0].text}".` +
      `Progress: ${this.completedTodosCount}/${this.tasks.length}`;
  }

  addTodo(text) {
    this.tasks.push({
      text,
      completed: false,
    });
  }

  render() {
    const list = document.getElementById('list');
    list.innerHTML = '';
    this.tasks.forEach((task) => {
      list.innerHTML += `<li>${task.text}</li>`;
    });
    console.log(this.report);
  }
}


const observableTodoStore = new tasksStore();
observableTodoStore.addTodo('install mobx');
observableTodoStore.addTodo('try mobx');
observableTodoStore.addTodo('learn mobx');
observableTodoStore.tasks[0].completed = true;
observableTodoStore.tasks[1].text = 'try mobx in own project';
