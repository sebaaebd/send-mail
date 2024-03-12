/*creamos una interfaz la cual contiene los tipos de datos que se entregarán en la respuesta del método findAll en nuestro
character service*/
interface CharactersResponse {
  name: string;
  planet: string;
  ki: {
    baseKi: string;
    maxKi: string;
  };
  image: string;
  race: string;
  afiliation: string;
  description: string;
  techniques: string[];
}
