const express = require('express');
const router = express.Router();
const request = require('request');
const Barcode = require('../models/barcode');
const { Op } = require("sequelize");
//const { sequelize } = require('../../../ch9/9.1/nodebird/models');


router.get('/barcode',async (req,res,next)=>{
    try {
        const barcode = await Barcode.findOne({ where: { barcode: req.query.barcode} });
        


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
router.get('/barcode1',async (req,res,next)=>{
    try {
        var barcode = await Barcode.findOne({ where: { barcode: req.query.barcode} });
        
        //console.log(flag);
        var a=barcode.name;
        //console.log(barcode);
        

        //console.log(a);
        const x=barcode.name.length;
        //console.log('a',a[5]);
        //a[5]='ㅏ';
        //console.log('a',a[5]);
        
        console.log(x);
        for(var i =0;i<=x;i++){
            //console.log(a[i]);
            if (a[i]=='m'){
                console.log(a[i]);
                console.log(a[i+1]);
                
                
                a=a.replace('ml','미리');
                barcode.name=a;


                console.log(a);
                break;
            }
           if (a[i]=='M')
           {
            a=a.replace('ML','미리');
            barcode.name=a;


            console.log(a);
            break; 
           }
            
        }
        

        

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

router.get('/name',async (req,res,next)=>{
    try {
        //const name = await Barcode.findOne({ where:sequelize.literal(`name like %${req.body.name}%`)});
        // SELECT * FROM test.barcodes where name like '%req.query.name%' 이랑 같음
        const name = await Barcode.findAll({where:{name:{[Op.substring]:`${req.query.name}`}}});
        
         
        console.log(name);
        if(name){
           
            res.status(200).send(name);
        }
        else{
            
            res.status(400).send('no name');
        }
      } catch (err) {
        console.error(err);
        next(err);
        res.status(500).send('server error');
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