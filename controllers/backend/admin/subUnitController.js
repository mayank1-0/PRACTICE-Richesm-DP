const db = require("../../../dbconfig/connection");

const sub_unit_index = (req, res) => {

    var result = null;
    res.render('./backend/sub-unit/index', { title: 'Sub Unit List', sub_units: result })
}

const fetchAllSubUnits = async (req, res) => {
    try {
        let unitNames = [];
        var subUnitData = await db.SubUnit.findAll({
            attributes: [
                "id",
                "unit_id",
                ["sub_unit_name", "subUnit"],
                ["sub_unit_short_char", "shortNotation"],
                "conversion_factor",
                "status",
                ["createdAt", "createdOn"],
                ["updatedAt", "updatedOn"],
            ],
        });
        if ( !subUnitData ) {
            res.status(404).send({ success: false, message: "No sub units are there in the database", status: 404});            
        } else {
        for (let i = 0; i < subUnitData.length; i++) {
            unitNames[i] = await db.Unit.findOne({
                attributes: ["unit_name"],
                where: { id: subUnitData[i].unit_id }
            });
            subUnitData[i].dataValues.unit_name = unitNames[i].unit_name;
        }
        res.status(200).send({ status: 200, message: " Fetched All Sub Units", data: subUnitData });
    }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const sub_unit_create_frm = (req, res) => {

    res.render('./backend/sub-unit/create', { title: 'Create a New Sub Unit' });
}
const sub_unit_store = async (req, res) => {
    try {
        let result;
        let tableData = req.body;
        tableData.created_by = 2;
        result = await db.SubUnit.create(tableData);
        res.status(200).send({ message: "Filled data in sub_unit table", data: result, success: true })
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error, success: false });
    }
}
const sub_unit_edit_frm = async (req, res) => {
    const subUnitId = req.params.id;
    const subUnit = await db.SubUnit.findOne({ where: {
        id: subUnitId
    }});
    res.render('./backend/sub-unit/edit', { title: 'Create a New Sub Unit', subUnitId, subUnit });
}

const sub_unit_edit_update = async (req, res) => {
    try {
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        result = await db.SubUnit.update({
            unit_id: updateData.subUnitOf,
            sub_unit_name: updateData.subUnitName,
            sub_unit_short_char: updateData.subUnitShortChar,
            conversion_factor: updateData.conversionFactor,
            status: updateData.status
        }
        , {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No user with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in sub-unit table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}


const sub_unit_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.SubUnit.destroy({
            where: {
                id: paramId
            }
        });
        if (!result) {
            res.status(404).send({ message: "Sub unit with the given id does not exist", success: true })
        } else {
        res.status(200).send({ message: "Data from sub unit table deleted", success: true })
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
}


module.exports = {

    sub_unit_index,
    sub_unit_create_frm,
    sub_unit_store,
    sub_unit_edit_frm,
    sub_unit_edit_update,
    sub_unit_destroy,
    fetchAllSubUnits
}
