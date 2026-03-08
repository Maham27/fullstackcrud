const Subject = require("./subject");
const Video = require("./video");

Subject.hasMany(Video, {
  foreignKey: "subjectId",
  as: "videos"
});

Video.belongsTo(Subject, {
  foreignKey: "subjectId",
  as: "subject"
});

module.exports = { Subject, Video };