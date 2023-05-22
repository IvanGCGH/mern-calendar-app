# Calendar API

This repository is a practice project where an API for a calendar project is developed.

The first step is to make sure you install node_modules with:

```
npm install
```

Before run, you have to assign the following environment variables:

```
PORT=
DB_CNN=
SECRET_JWT_SEED=
```

The first variable is used to assign the PORT, the second to assign the MongoDB connection string and lastly the secret word of your JWT.

Once the previous configuration was done, run the application in development environment with:

```
npm run dev
```

or production environment:

```
npm start
```