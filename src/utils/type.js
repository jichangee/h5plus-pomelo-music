export const convertOrderState = (state) => {
  const data = {
    '0': '待付款',
    '1': '已取消',
    '2': '已付款',
    '3': '已配送',
    '4': '已收货',
    '5': '退款中',
    '6': '已退款'
  }
  return data[state];
}