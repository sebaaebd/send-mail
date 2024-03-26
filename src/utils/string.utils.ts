export class StringUtils {
  //para transformar la primera en mayusculas
  static capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  static capitalizeArray(values: string[]): string[] {
    return values.map((value) => this.capitalize(value));
  }
  static removeWhiteSpace(value: string): string {
    return value.replace(/^\s+|\s+$/g, '');
  }

  static validEmail(value: string): boolean {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    return regex.test(value);
  }
}
