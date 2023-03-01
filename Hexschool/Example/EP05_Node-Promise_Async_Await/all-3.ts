// Promise.all
interface dataModel {
  name: string;
  score: number;
}

//#region correctTest [ 計算分數 ]
/**
 * * 計算分數
 * @param name 名字
 * @returns
 */
function correctTest(name: string): Promise<dataModel> {
  return new Promise((resolve, _reject) => {
    console.log("批改作業中");
    setTimeout(() => {
      const score: number = Math.round(Math.random() * 100); // 分數

      if (score >= 20) {
        resolve({
          name,
          score,
        });
      }
    }, Math.random() * 10000);
  });
}
//#endregion

Promise.all([
  correctTest("Benson"),
  correctTest("Johnson"),
  correctTest("George"),
]).then((data) => console.log(data));
