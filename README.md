# Dragon Ball API Challenge

Este proyecto tiene como objetivo principal el desarrollo de habilidades técnicas para un desarrollador backend utilizando NestJS. Implementaremos metodologías y estrategias reales de la empresa Apprende para garantizar un aprendizaje efectivo y una experiencia práctica. Mediante este proyecto, los participantes tendrán la oportunidad de adquirir conocimientos avanzados en desarrollo backend, aplicando las mejores prácticas de la industria y colaborando en un entorno que simula situaciones reales de trabajo.

## Tabla de contenidos

- Requerimientos
- Instalación
- Configuraciones
- Variables de Entorno
- Endpoint
- FAQ

## Requerimientos

1. Crear un proyecto en nestjs que permita desplegar un servicio rest básico, el cual permita crear personajes, planetas y poderes que sean parte del universo de `Dragon Ball`
2. El servicio para crear personajes ( paso anterior ) debe permitir subir imagenes a servicio externos de subida de imagenes.
3. Es Necesario crear un modulo de envio de correo el cual exponga un servicio REST para ser consumido y envie correos a los suscriptores de `Dragon Ball NewsLetter`

## Instalación

El proyecto esta hecho en `NestJS`por lo que debes tener ciertas consideración. Como contexto inicial consideramos que tienes instalado `git`, `node`, `npm`y `algún editor de código`

1. Baja el proyecto desde github, clonando el repositorio con el siguiente comando `git clone https://github.com/apprende-latam/challenge_dragonball_backend.git`
2. Por un tema de verionamiento sobre node, tuvimos que configurar `NVM`un gestor de veriones de node instalado, por ejemplo esto permite que puedas correr distintas versiones de node, por cada repositorio (proyeto) ejecutandose en tu equipo de desarrollo o servidor de despliegue.
   **_COMANDOS NECESARIOS DE NVM_**
   1. instala NVM https://geekflare.com/es/install-nvm-on-windows-macos/
   2. Verificar NVM `nvm --version`
   3. Verifica las versiones instaladas `nvm ls-remote`
   4. Instalar una versión de NODE `nvm install v20.11.1`
   5. Para ocupar una versión espécifica `nvm use v20.11.1`
   6. Testea el cambio de version de node en ese terminal `node -v`
   7. Si te sale la misma version que quisiste instalar esta ok tu configuración
3. Para un despliegue mas profesional configuraremos un archivo de setup `.nvmrc` el cual ya existe en este proyecto y ya es parte del tracking del control de versiones con `git`
4. El archivo en su interior tiene solo la versión que se utiliza en este proyecto, el cual es `v20.11.1`
5. Para que se utilice esta version que se suguiere en el archivo, solo es necesario ejecutar ´nvm use´ y por defecto buscará el archivo `.nvmrc` y configurará la versión que este registrada en ese archivo.

# Configuraciones

1. En el repositorio hay un archivo `.dev.env`el cual tiene las variables de entorno de este proyecto.
2. Debes copiar este archivo y crear un archivo `.env` y pedir los valores de las variables de entorno que se describen en el apartado `Variables de Entorno` en este archivo readme.
3. Instala las dependencias de este proyecto utilizando el commando `npm install`
4. Para levantar el proyecto ( si ya poblaste los valores de la variables de entorno), ejecuta el comando `npm run start:dev`
5. Ejectuta la api, para ello accede al enlace es http://localhost:3000

## Variables de Entorno

| VARIABLE    |                                                        VALOR                                                        |                                              DESCRIPCIÓN |
| :---------- | :-----------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------: |
| PORT        |                                                        3000                                                         | Puerto donde correrá el servicio http://localhost:[PORT] |
| MONGODB_URI | mongodb+srv://Drummer:q1w2e3r4@cluster0.6caotgo.mongodb.net/DragonBall?retryWrites=true&w=majority&appName=Cluster0 |              Conexion string para la base de datos mongo |

## Endpoint

| RUTA                                                               | METODO |                                                           DESCRIPCIÓN                                                            |                                                  RESPONSE                                                  |
| :----------------------------------------------------------------- | :----: | :------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| http://localhost:3000/characters                                   |  GET   |                                           Retorna un arreglo con todos los personajes                                            |    <pre>[ { "name": "Goku", "ki": { "base": " ", "max": " " }, "image": " ","afiliation": " "},{ ... }]    |
| </pre>                                                             |
| http://localhost:3000/characters/:name                             |  GET   |                             Retorna solo un objeto con el persona descrito en nombre ejemplo `goku`                              |                  <pre> { name: '', ki: {base: '',max: ''},image: '',afiliation: ''}</pre>                  |
| http://localhost:3000/charactera/planet/:name?character=:character |  GET   | Retorna 4 recomendaciones de personbajes que sean del planeta enviado `:name`y que no sea el personaje seleccionado `:character` | <pre>[{"name": "", "ki": {"base": "","max": "" }, "image": "", "afiliation": ""}, {...},{...},{...}]</pre> |
| http://localhost:3000/characters/                                  |  POST  |                                                                                                                                  |                                                                                                            |
| http://localhost:3000/characters/:name                             |  PUT   |                                             Actualiza un personaje segun su `:name`                                              |                                                                                                            |
| http://localhost:3000/characters:name                              | DELETE |                                              Elimina un personaje según su `:name`                                               |                                                                                                            |

## FAQ

Aca las preguntas que quieran
