
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

# Instalación

1.Clonar el repositorio
```bash
git clone https://github.com/cappll-lucia/TP-TTADS
```
2. Entra en la carpeta del proyecto
```bash
cd TP-TADS/serviya
```
3.Instalar las dependencias:
```bash
npm install
```
4.Completar las variables de entorno
```env
GOOGLE_EMAIL=""
GOOGLE_EMAIL_PASSWORD=""

BASE_URL='http://localhost:3000'
BLOB_READ_WRITE_TOKEN=""

MONGO_URL=""
```
Nota: para la url de mongo recomendamos usar [Atlas](https://www.mongodb.com/atlas)

5. Levantar el servidor de desarollo:
```bash
npm run dev
```


# [Video Demo](https://drive.google.com/file/d/1g5RAQgcv1-yZqnBU3l_VhSCdBs-Ntoc3/view)

# [Pull Requests](https://github.com/cappll-lucia/TP-TADS/pulls?q=is:pr%20is:closed)

# [Github Project](https://github.com/users/cappll-lucia/projects/2)

# API

`GET /`
`GET /login`
`GET /admin`
`GET /admin/service`
`GET /admin/service/[id]`
`GET /admin/province`
`GET /admin/province/provinceSchema.ts`
`GET /admin/city`
`GET /admin/city/citySchema.ts`
`GET /resetPassword`
`GET /resetPassword/[token]`
`GET /resetPassword/[token]/resetPasswordSchema.ts`
`GET /services`
`GET /services/[wantedService]`
`GET /profesional`
`GET /api`
`GET /api/city`
`GET /register`
`GET /description`
`GET /description/[imgId]`
`GET /about`
`GET /turnos`
`GET /profile`
`GET /profile/[id]`
`GET /locationSearch`
`GET /locationSearch/[provinceId]`
`GET /locationSearch/[provinceId]/[locationId]`
`GET /logout`
`GET /editme`

`POST /login/`
`POST /admin/service/[id]/`
`POST /resetPassword/`
`POST /resetPassword/[token]/`
`POST /profesional/`
`POST /register/`
`POST /editme/`
`POST /admin/service/?add_service`
`POST /admin/service/?delete_service`
`POST /admin/province/?add_province`
`POST /admin/province/?edit_province`
`POST /admin/city/?add_city`
`POST /admin/city/?modify_city`
`POST /misTurnos/?cancel`
`POST /misTurnos/?cancel`
`POST /profile/[id]/?agendar`
`POST /profile/[id]/?addReview`
`POST /profile/[id]/?editReview`
`POST /profile/[id]/?deleteReview`

# Unit Test Output
![unit_test_output](https://github.com/cappll-lucia/TP-TTADS/assets/71228261/a12e1fc1-866c-4317-96fe-571535ff5288)
