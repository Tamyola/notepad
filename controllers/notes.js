const NotesModel = require('../models/notes');

module.exports={
    async delete  (req, res)  {
        console.log("delete = ", req.body)
        await NotesModel.findByIdAndDelete(req.body.id)
    
        const notes = await NotesModel.find({}).lean().sort({dateCreated: -1});
        res.render('dash', { notes });
    }
}