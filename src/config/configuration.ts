export default () => ({
  database: {
    db_dialect: process.env.DB_DIALECT,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE,
  },
  environment: {
    jwt_secret: process.env.JWT_SECRET,
    code_environment: process.env.CODE_ENVIORMENT,
  },
  aws_settings: {
    aws_user: process.env.AWS_USER,
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_key: process.env.AWS_SECRET_KEY_ACCESS,
    aws_region: process.env.AWS_REGION,
  },
});
