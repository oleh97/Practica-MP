# Practica-MP
Juego tipo "Pinturillo" en el que un jugador dibuja y todos los demás intentan adivinar que está dibujando


## Integrantes del grupo
| Nombre y Apellidos          | Mail                               | Github     |
|-----------------------------|------------------------------------|------------|
| Héctor Mediero de la Morena | <h.mediero.2016@alumnos.urjc.es>   | HectorM15  |
| Adrián Gómez de Juan	      | <a.gomezdej@alumnos.urjc.esr>      | adriang5   |
| David Robles García  	      | <d.robles.2016@alumnos.urjc.es>    |            |
| Oleh Hrinchenko             |                                    | oleh97     |
| Álvaro Noguerales Ramos     | <a.noguerales.2016@alumnos.urjc.es>|            |
| Eduardo Luna Sñanchez       | <e.luna.2016@alumnos.urjc.es>      |            |
| Igor Teterycz		      | <I.teterycz.2016@alumnos.urjc.es>  | IgorT142   |
| María Gutiérrez Tapias      | <m.gutierrezt.2016@alumnos.urjc.es>|            |


## Como lanzarlo
Instalar Node
Abrir el terminal en la carpeta del proyecto
Lanzar solo la primera vez:
```
npm install
```
Cada vez que se quiera lanzar:
```
node server.js
```
Abrir ``` localhost ``` en el navegador


## Especificación de requerimientos de software (SRS)
===================
-   [1. Introducción](#Introduccion)
	-   [1.1 Propósito](#Proposito)
	-   [1.2 Glosario](#Glosario)
	
-   [2. Descripción General](#D.General)
	-   [2.1 Entorno del Sistema](#E.Sistema)
	-   [2.2 Especificación de Requisitos Funcionales](#E.R.S)
		-   [2.2.1 Casos de uso dibujantes](#C.Dibujantes)
		-   [2.2.2 Casos de uso y componentes lógica del juego](#C.Logica)
		-   [2.2.3 Casos de uso y componentes ranking](#C.Ranking)
  		-   [2.2.4 Componentes para pintar](#C.Pintar)
		-   [2.2.5 Casos de uso acceder](#C.Acceder)			
	-   [2.3 Caracteristicas del usuario](#C.Usuario)
	-   [2.4 Requisitos no Funcionales](#R.N.F)
    
-   [3. Especificación de Requisitos](#E.Requisitos)
	-   [3.1 Requisitos de la interfaz externa](#R.I.E)
		-   [3.1.1 API](#API)
		-   [3.1.2 NODE](#NODE)
	-   [3.2 Requisitos Funcionales](#R.F)
	-   [3.3 Requisitos NO Funcionales](#R.N.Funcionales)
		-   [3.3.1 Logical Structure of the Data](#LSOD)
	-   [3.4 Arquitectura del Sistema](#A.Sistema)
		-   [3.4.1 Patron de Arquitectura](#P.Arquitectura)
		-   [3.4.2 Lenguaje de Diseño](#L.Diseño)
		-   [3.4.3 Lenguaje de Programación](#L.Programacion)
		-   [3.4.4 Entorno de Ejecución](#E.Ejecucion)
    


## 1- INTRODUCCIÓN<a name="Introduccion"></a>

La aplicación consistirá en hacer un pinturillo que tendrá tres secciones:

<a href="https://ibb.co/1Q9BFGS"><img src="https://i.ibb.co/dMQX84h/Captura-de-pantalla-2019-05-02-a-las-13-00-58.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-00-58" border="0"></a>

Tendrá tres secciones, pantalla principal, ranking de puntuaciones y chat. 
Será una aplicación multijugador en la que una persona será la encargada de pintar, tendrá que pintar un objeto que se le mostrará solo a él sacado de una lista de objetos predefinidos (o una base de datos web). El resto de jugadores intentará adivinar el objeto usando el chat. Cada cierto tiempo el programa rellenará parte de las letras del objeto como pista. Según 
el tiempo que se tarde en adivinar la palabra se recibirá más o menos puntuación. Una vez que se adivine la palabra o se termine el tiempo límite para adivinar la palabra, el “pintor” pasará a ser un jugador normal y corriente y otro jugador pasará a ser el nuevo pintor.

### 1.1. Propósito<a name="Proposito"></a>
El presente documento tiene como propósito definir las especificaciones funcionales, no funcionales y del sistema para la implementación de una aplicación WEB que permitirá jugar en línea con otros jugadores en una sala al pinturillo.

### 1.2. Glosario<a name="Glosario"></a>

| Términos	| Descripción  							     |
|---------------|------------------------------------------------------------------- |
| Canvas	| Pizarra que se utilizará para dibujar o pintar. 		     |
| Nickname	| Es un nombre de fantasía o un nombre para abreviar un nombre mayor.|
| Turno		| Orden según el cual se alternan varias personas en la realización de una actividad o un servicio.								    |
| Ranking	| Lista o relación ordenada de cosas o personas con arreglo a un criterio determinado.|
| Chat		| Comunicación en tiempo real que se realiza entre varios usuarios cuyas computadoras están conectadas a una red, generalmente Internet; los usuarios escriben mensajes en su teclado, y el texto aparece automáticamente y al instante en el monitor de todos los participantes.|
| Adivinar	| Descubrir algo de forma intuitiva, sin utilizar procedimientos basados en la razón ni en los conocimientos científicos|


## 2- DESCRIPCIÓN GENERAL<a name="D.General"></a>

### 2.2. Entorno del Sistema<a name="E.Sistema"></a>
El Pinturillo es un juego multijugador en el que los jugadores acceden a la página web del juego a través de internet mediante el propio navegador del usuario.

### 2.2. Especificación de Requisitos Funcionales<a name="E.R.S"></a>

#### 2.2.1. Casos de uso dibujantes<a name="C.Dibujantes"></a>
 - Descripción: El juego tiene que tener un chat por el cual los jugadores que observen al otro dibujar, puedan intentar adivinar la palabra. El jugador que dibuja tendrá el chat desactivado.

<a href="https://ibb.co/BKM4JRs"><img src="https://i.ibb.co/JFJxTPk/Captura-de-pantalla-2019-05-02-a-las-13-01-09.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-01-09" border="0"></a>

Paso por paso:
1. El jugador ve el canvas con lo que hay dibujado.
2. El sistema ofrece un chat para poder escribir la palabra que el jugador cree correcta.
3. El jugador envía la palabra.
4. El sistema muestra si ha acertado o fallado.

- Descripción: Solo puede pintar un jugador en el cambas por turno el resto deberá adivinar la palabra.

<a href="https://ibb.co/R2WH9sQ"><img src="https://i.ibb.co/qBw1dcm/Captura-de-pantalla-2019-05-02-a-las-13-01-17.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-01-17" border="0"></a>

Paso por paso:
1. El jugador selecciona un color.
2. El jugador dibuja en el lienzo utilizando el ratón.
3. El jugador solo tiene un minuto para dibujar.
4. El resto de jugadores intenta adivinar la palabra.
5. Al pasar el minuto el turno pasa al siguiente jugador.

#### 2.2.2. Casos de uso y componentes lógica del juego<a name="C.Logica"></a>
- Descripción: 1 minuto por turno.

<a href="https://ibb.co/kcXs8XF"><img src="https://i.ibb.co/SvB4nBp/Captura-de-pantalla-2019-05-02-a-las-13-01-26.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-01-26" border="0"></a>

Paso por paso:
1. El turno del jugador comienza.
2. El tiempo pasa hasta llegar al minuto.
3. Cuando el tiempo llega al minuto el turno pasa al siguiente jugador.

<a href="https://ibb.co/myjyTt1"><img src="https://i.ibb.co/8xCxs2T/Captura-de-pantalla-2019-05-02-a-las-13-01-31.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-01-31" border="0"></a>

- Descripción: En cada turno, el servidor elige una palabra aleatoria de entre todas las posibles (generadas por una API) y se la muestra al jugador que va a dibujar, pasados 5s se le permite dibujar. Tipos de palabras:
. Adjetivos
. Acciones
. Sustantivos

Paso por paso:
1. El sistema elige una palabra para que los jugadores la adivinen.
2. El sistema muestra la palabra al jugador que dibuja.
3. El sistema muestra guiones por cada letra de la palabra.
4. El sistema permite al jugador principal dibujar pasados cinco segundos.

<a href="https://ibb.co/LNG98RW"><img src="https://i.ibb.co/WVTB65w/Captura-de-pantalla-2019-05-02-a-las-13-01-40.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-01-40" border="0"></a>


#### 2.2.3. Casos de uso y componentes Ranking<a name="C.Ranking"></a>

-Descripción: La palabra a adivinar se representará mediante barras bajas “_”, tantas como letras tenga esta.

<a href="https://ibb.co/jZ1WvQy"><img src="https://i.ibb.co/pr9RvMf/Captura-de-pantalla-2019-05-02-a-las-13-01-46.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-01-46" border="0"></a>

Paso por paso:
1. El sistema elige una palabra aleatoria.
2. El sistema representará la palabra mediante barras bajas.

- Descripción: El juego tendrá un ranking de puntos entre todos los jugadores.
. Si el jugador adivina lo que se está dibujando recibe los segundos restantes como puntos.
. El jugador que dibuja obtiene la mitad de los puntos del primero jugador que acierte, premiando que se dibuje bien.

Paso por paso:
1. El jugador escribe una palabra en el cuadro de texto del chat.
2. El jugador envía la palabra.
3. El sistema verifica si la palabra es correcta.
4. El sistema premia al jugador que adivina la palabra  con los puntos que corresponden con los segundos restantes del turno.
5. El sistema premia al jugador que dibuja con la mitad de puntos del primer jugador.

<a href="https://ibb.co/sJ4cg67"><img src="https://i.ibb.co/930BpVP/Captura-de-pantalla-2019-05-02-a-las-13-01-53.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-01-53" border="0"></a>

#### 2.2.4. Componentes para pintar<a name="C.Pintar"></a>
- Descripción: Crear un canvas (una pizarra) en la que poder dibujar usando el ratón. 
. Incluir cambios de grosor del trazo
. Incluir cambios de color para el trazo
. Poder borrar los trazos realizados

Paso por paso:
1. El sistema crea un lienzo que es visible para todos los jugadores.
2. El jugador que dibuja hace click en el grosor para cambiar el grosor.
3. El jugador que dibuja hace click en la paleta de colores para cambiar el color.
4. El jugador que dibuja pinta en el lienzo.

#### 2.2.5. Casos de uso Acceder<a name="C.Acceder"></a>
-Descripción: Para acceder al juego el usuario tendrá que seleccionar un nickname.

<a href="https://ibb.co/3Fm7CXB"><img src="https://i.ibb.co/R6T9Dnz/Captura-de-pantalla-2019-05-02-a-las-13-02-00.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-02-00" border="0"></a>

Paso por paso:
1. El jugador introduce un nickname pedido por el sistema. 
2. Si el nickname introducido del jugador está mal el sistema volverá a seguir pidiendo que introduzca un nickname. 
3. Si el nickname introducido por el usuario es correcto entrará al juego. 

<a href="https://imgbb.com/"><img src="https://i.ibb.co/98LV5qN/Captura-de-pantalla-2019-05-02-a-las-13-02-04.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-02-04" border="0"></a>

### 2.3. Caracteristicas del Usuario<a name="C.Usuario"></a>
Se espera de los jugadores que tengan acceso a internet y puedan hacer uso de un motor de búsqueda. También se espera del usuario que pueda introducir datos por teclado y hacer uso del ratón ya que la pantalla de inicio requiere un nick y ya dentro se tendrá que hacer uso del chat y de la pizarra para dibujar una palabra proporcionada por el sistema.

### 2.4. Requisitos No Funcionales<a name="R.N.F"></a>
El Pinturillo estará en un servidor que será el encargado de establecer la conexión entre los distintos jugadores de forma que todos vean lo que se está dibujando, también se encargará de gestionar los mensajes del chat.



## 3- ESPECIFICACIÓN DE REQUISITOS<a name="E.Requisitos"></a>

### 3.1. Requisitos de la interfaz externa<a name="R.I.E"></a>

#### 3.1.1. API<a name="API"></a>
La aplicación hace uso de una API, es un conjunto de funciones y procedimientos que cumplen una o muchas funciones con el fin de ser utilizadas por otro software. Las siglas API vienen del inglés Application Programming Interface.
Una API nos permite implementar las funciones y procedimientos que engloban en nuestro proyecto sin la necesidad de programarlas de nuevo. En términos de programación, es una capa de abstracción.

#### 3.1.2 NODE<a name="NODE"></a>
La aplicación hace uso de Node.js  que es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación ECMAScript, asíncrono, con I/O de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google. Fue creado con el enfoque de ser útil en la creación de programas de red altamente escalables, como por ejemplo, servidores web.


### 3.2. Requisitos Funcionales<a name="R.F"></a>

| Nombre						| Elegir color 																								|
|-------------------|------------------------------------------------------------ |
| Trigger						| El jugador accede a la paleta de colores										|
| Precondición			| Es el turno de ese jugador																	|
| Ruta básica				| El sistema dibuja en negro por defecto											|
| Ruta alternativa	| El jugador hace click en la paleta de colores, el sistema despliega la paleta y el jugador selecciona un color|
| Postcondición			| EL pincel pinta del color elegido														|


| Nombre						| Dibujar en la pizarra 																			|
|-------------------|------------------------------------------------------------ |
| Trigger						| El sistema deja dibujar al jugador													|
| Precondición			| Es el turno de ese jugador																	|
| Ruta básica				| El sistema presenta un lienzo, el jugador utiliza el raton para dibujar sobre el y el sistema muestra lo que se dibuja en el lienzo a todos los jugadores	|
| Ruta alternativa	| El jugador no dibuja																				|
| Postcondición			| El turno acaba con un dibujo del jugador en el lienzo				|


| Nombre						| Borrar la pizarra|
|-------------------|------------------------------------------------------------ |
| Trigger						| El jugador selecciona el boton RESETEAR											|
| Precondición			| El jugador ha pintado en el lienzo													|
| Ruta básica				| El jugador ha dibujado en el lienzo, pulsa sobre el boton de reseteo y el sistema muestra el lienzo en blanco																								|
| Ruta alternativa	| El lienzo esta en blanco, el jugador pulsa el boton de resteo y el sistema muestra el lienzo en blanco																											 |
| Postcondición			| El sistema muestra el lienzo en blanco 											|



| Nombre						| Ver la palabra a adivinar																		|
|-------------------|------------------------------------------------------------ |
| Trigger						| El jugador tiene que dibujar una palabra										|
| Precondición			| El jugado debe dibujar																			|
| Ruta básica				| El sistema elige una palabra y la muestra al jugador				|
| Postcondición			| Los demás jugadores pueden empezar a adivinar la palabra    |


| Nombre						| Escribir en el chat																					|
|-------------------|------------------------------------------------------------ |
| Trigger						| El usuario selecciona el cuadro de texto del chat						|
| Precondición			| El jugador debe adivinar la palabra  												|
| Ruta básica				| El jugador elecciona el cuadro de texto del chat, escribe una palabra y al darle al boton de enviar, el sistema verifica si es la palbara correcta. Siacierta, recibe una puntuación como recompensa|
| Postcondición			| El jugador envia una palabra      													|


| Nombre						| Ver numero de letras																				|
|-------------------|------------------------------------------------------------ |
| Trigger						| El jugador tiene que adivinar una palabra										|
| Precondición			| El jugador no tiene que dibujar															|
| Ruta básica				| El sistema elige una palabra, el sistema muestra esa palabra en formato de barras bajas y el jugador puede ver cuantas letras tiene esa palabra.						 |
| Postcondición			| Los demás jugadores pueden empezar a adivinar la palabra    |


| Nombre						| Sumar segudos al contador						   											|
|-------------------|------------------------------------------------------------ |
| Trigger						| El tiempo comienza																					|
| Precondición			| Empieza el turno del jugador																|
| Ruta básica				| El sistema dibuja en negro por defecto											|
| Ruta alternativa	| El tiempo empieza en 0, se suma 1 al tiempo cada segundo y se para al llegar a los 60 segundos|
| Postcondición			| El turno termina																						|

| Nombre						| Cambiar de turno																						|
|-------------------|------------------------------------------------------------ |
| Trigger						| El jugador juega la siguiente partida												|
| Precondición			| El turno anterior ha terminado															|
| Ruta básica				| El jugador esta dentro de la partida, el sistema finaliza el turno anterior y asigna turno al siguiente. El resto de jugadores adivina.							 |
| Postcondición			| El jugador que dibuja es otro distinto al del turno anterior|							


| Nombre						| Elegir palabra 																							|
|-------------------|------------------------------------------------------------ |
| Trigger						| El turno comienza																						|
| Precondición			| El jugador que dibuja ha sido seleccionado									|
| Ruta básica				| El jugaor que dibuja es elegido, el sistema elige una palabra aleatoria y el sistema muestra la palabra a ese jugador																				|
| Postcondición			| El jugador que dibuja puede ver la palabra									|


| Nombre						| Realizar Login																							|
|-------------------|------------------------------------------------------------ |
| Trigger						| El jugador entra en el sitio web														|
| Precondición			| El jugador tiene acceso al sitio web												|
| Ruta básica				| El jugador entra en la pagina web y el sistema muestra un cuadro de texto donde el jugador deberá introducir su nickname. El sistema guarda el nickname y muestra la pantalla principal con su nombre en el apartado de PUNTOS												 |
| Postcondición			| EL pincel pinta del color elegido														|


### 3.3- Requisitos No Funcionales<a name="R.N.Funcionales"></a>

#### 3.3.1. Logical Structure od the Data<a name="LSOD"></a>

<a href="https://ibb.co/6JcW3v7"><img src="https://i.ibb.co/WpN2bD4/Captura-de-pantalla-2019-05-02-a-las-13-02-20.png" alt="Captura-de-pantalla-2019-05-02-a-las-13-02-20" border="0"></a>

### 3.4. Arquitectura del Sistema<a name="A.Sistema"></a>

#### 3.4.1. Patrón de Arquitectura<a name="P.Arquitectura"></a>
Modelo Vista Controlador (MVC)
Arquitectura Cliente Servidor

#### 3.4.2. Lenguaje de Diseño<a name="L.Diseño"></a>
Lenguaje de Modelado Unificado(UML)

#### 3.4.3. Lenguaje de Programación<a name="L.Programacion"></a>
JavaScript
HTML
CSS

#### 3.4.4. Entorno de Ejecución<a name="E.Ejecucion"></a>
Node.js
