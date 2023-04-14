// const { USER_SESSION_EXPIRE_TIME } = etsSpotCommon.enum;



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
        // if(!inputUrl.match('getOhlc')) {
        //     await logger.infoConsole(`[Output] ${(req.user && req.user.userName) ? req.user.userName : 'public'} - ${inputUrl}`,
        //         {query: req.query, params:req.params, body: req.body});
        // }
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
