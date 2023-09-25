const db = require("../../../dbconfig/connection");

const color_index = (req, res) => {

    var result = null;
    res.render('./backend/color/index', { title: 'Color List', colors: result })
}

const fetchAllColors = async (req, res) => {
    try {
        const colorData = await db.Color.findAll({
            attributes: [
            "id",
            ["name", "color"],
            "status",
            ["createdAt", "createdOn"],
            ["updatedAt", "updatedOn"],
        ],
    });
        if( !colorData ){
            res.status(404).send({success: false, message: 'No colors are there in the database', status: 404})
        }
        else{
        res.status(200).send({ status: 200, message: " Fetched All Colors", data: colorData });
    }}
    catch (error) {
        res.status(500).send({ success: false, message: "Something went wrong", error: error })
    }
};

const color_create_frm = (req, res) => {

    res.render('./backend/color/create', { title: 'Create a New Color' });
}
const color_store = async (req, res) => {
    try {
        let result;
        let tableData = req.body;
        tableData.created_by = 2;
        result = await db.Color.create(tableData);
        res.status(200).send({ message: "Filled data in color table", data: result, success: true })
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error, success: false });
    }
}
const color_edit_frm = async (req, res) => {
    const colorId = req.params.id;
    const color = await db.Color.findOne({
        where: {
            id: colorId
        }
    })
    res.render('./backend/color/edit', { title: 'Create a New Color', colorId, color });
}

const color_edit_update = async (req, res) => {
    try {
        // let tableName = "color";
        let paramId = req.params.id;
        let result;
        let updateData = req.body;
        result = await db.Color.update({
            name: updateData.name,
            status: updateData.status,
        }, {
            where: { id: paramId }
        });
        if (result == 0) {
            res.status(404).send({ message: "No color with given id exists", data: result, success: false });

        } else {
            res.status(200).send({ message: "Updated data in color table", data: result, success: true });

        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong. Please try again", err: error, success: false });
    }
}


const color_destroy = async (req, res) => {
    try {
        let result;
        const paramId = req.params.id;
        result = await db.Color.destroy({
            where: {
                id: paramId
            }
        });
        if ( !result ) {
            res.status(404).send({message: "Color with given id does not exist", success: false, status: 404});
        } else {
            res.status(200).send({ message: "Data from color table deleted", success: true })
        }
    } catch (error) {
        res.status(500).send({ message: "SOmething went wrong", data: error.message, success: false });
    }
}

//show single
const color_show = (req, res) => {


}

module.exports = {

    color_index,
    color_create_frm,
    color_store,
    color_edit_frm,
    color_edit_update,
    color_destroy,
    color_show,
    fetchAllColors
}
