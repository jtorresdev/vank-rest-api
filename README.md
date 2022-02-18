# Vank REST API

Servicio para administrar clientes y facturas

## Requerimientos

- Node >= 16.0.0
- Docker y Docker Compose

## Documentación

Toda la documentación esta disponible [aquí](http://ec2-100-25-217-147.compute-1.amazonaws.com/docs/)

## Desarrollo

    > git clone https://github.com/jtorresdev/vank-rest-api.git
    > yarn
    > make up
    
También puedes usar `docker-compose up` para levantar el entorno de desarrollo

## Test unitarios

	> yarn test

## Despliegue a producción

    > make up-prod

## En proceso

 - [ ] CI/CD con Github actions
