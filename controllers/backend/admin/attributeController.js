const db = require("../../../dbconfig/connection");

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

const attribute_store = async (req, res) => {
    try {
        let existingData = await db.Attribute.findAll();
        if( existingData.length != 0 ){
            res.status(200).send({ success: true, message: 'Attributes are already there in database'})
        }
        else{
        let result;
        let tableData = [
            {
                attribute_name: 'Size',
                is_active: 1
            },
            {
                attribute_name: 'Material',
                is_active: 1
            }
        ]
        result = await db.Attribute.bulkCreate(tableData);
        res.status(200).send({ message: "Filled data in attribute table", data: result, success: true });
        }
    } catch (e) {
        res.status(500).send({ message: "Something went wrong", error: e, success: false });
    }
};

module.exports = {
    attribute_store,
    fetchAllAttributes
}
