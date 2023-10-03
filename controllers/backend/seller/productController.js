const db = require("../../../dbconfig/connection");

const product_store = async (req, res) => {
    try {
        let result;
        let tableData = req.body;
        console.log('------');
        let userEmail = req.session.user.email;
        // couldn't test after this as this will give error in POSTMAN
        console.log('0000 ', userEmail);
        let sellerData = await db.User.findOne({
            attributes: ['id','first_name','last_name','status'],
            where: { email: userEmail }
        });
        console.log(`1111 ${sellerData}`);
        tableData.session_id = sellerData.id;
        console.log(`2222 ${tableData}`);
        const productData = await db.Product.findOne({
            raw: true,
            order: [
                ['id', 'DESC'],
            ],
            limit: 1,
            attributes: ['id'],
        });

        const maxProductId = productData===null?0:productData.id;
        tableData.product_code = `PC_${maxProductId+1}`;
        console.log('3333 ');
        //saving main_category_id and category_id
        let result1 = await db.SubCategories.findOne({
            where: {id: tableData.sub_category_id }
        });
        tableData.main_category_id = result1.main_category_id;
        tableData.category_id = result1.category_id;
        console.log('4444 ');
        // gallery images store logic
        let gallery_images = tableData.gallery_images;
        gallery_images = JSON.stringify(gallery_images);
        let productGalleryData = {
            product_code: `PC_${maxProductId+1}`,
            image: gallery_images
        }
        console.log('5555 ');
        let resultGalleryImages = await db.ProductGallery.create(productGalleryData);
        console.log('6666 ');
        result = await db.Product.create(tableData);
        console.log('Result is' , result);
        res.status(200).send({ message: "Filled data in product table", data: result, success: true});
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", data: error, success: false });
    }
};

const fetchAllProducts = async (req, res) => {
    try {
        const MainCategories = db.MainCategories;
        const Categories = db.Categories;
        const SubCategories = db.SubCategories;
        console.log('+++++ ');
        let userEmail = req.session.user.email;
        // couldn't test after this as this will give error in POSTMAN
        console.log('0000 ', userEmail);
        let sellerData = await db.User.findOne({
            attributes: ['id','first_name','last_name','status'],
            where: { email: userEmail }
        });
        console.log(`1111 ${sellerData}`);
        tableData.session_id = sellerData.id;
        console.log(`2222 ${tableData}`);
        let productData = await db.Product.findAll({
            attributes: [
                "id",
                "product_code",
                "product_name",
                "main_category_id",
                "category_id",
                "sub_category_id",
                "listing_price_inc_tax",
                "stock_quantity",
                "is_active",
            ],
            include: [MainCategories, Categories, SubCategories],
        });
        console.log('Eager loading ', productData);
        if (!productData) {
            res.status(404).send({ success: false, messsage: "No products are there in the database", status: 404 });
        } else {
            res.status(200).send({ status: 200, message: " Fetched all products", data: productData });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "Something went wrong", err: error })
    }
};

module.exports = {
    product_store,
    fetchAllProducts
}