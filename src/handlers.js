import validation from './validation';
import dom from './dom';
import projects from './projects';
import tasks from './tasks';

const handlers = (() => {
    function clickHandler() {
        let projectIndex = 0;
        let taskIndex = 0;
        let link = 'all';
        dom.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('allBtn')) {
                link = 'all';
                dom.changeLink('all');
            } else if (e.target.classList.contains('todayBtn')) {
                link = 'today';
                dom.changeLink('today');
            } else if (e.target.classList.contains('weekBtn')) {
                link = 'week';
                dom.changeLink('week');
            } else if (e.target.classList.contains('importBtn')) {
                link = 'important';
                dom.changeLink('important');
            } else if (e.target.classList.contains('compBtn')) {
                link = 'complete';
                dom.changeLink('complete');
                //project links
            } else if (e.target.classList.contains('sidebar-project')) {
                projectIndex = parseInt(
                    e.target.getAttribute('data-index') 
                    ? e.target.getAttribute('data-index') 
                    : e.target.parentElement.getAttribute('data-index'), 10
                );
                link = undefined;
                dom.changeLink(projectIndex);
                // add project modal open
            } else if (e.target.classList.contains('add-project-modal')) {
                link = undefined;
                dom.showProjectModal('addProject');
                //edit project modal open
            } else if (e.target.classList.contains('edit-project-modal')) {
                projectIndex = parseInt(
                    e.target.parentElement.getAttribute('data-index'), 10

                );
                dom.projectModal('editProject', projectIndex);
                //remove project modal open
            } else if (e.target.classList.contains('remove-project-modal')) {
                projectIndex = parseInt(
                    e.target.parentElement.getAttribute('data-index'),
                    10
                );
                dom.showConfirmModal('removeProject', projectIndex);
                //add task modal open
            } else if (e.target.classList.contains('add-task-modal')) {
                projectIndex = parseInt(
                    e.target.parentElement.getAttribute('data-project-index')
                    ? e.target.parentElement.getAttribute('get-project-index') 
                    : e.target.getAttribute('data-project-index'),
                    10
                );
                dom.showTaskModal('addTask', projectIndex);
                // edit task modal open
            } else if (e.target.classList.contains('edit-task-modal')) {
                projectIndex = parseInt(
                  e.target.parentElement.getAttribute('data-project-index'),
                  10
                );
                taskIndex = parseInt(
                  e.target.parentElement.getAttribute('data-task-index'),
                  10
                );
                dom.showTaskModal('editTask', projectIndex, taskIndex);
                // Remove task modal open
            } else if (e.target.classList.contains('remove-task-modal')) {
                projectIndex = parseInt(
                  e.target.parentElement.getAttribute('data-project-index'),
                  10
                );
                taskIndex = parseInt(
                  e.target.parentElement.getAttribute('data-task-index'),
                  10
                );
                dom.showConfirmModal('removeTask', projectIndex, taskIndex);
                // Close all modals
                } else if (
                    e.target.classList.contains('close') || 
                    e.target.classList.contains('modal')
                ) {
                    dom.hideElement(dom.modals);
                    //add project
                } else if (e.target.classList.contains('add-project')) {
                    validation.addProject(e);
                    //edit project
                } else if (e.target.classList.contains('edit-project')) {
                    validation.editProject(e, projectIndex, link);
                    //remove project
                } else if (e.target.classList.contains('remove-project')) {
                    projects.removeProject(projectIndex);
                    //add task
                } else if (e.target.classList.contains('add-task')) {
                    validation.addTask(e, projectIndex);
                    //edit task
                } else if (e.target.classList.contains('edit-task')) {
                    validation.editTask(e, projectIndex, taskIndex, link);
                    //remove task
                } else if (e.target.classList.contains('remove-task')) {
                    tasks.removeTask(projectIndex, taskIndex, link);
                    //toggle task
                } else if (e.target.classList.contains('toggle-task')) {
                    projectIndex = parseInt(
                        e.target.getAttribute('data-project-index')
                          ? e.target.getAttribute('data-project-index')
                          : e.target.parentElement.getAttribute('data-project-index'),
                        10
                    );
                    taskIndex = parseInt(
                        e.target.getAttribute('data-task-index')
                          ? e.target.getAttribute('data-task-index')
                          : e.target.parentElement.getAttribute('data-task-index'),
                        10
                    );
                    tasks.toggleTask(projectIndex, taskIndex, link);
                }
        });
    }

    function keyboardHandler() {
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                dom.hideElement(dom.modals);
            }
        });
    }

    function resizeHandler() {
        window.addEventListener('resize', dom.responsiveSidebar);
      }

   return {
    clickHandler,
    keyboardHandler,
    resizeHandler,
   };
})();

export default handlers