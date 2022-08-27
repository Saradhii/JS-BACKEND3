const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

const Urlroute = express.Router()

const Url = require('../models/UrlSchema')

const baseUrl = 'http:saradhi(url-shortner)';

Urlroute.get("/prevoius", async(req,res)=>{
    const data = await Url.find();
    res.status(200).send(data);
});

Urlroute.post('/shorten', async (req, res) => {
    const { longUrl } = req.body 
    const { custom } = req.body
    
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    var urlCode;
    if(custom)
    {
        urlCode = custom ;
    }
    else
    {
        urlCode = shortid.generate()
    }

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({
                longUrl
            })

            if (url) {
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = Urlroute