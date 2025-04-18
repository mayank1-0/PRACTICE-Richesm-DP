const db = require("../../../dbconfig/connection");

const product_index = (req, res) => {
    var result = null;
    res.render('./backend/product/index', { title: 'Product List', products: result })
}

const fetchAllProducts = async (req, res) => {
    try {
        const MainCategories = db.MainCategories;
        const Categories = db.Categories;
        const SubCategories = db.SubCategories;
        let productData = await db.Product.findAll({
            // attributes: [
            //     "id",
            //     "product_code",
            //     "product_name",
            //     "main_category_id",
            //     "category_id",
            //     "sub_category_id",
            //     "listing_price_inc_tax",
            //     "stock_quantity",
            //     "is_active",
            // ],
            include: [MainCategories, Categories, SubCategories],
        });
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

const product_create_frm = (req, res) => {
    res.render('./backend/product/create', { title: 'Create a New Product' });
};

const product_store = async (req, res) => {
    try {
        let result;
        let tableData = req.body;
        const productData = await db.Product.findOne({
            raw: true,
            order: [
                ['id', 'DESC'],
            ],
            limit: 1,
            attributes: ['id'],
        });
        const maxProductId = productData === null ? 0 : productData.id;
        tableData.product_code = `PC_${maxProductId + 1}`;
        //saving main_category_id and category_id
        let result1 = await db.SubCategories.findOne({
            where: { id: tableData.sub_category_id }
        });
        tableData.main_category_id = result1.main_category_id;
        tableData.category_id = result1.category_id;

        // gallery images store logic
        let gallery_images = tableData.gallery_images;
        gallery_images = JSON.stringify(gallery_images);
        let productGalleryData = {
            product_code: `PC_${maxProductId + 1}`,
            image: gallery_images
        }
        let resultGalleryImages = await db.ProductGallery.create(productGalleryData);

        result = await db.Product.create(tableData);
        res.status(200).send({ message: "Filled data in product table", data: result, success: true });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", data: error, success: false });
    }
};

const product_edit_frm = async (req, res) => {
    const productId = req.params.id;
    const product = await db.Product.findOne({
        where: {
            id: productId
        }
    })
    res.render('./backend/product/edit', { title: 'Edit Product', productId: productId, product });
}

const fetchProductDetailsById = async (req, res) => {
    try {
        const productId = req.params.id;
        let productDetails = await db.Product.findOne({
            where: {
                id: productId
            }
        });
        console.log('1111 ', productDetails);
        let subCategoryId = productDetails.sub_category_id
        const subCategoryData = await db.SubCategories.findOne({
            raw: true,
            attributes: ["name", "category_id", "main_category_id"],
            where: {
                id: subCategoryId
            }
        });
        let mainCategoryId = subCategoryData.main_category_id;
        let categoryId = subCategoryData.category_id;
        const categoryData = await db.Categories.findOne({
            raw: true,
            attributes: ["name"],
            where: {
                id: categoryId
            }
        });
        const mainCategoryData = await db.MainCategories.findOne({
            raw: true,
            attributes: ["name"],
            where: {
                id: mainCategoryId
            }
        });
        let subCategoryName = subCategoryData.name;
        let categoryName = categoryData.name;
        let mainCategoryName = mainCategoryData.name;
        const galleryImagesProduct = await db.ProductGallery.findOne({
            where: {
                product_code: productDetails.product_code,
            }
        });
        let names = {};
        names.subCategoryName = subCategoryName;
        names.categoryName = categoryName;
        names.mainCategoryName = mainCategoryName;
        console.log('***** ', names);
        console.log('2222 ', galleryImagesProduct);
        res.status(200).send({ success: true, message: "ProductDetails of the given id fetched successfully", data: productDetails, galleryImages: galleryImagesProduct, names: names });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Something went wrong', error: error });
    }
}

//INCOMPLETE
const product_edit_update = async (req, res) => {
    try {
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        result = await db.Product.update({
            product_name: updateData.product_name,
            slug: updateData.slug,
            status: updateData.status,
            image: updateData.image
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No user with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in product table", data: result, success: true });

        }

    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}

const product_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.Product.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "Product with given id does not exist", success: false, status: 404 });
        } else {
            res.status(200).send({ message: "Data from product table deleted", success: true });
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
}

module.exports = {

    product_index,
    product_create_frm,
    product_store,
    product_edit_frm,
    fetchProductDetailsById,
    product_edit_update,
    product_destroy,
    fetchAllProducts,
}
