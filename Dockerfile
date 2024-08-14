FROM node:16-alpine
RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD ["npm", "run", "dev"]