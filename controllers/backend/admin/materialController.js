const db = require("../../../dbconfig/connection");

const material_index = (req, res) => {

    var result = null;
    res.render('./backend/material/index', { title: 'Material List', materials: result })
}

const fetchAllMaterials = async (req, res) => {
    try {
        const materialData = await db.Material.findAll({
            attributes: [
            "id",
            ["name", "material"],
            "status",
            ["createdAt", "createdOn"],
            ["updatedAt", "updatedOn"],
        ],
    });
        if( !materialData ){
            res.status(404).send({success: false, message: 'No materials are there in the database', status: 404})
        }
        else{
        res.status(200).send({ status: 200, message: " Fetched All Materials", data: materialData });
    }}
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const material_create_frm = (req, res) => {

    res.render('./backend/material/create', { title: 'Create a New Material' });
}
const material_store = async (req, res) => {
    try {
        let result;
        let tableData = req.body;
        tableData.created_by = 2;
        result = await db.Material.create(tableData);
        res.status(200).send({ message: "Filled data in material table", data: result, success: true })
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error, success: false });
    }
}
const material_edit_frm = async (req, res) => {
    const materialId = req.params.id;
    const material = await db.Material.findOne({
        where: {
            id: materialId
        }
    })
    res.render('./backend/material/edit', { title: 'Create a New Material', materialId, material });
}

const material_edit_update = async (req, res) => {
    try {
        // let tableName = "material";
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        result = await db.Material.update({
            name: updateData.name,
            status: updateData.status,
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No material with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in material table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}


const material_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.Material.destroy({
            where: {
                id: paramId
            }
        });
        if ( !result ) {
            res.status(404).send({message: "Material with given id does not exist", success: false, status: 404});
        } else {
            res.status(200).send({ message: "Data from material table deleted", success: true })
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
}

//show single
const material_show = (req, res) => {


}

module.exports = {

    material_index,
    material_create_frm,
    material_store,
    material_edit_frm,
    material_edit_update,
    material_destroy,
    material_show,
    fetchAllMaterials
}
