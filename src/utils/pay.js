import { Dialog } from "vant";
/**
 * 获取支付通道
 * return pays
 */
export const getPayChannel = () => {
  const pays = {};
  return new Promise((resolve, reject) => {
    plus.payment.getChannels((channels) => {
      for (var i in channels) {
        let channel = channels[i];
        if (channel.id == 'qhpay' || channel.id == 'qihoo') { // 过滤掉不支持的支付通道：暂不支持360相关支付
          continue;
        }
        pays[channel.id] = channel;
      }
      resolve(pays);
    }, function(e) {
      reject(e);
      throw new Error('获取支付通道失败：' + e.message);
    });
  })
}

export const checkServices = pc => {
  return new Promise((resolve, reject) => {
    if (!pc.serviceReady) {
      var txt = null;
      switch (pc.id) {
        case 'alipay':
          txt = '检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
          break;
        default:
          txt = '系统未安装“' + pc.description + '”服务，无法完成支付，是否立即安装？';
          break;
      }
      Dialog.confirm({
        title: '提示',
        message: txt
      }).then(() => {
        pc.installService();
      })
      reject()
    } else {
      resolve()
    }
  })
}

export const pay = (type, body) => {
  return new Promise((resolve, reject) => {
    plus.payment.request(type, body, result => {
      resolve(result);
    }, (e) => {
      reject(e);
    })
  })
}