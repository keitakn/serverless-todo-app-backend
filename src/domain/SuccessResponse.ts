import * as lambda from "aws-lambda";

/**
 * SuccessResponse
 *
 * @author keita-nishimoto
 * @since 2017-07-03
 */
export default class SuccessResponse {

  /**
   * constructor
   *
   * @param _responseBody
   * @param _statusCode
   * @param _headers
   */
  constructor(
    private _responseBody: any,
    private _statusCode: number = 200,
    private _headers = {"Access-Control-Allow-Origin": "*"}) {
  }

  /**
   * レスポンスを取得する
   *
   * @returns {lambda.ProxyResult}
   */
  public getResponse(): lambda.ProxyResult {
    const responseBody = JSON.stringify(this.responseBody);

    const response = {
      statusCode: this.statusCode,
      headers: this.headers,
      body: responseBody,
    };

    return response;
  }

  /**
   * @returns {Object}
   */
  get responseBody(): any {
    return this._responseBody;
  }

  /**
   * @returns {number}
   */
  get statusCode(): number {
    return this._statusCode;
  }

  /**
   * @returns {{Access-Control-Allow-Origin: string}}
   */
  get headers(): { [header: string]: boolean | number | string } {
    return this._headers;
  }
}
