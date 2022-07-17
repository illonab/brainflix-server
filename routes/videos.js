const router = require("express").Router();

const path = require("path");

const videosJSONFileName = path.join(__dirname, "../data/video-details.json");
const videos = require(videosJSONFileName);

const utils = require("../utils/utils");

router.get("/", (_req, res) => {
  res.status(200).json(videos);
});

router.get("/:id", (req, res) => {
  const videoFound = videos.find((video) => video.id === req.params.id);
  if (!videoFound) {
    res
      .status(404)
      .json({ errorMessage: `video with id ${req.params.id} was not found` });
  }
  res.status(200).json(videoFound);
});

// create a video
router.post("/", (req, res) => {
  if (
    !req.body.title ||
    !req.body.channel ||
    !req.body.image ||
    !req.body.description ||
    req.body.video
  ) {
    return res.status(400).json({
      errorMessage: "Please provide data for the new video",
    });
  }
  const newVideoObj = {
    id: utils.getNewId(),
    title: req.body.title,
    channel: req.body.channel,
    image: req.body.image,
    description: req.body.description,
    views: 0,
    likes: 0,
    duration: 0,
    video: req.body.video,
    timestamp: new Date(),
    comments: [],
  };

  utils.writeToJsonFile(videosJSONFileName, [...videos, newVideoObj]);
  res.status(201).json({ newVideoCreated: newVideoObj, success: true });
});
module.exports = router;
