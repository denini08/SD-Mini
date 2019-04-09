const mongoose = require('mongoose');

const Pdf = mongoose.model('Pdf');

module.exports = {

    /* 
        METHOD: GET

        Retorna todos os pdf's cadastrados
    */
    async index(req, res){
        const pdfs = await Pdf.findOne({}); 
        return res.json(pdfs);
    },

    
    /* 
        METHOD: GET

        Retorna um pdf pelo id
    */
    async show(req, res){
        const pdf = await Pdf.findById(req.params.id);
        return res.json(pdf);
    },
    
    /* 
        METHOD: POST

        Registra um pdf
    */
    async store(req, res){
        const pdf = await Pdf.create(req.body);
        return res.json(pdf);
    },

    /* 
        METHOD: PUT
        Atualiza um pdf
    */
   async update(req, res){
       const pdf = await Pdf.findByIdAndUpdate(req.params.id, req.body, { new: true });

       return res.json(pdf);
   },

   async inserir(req,res){
    res.render('inserir');    
},

    async inserirPost(req,res){
        let sampleFile = req.files.pdfzin;
        console.log('sampleFile',sampleFile);

        console.log('body',req.body);
        res.render('inserir');    
    },

   /* 
        METHOD: PUT

        Deleta um pdf
    */
   async destroy(req, res){
    await Pdf.findByIdAndDelete(req.params.id);

    return res.json({
        message: 'pdf removido com sucesso !'
    });
   },

   async findByQuery(req,res){
    let query = req.query.b;
    let obj =   {title: new RegExp(".*" + query.replace(/(\W)/g, "\\$1") + ".*")}
    let obj2 = {description: new RegExp(".*" + query.replace(/(\W)/g, "\\$1") + ".*")}
    Pdf.find().or([obj,obj2]).then((retorno) =>{ //olha a doc
        res.render('resultadosBusca', { 'retorno': retorno,
            'string': query});
    }).catch((err)=>{
        console.log('erro1',err);
    });
   }
}