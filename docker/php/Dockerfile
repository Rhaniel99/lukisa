# Corrigido "as" para "AS" para seguir a convenção
FROM php:8.2-fpm AS builder

# Argumentos que serão passados do docker-compose
ARG UID
ARG GID
ARG USER

# Instala dependências de sistema necessárias para compilar as extensões PHP
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libva-dev \
    mesa-va-drivers \
    ffmpeg \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Instala as extensões PHP
RUN docker-php-ext-install pdo pdo_pgsql bcmath zip pcntl intl

# Instala a extensão Redis via PECL (mais simples)
RUN pecl install redis && docker-php-ext-enable redis


# --- Estágio Final ---
# Usamos uma imagem base limpa. A versão -alpine é muito menor.
FROM php:8.2-fpm-alpine

# Copia as extensões PHP compiladas do estágio de 'builder'
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/

# Habilita explicitamente no estágio final as extensões que copiamos.
RUN docker-php-ext-enable pdo pdo_pgsql bcmath zip pcntl intl redis

# Argumentos e variáveis de ambiente
ARG UID
ARG GID
ARG USER
ENV UID=${UID}
ENV GID=${GID}
ENV USER=${USER}

# Instala apenas as dependências de sistema necessárias para a EXECUÇÃO
# ---- LINHA CORRIGIDA ----
RUN apk add --no-cache \
    libzip \
    icu-libs \
    postgresql-libs \
    oniguruma \
    ffmpeg \
    libva \
    libva-utils

# Adiciona usuário e grupo para rodar a aplicação sem ser root
RUN addgroup -g ${GID} -S ${USER} && adduser -u ${UID} -G ${USER} -S -s /bin/sh ${USER}

# Configura o PHP-FPM para usar o novo usuário
RUN sed -i "s/user = www-data/user = ${USER}/g" /usr/local/etc/php-fpm.d/www.conf \
    && sed -i "s/group = www-data/group = ${USER}/g" /usr/local/etc/php-fpm.d/www.conf

# Define o diretório de trabalho
WORKDIR /var/www/html

# O volume será montado aqui de qualquer forma.
USER ${USER}

# Expõe a porta do PHP-FPM
EXPOSE 9000

# Comando para iniciar o PHP-FPM
CMD ["php-fpm"]