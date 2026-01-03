# --- Estágio de Build ---
FROM php:8.2-fpm-alpine AS builder

# Instala apenas dependências essenciais para imagens e PHP core
RUN apk add --no-cache \
    build-base \
    autoconf \
    automake \
    libtool \
    postgresql-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    libsodium-dev \
    gd-dev \
    freetype-dev \
    libpng-dev \
    libwebp-dev \
    libjpeg-turbo-dev

# Instala extensões PHP
RUN docker-php-ext-install pdo pdo_pgsql bcmath zip pcntl intl sodium exif

# Configura GD para imagens (JPG, WEBP, PNG)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd

RUN docker-php-ext-enable exif

# Redis
RUN pecl install redis && docker-php-ext-enable redis

# --- Estágio Final ---
FROM php:8.2-fpm-alpine

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia extensões compiladas
COPY --from=builder /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=builder /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/

ARG UID
ARG GID
ARG USER
ENV UID=${UID}
ENV GID=${GID}
ENV USER=${USER}

# Instala dependências de runtime
RUN apk add --no-cache \
    libzip \
    icu-libs \
    postgresql-libs \
    oniguruma \
    libsodium \
    freetype \
    libpng \
    libwebp \
    gd \
    libjpeg-turbo

RUN addgroup -g ${GID} -S ${USER} && adduser -u ${UID} -G ${USER} -S -s /bin/sh ${USER}

RUN sed -i "s/user = www-data/user = ${USER}/g" /usr/local/etc/php-fpm.d/www.conf \
    && sed -i "s/group = www-data/group = ${USER}/g" /usr/local/etc/php-fpm.d/www.conf

WORKDIR /var/www/html
USER ${USER}
EXPOSE 9000
CMD ["php-fpm"]