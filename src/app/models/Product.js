import Sequelize, { Model } from 'sequelize'

class Product extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.INTEGER,
                category: Sequelize.STRING,
                path: Sequelize.STRING,
                url:{
                    type: Sequelize.VIRTUAL,
                    get(){
                        return`http://localhost:2006/product-file/${this.path}`
                    }

                }
            },
            {
                sequelize
            }
        )
    }
}

export default Product