FROM node:18 as development

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=development /app/dist /app/dist
COPY --from=development /app/package.json .
COPY --from=development /app/package-lock.json .
COPY --from=development /app/.env .

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/src/main.js"]