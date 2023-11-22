# Propuesta TP - Tecnicas y tecnologias Avanzadas de Desarollo de Software

## Grupo
### Integrantes
* 47799 - Cappellini, Lucía
* 47773 - Mollo, Bruno
* 47772 - Di Giacinti, Ramiro
* 46095 - Braida, Facundo 

## Tema
### Descripción
Se desarrollará una plataforma que pondrá en contacto personas que brindan distintos servicios con sus potenciales clientes.

## Alcance Funcional 

### Alcance Mínimo

#### Regularidad:
<table>
    <tr>
        <th>Req</th>
        <th>Detalle</th>
    </tr>    
    <tr>
        <td>CRUD simple</td>
        <td>
            <ol>
                <li>Provincia</li>                
                <li>Ciudad</li>
                <li>CRUD Servicio</li>
                <li>CRUD Usuario</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>CRUD dependiente</td>
        <td>
            <ol>
                <li>CRUD Turno,  depende de Usuario</li>
                <li>CRUD Review, depende de Usuario</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>Listado y detalle</td>
        <td>
            <ol>
                <li>
                    Listado de Profesionales filtrado por servicio/nombre, muestra nombre, servicio, puntaje => detalle muestra perfil de Profesional con Reviews   
                </li>
                <li>
                    Listado de Turnos pendientes de un Profesional, muestra  fecha, lugar y descripcion => detalle     muestra 
                    fecha, lugar, descripcion y Cliente; ademas de opcion de cancelar 
                </li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>CUU/Epic</td>
        <td>
            <ol>
                <li>Agendar turno con Profesional</li>
                <li>Realizar Review de Profesional</li>
            </ol>
        </td>
    </tr>
</table>


#### Adicionales para Aprobación:

<table>
    <tr>
        <th>Req</th>
        <th>Detalle</th>
    </tr>
    <tr>
        <td>CRUD</td>
        <td>
            <ol>
                <li>Provincia</li>                
                <li>Ciudad</li>
                <li>CRUD Servicio</li>
                <li>CRUD Usuario</li>
                <li>CRUD Turno</li>
                <li>CRUD Review</li>
            </ol>
        </td>
    </tr>
    <tr>
        <td>CUU/Epic</td>
        <td>
            <ol>
                <li>Convertirse en profesional</li>
                <li>Agendar turno con Profesional</li>
                <li>Realizar Review de Profesional</li>
                <li>Cancelar Truno con Profesional</li>
                <li>Recuperar contraseña</li>
            </ol>
        </td>
    </tr>
</table>


### Alcance Adicional Voluntario

- Envio de mails para notificaciones sobre los turnos

