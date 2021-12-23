const Sequelize = require('sequelize');
let sequelize = new Sequelize('postgres', 'nodejs_tdd_hc', '0000', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        logging:false, //기본값은 console.log 함수와 바안딩이 되어잇다.
        // dialectOptions: {
        //     ssl: {
        //         rejectUnauthorized: false
        //     }
        // }
    }
);

let Season = sequelize.define('Season',{
    season_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    season:Sequelize.STRING
}, {
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

let Category = sequelize.define('Category',{
    category_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    category_name:Sequelize.STRING
}, {
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

Season.belongsToMany(Category, {through:'season_category'});
Category.belongsToMany(Season, {through:'season_category'});

let Product = sequelize.define('Product',{
    product_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    product_name:Sequelize.STRING,
    product_price:Sequelize.DOUBLE,
    description:Sequelize.STRING,
    version:Sequelize.INTEGER,
    rep_img:Sequelize.STRING,
    size:Sequelize.STRING,
    stock:Sequelize.INTEGER,
}, {
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

Product.belongsTo(Category,{
    foreignKey: 'category'
})

let Img = sequelize.define('Img', {
    img_id:{
        type:Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    img_name:Sequelize.STRING
}, {
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

Img.belongsTo(Product,{
    foreignKey: 'product'
})

let Warehousing = sequelize.define('Warehousing', {
    warehousing_id:{
        type:Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    warehousing_date:{
        type:Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },},
    {
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
    });

Warehousing.belongsToMany(Product, {through:'warehousing_product'});
Product.belongsToMany(Warehousing, {through:'warehousing_product'});

let Member = sequelize.define('Member',{
    member_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    first_name:Sequelize.STRING,
    last_name:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    address_street:Sequelize.STRING,
    address_city:Sequelize.STRING,
    address_state:Sequelize.STRING,
    address_postal:Sequelize.STRING,
    is_Member:Sequelize.STRING,
    phone:Sequelize.INTEGER,
    regdate:{
        type:Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
},},
 {
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

let OrderSummary = sequelize.define('OrderSummary',{
    order_summary_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    order_summary_date:{
        type:Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW},
    totalpay : Sequelize.INTEGER,
    memo : Sequelize.STRING,
    delivery : Sequelize.STRING,
    receiver_name:Sequelize.STRING,
    receiver_phone:Sequelize.INTEGER,
    receiver_street:Sequelize.STRING,
    receiver_city:Sequelize.STRING,
    receiver_state:Sequelize.STRING,
    receiver_postal:Sequelize.STRING,
},{
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

Member.hasMany(OrderSummary,{
    foreignKey: 'member'
})

let OrderDetail = sequelize.define('OrderDetail',{
    order_detail_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    ea:Sequelize.INTEGER
},{
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

OrderSummary.hasMany(OrderDetail,{
    foreignKey: 'ordersummary'
})
Product.hasMany(OrderDetail,{
    foreignKey: 'product'
})

let Cart = sequelize.define('Cart',{
    cart_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    ea:Sequelize.INTEGER
},{
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

Member.hasMany(Cart,{
    foreignKey: 'member'
})
Product.hasMany(Cart,{
    foreignKey: 'product'
})

let Board = sequelize.define('Board',{
    board_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    board_date:{
        type:Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW},
    board_content: Sequelize.STRING
},{
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

let BoardImg = sequelize.define('BoardImg',{
    board_img_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    board_img_content: Sequelize.STRING
},{
    createdAt: false, // disable createdAt
    updatedAt: false // disable updatedAt
});

Product.hasMany(Board,{
    foreignKey: 'product'
})
Member.hasMany(Board,{
    foreignKey: 'member'
})
Board.hasMany(BoardImg,{
    foreignKey: 'board'
})

let Admin = sequelize.define('Admin',{
    admin_id:{
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true // automatically increment the value
    },
    admin_email: Sequelize.STRING,
    admin_password:Sequelize.STRING,
    admin_first_name:Sequelize.STRING,
    admin_last_name:Sequelize.STRING
},{
    createdAt: true, // disable createdAt
    updatedAt: false // disable updatedAt
});

// let DepositBank = sequelize.define('DepositBank',{
//     depositBank_id:{
//         type: Sequelize.INTEGER,
//         primaryKey: true, // use "project_id" as a primary key
//         autoIncrement: true // automatically increment the value
//     },
//     admin_email: Sequelize.STRING,
//     admin_password:Sequelize.STRING,
//     admin_first_name:Sequelize.STRING,
//     admin_last_name:Sequelize.STRING
// },{
//     createdAt: false, // disable createdAt
//     updatedAt: false // disable updatedAt
// });

// function initialize() {
//     return new Promise((resolve, reject) => {
//         sequelize.sync()
//             .then(() => resolve("DB connection success."))
//             // .catch(() => reject("unable to sync the database"));
//             .catch((err) => reject(err));
//     })
// }

module.exports={
    Sequelize, sequelize, Season, Category, Product, Img, Warehousing, Member, 
    OrderSummary, OrderDetail, Cart, Board, BoardImg, Admin
};