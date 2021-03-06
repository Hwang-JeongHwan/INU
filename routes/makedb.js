const express = require('express');
const router = express.Router();
const request = require('request');
const Barcode = require('../models/barcode');

router.get('/barcode', async (req, res) => {
    
    const return_json = new Array();
    const da = new Object();
    const bar_key = process.env.BARCODE_KEY;
    //const code = req.query.code;
    var barcodeurl;

    barcodeurl = 'http://openapi.foodsafetykorea.go.kr/api/';
    barcodeurl += bar_key;
    barcodeurl += '/I2570/json/0/1000/';
    //barcodeurl += code;
    
    request({
        url: barcodeurl,
        method: 'GET'
    }, function (error, response, body) {
        console.log('Status', response.statusCode);
        const data =JSON.parse(body);
        res.send(data);
        var i=0;
    
        while(i<1000){
            const create =   Barcode.create({
                barcode: data.I2570.row[i].BRCD_NO,
                name: data.I2570.row[i].PRDT_NM,
                HRNK_PRDLST_NM: data.I2570.row[i].HRNK_PRDLST_NM,
                PRDLST_NM : data.I2570.row[i].PRDLST_NM,
              });
              
           
            const barcode = data.I2570.row[i].BRCD_NO;
            const title = data.I2570.row[i].PRDT_NM;
            const HRNK_PRDLST_NM = data.I2570.row[i].HRNK_PRDLST_NM;
            const PRDLST_NM = data.I2570.row[i].PRDLST_NM;
            da.barcode = barcode;
            da.title = title;
            da.PRDLST_NM = PRDLST_NM;
            da.HRNK_PRDLST_NM = HRNK_PRDLST_NM;
            return_json.push(da);
            console.log(da);
            console.log(i)
            i+=1
        }
        
      
        //res.send(return_json);
        
    });
} 
)

router.get('/update',async (req,res,next)=>{
    try {
        const barcode = await Barcode.findOne({ where: { id: 1} });
        const name = new Array();
        name=barcode.name;
        console.log(name);
        if(barcode){
           
            res.status(200).send(barcode);
        }
        else{
            
            res.status(400).send('no barcode');
        }
      } catch (err) {
        console.error(err);
        next(err);
        res.status(500).send('server error');
      }

})
module.exports = router;