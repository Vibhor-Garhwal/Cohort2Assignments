const zod = require('zod');
  // {
  //   id:1,
  //   title:"Vibhor Garhwal",
  //   sd:"I am a student of B.Tech CSE",
  //   interests: ["javascript", 'webd', 'HTML'],
  //   linkedIn: 'https://www.linkedin.com/',
  //   twitter:'https://twitter.com/?lang=en'
// }
  
const cardSchema = zod.object({
    title: zod.string(),
    sd: zod.string(),
    interests: zod.array(zod.string()),
    linkedIn: zod.string(),
    twitter:zod.string()
})

module.exports = { cardSchema };