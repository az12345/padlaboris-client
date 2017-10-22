export class UserSignup {
  private _username: string;
  private _email: string;
  private _phoneNumber: string;
  private _password: string;
  private _confirm: string;

  constructor() {
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get confirm(): string {
    return this._confirm;
  }

  set confirm(value: string) {
    this._confirm = value;
  }
}
