const buttons = [
  { title: "我的好友", extra: { scene: "WXSceneSession" } },
  { title: "朋友圈", extra: { scene: "WXSceneTimeline" } },
  { title: "我的收藏", extra: { scene: "WXSceneFavorite" } }
];

export const getShareService = appName => {
  return new Promise((resolve, reject) => {
    plus.share.getServices(
      function(s) {
        let shares = {};
        for (var i in s) {
          var t = s[i];
          shares[t.id] = t;
        }
        resolve(shares[appName]);
      },
      function(e) {
        reject(e);
      }
    );
  });
};

export const shareWeb = params => {
  const msg = { type: "web", thumbs: ["_www/logo.png"] };
  msg.href = params.url;
  msg.title = params.title;
  msg.content = params.desc;
  params.shareParams
    ? plus.nativeUI.actionSheet(
        { title: "分享网页到微信", cancel: "取消", buttons: buttons },
        function(e) {
          e.index > 0 && share(params.shareParams, msg, buttons[e.index - 1]);
        }
      )
    : plus.nativeUI.alert("当前环境不支持微信分享操作!");
};

function share(srv, msg, button) {
  if (!srv) {
    return;
  }
  button && (msg.extra = button.extra);
  // 发送分享
  if (srv.authenticated) {
    doShare(srv, msg);
  } else {
    srv.authorize(
      function() {
        doShare(srv, msg);
      },
      function(e) {
        plus.nativeUI.alert("认证授权失败：" + JSON.stringify(e));
      }
    );
  }
}

function doShare(srv, msg) {
  srv.send(
    msg,
    function() {
      plus.nativeUI.toast("分享成功");
    },
    function(e) {
      plus.nativeUI.toast(
        '分享到"' + srv.description + '"失败: ' + JSON.stringify(e)
      );
    }
  );
}
