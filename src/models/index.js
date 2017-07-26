import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const basename  = path.basename(module.filename)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
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
