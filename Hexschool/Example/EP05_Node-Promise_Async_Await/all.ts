// promise, async, await

interface dataModel {
  name: string;
  score: number;
}

function correctTest(name: string): Promise<dataModel> {
  return new Promise((resolve, reject) => {
    console.log("批改作業中");
    setTimeout(() => {
      const score: number = Math.round(Math.random() * 100); // 分數

      if (score >= 60) {
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

function checkReward(data: dataModel): Promise<string> {
  return new Promise((resolve, _reject) => {
    console.log("正在檢查獎品中");
    setTimeout(() => {
      if (data.score >= 90) {
        resolve(`${data.name}獲得電影票`);
      } else if (data.score >= 60 && data.score < 90) {
        resolve(`${data.name}獲得嘉獎`);
      }
    }, 1000);
  });
}

correctTest("Benson")
  .then((data) => checkReward(data))
  .then((name) => console.log(name))
  .catch((err) => console.log(err));
