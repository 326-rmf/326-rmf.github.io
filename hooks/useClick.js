import {
  tryNum,
  sortStr,
  resPre,
  resNex,
  generateQNum,
  qNum,
} from "/hooks/useNum.js";

/** 排五前置数据1 */
const Data_1 = document.getElementById("data-1");
/** 排五前置数据2 */
const Data_2 = document.getElementById("data-2");
/** 排序数据框 */
const SortExpress1 = document.getElementById("sortId");
/** 排序前置数据 */
const SortExpressPre = document.getElementById("preNumId");
/** 排序后置数据 */
const SortExpressNex = document.getElementById("nexNumId");
/** 乐透按钮 */
const LeBtn = document.getElementById("leTou");
/** 福彩按钮 */
const FuBtn = document.getElementById("fuCai");
/** 七星彩按钮 */
const QBtn = document.getElementById("qi");

/**数据验证规则必须五位阿拉伯数字 */
const checkNum = (num) => {
  const reg = /^[0-9]{5}$/;
  return reg.test(num);
};

/**判断数据格式是否正确 */
const checkNumIsOk = () => {
  let dataComplete = checkNum(Data_1.value) && checkNum(Data_2.value);
  if (dataComplete) {
    return true;
  } else {
    alert("输入框数据格式有误,必须满足五位字符并且是数字");
    Data_1.value = "";
    Data_2.value = "";
    return false;
  }
};

/** 滚动条移动位置 */
const pageMove = () => {
  window.scrollTo({
    top: 1000,
    behavior: "smooth",
  });
};

/**数据排序 */
const sortStrFn = (num) => {
  return num.sort((a, b) => a - b).join(",");
};

/** 数字装填进入dom元素显示 */
const setNum = () => {
  SortExpress1.innerHTML = sortStr;
  SortExpressPre.innerHTML = sortStrFn(resPre);
  SortExpressNex.innerHTML = sortStrFn(resNex);
};

/** 生成数据 */
const gegerateData = (type) => {
  if (checkNumIsOk()) {
    tryNum(type);
    setNum();
    pageMove();
  } else {
    return;
  }
};

LeBtn.onclick = () => {
  gegerateData("leTou");
};
FuBtn.onclick = () => {
  gegerateData("fuCai");
};
QBtn.onclick = () => {
  generateQNum();
  SortExpress1.innerHTML = qNum;
  SortExpressPre.innerHTML = "";
  SortExpressNex.innerHTML = "";
  pageMove();
};
