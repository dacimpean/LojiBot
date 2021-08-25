## Loji
To start working with the project, please do the following:
- setup [docker](https://www.docker.com/get-started)
- setup [docker-compose](https://docs.docker.com/compose/install/)

You can pass various environment variables to docker containers to extend behaviour

We use `8080` port for the frontend application, `8081` for the website and `8090` for the backend api service.

#### Comands

- to run the project
```bash
docker-compose up -d --build
```

- to stop the project
```bash
docker-compose down
```

- to restart any service
```bash
docker-compose restart [name_of_service]
```
it can be `api`, `app` or any other service in the project

#### API docs

* Swagger

`//<api_url>/swagger/`

* Redoc 

`//<api_url>/redoc/`

* Django's Docs

`//<api_url>/docs/`


[Screenshots of Project]


![Снимок экрана 2019-05-07 в 22 43 53](https://user-images.githubusercontent.com/87672296/130852361-17827fc4-66a3-4065-8d79-edc64b4e3311.png)

![Снимок экрана 2019-05-07 в 22 49 38](https://user-images.githubusercontent.com/87672296/130852378-a90a5d4c-ba70-4d01-bcf4-25d8fa15ba7d.png)

![Снимок экрана 2019-05-07 в 22 46 08](https://user-images.githubusercontent.com/87672296/130852579-9c49992a-8856-4ebb-8e53-b7b2a8f59f2b.png)
