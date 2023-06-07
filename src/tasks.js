import projects from "./projects"
import dom from "./dom"
import handlers from "./handlers"

const tasks = (() => {

    class Task {
        constructor(title, priority, schedule) {
            this.title = title;
            this.priority = priority;
            this.schedule = schedule;
            this.done = false;
        }
    }


    function createTask(
        projectIndex,
        title,
        priority = '',
        schedule = '',
        link = projectIndex
    ) {
        const newTask = new Task(title, priority, schedule);

    }
})


export default tasks;