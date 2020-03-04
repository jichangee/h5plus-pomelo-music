/**
 * 在body中引入外部script
 * @param {string} url script链接
 * @param {string} id script标签id
 * @param {function} cb 回调函数
 */
export function appendScript(url, id) {
  if (document.querySelector(`#${id}`)) return;
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.id = id || `js-${new Date().getTime()}`;
    script.onload = () => {
      resolve();
    };
    document.querySelector('body').appendChild(script);
  });
}
export const object2formData = (obj) => {
  const params = new FormData();
  Object.keys(obj).map((key) => {
    const element = obj[key];
    if (Array.isArray(element)) {
      element.map(item => params.append(key, item));
    } else {
      params.append(key, element);
    }
    return null;
  });
  return params;
};

export function getVideoBase64(url) {
  return new Promise(function (resolve, reject) {
      let dataURL = '';
      let video = document.createElement("video");
      video.setAttribute('crossOrigin', 'anonymous');//处理跨域
      video.setAttribute('src', url);
      video.setAttribute('width', 400);
      video.setAttribute('height', 240);
      video.addEventListener('loadeddata', function () {
          let canvas = document.createElement("canvas"),
              width = video.width, //canvas的尺寸和图片一样
              height = video.height;
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
          dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
          resolve(dataURL);
      });
  })
}

export const createRandomFileName = (file) => {
  let ext;
  const name = file.name || file.type;
  if (name.indexOf('.') > -1) {
    ext = name.substring(name.lastIndexOf('.'));
  } else {
    ext = '.' + name.substring(name.lastIndexOf('/') + 1);
  }
  console.log(ext);
  
  const fileName = `${new Date().getTime()}${ext}`;
  const formData = new FormData();
  formData.append('file', file, fileName)
  return formData;
}