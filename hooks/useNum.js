/** 排列五 */
export let sortStr = "";
/** 前区 */
export let resPre = [];
/** 后区 */
export let resNex = [];
/** 七星彩 */
export let qNum = "";
/** 判断是乐透还是福彩返回对应范围数字
 * 乐透 1-35 1-12
 * 福彩 1-33 1-16
 */
export const numObj = {
  leTou: {
    pre: 35,
    nex: 12,
    preCount: 5,
    nexCount: 2,
  },
  fuCai: {
    pre: 33,
    nex: 16,
    preCount: 6,
    nexCount: 1,
  },
};
// 生成排三排五数据
export const generateSort = () => {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(Math.floor(Math.random() * 10));
  }
  return arr.join("");
};
// 生成七星彩数据
export const generateQNum = () => {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(Math.floor(Math.random() * 10));
  }
  arr.push(",")
  arr.push(Math.floor(Math.random() * 15));
  qNum = arr.join("");
};
// 乐透福彩
export function tryNum(type) {
  // 获取当前日期
  const nowDay = new Date();
  sortStr = generateSort();
  const obj = numObj[type];
  resPre = [];
  resNex = [];

  const getPreRandom = () => {
    return Math.floor(Math.random() * obj.pre + 1);
  };
  const getNexRandom = () => {
    return Math.floor(Math.random() * obj.nex + 1);
  };

  for (let i = 0; i < obj.preCount; i++) {
    let num = getPreRandom();
    if (!resPre.includes(num)) {
      resPre.push(num);
      continue;
    }
    num = getPreRandom();
    while (resPre.includes(num)) {
      num = getPreRandom();
    }
    resPre.push(num);
  }
  for (let i = 0; i < obj.nexCount; i++) {
    let num = getNexRandom();
    if (!resNex.includes(num)) {
      resNex.push(num);
      continue;
    }
    num = getNexRandom();
    while (resNex.includes(num)) {
      num = getNexRandom();
    }
    resNex.push(num);
  }
}
