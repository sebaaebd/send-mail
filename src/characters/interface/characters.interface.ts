/*creamos una interfaz la cual contiene los tipos de datos que se entregarán en la respuesta del método findAll en nuestro
character service*/
export interface CharactersResponse {
  name: string;
  ki: {
    base: string;
    max: string;
  };
  image: string;
  affiliation: string;
}

//interface para un solo personaje del metodo findOne
export interface CharacterResponse {
  name: string;
  image: string;
  race: string;
  planet: string;
  universe: string;
  description: string;
  techniques: string[];
  stage: string[];
}
