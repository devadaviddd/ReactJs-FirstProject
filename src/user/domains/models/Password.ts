export class Password {
  public static readonly passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).{8,}$/;

  public static isValid(value: string) {
    return this.passwordRegex.test(value);
  }
}
