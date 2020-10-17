# Mangga Chat API
![GitHub repo size in bytes](https://img.shields.io/github/repo-size/joonacode/backend-manggachat)

This API is for Mangga Chat App

## Build with
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [Socket.io](https://socket.io/)

## Requirements
* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [Postman](https://www.getpostman.com/) for testing

## Project setup

```
npm install
```

### Install nodemon

Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

If you have already installed, skip this step.

```
npm install -g nodemon
```

### Setup .env example

Create .env file in your root project folder.

```
PORT = 4000
DB_HOST = localhost
DB_USER = root
DB_PASSWORD = db_pass
DB_DATABASE = db_manggaChat
PRIVATE_KEY = some_random_key
BASE_URL = http://localhost:4000
BASE_URL_ACTIVATE = http://localhost:8080/login/verify-account
BASE_URL_RESET_PASSWORD = http://localhost:8080/reset-password
# for send email
EMAIL_USER = your_email
PASS_USER = your_password
USER_ROOT = cbe87590-82f2-4cea-81b2-571bfeab63f9
```

### Run project for development

```
npm run dev
```

