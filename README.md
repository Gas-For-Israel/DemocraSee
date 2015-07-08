Installation instructions
=========================

Install nodejs such that node is in your PATH
Install git such that git is in your PATH

git clone https://github.com/Aharon-Porath/Democrasee.git
cd Democrasee
# install all node requirements
npm install
# create mongo db root if it doesn't exist
[ -e .data ] || mkdir .data
# mongo run
## windows
RunMongo.bat
## linux
./RunMongo.sh

# set environment variables that config.js will use.
# you could also edit config.js but remember not to commit any changes!
export S3_KEY=s3key
export S3_SECRET=s3secret
export S3_BUCKET=s3bucket
export SENDGRID_USERNAME=sendgrid-username
export SENDGRID_PASSWORD=sendgrid-password
export FACEBOOK_APPID=facebook-appid
export FACEBOOK_SECRET=facebook-secret
export FACEBOOK_APPNAME=facebook-appname
export DEMOCRASEE_SYSTEM_EMAIL=democrasee@example.com

# Launching on port 8080
PORT=8080 node app.js
# Launching on port 80
node app.js


