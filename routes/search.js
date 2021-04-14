const express = require('express');
const router = express.Router();
const request = require('request');
const Barcode = require('../models/barcode');

router.get('/barcode',async (req,res,next)=>{
    try {
        const barcode = await Barcode.findOne({ where: { barcode: req.query.barcode} });
        if(barcode){
            res.send(barcode);
        }
        else{
            res.send('no barcode');
        }
      } catch (err) {
        console.error(err);
        next(err);
      }

})
router.post('/:barcode', async (req, res, next) => {
    try {
        const barcode = await Barcode.findOne({ where: { barcode: req.query.barcode} });
        if(barcode){
            res.send(barcode);
        }
        else{
            res.send('no barcode');
        }
      } catch (err) {
        console.error(err);
        next(err);
      }

})
/*
router.get('/code', (req, res) => {
    var request = require('request');

    var return_json = new Array();
    var da = new Object();
    const bar_key = process.env.BARCODE_KEY;
    var data;
    var title;
    var barcode;
    var duedate;
    const code = req.query.code;
    var barcodeurl = 'http://openapi.foodsafetykorea.go.kr/api/';
    barcodeurl += bar_key;
    barcodeurl += '/C005/json/0/1/BAR_CD=';
    barcodeurl += code;
    
    request({
        url: barcodeurl,
        method: 'GET'
    }, function (error, response, body) {
        console.log('Status', response.statusCode);
        data = JSON.parse(body);
        //res.send(data);
        
        barcode = data.C005.row[0].BAR_CD;
        title = data.C005.row[0].PRDLST_NM;
        duedate = data.C005.row[0].POG_DAYCNT;
        da.barcode = barcode;
        da.title = title;
        da.duedate = duedate;
        return_json.push(da);
        res.send(return_json);
        
    });
})
*/
router.get('/name', (req, res) => {
    var request = require('request');

    const name_key = process.env.NAME_KEY;
    const name = req.query.name;

    var nameurl = 'http://apis.data.go.kr/1470000/FoodNtrIrdntInfoService/getFoodNtrItdntList';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + name_key;
    queryParams += '&' + encodeURIComponent('desc_kor') + '=' + encodeURIComponent(name);

    var fullurl = nameurl + queryParams;
    console.log(fullurl);

    request({
        url: fullurl,
        method: 'GET'
    }, function (error, response, body) {
        console.log('Status', response.statusCode);
        console.log('Headers', JSON.stringify(response.headers));
        res.send(body);
    });
})

module.exports = router;