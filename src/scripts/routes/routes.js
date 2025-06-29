import StoryListPage     from '../pages/story-list-page.js';
import StoryDetailPage   from '../pages/story-detail-page.js';
import AddStoryPage      from '../pages/add-story-page.js';
import LoginPage         from '../pages/login-page.js';
import RegisterPage      from '../pages/register-page.js';
import NotFoundPage      from '../pages/not-found-page.js';

const routes = {
  '/':             StoryListPage,
  '/login':        LoginPage,
  '/register':     RegisterPage,
  '/stories':      StoryListPage,
  '/stories/:id':  StoryDetailPage,
  '/add-story':    AddStoryPage,
  '/404':          NotFoundPage,
};
export default routes;
