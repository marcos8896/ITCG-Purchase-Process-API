module.exports = {
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "posgresql_ds": {
    "url": `postgres://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`,
    "name": "posgresql_ds",
    "connector": "postgresql"
  }
}
