// XMLHttpRequest
const url_3: string =
  "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";

function getUrl(url: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

getUrl(url_2)
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
