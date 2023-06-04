import {
  tryNum,
  sortStr,
  resPre,
  resNex,
  generateQNum,
  qNum,
} from "/hooks/useNum.js";

/** 滚动条移动位置 */
const pageMove = () => {
  window.scrollTo({
    top: 1000,
    behavior: "smooth",
  });
};

/** 数字装填进入dom元素显示 */
const setNum = () => {
  document.getElementById("sortId").innerHTML = sortStr;
  document.getElementById("preNumId").innerHTML = resPre
    .sort((a, b) => a - b)
    .join(",");
  document.getElementById("nexNumId").innerHTML = resNex
    .sort((a, b) => a - b)
    .join(",");
};

/** 生成数据 */
const gegerateData = (type) => {
  tryNum(type);
  setNum();
  pageMove();
};

document.getElementById("leTou").onclick = () => {
  gegerateData("leTou");
};
document.getElementById("fuCai").onclick = () => {
  gegerateData("fuCai");
};
document.getElementById("qi").onclick = () => {
  generateQNum();
  document.getElementById("sortId").innerHTML = qNum;
  document.getElementById("preNumId").innerHTML = "";
  document.getElementById("nexNumId").innerHTML = "";
  pageMove();
};
