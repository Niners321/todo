import dom from "./dom";

const projects = (() => {
    let projectsList = [];

    // Local storage
    if (localStorage.getItem('projects') === null) {
        projectsList = [
        {
            title: 'Demo Project',
            icon: 'fa-home',
            color: 'project-grey',
            tasks: [],
        },
        ];
    } else {
        const projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
        projectsList = projectsFromStorage;
    }

    class Project {
        constuctor(title, icon, color) {
            this.title = title;
            this.icon = icon;
            this.color = color;
            this.tasks = [];
        }
    }

    function createProject(title, icon, color) {
        const newProject = new Project(title, icon, color);
        projectsList.push(newProject);
    }
})