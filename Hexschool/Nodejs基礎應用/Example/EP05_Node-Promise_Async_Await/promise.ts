// promise
const score: number = Math.round(Math.random() * 100); // 分數

const checkScore = (score: number) => {
  return new Promise((resolve, reject) => {
    console.log("正在檢查是否及格");

    setTimeout(() => {
      if (score >= 60) {
        resolve(score);
      } else {
        reject("不及格");
      }
    }, 2000);
  });
};

checkScore(score)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
