import { tryNum, sortStr, resPre, resNex } from "/hooks/useNum.js";

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

document.getElementById("leTou").onclick = () => {
  tryNum("leTou");
  setNum();
  pageMove();
};
document.getElementById("fuCai").onclick = () => {
  tryNum("fuCai");
  setNum();
  pageMove();
};
