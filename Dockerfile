FROM node:20

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./src /usr/src/app/src/.
COPY ./tsconfig.json /usr/src/app/tsconfig.json
COPY ./tsconfig.build.json /usr/src/app/tsconfig.build.json
COPY ./package.json /usr/src/app/package.json
COPY prisma ./prisma

RUN npm i
RUN npm run build
# RUN npx prisma migrate dev

ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/mydb

EXPOSE 3000

CMD ["npm", "run", "start:migrate"]