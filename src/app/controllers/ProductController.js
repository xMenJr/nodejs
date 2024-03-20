const { Product, ImgProduct, Category } = require('../models/Schema')
const { mutipleMongooseToObj } = require('../../until/mongoose')
const { mongooseToObj } = require('../../until/mongoose')

class ProductController {

    async product_detail(req, res, next) {
        try {
            // Lấy sản phẩm theo id truyền trên url
            const product = await Product.findOne({_id: req.params.id})
            if(!product) {
                res.status(400).json({message: 'Product not found!'})
            }
            const showFooter = true;
            // Lấy id của img product
            const imgProduct = product.ImgProduct;
            const proImg = await ImgProduct.findOne({_id: imgProduct}) // trả về db ảnh của product
            // Lấy số liệu size và color
            const data = product.Data_Detail;
            // Tạo mảng size
            const size = Array.from(new Set(data.map(item => item.Size)));
            // Tạo mảng color
            const color = Array.from(new Set(data.map(item => item.Color)));
            // Lấy thể loại của sản phẩm để hiện thị thông số size tùy theo quần hoăc áo
            const category = await Category.findById(product.Category)
            const CategoryName = category.CategoryName;
            const weight = product.Weight
            const material = product.Material
            const product_detail = product.Product_Detail;
            // console.log(product_detail)
            const size_detail = []
            const keys = [];
            if (CategoryName == "Áo") {
                // Lấy bảng thông số size cụ thể
                const data = product.Table_Size
                const allKey = Object.keys(data[0])
                for ( let i = 0; i < allKey.length; i++) {
                    keys.push(allKey[i])
                }
                const size = data.map(item => item.Size);
                const shoulder = data.map(item => item.Shoulder);
                const shirt_length = data.map(item => item.ShirtLength);
                const chest_circumference = data.map(item => item.ChestCircumference);
                const sleeve_length = data.map(item => item.SleeveLength);
                for( let i = 0; i < size.length; i++) {
                    size_detail.push({
                        // Keys: allKey,
                        Size: size[i],
                        Shoulder: shoulder[i],
                        ShirtLength: shirt_length[i],
                        ChestCircumference: chest_circumference[i],
                        SleeveLength: sleeve_length[i]
                    })
                }
            }
            else if (CategoryName == "Quần") {
                const data = product.Table_Size
                const allKey = Object.keys(data[0])
                for ( let i = 0; i < allKey.length; i++) {
                    keys.push(allKey[i])
                }
                const size = data.map(item => item.Size);
                const pants_length = data.map(item => item.PantsLength);
                const pants_waist = data.map(item => item.PantsWaist);
                const thigh_width = data.map(item => item.ThighWidth);
                const pant_leg_width = data.map(item => item.PantLegWidth);
                for( let i = 0; i < size.length; i++) {
                    size_detail.push({
                        // Keys: allKey,
                        Size: size[i],
                        PantsLength: pants_length[i],
                        PantsWaist: pants_waist[i],
                        ThighWidth: thigh_width[i],
                        PantLegWidth: pant_leg_width[i]
                    })
                }
            }
            // console.log(product)
            // console.log(size_detail)
            await res.render('product-detail', 
            {   // proImg.Img: truy suất đến trường Img
                imgPro: mongooseToObj(proImg.Img),
                // product.Data_Detail: truy suất đến trường Data_Detail (bao gồm size, color, quantity)
                data_detail: mongooseToObj(product.Data_Detail),
                // size
                size: size,
                // color
                color: color,
                // size_detail
                size_detail: size_detail,
                // category
                category: CategoryName,
                // keys
                keys: keys,
                // weight
                weight: weight,
                // material
                material: material,
                //product_detail
                product_detail: product_detail,
                // product: Sản phẩm
                product: mongooseToObj(product),
                showFooter 
            })
            // res.json({message: product})
        }
        catch(err) {
            next(err)
        }
    }

    async quickview(req ,res ,next) {
        try {
            const product = await Product.findOne({_id: req.params.id})
            if(!product) {
                res.status(400).json({message: 'Product not found!'})
            }
            else {
                const imgProduct = await ImgProduct.findOne({_id: product.ImgProduct})
                const productData = {
                    product: product,
                    imgProduct: imgProduct
                }
                res.json(productData)
            }
        }
        catch(err) {
            next(err)
        }
    }

}

module.exports = new ProductController