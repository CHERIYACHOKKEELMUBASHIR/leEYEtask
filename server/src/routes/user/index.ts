import express from 'express';
import ProductModel from '../../model/products';

const router = express.Router();
router.get('/', (req: any, res: any, next: any) => {
    try {
        ProductModel.find().then((document) => {
            res.json(document);
        });
    } catch (err) {
        next(err);
    }
});

router.post('/addproduct', (req: any, res: any, next: any) => {
    try {
        const product = req.body;
        ProductModel.findOne({ productname: product.name }).then((document) => {
            if (document) {
                const result = {
                    msg: "Product Already exist",
                    data: document
                }
                res.json(result)
            }
            else {
                const price=product.price+(( product.price / 100 ) * 18)
                const discount=price-(price/100)*2
                ProductModel.insertMany([{
                    "productname": product.productname,
                    "description": product.description,
                    "mrp": price,
                    "imgToUrl":product.imgToUrl,
                    "discount":discount,
                    "productprice":product.price,
                    "totalprice":discount+40

                }]).then((document) => {
                    const result = {
                        msg: "product added successfull",
                        data: document
                    }
                    res.json(result)
                });
            }
        });

    } catch (err) {
        next(err);
    }
})
router.put('/:productname',(req: any, res: any, next:any)=>{
    try {
        const { productname } = req.params;
        const product = req.body;
        const price=product.price+((product.price/100)*18)
        const discount=price-(price/100)*2
        
        ProductModel.updateOne(
            { productname: productname },
            {
                name: product.name,
                description: product.description,
                mrp: price,
                imgToUrl:product.imgToUrl,
                discount:discount,
                productprice:product.price,
                totalprice:discount+40


            }
        ).then((document) => {
            res.json(document);
        });
    } catch (err) {
        next(err);
    }
})
router.delete('/delete', (req: any, res: any, next: any) => {
    try {
        const items = req.body;
        ProductModel.deleteOne({ productname: items.name })
            .then((result) => {
                res.json(result);
            })

    } catch (err) {
        next(err);
    }
})



export default router;