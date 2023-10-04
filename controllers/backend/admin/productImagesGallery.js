exports.addImages = async(req,res)=>{
    try {
        const images = []
        if(!req.files){
            return res.status(500).send({success:false,message:"atleast minimun select 2 images"})
        }
        req.files.map((img)=>{
            images.push(`${process.env.IMAGES_PATH}/${img.path}`)
        })
        res.send({success:true,message:"Images Added ",images:images})
    } catch (error) {
        res.status(500).send({success:false,message:error.message})
    }
}

exports.DeleteremoveImg = async(req,res)=>{
    try {
            // const findBanner = await AddBanner.findByIdAndDelete(req.params.id)
            // if(!findBanner) return res.status(400).send("Banner Not Found")
            const directoryPath = path.join(__dirname,'../public/product');
        // const fileSclice = findBanner.banner.indexOf("banners")
        // const fileNameToRemove = findBanner.banner.slice(fileSclice+8);
        const files = fs.readdirSync(directoryPath);
        if (files.includes(fileSclice)) {
            const filePath = path.join(directoryPath, fileSclice);
            fs.unlinkSync(filePath);
            console.log("remove")
        }
            res.status(200).send({success:true,message:"image removed"})
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
}