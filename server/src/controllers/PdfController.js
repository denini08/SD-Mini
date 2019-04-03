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

   /* 
        METHOD: PUT

        Atualiza um pdf
    */
   async destroy(req, res){
    await Pdf.findByIdAndDelete(req.params.id);

    return res.json({
        message: 'pdf removido com sucesso !'
    });
   }
}