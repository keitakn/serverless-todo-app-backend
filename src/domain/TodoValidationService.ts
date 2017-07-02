import DomainValidator from "./DomainValidator";

/**
 * TodoValidationService
 *
 * @author keita-nishimoto
 * @since 2017-07-03
 */
export default class TodoValidationService {

  /**
   * TODO登録APIのバリデーション
   *
   * @param request
   * @returns {Object}
   */
  public static createValidate(request: any): {[name: string]: string} {
    const scheme = {
      type: "object",
      required: [
        "title",
      ],
      properties: {
        title: {
          type: "string",
          minLength: 3,
          maxLength: 20,
        },
      },
      additionalProperties: false,
    };

    const domainValidator = new DomainValidator(scheme);

    return domainValidator.doValidate(request);
  }
}
