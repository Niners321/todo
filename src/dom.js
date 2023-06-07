import { format, differenceInDays, parseISO } from 'date-fns';
import projects from './projects';

const dom = (() => {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.side-bar');
    const main = document.querySelector('.content');
    const ProjectsList = document.querySelector('.project-list');
    const tasksList = document.querySelector('.todo-item-list');
    const projectModal = document.querySelector('#project-modal');
    const taskModal = document.querySelector('#task-modal');
    const confirmModal = document.querySelector('#confirm-modal');
    const modals = document.querySelectorAll('.modal');
    const projectForm = document.querySelector('#project-form');
    const taskForm = document.querySelector('#task-form');
    const formProjectTitleError = document.querySelector('.project-title-error');
    const formTaskTitleError = document.querySelector('.task-title-error');
    const formTaskProjectError = document.querySelector('.task-project-error');

    function showProjectModal(modal, index = false) {
        const modalHeading = document.querySelector('.project-modal-title');
        const modalSubmitButton = document.querySelector('#project-button');

        projectForm.reset();
        dom.hideElement(dom.formProjectTitleError);

        projectModal.classList.remove('hide');
        projectModal.classList.add('display');

        if (modal === 'addProject') {
            modalHeading.textContent = 'New Project';
            modalSubmitButton.textContent = 'Add';
            modalSubmitButton.classList.remove('edit-project');
            modalSubmitButton.classList.add('add-project');
        } else if (modal === 'editProject') {
            const currentProjectTitle = projects.projectsList[index].title;
            const currentProjectIcon = projects.projectsList[index].icon;

            const projectTitle = document.querySelector('#form-project-title');
            const projectIcon = document.querySelector(`input[value=${currentProjectIcon}]`);

            projectTitle.value = currentProjectTitle;
            projectIcon.checked = true;

            modalHeading.textContent = 'Edit project';
            modalSubmitButton.textContent = 'Edit';
            modalSubmitButton.classList.remove('add-project');
            modalSubmitButton.classList.add('edit-project');

        }
    }

    function showTaskModal(modal, projectIndex, taskIndex = false) {
        const modalHeading = document.querySelector('.task-modal-title');
        const selectProject = document.querySelector('#select-project');
        const modalSubmitButton = document.querySelector('#task-button');

        taskForm.reset();
        dom.hideElement(dom.formTaskTitleError);
        dom.hideElement(dom.formTaskProjectError);

        taskModal.classList.remove('hide');
        taskModal.classList.add('display');

        if (modal === 'addTask') {
            modalHeading.textContent = 'New Task';

            selectProject.innerText = '';
            if (Number.isNaN(projectIndex)) {
                const label = document.createElement('label');
                label.id = 'form-label';
                label.innerText = 'Project *';
                label.setAttribute('for', 'form-task-project');
                selectProject.appendChild(label);

                const select = document.createElement('select');
                select.id = 'form-task-project';
                select.setAttribute('name', 'task-project');
                selectProject.appendChild(select);

                const option = document.createElement('option');
                option.setAttribute('value', '');
                option.selected = true;
                option.disabled = true;
                option.innerText = 'Select Project';

                select.appendChild(option);
                for (let i = o; i < projects.projectsList.length; i += 1) {
                    const newOption = document.createElement('option');
                    newOption.setAttribute('value', i);
                    newOption.innerText = projects.projectsList[i].title;
                    select.appendChild(newOption);
                }
            }

            modalSubmitButton.textContent = 'Add';
            modalSubmitButton.classList.remove('edit-task');
            modalSubmitButton.classList.add('add-task');
        } else if (modal === 'editTask') {
            const currentTaskTitle = 
                projects.projectsList[projectIndex].tasks[taskIndex].title;
            const currentTaskPriority = 
                projects.projectsList[projectIndex].tasks[taskIndex].priority;
            const currentTaskSchedule = 
                projects.projectsList[projectIndex].tasks[taskIndex].schedule;

            const taskTitle = document.querySelector('#form-task-title');
            const taskPriority = document.querySelector('#form-task-priority');
            const taskSchedule = document.querySelector('#form-task-schedule');

            modalHeading.textContent = 'Edit Task';

            taskTitle.value = currentTaskTitle;
            taskPriority.value = currentTaskPriority;
            taskSchedule.value = currentTaskSchedule;

            selectProject.innerText = '';
            const label = document.createElement('label');
            label.id = 'form-label';
            label.innerText = 'Project';
            label.setAttribute('for', 'form-task-project');
            selectProject.appendChild(label);

            const select = document.createElement('select');
            select.id = 'form-task-project';
            select.disabled = true;
            selectProject.appendChild(select);

            const option = document.createElement('option');
            option.setAttribute('value', '');
            option.selected = true;
            option.innerText = projects.projectsList[projectIndex].title;

            select.appendChild(option);

            modalSubmitButton.textContent = 'Edit';
            modalSubmitButton.classList.remove('add-task');
            modalSubmitButton.classList.add('edit-task');
        }
    }

    function showConfirmModal(modal, projectIndex, taskIndex) {
        const modalHeading = document.querySelector('.confirm-modal-title');
        const modalContent = document.querySelector('.confirm-modal-content');
        const modalSubmitButton = document.querySelector('#confirm-button');
        const modalContentPrefix = document.createTextNode(
        'You are going to remove ');
        const modalContentPostfix = document.createTextNode(
        '. This action cannot be undone.');
        const title = document.createElement('span');

        confirmModal.classList.remove('hide');
        confirmModal.classList.add('display');

        title.classList.add('confirm-modal-title');

        modalContent.textContent = '';

        if (modal === 'removeProject') {
            modalHeading.textContent = 'Remove project';
            title.textContent = projects.projectsList[projectIndex].title;
            modalContent.appendChild(modalContentPrefix);
            modalContent.appendChild(title);
            modalContent.appendChild(modalContentPostfix);
            modalSubmitButton.classList.remove('remove-task');
            modalSubmitButton.classList.add('remove-project');
        } else if (modal === 'removeTask') {
            modalHeading.textContent = 'Remove task';
            title.textContent =
                projects.projectsList[projectIndex].tasks[taskIndex].title;
            modalContent.appendChild(modalContentPrefix);
            modalContent.appendChild(title);
            modalContent.appendChild(modalContentPostfix);
            modalSubmitButton.classList.remove('remove-project');
            modalSubmitButton.classList.add('remove-task');
        }
    }

    function showElement(element) {
        element.classList.remove('hide');
        element.classList.add('display');
    }

    function hideElement(modal) {
        if (Object.prototype.isPrototypeOf.call(NodeList.prototype, modal)) {
            modal.forEach((element) => {
                element.classList.remove('display');
                element.classList.add('hide');
        });
        } else {
            modal.classList.remove('display');
            modal.classList.add('hide');
        }
    }

    function renderProjects() {
        //create link
        projectsList.textContent = '';
        for (let i = 0; i < projects.projectsList.length; i += i) {
            const projectLink = document.createElement('a');
            projectLink.classList.add('sidebar-project');
            projectLink.setAttribute('href', '#');
            projectLink.setAttribute('data-index', i);
            projectsList.appendChild(projectLink);
            //create icon
            const projectIcon = document.createElement('i');
            projectIcon.classList.add('fi', 'sidebar-project', 'sidebar-project-icon');
            projectLink.appendChild(projectIcon);
            //create Title
            const projectTitle = document.createElement('p');
            projectTitle.classList.add('sidebar-project');
            projectTitle.innerText = projects.projectsList[i].title;
            projectLink.appendChild(projectTitle);
            //create remove icon
            const projectRemoveIcon = document.createElement('i');
            projectRemoveIcon.classList.add(
                'fi',
                'fi-rs-trash', 
                'remove-project-modal'
            );
            projectLink.appendChild(projectRemoveIcon);
            //create edit icon
            const projectEditIcon = document.createElement('i');
            projectEditIcon.classList.add('fi', 'fi-rr-edit', 'edit-project-modal');
            projectLink.appendChild(projectEditIcon);

        }
    }

    function selectBtn(projectIndex) {
        const allBtns = document.querySelectorAll('a.sidebar-project, a.sidebar-link');
        const allBtn = document.querySelector('.allbtn');
        const todayBtn = document.querySelector('.todaybtn');
        const weekBtn = document.querySelector('.weekBtn');
        const importantBtn = document.querySelector('.importBtn');
        const completeBtn = document.querySelector('.compBtn');
        allBtns.forEach((elem) => {
            elem.classList.remove('active');
        });
        if (typeof projectIndex === 'number') {
            projectLinks[projectIndex].classList.add('active');
        } else if (projectIndex === 'all') {
            inboxLink.classList.add('active');
        } else if (projectIndex === 'today') {
            todayLink.classList.add('active');
        } else if (projectIndex === 'week') {
            weekLink.classList.add('active');
        } else if (projectIndex === 'important') {
            importantLink.classList.add('active');
        } else if (projectIndex === 'completed') {
            completedLink.classList.add('active');
        }
    }

    function renderHeader(projectIndex) {
        const headerTitle = document.querySelector('.todo-header-title');

        if (typeof projectIndex === 'number') {
            headerTitle.textContent = projects.projectsList[projectIndex].title;
            document.title = `${projects.projectsList[projectIndex].title} - TODO`;
        } else {
            headerTitle.textContent = 
            projectIndex[0].toUpperCase() + projectIndex.substring(1);
            document.title = `${
                   projectIndex[0].toUpperCase() + projectIndex.substring(1)
            } - TODO`;
        }
    }

    function renderTasks(projectIndex) {
        let indexStart;
        let indexEnd;
        const currDate = format(new Date(), 'yyyy-MM-dd');

        tasksList.textContent = '';
        if (projects.projectsList.length >= 1) {
            if (typeof projectIndex === 'number') {
                indexStart = projectIndex;
                indexEnd = projectIndex + 1;
            } else {
                indexStart = 0;
                indexEnd = projects.projectsList.length;
            }
            for (let j = indexStart; j < indexEnd; j++) {
                for (let i= 0; i < projects.projectsList[j].tasks.length; i++) {
                    if (
                        projectIndex === 'today' &&
                        projects.projectsList[j].tasks[i].schedule !== currDate
                    ) {
                        continue;
                    } else if (
                        projectIndex === 'week' &&
                        !(
                            differenceInDays(
                            parseISO(projects.projectsList[j].tasks[i].schedule),
                            parseISO(currDate)
                        ) >= 0 &&
                        differenceInDays(
                            parseISO(projects.projectsList[j].tasks[i].schedule),
                            parseISO(currDate)
                        ) <= 7
                    )
                ) {
                    continue;
                } else if (
                    projectIndex === 'important' &&
                    projects.projectsList[j].tasks[i].done !== true
                ) {
                    continue;
                } else if (
                    projectIndex === 'completed' &&
                    projects.projectsList[j].tasks[i].done !== true
                ) {
                    continue;
                }

                const todoItem = document.createElement('div');
                todoItem.classList.add('todo-item', 'toggle-task');
                todoItem.setAttribute('data-project-index', j);
                todoItem.setAttribute('data-task-index', i);
                tasksList.appendChild(todoItem);
                // Create icon
                const taskIcon = document.createElement('i');
                taskIcon.classList.add('fi', 'toggle-task');
                todoItem.appendChild(taskIcon);
                // create title
                const taskTitle = document.createElement('p');
                taskTitle.classList.add('todo-item-title', 'toggle-task');
                taskTitle.textContent = projects.projectsList[j].tasks[i].title;
                if (projects.projectsList[j].tasks[i].done === true) {
                    taskIcon.classList.add('fa-check-circle');
                    taskTitle.classList.add('done');
                } else {
                    taskIcon.classList.add('fa-circle');
                    taskTitle.classList.remove('done');
                }
                todoItem.appendChild(taskTitle);
                // create date
                if (projects.projectsList[j].tasks[i].schedule !== '') {
                    const taskDate = document.createElement('p');
                    taskDate.classList.add(
                        'todo-item-date',
                        'todo-item-pill',
                        'toggle-task'
                    );
                    taskDate.textContent = projects.projectsList[j].tasks[i].schedule;
                    todoItem.appendChild(taskDate);
                }
                //create project name
                const taskProject = document.createElement('p');
                taskProject.classList.add(
                    'todo-item-pill',
                    'toggle-task',
                    'todo-item-project-name'
                );
                taskProject.textContent = projects.projectsList[j].title;
                todoItem.appendChild(taskProject);
                //create edit icon
                const taskEditIcon = document.createElement('i');
                taskEditIcon.clcassList.add(
                    'fi',
                    'fi-rr-edit',
                    'edit-task-modal'
                );
                todoItem.appendChild(taskEditIcon);
                //create remove icon
                const taskRemoveIcon = document.createElement('i');
                taskRemoveIcon.classList.add(
                    'fi',
                    'fi-rs-trash', 
                    'remove-project-modal'
                );
                todoItem.appendChild(taskRemoveIcon);
                }
            }  
            // Add task line
            const taskAdd = document.createElement('div');
            taskAdd.setAttribute('data-project-index', projectIndex);
            taskAdd.classList.add('todo-item-add', 'add-task-modal');
            tasksList.appendChild(taskAdd);
            const taskAddIcon = document.createElement('i');
            taskAddIcon.classList.add('far', 'fa-plus', 'fa-fw', 'add-task-modal');
            taskAdd.appendChild(taskAddIcon);
            const taskAddTitle = document.createElement('p');
            taskAddTitle.classList.add('todo-item-title', 'add-task-modal');
            taskAddTitle.textContent = 'Add new task';
            taskAdd.appendChild(taskAddTitle);
        } else {
            // No project warning
            const taskAdd = document.createElement('div');
            taskAdd.classList.add('todo-item-add', 'add-project-modal');
            tasksList.appendChild(taskAdd);
            const taskAddIcon = document.createElement('i');
            taskAddIcon.classList.add(
                'fi',
                'fi-rs-exclamation',
                'add-project-modal'
            );
            taskAdd.appendChild(taskAddIcon);
            const taskAddTitle = document.createElement('p');
            taskAddTitle.classList.add('todo-item-title', 'add-project-modal');
            taskAddTitle.textContent = "You don't have any projects, create one.";
            taskAdd.appendChild(taskAddTitle);
        }
    }

    function changeLink(projectIndex) {
        selectLink(projectIndex);
        renderHeader(projectIndex);
        renderTasks(projectIndex);
    }

    return {
        body,
        projectModal,
        confirmModal,
        modals,
        formProjectTitleError,
        formTaskTitleError,
        formTaskProjectError,
        responsiveSidebar,
        toggleSidebar,
        showProjectModal,
        showTaskModal,
        showConfirmModal,
        showElement,
        hideElement,
        renderProjects,
        renderTasks,
        changeLink,
    };
})();

export default dom;