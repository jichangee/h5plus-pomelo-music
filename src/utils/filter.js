export const formatNumber = (number) => {
  let num = number;
  if (!number) {
    return 0;
  }
  if (typeof number !== 'number') {
    num = Number(number);
  }
  console.log('num1', num);
  console.log('number', number);
  if (Number.isNaN(num)) {
    return number;
  }
  console.log('num2', num);
  if (num < 1000) {
    return num;
  }
  if (num >= 1000 && num < 10000) {
    return `${(num / 1000).toFixed(3)}k`
  }
  if (num >= 10000) {
    return `${(num / 10000).toFixed(4)}w`
  }
}