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

const trackAllApplication = (req, res) => {
    try {
        const appTrackData = TrackApplicationModel.find();

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

module.exports = { trackApplication, trackAllApplication }