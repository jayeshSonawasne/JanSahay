const TrackApplicationModel = require('../models/aplication.track.model');


const trackApplication = (req, res) => {
    try {
        const { refUserId } = req.query;
        const appTrackData = TrackApplicationModel.find({ refUserId: refUserId });

        if (appTrackData.length > 0) {
            return res.status(200).send({
                status: true,
                data: appTrackData,
                message: 'Application Tracked Successfully.'
            });
        } else {
            return res.status(404).send({
                status: false,
                data: null,
                message: 'Application Tracked Data Not Found.'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            data: null,
            message: 'Internal Server Error.'
        });
    }
}

const applyForScheme = async (req, res) => {
    try {
        const appData = req.body;
        let application = new TrackApplicationModel(appData);
        let isAppSaved = await application.save();
        if (isAppSaved) {
            return res.status(200).send({
                status: true,
                data: isAppSaved,
                message: 'Scheme Applied Successfully.'
            });
        } else {
            return res.status(200).send({
                status: false,
                data: null,
                message: 'Unable To Apply For Scheme.'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            data: null,
            message: 'Internal Server Error.'
        });
    }
}

module.exports = { trackApplication, applyForScheme }