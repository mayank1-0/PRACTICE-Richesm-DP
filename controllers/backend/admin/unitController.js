const db = require("../../../dbconfig/connection");

const unit_index = (req, res) => {

    var result = null;
    res.render('./backend/unit/index', { title: 'Unit List', units: result })
}

const fetchAllUnits = async (req, res) => {
    try {
        const unitData = await db.Unit.findAll({
            attributes: [
                "id",
                ["unit_name", "unit"],
                ["short_char", "short_notation"],
                "status",
                ["createdAt", "createdOn"],
                ["updatedAt", "updatedOn"],
            ],
        });
        if (!unitData) {
            res.status(404).send({ success: false, message: "No units are there in the database", status: 404 })
        } else {
            res.status(200).send({ status: 200, message: " Fetched All Units", data: unitData });
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const unit_create_frm = (req, res) => {

    res.render('./backend/unit/create', { title: 'Create a New Unit' });
}
const unit_store = async (req, res) => {
    try {
        let result;
        let tableData = req.body;
        tableData.created_by = 2;
        result = await db.Unit.create(tableData);
        res.status(200).send({ message: "Filled data in unit table", data: result, success: true })
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error, success: false });
    }
}
const unit_edit_frm = async (req, res) => {
    const unitId = req.params.id;
    const unit = await db.Unit.findOne({
        where: {
            id: unitId
        }
    });
    res.render('./backend/unit/edit', { title: 'Create a New Unit', unitId, unit });
}

const unit_edit_update = async (req, res) => {
    try {
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        result = await db.Unit.update({
            unit_name: updateData.unit_name,
            short_char: updateData.short_char,
            status: updateData.status,
            image: updateData.image
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No user with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in unit table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}


const unit_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.Unit.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "Unit with the given id does not exist", success: true })
        } else {
            res.status(200).send({ message: "Data from unit table deleted", success: true })
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
}

module.exports = {
    unit_index,
    unit_create_frm,
    unit_store,
    unit_edit_frm,
    unit_edit_update,
    unit_destroy,
    fetchAllUnits
}
