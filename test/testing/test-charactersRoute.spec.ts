/*PRUEBA UNITARIA RUTA /CHARACTERS */

import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from 'src/characters/characters.controller';
import { CharactersService } from 'src/characters/characters.service';

//creamos el mock para emular los servicios originales
const mockCharacterService = {
  findAll: jest.fn(),
};

describe('CharactersController', () => {
  let controller: CharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        {
          provide: CharactersService,
          useValue: mockCharacterService, //dejamos que los valores del servicio sean los que definamos nosotros
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  //llamamos el metodo findAll que esta en nuestro controlador
  it('findAll => should return all characters', async () => {
    //creamos el array donde agregaremos los datos del pj estaticamente
    const character = [
      {
        name: 'Goku',
        planet: 'Tierra',
        ki: {
          baseKi: '60 Millones',
          maxKi: '90 Septillón',
        },
        image:
          'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044374/hlpy6q013uw3itl5jzic.webp',
        race: 'Saiyajin',
        afiliation: 'Guerreros Z',
        description:
          'El protagonista de la serie, conocido por su gran poder y personalidad amigable. Originalmente enviado a la Tierra como un infante volador con la misión de conquistarla. Sin embargo, el caer por un barranco le proporcionó un brutal golpe que si bien casi lo mata, este alteró su memoria y anuló todos los instintos violentos de su especie, lo que lo hizo crecer con un corazón puro y bondadoso, pero conservando todos los poderes de su raza. No obstante, en la nueva continuidad de Dragon Ball se establece que él fue enviado por sus padres a la Tierra con el objetivo de sobrevivir a toda costa a la destrucción de su planeta por parte de Freeza. Más tarde, Kakarot, ahora conocido como Son Goku, se convertiría en el príncipe consorte del monte Fry-pan y líder de los Guerreros Z, así como el mayor defensor de la Tierra y del Universo 7, logrando mantenerlos a salvo de la destrucción en innumerables ocasiones, a pesar de no considerarse a sí mismo como un héroe o salvador.',
        techniques: [
          'Kamehameha',
          ' Kienzan',
          ' Genkidama',
          ' Mafuba',
          ' Kaiō Ken',
        ],
      },
      {
        name: 'Vegeta',
        planet: 'Planeta Vegeta',
        ki: {
          baseKi: '54 Millones ',
          maxKi: '19.84 Septillón',
        },
        image:
          'https://res.cloudinary.com/dgtgbyo76/image/upload/v1699044422/i9hpfjplth6gjudvhsx3.webp',
        race: 'Saiyajin',
        afiliation:
          'Guerreros Z, Fuerzas Ginyu (antes), Imperio de Freezer (antes),',
        description:
          'Príncipe de los Saiyans, inicialmente un villano, pero luego se une a los Z Fighters. A pesar de que a inicios de Dragon Ball Z, Vegeta cumple un papel antagónico, poco después decide rebelarse ante el Imperio de Freeza, volviéndose un aliado clave para los Guerreros Z. Con el paso del tiempo llegaría a cambiar su manera de ser, optando por permanecer y vivir en la Tierra para luchar a su lado contra las inminentes adversidades que superar. Junto con Piccolo, él es de los antiguos enemigos de Goku que ha evolucionando al pasar de ser un villano y antihéroe, a finalmente un héroe a lo largo del transcurso de la historia, convirtiéndose así en el deuteragonista de la serie.',
        techniques: [
          'Galick Ho',
          'Final Flash',
          'Big Bang Attack',
          'Final Shine',
          'Onda Explosiva',
          'Teletransportación',
        ],
      },
    ];

    // Simulamos el comportamiento del método findAll del mockCharacterService para devolver el array characters cuando se llama a findAll
    jest.spyOn(mockCharacterService, 'findAll').mockReturnValue(character);

    // Llamamos al método findAll del controlador
    const result = await controller.findAll();

    // Verificamos si el resultado devuelto es igual al array character
    expect(result).toEqual(character);

    // Verificamos que la función mock del servicio characters haya sido llamada
    expect(mockCharacterService.findAll).toHaveBeenCalled();
  });
});
