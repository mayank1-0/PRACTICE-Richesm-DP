const db = require("../../../dbconfig/connection");

const size_index = (req, res) => {

    var result = null;
    res.render('./backend/size/index', { title: 'Size List', sizes: result })
}

const fetchAllSizes = async (req, res) => {
    try {
        const sizeData = await db.Size.findAll({
            attributes: [
            "id",
            ["name", "size"],
            "status",
            ["createdAt", "createdOn"],
            ["updatedAt", "updatedOn"],
        ],
    });
        if( !sizeData ){
            res.status(404).send({success: false, message: 'No sizes are there in the database', status: 404})
        }
        else{
        res.status(200).send({ status: 200, message: " Fetched All Sizes", data: sizeData });
    }}
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const size_create_frm = (req, res) => {

    res.render('./backend/size/create', { title: 'Create a New Size' });
}
const size_store = async (req, res) => {
    try {
        let result;
        let tableData = req.body;
        tableData.created_by = 2;
        result = await db.Size.create(tableData);
        res.status(200).send({ message: "Filled data in size table", data: result, success: true })
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error, success: false });
    }
}
const size_edit_frm = async (req, res) => {
    const sizeId = req.params.id;
    const size = await db.Size.findOne({
        where: { id: sizeId }
    });
    res.render('./backend/size/edit', { title: 'Create a New Size', sizeId, size });
}

const size_edit_update = async (req, res) => {
    try {
        // let tableName = "size";
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        result = await db.Size.update({
            name: updateData.name,
            status: updateData.status,
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No size with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in size table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}


const size_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.Size.destroy({
            where: {
                id: paramId
            }
        });
        if ( !result ) {
            res.status(404).send({message: "Size with given id does not exist", success: false, status: 404});
        } else {
            res.status(200).send({ message: "Data from size table deleted", success: true })
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
}

//show single
const size_show = (req, res) => {


}

module.exports = {

    size_index,
    size_create_frm,
    size_store,
    size_edit_frm,
    size_edit_update,
    size_destroy,
    size_show,
    fetchAllSizes
}
