// Fetch
const url_1: string =
  "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json";

fetch(url_1)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
