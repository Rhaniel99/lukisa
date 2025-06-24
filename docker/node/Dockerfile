# Comece com a mesma imagem base que você já usa
FROM node:lts-alpine

# Atualiza o NPM para a versão mais recente durante a construção da imagem
# As flags --no-update-notifier e --no-fund evitam mensagens desnecessárias no log
RUN npm install -g npm@latest --no-update-notifier --no-fund

# Define o diretório de trabalho padrão dentro do container
WORKDIR /var/www/html