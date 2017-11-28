import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

console.log(`PGHOST in db file: ${process.env.PGHOST}`)
const basename  = path.basename(module.filename)
const sequelize = new Sequelize(
  {
    host: process.env.PGHOST,
    port: 5432,
    dialect: 'postgres'
  }
)

const db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename)
  })
  .forEach(function(file) {
    const model = sequelize["import"](path.join(__dirname, file))
    db[model.name] = model;
  })

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db)
  }
});

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
