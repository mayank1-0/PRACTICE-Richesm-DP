const db = require("../../../dbconfig/connection");

const sub_category_index = (req, res) => {
    res.render('./backend/sub-category/index', { title: 'Sub Category List' })
}

const fetchAllSubCategories = async (req, res) => {
    try {
        let mainCategoryNames = [];
        let categoryNames = [];
        const subCategoryData = await db.SubCategories.findAll({
            attributes: [
                "id",
                "name",
                "main_category_id",
                "category_id",
                "slug",
                "status",
                ["createdAt", "createdOn"],
                ["updatedAt", "updatedOn"],
            ],
        });
        if (!subCategoryData) {
            res.status(404).send({ success: false, messsage: "No sub-categories are there in the database", status: 404 });
        } else {
            for (let i = 0; i < subCategoryData.length; i++) {
                mainCategoryNames[i] = await db.MainCategories.findOne({
                    attributes: ["name"],
                    where: { id: subCategoryData[i].main_category_id }
                });
                categoryNames[i] = await db.Categories.findOne({
                    attributes: ["name"],
                    where: { id: subCategoryData[i].category_id }
                });
                subCategoryData[i].dataValues.under = `${mainCategoryNames[i].name} >> ${categoryNames[i].name}`;
            }
            res.status(200).send({ status: 200, message: " Fetched All Sub-Categories", data: subCategoryData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const sub_category_create_frm = (req, res) => {
    res.render('./backend/sub-category/create', { title: 'Create a New Sub Category' });
}
const sub_category_store = async (req, res) => {
    try {
        const {
            name,
            slug,
            main_category_id,
            category_id,
            meta_title,
            meta_keyword,
            meta_description,
            other_meta_tags,
            page_content,
            status,
        } = req.body;
        const image =await req.file.path?`${process.env.IMAGE_URL}/${req.file.path}`:`${process.env.IMAGE_URL}/img.jpg`
        const result = await db.SubCategories.create({
            name,
            slug,
            main_category_id,
            category_id,
            meta_title,
            meta_keyword,
            meta_description,
            other_meta_tags,
            page_content,
            status,
            image:image,
            created_by:2
        });
        res.status(200).send({ message: "Filled data in sub-category table", data: result, success: true })
    } catch (error) {
        res.status(500).send({ message: error.message, data: error, success: false });
    }
}
const sub_category_edit_frm = async (req, res) => {
    const subCategoryId = req.params.id;
    const subCategory = await db.SubCategories.findOne({ where: {
        id: subCategoryId
    }});
    res.render('./backend/sub-category/edit', { title: 'Edit SubCategory', subCategoryId, subCategory });
};

const sub_category_edit_update = async (req, res) => {
    try {
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        result = await db.SubCategories.update({
            main_category_id: updateData.main_category_id,
            category_id: updateData.category_id,
            name: updateData.name,
            slug: updateData.slug,
            image: updateData.image,
            status: updateData.status,
            meta_title: updateData.meta_title,
            meta_description: updateData.meta_description,
            meta_keyword: updateData.meta_keyword,
            other_meta_tags: updateData.other_meta_tags,
            page_content: updateData.page_content,
            created_by: 2
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No user with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in category table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}

const sub_category_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.SubCategories.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "", success: true })
        } else {
        res.status(200).send({ message: "Sub category with the given id does not exist", success: true })
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
}

module.exports = {

    sub_category_index,
    sub_category_create_frm,
    sub_category_store,
    sub_category_edit_frm,
    sub_category_edit_update,
    sub_category_destroy,
    fetchAllSubCategories
};
