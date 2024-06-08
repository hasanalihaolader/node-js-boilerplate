## 🚀 Node.js Boilerplate with Express

This boilerplate includes the setup for a Node.js application using Express, MySQL with Sequelize ORM, and Winston for logging.
</br></br>

## 📋 Prerequisites
	- Node.js: >= v18.16.1
	- Framework: Express
	- Database: MySQL
	- ORM: Sequelize
	- Logger: Winston


</br></br>

## 📦 Installation

1. Copy the example environment file:
    ```sh
    cp .envexample .env
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. For development:
    ```sh
    npm run watch
    ```

4. For production:
    ```sh
    npm run build
    ```

</br></br>

## 📖 Development Documentation

</br>

#### ⚙️ Port Configuration

You can configure the port on which your application runs. Check the `.env` file:
```env
APP_PORT=5000
```


#### 🗄️ Connect Your Database
Update the `.env` file according to your database configuration:
```env
# DB CONFIGURATION
DB_CONNECTION=mysql
DB_NAME=sts
DB_USERNAME=root
DB_PASSWORD=secret
DB_HOST=localhost
DB_PORT=33060
```

</br></br>

### 🔄 Migrations and Models



#### Generate Model with Migration
```sh
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

#### Generate a migration:
```sh
npx sequelize-cli migration:generate --name migration-skeleton
```

#### Run Migrations
```sh
npx sequelize-cli db:migrate --to XXXXXXXXXXXXXX-create-posts.js
```
#### Run all migrations:
```sh
npx sequelize-cli db:migrate
```

#### Rollback the last migration:
```sh
npx sequelize-cli db:migrate:undo
```

#### Rollback all migrations:
```sh
npx sequelize-cli db:migrate:undo:all
```

#### Rollback to a specific migration:
```sh
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```



</br></br>

### Seed Operations 🌱

#### Generate a seed:
```sh
npx sequelize-cli seed:generate --name demo-user
```

#### Run all seeds:
```sh
npx sequelize-cli db:seed:all
```

#### Undo the last seed:
```sh
npx sequelize-cli db:seed:undo
```

#### Undo all seeds:
```sh
npx sequelize-cli db:seed:undo:all
```

#### Undo a specific seed:
```sh
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
```


</br></br>

### Logging 📜
You can modify your log configuration by updating the .env file:
```env
LOG_LEVEL='info'
LOG_STORAGE_PATH='src/storage/logs'
```

Log levels:
```sh
error: 0
warn: 1
info: 2
http: 3
verbose: 4
debug: 5
silly: 6
```

Example of writing logs in your application:
```js
logger.info('userProfile', 200, 'User profile fetched successfully', { user: req.user });
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.debug('This is a debug message');
```
