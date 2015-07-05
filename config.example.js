var config = {};

// facebook app params
config.fb_auth_params = {
    appId : process.env['FACEBOOK_APPID'] || 'your-facebook-app-id',
    appSecret: process.env['FACEBOOK_SECRET'] || 'your-facebook-secret',
    appName: process.env['FACEBOOK_APPNAME'] || 'DemocraSee',
    callback: config.ROOT_PATH + '/account/facebooklogin',
    scope: 'email,publish_actions',
    failedUri: '/noauth'
};

config.fb_general_params = {
    fb_title: '',
    fb_description:  "",
    fb_image: ''
}

// amazon s3 credentials
config.s3_creds = {
    key: 'your-s3-key',
    secret: 'your-s3-secret',
    bucket: 'idemos'
};

config.sendgrid_user = 'your-sendgrid-user';
config.sendgrid_key = 'your-sendgrid-key';
config.system_email = 'democrasee@example.com';

config.MAIN_DISCUSSION = process.env['MAIN_DISCUSSION'] || '549ab39ada8a349714000026';

config.DB_URL = process.env['MONGOLAB_URI'] || 'mongodb://localhost/idemos';
config.ROOT_PATH = process.env.ROOT_PATH || 'http://localhost:1180';
config.INDEX_PATH = process.env.INDEX_PATH || 'http://localhost:1180/tlv/index.html';

module.exports = config;
