import * as assert from 'power-assert';
import TodoValidationService from '../../../domain/TodoValidationService';

/**
 * TodoValidationService.createValidateのテスト
 */
describe('CreateValidate', () => {

  /**
   * バリデーションテスト
   * 必須パラメータが設定されていない
   */
  it('testValidationUnsetRequiredParams', () => {
    const request = {
      foo: 'bar',
    };

    const validateResultObject = TodoValidationService.createValidate(request);

    assert.ok(
      validateResultObject.title,
    );

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
        title: 'aa',
      },
      {
        // 許可されている最大値より大きい値を指定
        title: 'あああああああああああああああああああああ',
      },
      {
        // nullを指定
        title: null,
      },
      {
        // 空文字を指定
        title: '',
      },
    ];

    requests.map((request) => {
      const validateResultObject = TodoValidationService.createValidate(request);

      assert.ok(
        validateResultObject.title,
      );
    });
  });

  /**
   * バリデーションテスト
   * バリデーション結果にエラーが1つも含まれない場合
   */
  it('testValidationNotContainsError', () => {
    const request = {
      title: '旅行の予約をする。',
    };

    const validateResultObject = TodoValidationService.createValidate(request);

    // 空のオブジェクトである事はエラーが1つもない事を示す
    assert.equal(
      Object.keys(validateResultObject).length,
      0,
    );
  });
});
