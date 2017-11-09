export class User {

  private _username: string;
  private _password: string;
  private _firstName: string;
  private _lastName: string;
  private _gender: string;
  private _birthDate: number;
  private _mobileNumber: string;
  private _homeNumber: string;
  private _lastChangeDate: number;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get birthDate(): number {
    return this._birthDate;
  }

  set birthDate(value: number) {
    this._birthDate = value;
  }

  get mobileNumber(): string {
    return this._mobileNumber;
  }

  set mobileNumber(value: string) {
    this._mobileNumber = value;
  }

  get homeNumber(): string {
    return this._homeNumber;
  }

  set homeNumber(value: string) {
    this._homeNumber = value;
  }

  get lastChangeDate(): number {
    return this._lastChangeDate;
  }

  set lastChangeDate(value: number) {
    this._lastChangeDate = value;
  }

  birthDayDateString(): string {
    return new Date(this._birthDate).toDateString();
  }

  lastChangeDateString(): string {
    return new Date(this._lastChangeDate).toDateString();
  }
}
