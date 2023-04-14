const model = require('../../../../database/models');
const { validateParameter } = require('../../../../middleware/packet-handler');


exports.login = async (req, res, next) => {
    try{


        next({success: 'true'})
    }catch (e){
        next(e);
    }
};