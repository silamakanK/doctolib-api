FROM node:20
WORKDIR /app
COPY package*.json ./   
RUN npm install

COPY . .

RUN npx prisma generate --schema=prisma/schema.prisma
RUN node -e "require('./prisma/generated/client').PrismaClient().$connect().then(() => console.log('DB connection OK')).catch(console.error)"
EXPOSE 3000
CMD ["npm", "start"]