<h1 align="center"> CRUD de Recursos Humanos </h1>
<p>Este proyecto es un ejemplo de un sistema CRUD de recursos humanos construido en React utilizando Bootstrap como framework de diseño. La base de datos es gestionada a través de MySQL y Sequelize, lo que permite una interacción sencilla con la base de datos y una fácil gestión de los datos.

Además, este proyecto utiliza PNPM como gestor de paquetes, lo que simplifica la instalación y actualización de las dependencias del proyecto.

La aplicación permite crear, leer, actualizar y eliminar datos de recursos humanos, lo que la convierte en una herramienta muy útil para la gestión del personal de una empresa. Además, la interfaz de usuario es intuitiva y fácil de usar, lo que la hace accesible incluso para usuarios con poca experiencia en el uso de aplicaciones web.</p>

<h1>Instalación</h1>
<h3>MySQL</h3>
<ol>
<li>Crea una base de datos llamada 'human_resources' en MySQL.</li>
<li>En el archivo '.env' ubicado en la raíz del proyecto, modifica la variable 'MYSQL_PASSWORD' con la contraseña de MySQL que desees utilizar.</li>
</ol>
<h3>Dependencias y Cliente</h3>
<ol>
<li>Abre una terminal en la carpeta del proyecto y ejecuta el comando 'pnpm i' para instalar las dependencias.</li>
<li>Para iniciar el cliente, ejecuta el comando 'pnpm --filter client run start' en la terminal.</li>
</ol>
<h3>Servidor</h3>
<ol>
<li>Para iniciar el servidor, ejecuta el comando 'pnpm --filter server run start' en la terminal.</li>
</ol>
<br/>
<p><b>Nota:</b> Asegúrate de tener instalado Node.js y PNPM en tu sistema antes de realizar la instalación. También debes tener acceso a una instancia de MySQL para crear la base de datos y configurar la contraseña correspondiente en el archivo '.env'.</p>
