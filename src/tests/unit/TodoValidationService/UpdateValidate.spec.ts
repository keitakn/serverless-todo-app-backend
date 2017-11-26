import * as assert from 'power-assert';
import TodoValidationService from '../../../domain/TodoValidationService';

/**
 * TodoValidationService.updateValidateのテスト
 */
describe('UpdateValidate', () => {

  /**
   * バリデーションテスト
   * 必須パラメータが設定されていない
   */
  it('testValidationUnsetRequiredParams', () => {
    const request = {
      foo: 'bar',
    };

    const validateResultObject = TodoValidationService.updateValidate(request);

    assert.ok(
      validateResultObject.id,
    );

    assert.ok(
      validateResultObject.title,
    );

    assert.ok(
      validateResultObject.isCompleted,
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
        id: '2443f38f-8a69-4525-b2d1-d5da482764d',
        // 許可されている最小値より小さい値を指定
        title: 'aa',
        // 許可されている最小値より小さい値を指定
        isCompleted: 'tru',
      },
      {
        // 許可されている最大値より大きい値を指定
        id: '2443f38f-8a69-4525-b2d1-d5da482764d12',
        // 許可されている最大値より大きい値を指定
        title: 'あああああああああああああああああああああ',
        // 許可されている最大値より大きい値を指定
        isCompleted: 'false1',
      },
      {
        // nullを指定
        id: null,
        title: null,
        isCompleted: null,
      },
      {
        // 空文字を指定
        id: '',
        title: '',
        isCompleted: '',
      },
    ];

    requests.map((request) => {
      const validateResultObject = TodoValidationService.updateValidate(request);

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
      id: '2443f38f-8a69-4525-b2d1-d5da482764d1',
      title: '旅行の予約をする。',
      isCompleted: true,
    };

    const validateResultObject = TodoValidationService.updateValidate(request);

    // 空のオブジェクトである事はエラーが1つもない事を示す
    assert.equal(
      Object.keys(validateResultObject).length,
      0,
    );
  });
});
