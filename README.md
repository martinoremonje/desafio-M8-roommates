# Roommates Bills App

Este proyecto es una app gestor de roommates que permite registrar y gestionar gastos compartidos entre roommates.

## Características

- **Agregar Roommates**: Utiliza la API de Random User para agregar nuevos roommates.
- **Gestión de Gastos**: Permite agregar, actualizar y eliminar gastos.
- **Cálculo de Balances**: Actualiza automáticamente los saldos de debe y recibe para cada roommate.
- **Interfaz de Usuario**: Proporciona una interfaz web para interactuar con el sistema.


## Uso
Inicia el servidor:

 npm start

2. Abre tu navegador y navega a http://localhost:3000 para acceder a la interfaz de usuario.

3. Usa las siguientes rutas para interactuar con la API:

    * GET /roommates: Devuelve todos los roommates almacenados.
    * POST /roommates: Agrega un nuevo roommate utilizando la API de Random User.
    * GET /gastos: Devuelve el historial de gastos registrados.
    * POST /gastos: Registra un nuevo gasto.
    * PUT /gastos: Actualiza un gasto existente.
    * DELETE /gastos: Elimina un gasto del historial.



Este proyecto fue desarrollado como parte de un desafío de programación. Utiliza diversas tecnologías, incluyendo Node.js y Express

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más información.
