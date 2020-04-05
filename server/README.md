# Server side code and configuration for Digital Posters

The setup information below is for a Ubuntu based distribution, we intalled it on Ubuntu 18.04. In order to run the applications you need NodeJS 12.x and npm 6.x.

## Setup & installation

Install dependencies by running `npm install` inside server and client directories

Install pm2 with `npm install -g pm2` and run `pm2 start server.js`

Install vue cli with `npm install -g vue cli` and run `npm run build` to get a static build of the client. Move the static build to

Install nginx with `sudo apt install nginx` and ensure that ufw is either disabled or allows `Nginx Full`.

Switch to root user and edit the default nginx config `vim /etc/nginx/sites-available/default`

Use the following configuration. Replace ports and urls as necessary. Make sure the static paths point to the app folders.

```
server {
        listen 80;
        server_name server.poster-cloud.studio;

        location / {
                proxy_pass http://localhost:3000/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}

server {
        listen 80;
        server_name poster-cloud.studio;

        location / {
                root /home/ubuntu/DigitalPosters/Landing;
                try_files $uri /index.html;
        }
}

server {
        listen 80;
        server_name editor.poster-cloud.studio;

        location / {
                root /home/ubuntu/dist;
                try_files $uri /index.html;
        }
}
```

Test the configuration `nginx -t` and then reload nginx `/etc/init.d/nginx reload` then exit root.
