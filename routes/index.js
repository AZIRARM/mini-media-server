const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

const checkAuthorization = (req,res, next) => {
        let authorizationKey =   req.header('Authorization');

         console.debug("Authorization: "+authorizationKey);
         if(authorizationKey && authorizationKey === process.env.SECRETS_API_TOKEN) {
             console.debug("Authorization success for : "+req.path);
             next();
         } else {
             console.error("Authorization failed for : "+req.path);
             res.statusCode = 403;
             res.send("Authorization failed");
         }
}



router.post('/medias', checkAuthorization, (req, resp) => {
    let body = req.body;
    let fileName = uuidv4()+'.'+body.extension;
    saveDocument(body.data, fileName);
    resp.statusCode = 200;
    resp.send(fileName);

});
router.get('/medias/:fileName', checkAuthorization, (req, resp) => {
    downloadDocument(resp, req.params['fileName']);
    resp.statusCode = 200;
});

const saveDocument = ((base64Data, fileName) => {
    var dataToSave = base64Data.replace(/^data:image\/png;base64,/, "");
    fs.writeFile( (process.env.UPLOAD_FOLDER ? process.env.UPLOAD_FOLDER : '/app/data' ) + "/"+fileName, dataToSave, 'base64',
        function(error) {
            if(error) {
              console.error(err);
              return false;
            } else {
                console.debug("Save file "+fileName+" successfully");
                return true;
            }
        });
});


const downloadDocument = (( resp, fileName) => {
    const file = (process.env.UPLOAD_FOLDER ? process.env.UPLOAD_FOLDER : '/app/data' ) +'/'+fileName;
    resp.download(file);
});

module.exports = router;