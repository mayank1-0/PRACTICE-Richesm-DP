const db = require("../../../dbconfig/connection");

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
                "thumbnail_images",
                "rate_exc_tax",
                "unit_price",
                "listing_price_inc_tax"
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
                "thumbnail_images",
                "rate_exc_tax",
                "unit_price",

            ],
            where: {
                is_todays_deal: 1,
                is_active: 1
            },
            limit: 25
        });
        console.log(productData)
        if (!productData) {
            return res.status(404).send({ success: false, messsage: "No products are there in the database", status: 404 });
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

const fetchAllMainCategories = async (req, res) => {
    try {
        const mainCategoriesData = await db.MainCategories.findAll({
            attributes: [
                "id",
                "name",
                "slug",
                "image",
                "status",
                ["createdAt", "createdOn"],
                ["updatedAt", "updatedOn"],
            ]
        });
        if (!mainCategoriesData) {
            res.status(404).send({ success: false, message: "No main-categories are there in the database" });
        } else {
            res.status(200).send({ success: true, message: " Fetched all main categories", data: mainCategoriesData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const fetchAllCategories = async (req, res) => {
    try {
        const MainCategories = db.MainCategories;
        // let categoryName = req.query.categoryName;
        const categoriesData = await db.Categories.findAll({
            attributes: [
                "id",
                "name",
                "slug",
                "image",
                "status",
                ["createdAt", "createdOn"],
                ["updatedAt", "updatedOn"],
            ],
            include: MainCategories
        });
        if (!categoriesData) {
            res.status(404).send({ success: false, message: "No categories are there in the database" });
        } else {
            res.status(200).send({ success: true, message: " Fetched all categories", data: categoriesData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const fetchAllSubCategories = async (req, res) => {
    try {
        const MainCategories = db.MainCategories;
        const Categories = db.Categories;
        const subCategoriesData = await db.SubCategories.findAll({
            attributes: [
                "id",
                "name",
                "slug",
                "image",
                "status",
                ["createdAt", "createdOn"],
                ["updatedAt", "updatedOn"]
            ],
            include: [MainCategories, Categories]
        });
        if (!subCategoriesData) {
            res.status(404).send({ success: false, message: "No sub-categories are there in the database" });
        } else {
            res.status(200).send({ success: true, message: "Fetched all sub categories", data: subCategoriesData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

//------------------------------------------------------

const distinctBrandsSingleProduct = async (req, res) => {
    try {
        let data = [];
        let finalData = [];
        let result = await db.Brand.findAll({
            raw: true,
            attributes: ['id', 'name', 'slug'],
        })
        console.log('Brand data: ', result);
        console.log('brand\s/result\s length', result.length);
        // For each brand there should be atleast one product

        for (let i = 0; i < result.length; i++) {
            data[i] = await db.Product.findOne({
                raw: true,
                attributes: ['product_name', "rate_exc_tax", 'thumbnail_images', 'unit_price', 'discount', 'discount_type', 'listing_price_inc_tax'],
                where: { brand_id: result[i].id }
            });
            if (data[i] !== null) {
                finalData[i] = data[i];
                finalData[i].brand_name = result[i].name;
                finalData[i].slug = result[i].slug;
            }
            else {
                console.log(`No product of brand ${result[i].name} exists in the database`);
            }
        }
        res.status(200).send({ success: true, message: "Distinct products of different brands fetched successful", data: finalData });
    } catch (error) {
        console.log('Error message', error);
        res.status(500).send({ success: false, error, message: 'Something went wrong' });
    }
}

const brandsAllProductsFetch = async (req, res) => {
    try {
        const Product = db.Product;
        let slug = req.params.slug;
        const result = await db.Brand.findAll({
            raw: true,
            where: { slug: slug },
            include: [Product]
        })
        if (result.length == 0) {
            return res.status(200).send({ success: false, message: "No such products exist in the database" });
        }
        res.status(200).send({ success: true, message: 'Fetched all branded products', data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Something went wrong', err: error.message });
    }
}


const productDetail = async (req, res) => {
    try {
        const User = db.User;
        const MainCategory = db.MainCategories;
        const Category = db.Categories;
        const SubCategory = db.SubCategories;
        const Brand = db.Brand;
        const Unit = db.Unit;
        console.log('111111111 ');
        const result = await db.Product.findOne({
            raw: true,
            where: {
                id: req.params.id
            },
            include: [User, MainCategory, Category, SubCategory, Brand, Unit]
        })
        console.log('!!!!! ', result);
        if (!result) {
            return res.status(200).send({ success: false, message: "No such products exist in the database" });
        }
        res.status(200).send({ success: true, message: 'Fetched product\'s details', data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Something went wrong', data: error.message });
    }
}


module.exports = {
    fetchAllProducts,
    newArrivalProducts,
    bestSellerProducts,
    todaysDealProducts,
    trendingProducts,
    featuredProducts,
    fetchAllMainCategories,
    fetchAllCategories,
    fetchAllSubCategories,
    distinctBrandsSingleProduct,
    brandsAllProductsFetch,
    productDetail
}