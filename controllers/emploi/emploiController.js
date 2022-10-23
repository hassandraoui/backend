const pdf = require('html-pdf');

const emploiTemplate1 = require('../../documents/emploiTemplate1');
const emploiTemplate2 = require('../../documents/emploiTemplate2');
const { countDocuments } = require('../../models/user');

const options = {
    width: '297mm',
    height: '210mm'
  }
async function convrtEmploiToPDF(req, res){

await pdf.create(emploiTemplate2(req.body), options).toFile(`${__dirname}/result.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
}

async function getEmploiPDF(req, res){
    await res.sendFile(`${__dirname}/result.pdf`)
}
module.exports = {
    convrtEmploiToPDF,
    getEmploiPDF
}