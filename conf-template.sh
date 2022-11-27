#!/bin/bash -ex

# 1. Actualizamos nuestras dependencias
yum update -y
yum upgrade -y

# 2. Instalamos git
yum install git -y

# 3. Instalamos la version 14 de nodeJS 
curl -sL https://rpm.nodesource.com/setup_14.x | bash -
yum install -y nodejs git

# 4. Obtenemos nuestro codigo fuente del repositorio de github
cd /home/ec2-user/
git clone https://github.com/rvigil24/blog-app-server

# 5. Nos movemos al directorio del proyecto
cd blog-app-server

# 2. Creamos el archivo de configuracion
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

# 3. Asignamos los permisos respectivos
sudo chmod -R 755 .

# 4. Instalamos las dependencias de nuestro proyecto
npm install

# 5. Instalamos las dependencias restantes
npm install -g pm2

# 6. Ejecutamos pm2 para que el servicio se ejecute aunque el sistema se reinicie
pm2 start app/server.js
pm2 startup
pm2 save
