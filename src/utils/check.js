const { userAgent } = navigator;
const appUserAgent = userAgent.match(/#(.*?)#/g);

export const isIOS = () => /(iPhone|iPad|iPod|iOS)/i.test(userAgent);

export const isAndroid = () => /(Android)/i.test(userAgent);

export function isIpx() {
  const isIPhoneX = /iphone/gi.test(userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
  const isIPhoneXSMax = /iphone/gi.test(userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
  const isIPhoneXR = /iphone/gi.test(userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
  return isIPhoneX || isIPhoneXSMax || isIPhoneXR;
}

export const checkEnv = () => {
  const info = appUserAgent;
  const isWeChat = /MicroMessenger/gi.test(userAgent);
  let env;
  let devices;
  if (isIOS()) {
    devices = 'ios';
  } else if (isAndroid()) {
    devices = 'android';
  } else {
    devices = 'browser';
  }
  if (isWeChat) {
    env = 'wechat';
  } else if (Array.isArray(info) && info[0].includes('jikelife')) {
    env = 'app';
  } else if (Array.isArray(info) && info[0].includes('webview')) {
    env = 'webview';
  } else {
    env = '';
  }
  return {
    env,
    devices,
  };
};
