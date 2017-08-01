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

  /**
   * TODO取得APIのバリデーション
   *
   * @param request
   * @returns {Object}
   */
  public static findValidate(request: any): {[name: string]: string} {
    const scheme = {
      type: "object",
      required: [
        "id",
      ],
      properties: {
        id: {
          type: "string",
          minLength: 36,
          maxLength: 36,
        },
      },
      additionalProperties: false,
    };

    const domainValidator = new DomainValidator(scheme);

    return domainValidator.doValidate(request);
  }

  /**
   * TODOリスト取得APIのバリデーション
   *
   * @param request
   * @returns {{[p: string]: string}}
   */
  public static findListValidate(request: any): {[name: string]: string} {
    const scheme = {
      type: "object",
      properties: {
        limit: {
          type: "number",
          minimum: 1,
          maximum: 11,
          exclusiveMaximum: true,
        },
      },
      additionalProperties: false,
    };

    const domainValidator = new DomainValidator(scheme);

    return domainValidator.doValidate(request);
  }

  /**
   * TODO変更APIのバリデーション
   *
   * @param request
   * @returns {{[p: string]: string}}
   */
  public static updateValidate(request: any): {[name: string]: string}  {
    const scheme = {
      type: "object",
      required: [
        "id",
        "title",
        "isCompleted",
      ],
      properties: {
        id: {
          type: "string",
          minLength: 36,
          maxLength: 36,
        },
        title: {
          type: "string",
          minLength: 3,
          maxLength: 20,
        },
        isCompleted: {
          type: "boolean",
          minLength: 4,
          maxLength: 5,
        },
      },
      additionalProperties: false,
    };

    const domainValidator = new DomainValidator(scheme);

    return domainValidator.doValidate(request);
  }

  /**
   * TODO削除APIのバリデーション
   *
   * @param request
   * @returns {Object}
   */
  public static deleteTodoValidate(request: any): {[name: string]: string} {
    const scheme = {
      type: "object",
      required: [
        "id",
      ],
      properties: {
        id: {
          type: "string",
          minLength: 36,
          maxLength: 36,
        },
      },
      additionalProperties: false,
    };

    const domainValidator = new DomainValidator(scheme);

    return domainValidator.doValidate(request);
  }
}
