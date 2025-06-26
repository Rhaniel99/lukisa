# --- Estágio de Build (AGORA EM ALPINE) ---
FROM php:8.2-fpm-alpine AS builder

# Instala as dependências de compilação necessárias no Alpine
# Usamos 'apk add'. Note os pacotes com sufixo '-dev'.
# 'build-base' é como o 'build-essential' do Debian.
RUN apk add --no-cache \
    build-base \
    autoconf \
    automake \
    libtool \
    wget \
    postgresql-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    libsodium-dev \
    ffmpeg-dev \
    libva-dev \
    libjpeg-turbo-dev 


# Instala as extensões PHP, incluindo 'sodium' que estava faltando
RUN docker-php-ext-install pdo pdo_pgsql bcmath zip pcntl intl sodium exif

# garante que o ini de exif exista e seja carregado no CLI
RUN docker-php-ext-enable exif

# Instala a extensão Redis via PECL
RUN pecl install redis \
 && docker-php-ext-enable redis

# --- Estágio Final (Continua Alpine) ---
FROM php:8.2-fpm-alpine

# Copia o Composer da imagem oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia as extensões e suas configurações do nosso builder Alpine (agora compatível)
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/

# Argumentos e variáveis de ambiente
ARG UID
ARG GID
ARG USER
ENV UID=${UID}
ENV GID=${GID}
ENV USER=${USER}

# Instala APENAS as dependências de RUNTIME (sem '-dev')
RUN apk add --no-cache \
    libzip \
    icu-libs \
    postgresql-libs \
    oniguruma \
    libsodium \
    ffmpeg \
    libva \
    libjpeg-turbo

# Adiciona usuário e grupo para rodar a aplicação sem ser root
RUN addgroup -g ${GID} -S ${USER} && adduser -u ${UID} -G ${USER} -S -s /bin/sh ${USER}

# Configura o PHP-FPM para usar o novo usuário
RUN sed -i "s/user = www-data/user = ${USER}/g" /usr/local/etc/php-fpm.d/www.conf \
    && sed -i "s/group = www-data/group = ${USER}/g" /usr/local/etc/php-fpm.d/www.conf

WORKDIR /var/www/html

USER ${USER}

EXPOSE 9000

CMD ["php-fpm"]