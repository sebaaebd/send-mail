/*creamos una interfaz la cual contiene los tipos de datos que se entregarán en la respuesta del método findAll en nuestro
character service*/
interface CharactersResponse {
  name: string;
  ki: {
    base: string;
    max: string;
  };
  image: string;
  afiliation: string;
}
