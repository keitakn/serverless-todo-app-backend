import * as assert from 'power-assert';
import TodoValidationService from '../../../domain/TodoValidationService';

/**
 * TodoValidationService.findListValidateのテスト
 */
describe('FindListValidate', () => {

  /**
   * バリデーションテスト
   * 許可していないキーが指定されている
   */
  it('testValidationPramsNotArrowed', () => {
    const request = {
      foo: 'bar',
    };

    const validateResultObject = TodoValidationService.findListValidate(request);

    // 許可していないキーが指定された場合もエラー情報としてレスポンスに含まれる
    assert.ok(
      validateResultObject.foo,
    );
  });

  /**
   * バリデーションテスト
   * パラメータの指定は行うが、各値にはバリデーションが通らない値を指定
   */
  it('testValidationSetParams', () => {
    const requests = [
      {
        // 許可されている最小値より小さい値を指定
        limit: 0,
      },
      {
        // 許可されている最大値より大きい値を指定
        limit: 11,
      },
      {
        // nullを指定
        limit: null,
      },
      {
        // 空文字を指定
        limit: '',
      },
    ];

    requests.map((request) => {
      const validateResultObject = TodoValidationService.findListValidate(request);

      assert.ok(
        validateResultObject.limit,
      );
    });
  });

  /**
   * バリデーションテスト
   * バリデーション結果にエラーが1つも含まれない場合
   */
  it('testValidationNotContainsError', () => {
    const request = {
      limit: 2,
    };

    const validateResultObject = TodoValidationService.findListValidate(request);

    // 空のオブジェクトである事はエラーが1つもない事を示す
    assert.equal(
      Object.keys(validateResultObject).length,
      0,
    );
  });
});
