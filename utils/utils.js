const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// function that will write new data to json file
const writeToJsonFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), "utf-8");
};

const getNewId = () => {
  return uuidv4();
};

module.exports = {
  writeToJsonFile,
  getNewId,
};
