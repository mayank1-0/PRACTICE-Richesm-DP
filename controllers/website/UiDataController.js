const db = require("../../dbconfig/connection");



const excludeAttribute=['status','createdAt', 'updatedAt','created_by'];
const fetchallcategories = async (req, res) => {
    try {
        const MainCategories = db.MainCategories;
        const Categories = db.Categories;
        const SubCategories = db.SubCategories;

        const allcatgeory = await db.MainCategories.findAll({
            attributes: {
                exclude: excludeAttribute
            },
            include:[{
                model: Categories,
                attributes: {
                    exclude: excludeAttribute
                },
                include: [{
                    model: SubCategories,
                    attributes: {
                        exclude: excludeAttribute
                    },
                  }]
              }]
        });
        if (!allcatgeory) {
            res.status(404).send({ success: false, messsage: "No sub-categories are there in the database", status: 404 });
        } else {
         
            res.status(200).send({ status: 200, message: " Fetched All Categories ", data: allcatgeory });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error.message })
    }
}


const fetchCategorybyMainCatgeorySlug = async (req, res) => {
    try {
        const MainCategories = db.MainCategories;
        const Categories = db.Categories;
        const SubCategories = db.SubCategories;
        const MainCtegoryId=req.params.id;

        const allcatgeory = await db.MainCategories.findAll({
            where: {
                slug: MainCtegoryId
            },
            attributes: {
                exclude: excludeAttribute
            },
            include:[{
                model: Categories,
                attributes: {
                    exclude: excludeAttribute

                },
                include: [{
                    model: SubCategories,
                    attributes: {
                        exclude: excludeAttribute

                    },
                  }]
              }]
        });
        if (!allcatgeory) {
            res.status(404).send({ success: false, messsage: "No sub-categories are there in the database", status: 404 });
        } else {
         
            res.status(200).send({ status: 200, message: " Fetched All Categories ", data: allcatgeory });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error.message })
    }
}

const fetchSubCategorybyainCatgeorySlug = async (req, res) => {
    try {
       
        const SubCategories = db.SubCategories;
        const MainCtegoryId=req.params.id;
       
        const allcatgeory = await db.Categories.findAll({
            where: {
                slug: MainCtegoryId
            },
            attributes: {
                exclude: excludeAttribute
            },
            include: [{
                model: SubCategories,
                attributes: {
                    exclude: excludeAttribute
                },
              }]
        });
        if (!allcatgeory) {
            res.status(404).send({ success: false, messsage: "No sub-categories are there in the database", status: 404 });
        } else {
         
            res.status(200).send({ status: 200, message: " Fetched All Categories ", data: allcatgeory });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error.message })
    }
}

const productListByCategoriesSlug = async (req, res) => {
    try {
        // let main = req.query.main;
        // let category = req.query.category;
        // let subcategory = req.query.subcategory;

        const productData = await db.Product.findAll({
            attributes: {
                exclude: excludeAttribute
            },
            // limit: 25
        });
        if (productData == 0) {
            return res.status(404).send({ success: false, messsage: "No such products are there in the database", status: 404 });
        }
        res.status(200).send({ status: 200, message: " Fetched featured products", data: productData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: "Something went wrong", err: error })
    }
};

const productDetailbyslug = async (req, res) => {
    try {
        const User = db.User;
        const MainCategory = db.MainCategories;
        const Category = db.Categories;
        const SubCategory = db.SubCategories;
        const Brand = db.Brand;
        const Unit = db.Unit;
        const result = await db.Product.findOne({
            raw: true,
            where: {
                slug: req.params.id
            },
            attributes: {
                exclude: excludeAttribute
            },
            include: [User, MainCategory, Category, SubCategory, Brand, Unit]
        })
        if (!result) {
            return res.status(200).send({ success: false, message: "No such products exist in the database" });
        }
        res.status(200).send({ success: true, message: 'Fetched product\'s details', data: result });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Something went wrong', data: error.message });
    }
}
module.exports = {
    fetchallcategories,
    fetchCategorybyMainCatgeorySlug,
    fetchSubCategorybyainCatgeorySlug,
    productListByCategoriesSlug,
    productDetailbyslug,
}