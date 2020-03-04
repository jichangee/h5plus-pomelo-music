import router from './router';
import { isLogin } from './utils/auth';

const whiteList = [
  '/passport',
  '/evaluation/share/article/'
];
router.beforeEach((to, from, next) => {
  if (to.path.split('/').length > from.path.split('/').length) {
    to.meta.notKeepAlive = true;
    setTimeout(() => {
      to.meta.notKeepAlive = false;
    }, 10);
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (isLogin()) {
    if (to.path.includes('passport')) {
      next({ path: '/' });
      return;
    }
    next();
  } else if (whiteList.filter(url => to.path.includes(url)).length === 0) {
    from.meta.notKeepAlive = true;
    setTimeout(() => {
      from.meta.notKeepAlive = false;
    }, 10);
    next({
      path: '/passport/index',
      query: {
        directUrl: to.path,
      },
    });
  } else {
    next();
  }
});
