# Imagify

Demo of Fullstack Tiling Image Application

## Usage

Install MongoDB Locally

```
brew tap mongodb/brew
brew update
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

Set up your .env

```
cd server
cp .env.example .env
Add your runpod key
```

Start the server

```
cd server
yarn start
```

Start the frontend

```
cd client
yarn dev
```

Based Upon Boilerplates:

- https://github.com/viktorgullmark/react-express-mongo-ts-boilerplate
- https://github.com/a8hok/React-typescript-tailwind-boilerplate
