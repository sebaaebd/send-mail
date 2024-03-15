export class StringUtils {
  //para transformar la primera en mayusculas
  static capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  static capitalizeArray(values: string[]): string[] {
    return values.map((value) => this.capitalize(value));
  }
}
