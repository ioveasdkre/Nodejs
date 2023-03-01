// promise

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
  return new Promise((resolve, reject) => {
    console.log("批改作業中");
    setTimeout(() => {
      const score: number = Math.round(Math.random() * 100); // 分數

      if (score >= 20) {
        resolve({
          name,
          score,
        });
      } else {
        reject("您已達退學門檻");
      }
    }, 1000);
  });
}
//#endregion

//#region checkReward [ 計算獎品 ]
/**
 * * 計算獎品
 * @param data 數據
 * @returns
 */
function checkReward(data: dataModel): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log("正在檢查獎品中");
    setTimeout(() => {
      if (data.score >= 90) {
        resolve(`${data.name}獲得電影票`);
      } else if (data.score >= 60 && data.score < 90) {
        resolve(`${data.name}獲得嘉獎`);
      } else {
        reject("您沒有獎品，打手心 10下");
      }
    }, 1000);
  });
}
//#endregion

correctTest("Benson")
  .then((data) => checkReward(data))
  .then((reward) => console.log(reward))
  .catch((err) => console.log(err));
