const { userAgent } = window.navigator;

export function isAndroid() {
  return userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
}

export function isIos() {
  return userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
}



export function isWechat() {
  return /MicroMessenger/gi.test(userAgent);
}
