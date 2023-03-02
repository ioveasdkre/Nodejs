// axios 這只是示意 then而非 axios套件
const url_2: string =
  "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";

const axios = {
  get: function (url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  },
};

axios
  .get(url_2)
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
