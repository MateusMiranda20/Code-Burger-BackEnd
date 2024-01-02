import { Sequelize } from "sequelize";

import mongoose from "mongoose";

import configDatabase from '../config/database'
import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'

const models = [User, Product, Category]
class Database {
    constructor(connection, models) {
        this.init()
        this.mongo()
        this.connection = connection;
        this.models = models;
    }


    init() {
        this.connection = new Sequelize(configDatabase)
        models
        .map((model) => model.init(this.connection))
        .map(
          (model) => model.associate && model.associate(this.connection.models)
        )

    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/codeburger',
        )
    }
}

export default new Database()