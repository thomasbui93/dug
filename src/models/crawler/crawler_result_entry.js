const { Schema, model } = require('mongoose')

const CrawlerResultEntrySchema = new Schema({
  url: String,
  content: Schema.Types.Mixed,
  metadata: Object,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CrawlerResultEntry = model('crawler_results', CrawlerResultEntrySchema);

module.exports = CrawlerResultEntry
