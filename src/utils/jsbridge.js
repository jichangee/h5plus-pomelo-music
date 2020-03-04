import { isApp, checkEnv } from './check';

const { devices } = checkEnv();
function postMessage(type, json = {}) {
  const message = {
    type,
    data: json,
  };
  const str = JSON.stringify(message);
  try {
    if (devices === 'ios') {
      window.webkit.messageHandlers.Jike.postMessage(str);
    } else if (devices === 'android') {
      window.Jike.app(type, str);
    }
  } catch (error) {
    console.log(error);
  }
}
const jikejs = {
  inApp: isApp,
  checkEnv: checkEnv,
  devices: () => devices,
  /**
   * 分享
   * @param {string} type 分享类型 text | img
   */
  share(option) {
    const { type, title, description, imgBase64, url } = option;
    const json = {
      type,
      title,
      imgBase64,
      url,
      description,
    };
    postMessage('share', json);
  },
  // 跳转Webview
  goWebPage(option) {
    const type = 'goWebPage';
    const { url } = option;
    const json = { url };
    postMessage(type, json);
  },
  // 跳转原生界面
  goNativePage(option) {
    const type = 'goNativePage';
    const { pageName, data } = option;
    const json = { pageName, data };
    return new Promise((_, reject) => {
      postMessage(type, json);
      setTimeout(() => {
        reject();
      }, 700);
    });
  },
  // 拨打电话
  call(option) {
    const type = 'call';
    const { mobile } = option;
    const json = { mobile };
    postMessage(type, json);
  },
  login(option) {
    const type = 'login';
    const { status, message } = option;
    const json = { status, message };
    postMessage(type, json);
  },
};
export default jikejs;
