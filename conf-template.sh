#!/bin/bash -ex
# 1. Imprimimos los logs de datos en un archivo separado (para debugging)
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

# 2. Descargamos nvm (gestor de versiones de nodejs)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# 3. Lo ejecutamos
. /.nvm/nvm.sh

# 3. Instalamos la version 14 de nodeJS 
nvm install 14

# 4. Agregamos variable de entorno de NVM
export NVM_DIR="/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

# 5. Upgrade yum
sudo yum upgrade

# 6. Instalamos git
sudo yum install git -y

# 7. Nos movemos a nuestro directorio de usuario
cd /home/ec2-user

# 8. Obtenemos nuestro codigo fuente del repositorio de github
git clone https://github.com/rvigil24/blog-app-server

# 9. Nos movemos al directorio del proyecto
cd blog-app-server

# 10. Creamos el archivo de configuracion
echo "PORT = 5000
NODE_ENV = \"production\"

# db settings
DB_HOST = \"database-hostname\"
DB_NAME = \"database-name\"
DB_USERNAME = \"database-username\"
DB_PASS = \"database-pass\"


# google auth settings
GOOGLE_AUTH_CLIENT_ID=\"tu id de google oauth\"
GOOGLE_AUTH_CLIENT_SECRET=\"tu secret de google oauth\"

# token
JWT_SECRET = \"super-secret-token\"

# smtp settings (smtp2go.com)
SMTP_HOST = \"host de smtp server (mail.smtp2go.com)\"
SMTP_PORT = \"puerto de smtp server (2525)\"
SMTP_USER = \"username de smtp server\"
SMTP_PASS = \"pass de smtp server\"
SMTP_SENDER_EMAIL = \"correo de persona que envia\"

# aws
AWS_S3_BUCKET_NAME = \"bucket-name\"
AWS_S3_REGION = \"us-east-1\"

# 2FA
MFA_AUTHENTICATION_APP_NAME = \"nombre-de-app\"" > .env

# 9. Asignamos los permisos respectivos
sudo chmod -R 755 .

# 10. Instalamos las dependencias de nuestro proyecto
npm install

# 11. inicializamos nuestra aplicacion
npm start > app.out.log 2> app.err.log < /dev/null &
