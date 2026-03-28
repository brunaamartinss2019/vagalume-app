FROM node:20-alpine

WORKDIR /app

COPY package*.json /app/
RUN npm install --omit=dev

COPY . /app/

CMD ["npm", "start"]
```

Y también crea un archivo `.dockerignore` en la misma carpeta `api/`:
```
node_modules
.env