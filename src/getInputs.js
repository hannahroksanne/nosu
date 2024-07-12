const fs = require('fs')

const DATABASE = require("../DATABASE.json")

const inputs = DATABASE.map((clip) => {
  const metadata = clip.metadata

  return {
    prompt: metadata.gpt_description_prompt || metadata.tags,
    lyrics: metadata.prompt,
    tags: metadata.tags
  }
})

const prompts = inputs.map(input => input.prompt)

const writeToDatabase = (data, name) => {
  const jsonString = JSON.stringify(data, null, 2)
  fs.writeFileSync(name + ".json", jsonString, "utf-8")
}

const stringInputs = new Set(inputs.map(JSON.stringify))
const uniqueInputs = [...stringInputs].map(JSON.parse)
const uniquePrompts = [...new Set(prompts.map(JSON.stringify))]

writeToDatabase(uniqueInputs, 'inputs')
writeToDatabase(uniquePrompts, 'prompts')

