const db = require("../../../dbconfig/connection");
const brand = require("../../../models/admin/brand");
const path = require("path")

const brand_index = (req, res) => {

    var result = null;
    res.render('./backend/brand/index', { title: 'Brand List', brands: result })
}

const fetchAllBrands = async (req, res) => {
    try {
        const brandData = await db.Brand.findAll({
            attributes: [
                "id",
                ["name", "brand"],
                "slug",
                "status",
                ["createdAt", "createdOn"],
                ["updatedAt", "updatedOn"],
            ],
        });
        if (!brandData) {
            res.status(404).send({ success: false, status: 404, message: "No brands are there in the database" });
        }
        else {
            res.status(200).send({ status: 200, message: " Fetched All Brands", data: brandData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const brand_create_frm = (req, res) => {

    res.render('./backend/brand/create', { title: 'Create a New Brand' });
}

const brand_store = async (req, res) => {
    try {

        const { name, slug, status } = req.body;
        const uploadImage = `${process.env.IMAGE_URL}/${req?.file?.path}`
        const defaultImage = `${process.env.IMAGE_URL}/img.jpg`
        const image = req.file.path ? uploadImage : defaultImage
        const result = await db.Brand.create({
            name,
            slug,
            status,
            image: image,
            created_by: 2
        });
        res.status(200).send({ message: "Brand Added ", data: result, success: true });
    } catch (error) {
        console.log(error, '++++');
        res.status(500).send({ message: error, data: error, success: false });
    }
}

const brand_edit_frm = async (req, res) => {
    const brandId = req.params.id;
    const brand = await db.Brand.findOne({
        where: {
            id: brandId
        }
    })
    res.render('./backend/brand/edit', { title: 'Create a New Brand', brandId: brandId, brand });
}

const brand_edit_update = async (req, res) => {
    try {
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        result = await db.Brand.update({
            name: updateData.name,
            slug: updateData.slug,
            status: updateData.status,
            image: updateData.image
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No user with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in brand table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}

const brand_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.Brand.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "Brand with given id does not exist", success: false, status: 404 });
        } else {
            res.status(200).send({ message: "Data from brand table deleted", success: true });
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
}

module.exports = {

    brand_index,
    brand_create_frm,
    brand_store,
    brand_edit_frm,
    brand_edit_update,
    brand_destroy,
    fetchAllBrands
}
