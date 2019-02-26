# ns-project

El proyecto usa flask y react

# Ejecución

1. `$docker build -t proyecto:latest`
2. `$docker run --name project -d -p 3000:3000 -p 5000:5000 --rm project:latest`
3. `probar en http://localhost:3000. Esto abrirá la aplicación de react`


# API

1. `$ POST /api/users username=pepe pasword=pass Crea Usuarios. No requiere autorización`
2. `$ GET /api/users Regresa la lista de todos los usuarios`
3. `$ GET /api/users/id Regresa un usuario por id`
4. `$ POST /api/tasks/id El usuario actual crea una tarea y la asigna al usario con id: id`
5. `$ GET /api/tasks/ Regresa las tareas asignadas al usuario actual`
6. `$ POST /api/tokens Genera un token para la autorización de endpoints que lo requieren`
7. `$ POST /api/logout Revoca token`

# Notas:

Una tarea puede asignarse incluso al mismo usuario que las crea.
