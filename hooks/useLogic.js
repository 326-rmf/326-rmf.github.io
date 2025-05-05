/**生成数据之前思考数据的可能性
 * 1. 数据增大
 * 2. 数据不变
 * 3. 数据减小
 *
 * 三种可能性的来源会根据之前累计的本地数据加以分析推敲，推敲逻辑涉及方面
 * 根据趋势图可以看出数据走向，并根据之前数据得出走向的大概概率
 * 1. 交叉波动走向     52% -> 58%  代码中借 0 为交叉波动
 * 2. 偏执一方走向     34%         代码中借 1 为偏执一方
 * 3. 同数据走向       8%          代码中借 2 为同数据
 * 4. 同数据分叉走向    6%  归并与交叉波动走向
 * -   生成100个数据的数组包含58个0，34个1，8个2
 *          随机打乱  再生成一个随机数选中其中一个数据
 *          即可选择具体走向
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
const smallest = 0;
const biggest = 9;
/**目前排列五循环数据次数 */
const dataTime = 5;
/**交叉波动次数 */
const croCount = 5800;
/**偏执一方次数 */
const bioCount = 3400;
/**同数据次数 */
const sameTime = 800;
let Crossarr;
let Bigotryarr;
let Samearr;
let DirArr;
/**数据具体变化对应相关字符 */
const dataDetailChange = (num, str) => {
  if (num >= 0) {
    str += "数据的具体变化是：" + dataChnageArr[Changesmall] + ",";
  } else {
    str += "数据的具体变化是：" + dataChnageArr[Changebig] + ",";
  }
  return str;
};
/**最终数据分析显示 */
const expressDetail = (str, num) => {
  return str + num;
};
/**走向数据的数组生成以及方向确定 */
const generateDirArr = () => {
  Crossarr = new Array(croCount).fill(Cross);
  Bigotryarr = new Array(bioCount).fill(Bigotry);
  Samearr = new Array(sameTime).fill(Same);
  DirArr = Crossarr.concat(Bigotryarr).concat(Samearr);
  DirArr = DirArr.sort(() => Math.random() - 0.5);
  let num = Math.round(Math.random() * 99);
  return DirArr[num];
};
/**随机生成变大或者变小后的数据 */
const generateRandomNum = (dir, num) => {
  if (dir > smallest) {
    // 变小
    if (num === smallest) {
      return smallest;
    } else {
      return Math.floor(Math.random() * num);
    }
  } else {
    if (num === biggest) {
      return biggest;
    } else {
      return Math.floor(Math.random() * (biggest - num) + num + 1);
    }
  }
};
/**方向确定之后的具体数字选择 */
const confirmNum = (time, dir) => {
  let num = Number(Data_2.value[time]);
  let datadir =
    Data_1.value[time] - Data_2.value[time] >= 0 ? Changebig : Changesmall;
  let str = "";
  str += "数据测算走向是：" + dataDirArr[dir] + ",";
  if (dir === Cross) {
    str += "数据的具体变化是：" + dataChnageArr[datadir] + ",";
    if (datadir === Changesmall) {
      if (num === smallest) {
        // 已是最小无法变小
        return expressDetail(str, smallest);
      } else {
        return expressDetail(str, generateRandomNum(Changesmall, num));
      }
    } else if (datadir === Changebig) {
      if (num === biggest) {
        // 已是最大无法变大
        return expressDetail(str, biggest);
      } else {
        return expressDetail(str, generateRandomNum(Changebig, num));
      }
    }
  } else if (dir === Bigotry) {
    let bDir;
    bDir = Data_1.value[time] - Data_2.value[time];
    str = dataDetailChange(bDir, str);
    return expressDetail(str, generateRandomNum(bDir, num));
  } else {
    return str + "数据的具体变化是：同数据，" + num;
  }
};
/**根据前置数据选择数据走向趋势，再来选择数据具体变化 */
export const chooseDirect = () => {
  let res = "";
  for (let i = 0; i < dataTime; i++) {
    num_Arr[i].innerText = confirmNum(i, generateDirArr());
    res += num_Arr[i].innerText[num_Arr[i].innerText.search(/[0-9]/)];
  }
  return res;
};
