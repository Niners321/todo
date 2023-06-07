import dom from './dom';
import handlers from './handlers';
import './style.css';


dom.responsiveSidebar();
dom.renderProjects();
dom.changeLink('all');

handlers.resizeHandler();
handlers.clickHandler();
handlers.keyboardHandler();