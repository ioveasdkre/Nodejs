import { ServerResponse } from "http";
import { ResultMessage } from "./apiResponse";
import { headersObj } from "./apiRequestModel";

const setMistake = (code: number, message: string): ResultMessage => {
  return {
    code,
    message,
  };
};

const errorHandle = (
  res: ServerResponse,
  statusCode: number,
  headersObj: headersObj,
  massage: string
) => {
  const mistake = setMistake(statusCode, massage);

  // 設置 HTTP 狀態碼為 200，並設置標頭 headers
  res.writeHead(statusCode, headersObj);

  if (mistake) res.write(JSON.stringify(mistake)); // 回傳 write 字串

  // 結束回應
  res.end();
};

export { errorHandle };
