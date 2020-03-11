const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fonts = require('./configModules/fonts');
const colors = require('./configModules/colors');

const configSchema = new Schema({
  appKey: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  enteryPoint: {
    type: String,
    required: true,
    unique: true
  },
  config: {
    fonts: {
      ...fonts
    },
    colors: {
      ...colors
    }
  }
})

module.exports = mongoose.model('Config', configSchema);