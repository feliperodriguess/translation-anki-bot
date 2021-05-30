require('dotenv').config()
const puppeteer = require('puppeteer')

const { login, getWords, getWordTranslation, addCardToAnki } = require('./utils')

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await login(page)
  const words = await getWords(page)

  for (let i = 0; i < words.length; ++i) {
    const translation = await getWordTranslation(page, words[i])
    await addCardToAnki(page, words[i], translation)
  }

  await browser.close()
})()
