import * as lambda from "aws-lambda";

/**
 * ValidationErrorResponse
 *
 * @author keita-nishimoto
 * @since 2017-07-03
 */
export default class ValidationErrorResponse {

  /**
   * constructor
   *
   * @param _validateResultObject
   */
  constructor(private _validateResultObject: {[name: string]: string}) {
  }

  /**
   * @returns {Object}
   */
  get validateResultObject(): {[name: string]: string} {
    return this._validateResultObject;
  }

  /**
   * レスポンスを取得する
   *
   * @returns {lambda.ProxyResult}
   */
  public getResponse(): lambda.ProxyResult {
    const responseCode = 422;

    const responseBody = {
      code: responseCode,
      message: "Unprocessable Entity",
      errors: this.validateResultObject,
    };

    return {
      statusCode: responseCode,
      headers: {
        "Access-Control-Allow-Origin" : "*",
      },
      body: JSON.stringify(responseBody),
    };
  }
}
