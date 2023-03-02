import http from "http";

//#region [ 請求監聽器 ]
/**
 * 請求監聽器
 * * request 請求
 * * response 回覆
 */
http
  .createServer((_request, response) => {
    // response.writeHead(200, { "Content-Type": "text/plain" });
    // response.write("Hello World!");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<h1>Hello World!</h1>");
    response.end();
  })
  .listen(8080);
//#endregion
