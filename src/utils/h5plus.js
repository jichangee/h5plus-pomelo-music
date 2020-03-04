/**
 * 获取手机状态栏高度
 */
export const getStatusbarHeight = () => {
  let statusbarHeight = window.localStorage.getItem("statusbar-height");
  if (!statusbarHeight) {
    try {
      statusbarHeight = window.plus.navigator.getStatusbarHeight();
      window.localStorage.setItem("statusbar-height", statusbarHeight);
    } catch (error) {
      statusbarHeight = 20;
    }
  }
  return statusbarHeight;
};

export const pullToRefresh = cb => {
  const ws = plus.webview.currentWebview();
  ws.setStyle({
    pullToRefresh: {
      support: true,
      style: plus.os.name == "iOS" ? "default" : "circle"
    }
  });
  ws.addEventListener("pullToRefresh", () => {
    cb && cb(ws)
  }, false);
  //ws.setPullToRefresh({support:true,style:'circle'}, onRefresh);	// 通过方法设置下拉刷新
};

export const initPullToRefresh = (cb) => {
  if(window.plus){
    pullToRefresh(cb);
  }else{
    document.addEventListener('plusready', () => {
      pullToRefresh(cb)
    }, false);
  }
}
