const db = require("../../../dbconfig/connection");

// Not Complete
const fetchAllProducts = async (req, res) => {
    try {
        const MainCategories = db.MainCategories;
        const Categories = db.Categories;
        const SubCategories = db.SubCategories;
        const Brand = db.Brand;
        let productData = await db.Product.findAll({
            attributes: [
                "id",
                "product_name",
                "main_category_id",
                "category_id",
                "sub_category_id",
                "brand_id",
                "rate_exc_tax",
                "listing_price_inc_tax",
                "discount",
                "discount_type",
                "thumbnail_images",
                // "product_gallery_images_id",
                // have to fetch gallery images here too
            ],
            where: { is_active: 1 },

            limit: 25,

            include: [MainCategories, Categories, SubCategories, Brand],
        });
        if (!productData) {
            res.status(404).send({ success: false, messsage: "No products are there in the database", status: 404 });
        }
        res.status(200).send({ status: 200, message: " Fetched all products", data: productData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "Something went wrong", err: error })
    }
};

const newArrivalProducts = async (req, res) => {
    try {
        const productData = await db.Product.findAll({
            attributes: [
                "id",
                "product_name",
                "discount",
                "discount_type",
                "thumbnail_images"
            ],
            where: {
                is_new_arrival: 1,
                is_active: 1
            },
            limit: 25
        });
        if (productData.length == 0) {
            res.status(404).send({ success: false, messsage: "No such products are there in the database", status: 404 });
            return;
        }
        res.status(200).send({ status: 200, message: " Fetched new arrival products", data: productData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "Something went wrong", err: error })
    }
};

const bestSellerProducts = async (req, res) => {
    try {
        const productData = await db.Product.findAll({
            attributes: [
                "id",
                "product_name",
                "discount",
                "discount_type",
                "thumbnail_images"
            ],
            where: {
                is_bestseller: 1,
                is_active: 1
            },
            limit: 25
        });
        if (productData.length == 0) {
            res.status(404).send({ success: false, messsage: "No products are there in the database", status: 404 });
            return;
        }
        res.status(200).send({ status: 200, message: " Fetched best seller products", data: productData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "Something went wrong", err: error })
    }
};

const todaysDealProducts = async (req, res) => {
    try {
        const productData = await db.Product.findAll({
            attributes: [
                "id",
                "product_name",
                "discount",
                "discount_type",
                "thumbnail_images"
            ],
            where: {
                is_todays_deal: 1,
                is_active: 1
            },
            limit: 25
        });
        if (productData) {
            res.status(404).send({ success: false, messsage: "No products are there in the database", status: 404 });
            return;
        }
        res.status(200).send({ status: 200, message: " Fetched todays deal products", data: productData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "Something went wrong", err: error })
    }
};

const trendingProducts = async (req, res) => {
    try {
        const productData = await db.Product.findAll({
            attributes: [
                "id",
                "product_name",
                "discount",
                "discount_type",
                "thumbnail_images"
            ],
            where: {
                is_trending: 1,
                is_active: 1
            },
            limit: 25
        });
        if (productData) {
            res.status(404).send({ success: false, messsage: "No products are there in the database", status: 404 });
            return;
        }
        res.status(200).send({ status: 200, message: " Fetched trending products", data: productData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "Something went wrong", err: error })
    }
};

const featuredProducts = async (req, res) => {
    try {
        const productData = await db.Product.findAll({
            attributes: [
                "id",
                "product_name",
                "discount",
                "discount_type",
                "thumbnail_images"
            ],
            where: {
                is_featured: 1,
                is_active: 1
            },
            limit: 25
        });
        if (productData) {
            res.status(404).send({ success: false, messsage: "No products are there in the database", status: 404 });
            return;
        }
        res.status(200).send({ status: 200, message: " Fetched featured products", data: productData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "Something went wrong", err: error })
    }
};

// const fetchAllProductsByMainCategories = async (req, res) => {
//     try {
//         let productData = await db.Product.findAll({
//             attributes: [
//                 "id",
//                 "product_name",
//                 "main_category_id",
//                 "category_id",
//                 "sub_category_id",
//                 "brand_id",
//                 "rate_exc_tax",
//                 "listing_price_inc_tax",
//                 "discount",
//                 "discount_type",
//                 "thumbnail_images",
//                 // "product_gallery_images_id",
//                 // have to fetch gallery images here too
//                 "is_active",
//             ],
//             include: [MainCategories],
//         });
//     }
//     catch (error) {
//         res.status(500).send({ success: false, message: "Something went wrong", error: error })
//     }
// };

module.exports = {
    fetchAllProducts,
    newArrivalProducts,
    bestSellerProducts,
    todaysDealProducts,
    trendingProducts,
    featuredProducts
    //fetchAllProductsByMainCategories
}