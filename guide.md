# 1 - Instalar las dependencias de proyecto
En mi caso todas las instalé con npm 

# 2 - Crear una base de datos y colocar la información de la misma en el .env
Utilicé el ORM sequelize e instalé las dependencias para que el proyecto trabaje con una base de datos MySql
en caso de utilizar otra tendria que instalar las dependencias del nuevo gestor de bases de datos
https://sequelize.org/v7/manual/getting-started.html#installing

# 3 - Colocar información de la base de datos en las variables de entorno
Una vez creada la base de datos y esta se encuentre encendida, colocar la data en las variables de entorno
para que sequelizer pueda apuntar a esta y así crear las modelos y las relaciones

> Las rutas se trabajaron utilizando el puerto 3001 para poder trabajar local, si se cambia tocaría cambiar en todas partes =( 

# 4 - RUTAS DE API

*Usuarios*
**GET** http://localhost:3001/api/users

**POST** http://localhost:3001/api/users/register

**POST** http://localhost:3001/api/users/login


*Productos*
**GET** http://localhost:3001/api/products

**GET** http://localhost:3001/api/products/1

**POST** http://localhost:3001/api/products

**PUT** http://localhost:3001/api/products/1

**DELETE** http://localhost:3001/api/products/1


*Categorias*
**GET** http://localhost:3001/api/category

**GET** http://localhost:3001/api/category/

**POST** http://localhost:3001/api/category

**PUT** http://localhost:3001/api/category/1

**DELETE** http://localhost:3001/api/category/1




# 4 Arrancar el proyecto con npm start
