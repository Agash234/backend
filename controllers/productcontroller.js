const products=require('../model/product');
exports.getproducts=async(req,res)=>{
    try{
        const product=await products.find({});
       res.json(product)
    }
    catch(err){
        res.status(500).json({msg:'error'})
    }
}

exports.addproduct = async (req, res) => {
    const { name, price, description, quantity ,Image} = req.body;

    try {
        let product = new products({
            name,
            price,
            quantity,
            description,
            Image
        });

        await product.save();
        res.status(201).json({ msg: 'Product added successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }
};