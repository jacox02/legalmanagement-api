export const jwtConstants = {
  secret: 'secretKey',
};

export const handleSqlError = (error: string) => {
  let returnMessage: string = '';

  switch (error) {
    case 'SequelizeUniqueConstraintError':
      returnMessage = 'Duplicated data';
      break;

    default:
      break;
  }

  return returnMessage;
};
