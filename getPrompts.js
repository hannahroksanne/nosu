const DATABASE = require('./DATABASE.json')

const prompts = DATABASE.map((clip) => {
    return clip.metadata.tags
})

console.log(prompts)