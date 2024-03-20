const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;


const UserSchema = new Schema ({
    Name: { type: String },
    DOB: { type: Date},
    Email: { type: String},
    accountname: { type: String },
    password: { type: String },
    Address: { type: String },
    Phone: { type: Number },
    Role: { type: Number },
    slug: { type: String }
}, {
    timestamps: true
});

const ImgProductSchema = new Schema ({
    ProductName: { type: String},
    Img: { type: Array }
}, {
    timestamps: true
})

const ProductSchema = new Schema ({
    ProductName: { type: String },
    Description: { type: String },
    Price: { type: Number },
    Data_Detail: { type: Array},
    Table_Size: { type: Array},
    Weight: { type: String},
    Material : { type: String},
    Category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    Product_Detail: { type: Array},
    ImgProduct: { type: mongoose.Types.ObjectId, ref: 'ImgProduct' },
    slug: { type: String }
}, {
    timestamps: true
})

const OderSchema = new Schema ({
    UserId: { type: mongoose.Types.ObjectId, ref: 'Account' },
    OrderDate: { type: Date},
    TotalPrice: { type: Number}
}, {
    timestamps: true
})

const OrderDetailSchema = new Schema ({
    ProductId: { type: mongoose.Types.ObjectId, ref: 'Product' },
    Quantity: { type: Number },
    Price: { type: Number }
}, {
    timestamps: true
})

const ReviewSchema = new Schema ({
    UserId: { type: mongoose.Types.ObjectId, ref: 'Account'},
    ProductId: { type: mongoose.Types.ObjectId, ref: 'Product' },
    Rating: { type: Number },
    Comment: { type: String },
    DateReview: { type: Date }
}, {
    timestamps: true
})

const CategorySchema = new Schema({
    CategoryName: { type: String }
}, {
    timestamps: true
})


mongoose.plugin(slug);

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const ImgProduct = mongoose.model('ImgProduct', ImgProductSchema);
const Order = mongoose.model('Order', OderSchema);
const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);
const Review = mongoose.model('Review', ReviewSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = {
    User,
    Product,
    ImgProduct,
    Order,
    OrderDetail,
    Review,
    Category
};

// const img = new ImgProduct({
//     Img: [  `https://amq-mcq.dam.kering.com/m/3344d5d6c3d44d17/Large-749655QVU911000_F.jpg?v=4`,
//             `https://amq-mcq.dam.kering.com/m/6874e2e6b1ee4ae3/Large-749655QVU911000_R.jpg?v=2`,
//             `https://amq-mcq.dam.kering.com/m/4df6060fe6ab37ef/Large-749655QVU911000_E.jpg?v=2`,
//             `https://amq-mcq.dam.kering.com/m/682244d243a2ee4d/Large-749655QVU911000_D.jpg?v=2`]
// })

// img.save()