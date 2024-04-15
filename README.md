# Tasks_Ruby

Este proyecto está basado en Ruby on Rails y proporciona una plataforma para administrar tareas.

## Requisitos previos

- Ruby
- Ruby on Rails
- Node.js y npm

## Pasos para levantar el proyecto

1. **Instalar dependencias**: Ejecuta el siguiente comando para instalar las dependencias del proyecto:

    ```bash
    npm install
    ```

2. **Crear la base de datos**: Utiliza el siguiente comando para crear la base de datos:

    ```bash
    rails db:create
    ```

3. **Ejecutar migraciones**: A continuación, ejecuta las migraciones para crear las tablas necesarias en la base de datos:

    ```bash
    rails db:migrate
    ```

4. **Llenar la base de datos**: Utiliza el siguiente comando de Rails para llenar la base de datos con datos iniciales. Asegúrate de que el archivo `fetch_earthquake_data.rake` esté ubicado en `lib/tasks/`:

    ```bash
    rails fetch_earthquake_data
    ```

5. **Configurar las credenciales de la base de datos**: Abre el archivo `config/database.yml` y asegúrate de que las credenciales de la base de datos estén configuradas correctamente.

6. **Iniciar el servidor de base de datos**: Levanta el servidor de base de datos ejecutando el siguiente comando:

    ```bash
    rails db:start
    ```

7. **Iniciar el servidor Rails**: Por último, inicia el servidor Rails ejecutando el siguiente comando:

    ```bash
    rails s
    ```

    El proyecto estará disponible en `http://localhost:3000`.

¡Listo! Ahora deberías poder acceder al proyecto en tu navegador localmente en `localhost:3000`.


* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
