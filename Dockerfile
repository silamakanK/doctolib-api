# Utilise une image Node
FROM node:20

# Crée un dossier de travail
WORKDIR /app

# Copie package.json et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie le reste du code
COPY . .

# Expose le port
EXPOSE 3000

# Lancer l’app
CMD ["npm", "start"]
