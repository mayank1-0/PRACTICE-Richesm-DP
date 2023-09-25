const db = require("../../../dbconfig/connection");

const attribute_index = (req, res) => {

    var result = null;
    res.render('./backend/attribute/index', { title: 'Attribute List', attributes: result })
}

const fetchAllAttributes = async (req, res) => {
    try {
        const attributeData = await db.Attribute.findAll({
            attributes: [
                "id",
                ["attribute_name", "attribute"],
                "is_active"
            ],
        });
        if (!attributeData) {
            res.status(404).send({
                success: false,
                message: "No attributes are there in the database",
                status: 404
            });
        } else {
            res.status(200).send({ status: 200, message: " Fetched all attributes", data: attributeData, success: true });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const attribute_create_frm = (req, res) => {

    res.render('./backend/attribute/create', { title: 'Create a New Attribute' });
}
const attribute_store = async (req, res) => {
    try {
        let result;
        let tableData = req.body;
        tableData.created_by = 2;
        result = await db.Attribute.create(tableData);
        res.status(200).send({ message: "Filled data in attribute table", data: result, success: true })
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            res
                .status(500)
                .send({
                    status: 500,
                    data: e.name,
                    message: "User with same Mobile or EmailID already exists",
                });
        } else if (e.name === "SequelizeValidationError") {
            res
                .status(500)
                .send({
                    status: 500,
                    data: e.name,
                    message: `Invalid ${e.errors[0].path}`,
                });
        } else {
            res.status(500).send({ message: "SOmething went wrong", data: error, success: false });
        }
    }
    }
    const attribute_edit_frm = (req, res) => {

        res.render('./backend/attribute/edit', { title: 'Create a New Attribute' });
    }

    const attribute_edit_update = async (req, res) => {
        try {
            // let tableName = "attribute";
            let paramId = req.params.id;
            let result;
            let updateData = req.body;
            result = await db.Attribute.update({
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
                res.status(200).send({ message: "Updated data in attribute table", data: result, success: true });

            }
        } catch (error) {
            res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
        }
    }


    const attribute_destroy = async (req, res) => {
        try {
            let result;
            const paramId = req.params.id;
            result = await db.Attribute.destroy({
                where: {
                    id: paramId
                }
            });
            res.status(200).send({ message: "Data from attribute table deleted", success: true })
        } catch (error) {
            res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
        }
    }

    module.exports = {
        attribute_index,
        attribute_create_frm,
        attribute_store,
        attribute_edit_frm,
        attribute_edit_update,
        attribute_destroy,
        fetchAllAttributes
    }
