// 函數需要兩個參數：要執行的函數和等待時間（以毫秒為單位）
const timeout = setTimeout(callFun, 2000);

function callFun() {
  console.log("觸發 setTimeout()");
}