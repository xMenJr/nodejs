const { Product, ImgProduct, Category } = require('../models/Schema')
const { mutipleMongooseToObj } = require("../../until/mongoose");

class AdminController {

    //GET /index
    index(req, res, next) {
        const showHeader = true;
        res.render('dashboard/index', { showHeader })
    }

    //GET /add_productview
    add_productview(req, res, next) {
        const showHeader = true;
        res.render('dashboard/add-productview', { showHeader })
    }

    // POST /addproduct
    async addproduct(req, res, next) {
        try {
            // Lấy độ dài (tổng số size)
            const size = req.body.Size;
            for( let i = 0; i < size.length; i++) {
                size[i] = size[i].toUpperCase();
            }
            // Lấy mảng color
            const color = req.body.Color;
            for (let i = 0; i < color.length; i++) {
                color[i] = color[i].charAt(0).toUpperCase() + color[i].slice(1);
            }
            // Lấy mảng quantity
            const quantity = req.body.Quantity;
            // Lấy data_detail
            const data_detail = [];
            for (let i = 0; i < size.length; i++) {
                data_detail.push({
                    Size: size[i],
                    Color: color[i],
                    Quantity: quantity[i]
                });
            }
            // Lấy loại sản phẩm
            var cateProduct = req.body.Category;
            // Tạo mảng thông số size để lưu vào db
            var table_size = [];

            // Xử lí size áo
            const size_shirt = req.body.SizeShirt;
            for( let i = 0; i < size_shirt.length; i++) {
                size_shirt[i] = size_shirt[i].toUpperCase()
            }
            // Xử lí size quần
            const size_pant = req.body.SizePant;
            for( let i = 0; i < size_pant.length; i++) {
                size_pant[i] = size_pant[i].toUpperCase()
            }
            
            if(cateProduct == 1) {
                cateProduct = 'Áo';
                const shoulder = req.body.Shoulder;
                const shirt_length = req.body.ShirtLength;
                const chest_circumference = req.body.ChestCircumference;
                const sleeve_length = req.body.SleeveLength;
                const size_shirt_length = req.body.SizeShirt.length;
                for( let i = 0; i < size_shirt_length; i++) {
                    table_size.push({
                        Size: size_shirt[i],
                        Shoulder: shoulder[i],
                        ShirtLength: shirt_length[i],
                        ChestCircumference: chest_circumference[i],
                        SleeveLength: sleeve_length[i]
                    })
                }
            }
            else if(cateProduct == 2) {
                cateProduct = 'Quần';
                const pants_length = req.body.PantsLength;
                const pants_waist = req.body.PantsWaist;
                const thigh_width = req.body.ThighWidth;
                const pant_leg_width = req.body.PantLegWidth;
                const size_pant_length = req.body.SizePant.length;
                for( let i = 0; i < size_pant_length; i++) {
                    table_size.push({
                        Size: size_pant[i],
                        PantsLength: pants_length[i],
                        PantsWaist: pants_waist[i],
                        ThighWidth: thigh_width[i],
                        PantLegWidth: pant_leg_width[i]
                    })
                }
            }
            else if(cateProduct == 3) {
                cateProduct = 'Giày';
            }
            else if(cateProduct == 4) {
                cateProduct = 'Đồng hồ';
            }
            else {
                cateProduct = "Thắt lưng"
            }
            // Kiểm tra đã có Category tồn tại hay chưa
            var category = await Category.findOne({ CategoryName: cateProduct })
            // Thêm Category nếu chưa tồn tại
            if(!category ) {
                category = new Category({ CategoryName: cateProduct })
                await category.save()
            }
            // Lấy weight
            const weight = req.body.Weight;
            const material = req.body.Material;
            const product_detail = req.body.ProductDetail.split(',');
            for (let i = 0; i < product_detail.length; i++) {
                product_detail[i] = product_detail[i].charAt(0).toUpperCase() + product_detail[i].slice(1);
            }
            // Lấy ảnh
            const dataImg = req.body.ImgProduct.split(', ');
            const imgProduct = new ImgProduct({
                ProductName: req.body.ProductName,
                Img: dataImg
            })

            const saveImg = await imgProduct.save();

            const product = new Product({
                ProductName: req.body.ProductName,
                Description: req.body.Description,
                Price: req.body.Price,
                Data_Detail: data_detail,
                Table_Size: table_size,
                Category: category._id,
                Weight: weight,
                Material: material,
                Product_Detail: product_detail,
                ImgProduct: saveImg._id,
            })

            const saveProduct = await product.save()
            if(saveProduct) {
                console.log(product);
                res.redirect("add_productview");
            }
            else{
                console.log("Lỗi")
            }
        } 
        catch(err) {
            console.log(err)
        }
    }

    
}

module.exports = new AdminController;