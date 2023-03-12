import { tryNum, sortStr, resPre, resNex } from "/hooks/useNum.js";

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

document.getElementById("leTou").onclick = () => {
  tryNum("leTou");
  setNum();
};
document.getElementById("fuCai").onclick = () => {
  tryNum("fuCai");
  setNum();
};
