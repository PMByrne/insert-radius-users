const users = require('./users.json')
const pgp = require('pg-promise')()
const db = pgp(`postgres://${process.env.RADIUS_PG_USER || 'radius'}:${process.env.RADIUS_PG_PWD || 'oops'}@${process.env.RADIUS_PG_HOST || 'localhost'}:${process.env.RADIUS_PG_PORT || '5432'}/${[process.env.RADIUS_PG_DB || 'radius"']}`)

const INSERT_STATEMENT = `INSERT INTO "radcheck" ("username", "attribute", "op", "value")
VALUES ($1, 'SSHA2-256-Password', ':=', encode(digest($2 || $1, 'sha256'), 'hex') || encode($1, 'hex'))
returning username`

const getUsername = _ => _
const getPassword = _ => _.split('.')[1]

const run = async () => {
    try {
    const data = await db.tx(t => {
      const queries = users.map(u => t.one(INSERT_STATEMENT, [getUsername(u), getPassword(u)]))

      return t.batch(queries);
    })
    console.log(`Loaded ${users.length} users into the DB`)
  } catch (e) {
    console.Error(e)
  }
}

run()