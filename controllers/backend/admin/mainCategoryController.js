const db = require('../../../dbconfig/connection');

const main_category_index = (req, res) => {

    var result = null;
    res.render('./backend/main-category/index', { title: 'Main category List', main_category: result })
}

const fetchAllMainCategories = async (req, res) => {
    try {
        const mainCategoriesData = await db.MainCategories.findAll({
            attributes: [
                "id",
                "name",
                "slug",
                "status",
                ["createdAt", "createdOn"],
                ["updatedAt", "updatedOn"],
            ],
        });
        if (!mainCategoriesData) {
            res.status(404).send({ success: false, message: "No main-categories are there in the database" });
        } else {
            res.status(200).send({ status: 200, message: " Fetched All Main Categories", data: mainCategoriesData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const main_category_create_frm = (req, res) => {

    res.render('./backend/main-category/create', { title: 'Create a New main category' });
}
const main_category_store = async (req, res) => {
    try {
        let {
            name,
            slug,
            status,
        } = req.body;
        created_by = 2;
        // const image =await req.file.path?`${process.env.IMAGE_URL}/${req.file.path}`:`${process.env.IMAGE_URL}/img.jpg`
        const result = await db.MainCategories.create({
            name,
            slug,
            status,
            image:null,
            created_by:2
        });
        res.status(200).send({ message: "Filled data in main-categories table", data: result, success: true })
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", data: error, success: false });
    }
}
const main_category_edit_frm = async (req, res) => {
    const mainCategoryId = req.params.id;
    const mainCategory = await db.MainCategories.findOne({
        where: {
            id: mainCategoryId
        }
    });
    res.render('./backend/main-category/edit', { title: 'Edit a New main category', mainCategoryId, mainCategory });
}

const main_category_edit_update = async (req, res) => {
    try {
        // let tableName = "maincategory";
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        result = await db.MainCategories.update({
            name: updateData.name,
            slug: updateData.slug,
            status: updateData.status,
            // image: updateData.image
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No user with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in maincategory table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}

const main_category_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.MainCategories.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "Main category with given id does not exist", success: false, status: 404 });
        } else {
            res.status(200).send({ message: "Data from main categories table deleted", success: true })
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }

}

//show single
// const main_category_show = (req, res) => {


// }

module.exports = {

    main_category_index,
    fetchAllMainCategories,
    main_category_create_frm,
    main_category_store,
    main_category_edit_frm,
    main_category_edit_update,
    main_category_destroy,
    // main_category_show
}
