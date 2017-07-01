/**
 * TodoEntity
 *
 * @author keita-nishimoto
 * @since 2017-07-02
 */
namespace TodoEntity {

  /**
   * Builder
   *
   * @author keita-nishimoto
   * @since 2017-07-02
   */
  export class Builder {

    /**
     * 識別子
     */
    private _id: string;

    /**
     * タイトル
     */
    private _title: string;

    /**
     * 完了済かどうか
     */
    private _isCompleted: boolean;

    /**
     * 作成日時
     */
    private _createdAt: number;

    /**
     * 更新日時
     */
    private _updatedAt: number;

    /**
     * @returns {string}
     */
    get id(): string {
      return this._id;
    }

    /**
     * @param value
     */
    set id(value: string) {
      this._id = value;
    }

    /**
     * @returns {string}
     */
    get title(): string {
      return this._title;
    }

    /**
     * @param value
     */
    set title(value: string) {
      this._title = value;
    }

    /**
     * @returns {boolean}
     */
    get isCompleted(): boolean {
      return this._isCompleted;
    }

    /**
     * @param value
     */
    set isCompleted(value: boolean) {
      this._isCompleted = value;
    }

    /**
     * @returns {number}
     */
    get createdAt(): number {
      return this._createdAt;
    }

    /**
     * @param value
     */
    set createdAt(value: number) {
      this._createdAt = value;
    }

    /**
     * @returns {number}
     */
    get updatedAt(): number {
      return this._updatedAt;
    }

    /**
     * @param value
     */
    set updatedAt(value: number) {
      this._updatedAt = value;
    }

    /**
     * @returns {ClientEntity.Entity}
     */
    public build(): Entity {
      return new Entity(this);
    }
  }

  /**
   * Entity
   *
   * @author keita-nishimoto
   * @since 2017-07-02
   */
  export class Entity {

    /**
     * 識別子
     */
    private _id: string;

    /**
     * タイトル
     */
    private _title: string;

    /**
     * 完了済かどうか
     */
    private _isCompleted: boolean;

    /**
     * 作成日時
     */
    private _createdAt: number;

    /**
     * 更新日時
     */
    private _updatedAt: number;

    /**
     * @param builder
     */
    constructor(builder: Builder) {
      this._id          = builder.id;
      this._title       = builder.title;
      this._isCompleted = builder.isCompleted;
      this._createdAt   = builder.createdAt;
      this._updatedAt   = builder.updatedAt;
    }

    /**
     * @returns {string}
     */
    get id(): string {
      return this._id;
    }

    /**
     * @returns {string}
     */
    get title(): string {
      return this._title;
    }

    /**
     * @returns {boolean}
     */
    get isCompleted(): boolean {
      return this._isCompleted;
    }

    /**
     * @returns {number}
     */
    get createdAt(): number {
      return this._createdAt;
    }

    /**
     * @returns {number}
     */
    get updatedAt(): number {
      return this._updatedAt;
    }
  }
}
