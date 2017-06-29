import * as lambda from "aws-lambda";
import * as sourceMapSupport from "source-map-support";

sourceMapSupport.install();

/**
 * TODOを追加する
 *
 * @param event
 * @param context
 * @param callback
 * @returns {Promise<void>}
 */
export const create: lambda.ProxyHandler = async (
  event: lambda.APIGatewayEvent,
  context: lambda.Context,
  callback: lambda.Callback,
): Promise<void> => {

  const response = {
    statusCode: 201,
    body: JSON.stringify({
      id: 1,
      title: "買い物に行く",
    }),
    headers: {"Access-Control-Allow-Origin": "*"},
  };

  callback(undefined, response);
};
