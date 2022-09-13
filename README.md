# Proyecto CoderHouse JS :rocket:

### Descripción de la app :man_technologist:

Se crea con el objetivo de realizar una app que le permita al usuario sacar un turno para asistir a una oficina.
La app es totalmente responsive.
Cuenta con la interacción de un formulario que se despliega automaticamente al hacer click en el boton "RESERVAR", el mismo tambien se puede cerrar mediante un botón.
En el formulario se implemetaron distintas validaciones para poder sacar un turno correctamente, algunas de ellas son:

##### Validaciones
-  No se puede enviar con espacios en blanco.
-  No puede quedar ningun campo vacío.
- Solo se puede reservar un turno en el dia siguiente de la fecha que se esta reservando.
- Solo se puede reservar días de semana.
- Se podra reservar solo si el turno seleccionado se encuentra desocupado.

Si el usuario intenta enviar el formulario sin seguir estas validaciones, se mostraran guias para el correcto envio del mismo.

##### Guardado

Para el guardado de los datos se utilza provisoriamente y porque era lo requerido el localStorage.
Los turnos que se realicen correctamente quedaran guardados en el localStorage, para poder revisar los turnos del usuario se crea la seccion "Mis turnos" ubicada en el nav donde el usuario puede consultar sus turnos solicitados, eliminarlos individualmente o de forma conjunta. Se utilizan distintos tipos de alertas para interactuar con el usuario.

##### Utilización de APIs

Para el proyecto es requerida la utilización y consumo de APIs, se utilizan las siguientes:

**openweathermap:** API del clima que usa la ubicación del usuario y le muestra el nombre de su ciudad, la temperatura y la fecha actual.

**emailjs:** Esta API captura lo que el usuario envía através del formulario y envía esos datos a un email previamente configurado cuando el turno es solicitado exitosamente, informandole a la empresa/dueño de la oficina todos los datos del turno.

##### Tecnologías

###### - HTML
###### - CSS
###### - JAVASCRIPT

##### Librerías

###### - BOOTSTRAP
###### - SWEETALERT2
###### - LUXON
###### - GOOGLE FONTS