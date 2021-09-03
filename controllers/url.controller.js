const Url = require('../models/url.model.js');

const baseUrl = process.env.BASE_URL;

const createShortLink = async (req, res) => {
    let { originalUrl, unique_name } = req.body;  
    try {
        let nameExists = await Url.findOne({ unique_name });
        if(nameExists){
            return res.status(403).json({
                error: "Maaf, Nama Yang Anda Gunakan Sudah Di Pakai!",
                ok : false
            }) 
        }
        else {
            const shortUrl = baseUrl + '/' + unique_name;
            console.log('*******: ',shortUrl);
            url = new Url({
                originalUrl,
                shortUrl,
                unique_name
            });
            const saved = await url.save();
            return res.json({
                message : 'success',
                ok : true,
                shortUrl: shortUrl
            });
        }
    } catch (error) {
        return res.status(500).json({ok : false, error : 'Server error'});
    }
};

const openShortLink = async (req, res) => {
    const { unique_name } = req.params;
    try{
      let url = await Url.findOne({ unique_name });
        if(url){
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({error : 'Not found'});
        }  
    } catch(err) {
        console.log(err);
        res.status(500).json({error : 'Server error'});
    } 
};

module.exports = {
    createShortLink, openShortLink
}