/**生成数据之前思考数据的可能性
 * 1. 数据增大
 * 2. 数据不变
 * 3. 数据减小
 *
 * 三种可能性的来源会根据之前累计的本地数据加以分析推敲，推敲逻辑涉及方面
 * 根据趋势图可以看出数据走向，并根据之前数据得出走向的大概概率
 * 1. 交叉波动走向     52% -> 58%  代码中借 0 为交叉波动
 * 2. 偏执一方走向     34%         代码中借 1 为交叉波动
 * 3. 同数据走向       8%          代码中借 2 为交叉波动
 * 4. 同数据分叉走向    6%  归并与交叉波动走向
 * -   生成100个数据的数组包含58个0，34个1，8个2
 *          随机打乱  再生成一个随机数选中其中一个数据
 *          即可选择具体走向
 *
 * 选择完成走向之后，再来选择数据变大或者变小 根据之前数据得出相关概率
 * 1. 交叉波动走向可大可小   出现极限边缘数据的时候 也就是说数据只能变大或者变小的时候
 *      -   变大       0.4615  代码中借 0 为变大
 *      -   变小       0.5385   代码中借 1 为变小
 *      -   生成一万个数据的数组包含4615个0，5385个1
 *          随机打乱  再生成一个随机数选中其中一个数据
 *          再来选中变大或者变小的数据
 * 2. 偏执一方走向会延续之前的走势  直接根据前两组数据得出
 *
 *      -   偏执一方分左方右方
 *
 * 3. 同数据走向就是相同数据
 */
/**交叉波动走向 */
const Cross = 0;
/**偏执一方走向 */
const Bigotry = 1;
/**同数据走向 */
const Same = 2;
/**变大 */
const Changebig = 0;
/**变小 */
const Changesmall = 1;
const num_1 = document.getElementById("num_1");
const num_2 = document.getElementById("num_2");
const num_3 = document.getElementById("num_3");
const num_4 = document.getElementById("num_4");
const num_5 = document.getElementById("num_5");
const num_Arr = [num_1, num_2, num_3, num_4, num_5];
const Data_1 = document.getElementById("data-1");
const Data_2 = document.getElementById("data-2");
let dataChnageArr = ["变大", "变小"];
let dataDirArr = ["交叉波动", "偏执一方", "同数据走向"];
let Crossarr;
let Bigotryarr;
let Samearr;
let DirArr;
let DataArr;
let ChangebigArr;
let ChangesmallArr;
/**数据具体变化对应相关字符 */
const dataDetailChange = (num, str) => {
  if (num >= 0) {
    str += "数据的具体变化是：" + dataChnageArr[1] + ",";
  } else {
    str += "数据的具体变化是：" + dataChnageArr[0] + ",";
  }
  return str;
};
/**最终数据分析显示 */
const expressDetail = (str, num) => {
  return str + num;
};
/**走向数据的数组生成以及方向确定 */
const generateDirArr = () => {
  Crossarr = new Array(58).fill(Cross);
  Bigotryarr = new Array(34).fill(Bigotry);
  Samearr = new Array(8).fill(Same);
  DirArr = Crossarr.concat(Bigotryarr).concat(Samearr);
  DirArr = DirArr.sort(() => Math.random() - 0.5);
  let num = Math.round(Math.random() * 99);
  return DirArr[num];
};
/**数据具体大小变化确定 */
const generateData = () => {
  ChangebigArr = new Array(462).fill(Changebig);
  ChangesmallArr = new Array(538).fill(Changesmall);
  DataArr = ChangebigArr.concat(ChangesmallArr);
  DataArr = DataArr.sort(() => Math.random() - 0.5);
  let num = Math.round(Math.random() * 999);
  return DataArr[num];
};
/**随机生成变大或者变小后的数据 */
const generateRandomNum = (dir, num) => {
  let geneNum;
  alert;
  if (dir >= 0) {
    // 变小
    if (num === 0) {
      return 0;
    } else {
      return Math.floor(Math.random() * num);
    }
  } else {
    if (num === 9) {
      return 9;
    } else {
      return Math.floor(Math.random() * (9 - num) + num + 1);
    }
  }
};
/**方向确定之后的具体数字选择 */
const confirmNum = (time, dir) => {
  let num = Number(Data_2.value[time]);
  let datadir = generateData();
  let str = "";
  str += "数据测算走向是：" + dataDirArr[dir] + ",";
  if (dir === Cross) {
    str += "数据的具体变化是：" + dataChnageArr[datadir] + ",";
    if (datadir === Changesmall) {
      if (num === 0) {
        /**需要重新选择方向 */
        return expressDetail(str, 0);
      } else {
        return expressDetail(str, generateRandomNum(1, num));
      }
    } else if (datadir === Changebig) {
      if (num === 9) {
        /**需要重新选择方向 */
        return expressDetail(str, 9);
      } else {
        return expressDetail(str, generateRandomNum(-1, num));
      }
    }
  } else if (dir === Bigotry) {
    let bDir;
    if (time === 0) {
      bDir = Data_1.value[1] - Data_2.value[0];
      str = dataDetailChange(bDir, str);
    } else if (time === 4) {
      bDir = Data_1.value[3] - Data_2.value[4];
      str = dataDetailChange(bDir, str);
    } else {
      bDir =
        Data_1.value[time + Math.floor(Math.random() * 3) - 1] -
        Data_2.value[time];
      str = dataDetailChange(bDir, str);
    }
    return expressDetail(str, generateRandomNum(bDir, num));
  } else {
    return str + "数据的具体变化是：同数据，" + num;
  }
};
/**根据前置数据选择数据走向趋势，再来选择数据具体变化 */
export const chooseDirect = (str1, str2) => {
  let res = "";
  for (let i = 0; i < 5; i++) {
    num_Arr[i].innerText = confirmNum(i, generateDirArr());
    res += num_Arr[i].innerText[num_Arr[i].innerText.search(/[0-9]/)];
  }
  return res;
};
