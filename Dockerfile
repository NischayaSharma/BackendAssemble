FROM node:14
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ENTRYPOINT NODE_ENV=production node .
