var config = {};

// facebook app params
config.fb_auth_params = {
    appId : process.env['FACEBOOK_APPID'] || 'testapp',
    appSecret: process.env['FACEBOOK_SECRET'] || '12345',
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
    key: process.env['S3_KEY'] || 's3key',
    secret: process.env['S3_SECRET'] || 's3secret',
    bucket: process.env['S3_BUCKET'] || 's3bucket'
};

config.sendgrid_user = process.env['SENDGRID_USERNAME'] || 'testuser';
config.sendgrid_key = process.env['SENDGRID_PASSWORD'] || '12345';
config.system_email = process.env['DEMOCRASEE_SYSTEM_EMAIL'] || 'democrasee@example.com';

// global registration enable / disable. invitation is the alternate mechanism.
registration_enabled = process.env['DEMOCRASEE_REGISTRATION_ENABLED']
config.registration_enabled = registration_enabled ? registration_enabled == 'true' : false;

config.MAIN_DISCUSSION = process.env['MAIN_DISCUSSION'] || '549ab39ada8a349714000026';

config.DB_URL = process.env['MONGOLAB_URI'] || 'mongodb://localhost/idemos';
config.ROOT_PATH = process.env.ROOT_PATH || ('http://localhost:' + (process.env.PORT ? process.env.PORT : '1080'));
config.INDEX_PATH = process.env.INDEX_PATH || ('http://localhost:' + (process.env.PORT ? process.env.PORT : '1080') + '/tlv/index.html');

module.exports = config;
