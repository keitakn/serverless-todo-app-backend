import * as lambda from "aws-lambda";

/**
 * RequestFactory
 * AWSLambdaEventオブジェクトからリクエストオブジェクトを生成する
 *
 * @author keita-nishimoto
 * @since 2016-07-02
 */
export default class RequestFactory {

  /**
   * @param event
   */
  constructor(private _event: lambda.APIGatewayEvent) {
  }

  /**
   * @returns {lambda.APIGatewayEvent}
   */
  get event(): lambda.APIGatewayEvent {
    return this._event;
  }

  /**
   * リクエストオブジェクトを生成する
   *
   * @returns {any}
   */
  public create(): any {
    const eventBody: any = this.event.body;

    return JSON.parse(eventBody);
  }
}
