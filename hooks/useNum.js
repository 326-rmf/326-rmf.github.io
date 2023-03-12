export let sortStr = "";
export let resPre = [];
export let resNex = [];
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
// 乐透福彩
export function tryNum(type) {
  sortStr = generateSort();
  const obj = numObj[type];
  resPre = [];
  resNex = [];

  const getPreRandom = () => {
    let sign = 0;
    while (sign !== "0.326") {
      sign = Math.random().toFixed(3);
    }
    return Math.floor(Math.random() * obj.pre + 1);
  };
  const getNexRandom = () => {
    let sign = 0;
    while (sign !== "0.326") {
      sign = Math.random().toFixed(3);
    }
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
