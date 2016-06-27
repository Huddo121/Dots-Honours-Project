FROM nginx

EXPOSE 80

COPY target /usr/share/nginx/html
