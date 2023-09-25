const db = require("../../../dbconfig/connection");

const category_index = (req, res) => {
    var result = null;
    res.render('./backend/category/index', { title: 'Category List', categorys: result })
}

const fetchAllCategories = async (req, res) => {
    try {
        let mainCategoryNames = [];
        const categoryData = await db.Categories.findAll({
            attributes: [
                "id",
                "main_category_id",
                "name",
                "slug",
                "status",
                ["createdAt", "createdOn"],
                ["updatedAt", "updatedOn"],
            ],
        });
        if (!categoryData) {
            res.status(404).send({ status: 404, message: " No categories are there in the database ", data: attributeData });
        } else {
            for (let i = 0; i < categoryData.length; i++) {
                mainCategoryNames[i] = await db.MainCategories.findOne({
                    attributes: ["name"],
                    where: { id: categoryData[i].main_category_id }
                });
                categoryData[i].dataValues.under = mainCategoryNames[i].name;
            }
            res.status(200).send({ success: true, message: "Categories fetched successfully from the database", data: categoryData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const category_create_frm = (req, res) => {

    res.render('./backend/category/create', { title: 'Create a New Category' });
}
const category_store = async (req, res) => {
    try {
        const {
            main_category_id,
            name,
            slug,
            status,
            meta_title,
            meta_description,
            meta_keyword,
            other_meta_tags,
            page_content,
        } = req.body;
        const uploadImage = `${process.env.IMAGE_URL}/${req.file.path}`
        const defaultImage = `${process.env.IMAGE_URL}/img.jpg`
        const image =await req.file.path?uploadImage:defaultImage

        
            const result = await db.Categories.create({
                main_category_id,
                name,
                slug,
                status,
                meta_title,
                meta_description,
                meta_keyword,
                other_meta_tags,
                page_content,
                image:image,
                created_by:2
            });
            res.status(200).send({ message: "Filled data in category table", data: result, success: true })
        } catch (error) {
            res.status(500).send({ message: error.message, data: error, success: false });
        }
    }
    
const category_edit_frm = async (req, res) => {
        const categoryId = req.params.id;
        const category = await db.Categories.findOne({
            where: {
                id: categoryId
            }
        });
        res.render('./backend/category/edit', { title: 'Create a New Category', categoryId, category });
    }

    const category_edit_update = async (req, res) => {
        try {
            let paramId = req.params.id;
            let result;
            let updateData = req.body;
            // console.log('3333 ', updateData);
            result = await db.Categories.update({
                main_category_id: updateData.main_category_id,
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


    const category_destroy = async (req, res) => {
        try {
            let result;
            const paramId = req.params.id;
            result = await db.Categories.destroy({
                where: {
                    id: paramId
                }
            });
            if (!result) {
                res.status(404).send({ message: "Category with given id does not exist", success: false, status: 404 });
            } else {
                res.status(200).send({ message: "Data from category table deleted", success: true })
            }
        } catch (error) {
            res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
        }
    }

    const uploadFile = async (req, res) => {
        try {
            const Categories = db.Categories;
            var sampleFile;
            var uploadPath;
            console.log("234567890", req.file);
            if (!req.file || Object.keys(req.file).length === 0) {
                return res.status(400).send("No files were uploaded.");
            } else {
                sampleFile = req.file.originalname;
                console.log("qwertu", sampleFile);
                uploadPath = __dirname + "\\public\\uploads\\categories\\" + sampleFile;
                const uploadDocs = await Job_Seeker_Documents.create({
                    job_seeker_id: req.body.job_seeker_id,
                    doc_name: sampleFile,
                    doc_path: uploadPath,
                });
                res.send({ success: true, message: "File uploaded!", data: uploadDocs });
            }
        } catch (error) {
            res.send({ success: false, message: "Something went wrong " + error });
        }
    };
    module.exports = {

        category_index,
        category_create_frm,
        category_store,
        category_edit_frm,
        category_edit_update,
        category_destroy,
        // category_show,
        fetchAllCategories,
        uploadFile
    }
