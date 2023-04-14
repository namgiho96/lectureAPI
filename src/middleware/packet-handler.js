const {ParameterError, NotFoundError404} = require('../module/error');



exports.validateParameter = function(checkArray, parameters) {
    const parmeterKeys = Object.keys(parameters);
    for(const key of checkArray) {
        if(!parmeterKeys.includes(key) || !parameters[key]) {
            throw new ParameterError(key);
        }
    }
};

exports.errorHandler = async (result, req, res, next) => {
    if(!(result instanceof Error) && result['status']) {
        const inputUrl = req.originalUrl.split('?')[0];
        logger.infoConsole(`[Output] ${(req.user && req.user.userName) ? req.user.userName : 'public'} - ${inputUrl}`,
            {query: req.query, params:req.params, body: req.body});
        return await res.json(result);
    }
    let clientIp = '';

    if(req.headers['x-forwarded-for']) {
        clientIp = req.headers['x-forwarded-for'].split(',')[0];
    }
    const errorContent = {
        serverIp: serverIp,
        clientIp: clientIp,
        exchange : req.headers.exchange ? req.headers.exchange : 'public',
        userAgent: req.headers['user-agent'],
    };
    let errorType;
    if(result instanceof Error) {
        if(result.status === 404) {
            res.status(404).send("404 Not Found");
            const error = new NotFoundError404(result);
            return await logger.error(error, errorContent);
        }
        await res.status(400).json({
            status: "fail",
            code: "10000",
            message: (result.name) ? result.name : "UnknownError",
            trace: (result.desc) ? result.desc : result.message
        });
        return await logger.error(result, errorContent);
    }
};

let serverIp, os = require('os'), ifaces = os.networkInterfaces();
for (let dev in ifaces) {
    let iface = ifaces[dev].filter(function(details) {
        return details.family === 'IPv4' && details.internal === false;
    });
    if(iface.length > 0) serverIp = iface[0].address;
}