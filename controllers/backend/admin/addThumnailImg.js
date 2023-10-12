exports.addThumnailImages = async(req,res)=>{
    try {
        if(!req.file){
            return res.status(500).send({success:false,message:"select Thumnail Image"})
        }
        const img = `${process.env.IMAGES_PATH}/${req.file.path}`
        res.send({success:true,message:"Images Added ",image:img})
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
}
