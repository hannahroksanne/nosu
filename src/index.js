const fs = require('fs')

const STOLEN_DATA = require("../STOLEN_DATA.json")
const DATABASE = require('../DATABASE.json')

const writeToDatabase = (data) => {
  const mergedData = [...DATABASE, ...data]
  const mergedLength = mergedData.length
  const jsonString = JSON.stringify(mergedData, null, 2)
  fs.writeFileSync('./database.json', jsonString, 'utf-8')
  return mergedLength
}

const getIdsFromClipList = (list) => {
  return list.map((clip) => clip.id)
}

const removeDuplicates = () => {
  const databaseIds = getIdsFromClipList(DATABASE)
  const uniqueClips = []

  for (const clip of STOLEN_DATA) {
    if (databaseIds.includes(clip.id)) continue
    uniqueClips.push(clip)
  }

  return uniqueClips
}

const uniqueClips = removeDuplicates()
const newClipCount = writeToDatabase(uniqueClips)
console.log(`DB had ${DATABASE.length} clips previously.`)
console.log(`We stole ${STOLEN_DATA.length} clips this time.`)
console.log(`${uniqueClips.length} of those clips were unique.`)
console.log(`And now we have ${newClipCount} clips in the DB.`)