#!/bin/bash -ex

# 1. Descargamos nvm (gestor de versiones de nodejs)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# 2. Agregamos variable de entorno de NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 3. Instalamos la version 14 de nodeJS 
nvm install 14

# 4. Creamos el archivo de configuracion
echo "PORT = 5000
NODE_ENV = \"production\"

# db settings
DB_HOST = \"blog-app-db.cy4dcevdmtl6.us-east-1.rds.amazonaws.com\"
DB_NAME = \"blog_app_db\"
DB_USERNAME = \"blog_app_db_user\"
DB_PASS = \"blog_app_db_pass\"


# google auth settings
GOOGLE_AUTH_CLIENT_ID=\"718141910855-6gmtpna795q8avgh3vtk5g9e1oerbe59.apps.googleusercontent.com\"
GOOGLE_AUTH_CLIENT_SECRET=\"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\"

# token
JWT_SECRET = \"super-secret-token\"

# smtp settings (smtp2go.com)
SMTP_HOST = \"mail.smtp2go.com\"
SMTP_PORT = \"2525\"
SMTP_USER = \"higueros\"
SMTP_PASS = \"higueros25\"
SMTP_SENDER_EMAIL = \"201901049@ujmd.edu.sv\"

# aws
AWS_S3_BUCKET_NAME = \"blog-app-bucket-atw\"
AWS_S3_REGION = \"us-east-1\"

# 2FA
MFA_AUTHENTICATION_APP_NAME = \"nombre-de-app\"" > .env

# 5. Asignamos los permisos respectivos
sudo chmod -R 755 .

# 6. Instalamos las dependencias de nuestro proyecto
npm install

# 7. Instalamos las dependencias restantes
npm install -g pm2

# 8. Ejecutamos pm2 para que el servicio se ejecute aunque el sistema se reinicie
pm2 start app/server.js

sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v14.21.1/bin /home/ec2-user/.nvm/versions/node/v14.21.1/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user

pm2 save

pm2 startup
