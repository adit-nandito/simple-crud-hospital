# CRUD Backend Solution

## Requirements
* NodeJS
* MySQL
* Postman

## How to
1. Clone this repository into your local
2. Run `npm install` to install dependencies
3. You may add file `.env` for config in your local repo if neccessary. Here are some sample params that given:
PORT=3000
MYSQL_CONFIG_HOST='localhost'
MYSQL_CONFIG_USER='root'
MYSQL_CONFIG_PASSWORD='password'
MYSQL_CONFIG_DATABASE='SiloamDB'
MYSQL_CONFIG_PORT=3306

5. After that, command on the terminal `npm start` to start the service
6. You can try to hit these API in your local via Postman. For sample `localhost:3000/api/siloam/v1/list-patient`. Here are some list API and sample request payload
- [GET] /api/siloam/v1/list-patient (To get all list data)
- [POST] /api/siloam/v1/selected-patient (To get specific data base on `id`)
  * Sample payload:
  {
    "id": "TEST123"
  }
- [POST] /api/siloam/v1/add-patient (To insert data)
  * Sample payload:
  {
    "firstName": "Tester",
    "lastName": "Testing",
    "dateOfBirth": "1983-05-11",
    "gender": "MALE",
    "phone": "081234567890",
    "email": "tester@tester.com",
    "address": "Jakarta"
  }
- [PUT] /api/siloam/v1/update-patient (To update data base on `id`)
  * Sample payload:
  {
    "id": "TEST123",
    "firstName": "Tester",
    "lastName": "Testing",
    "dateOfBirth": "1983-05-11",
    "gender": "MALE",
    "phone": "081234567890",
    "email": "tester@tester.com",
    "address": "Jakarta"
  }
- [DELETE /api/siloam/v1/delete-patient (To delete data base on `id`)
  * Sample payload:
  {
    "id": "TEST123"
  }

## Unit Testing
To running unit test, command on the terminal `npm run test`
