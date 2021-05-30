const login = async (page) => {
  await page.goto('https://ankiweb.net/account/login')
  await page.type('#email', process.env.ANKI_EMAIL)
  await page.type('#password', process.env.ANKI_PASSWORD)
  await page.click('input.btn.btn-primary')
  page.waitForTimeout(2500)
}

const getWords = async (page) => {
  await page.goto('https://www.ef.com/wwen/english-resources/english-vocabulary/top-3000-words/')

  const words = await page.evaluate(() => {
    const wordsList = [...document.querySelectorAll('.col-md-12 div p')][1].innerText
      .replaceAll('\n', ' ')
      .replaceAll('+', '')
      .split(' ')
    return wordsList
  })

  return words
}

const getWordTranslation = async (page, word) => {
  await page.goto(`https://translate.google.com/?sl=en&tl=pt&text=${word}&op=translate`)
  await new Promise((resolve) => setTimeout(resolve, 2500))
  const translation = await page.evaluate(() => {
    const singleOptionTranslation = document.querySelector('span.JLqJ4b.ChMk0b span')
    const doubleOptionsTranslation = document.querySelector('.VIiyi')
    return singleOptionTranslation ? singleOptionTranslation.innerText : doubleOptionsTranslation.innerText
  })
  return translation
}

const addCardToAnki = async (page, word, translation) => {
  await page.goto('https://ankiuser.net/edit/')
  await page.type('.col-10 div', word)
  await page.keyboard.down('Tab')
  await page.keyboard.type(translation)
  await page.click('.btn.btn-primary')
  page.waitForTimeout(1000)
}

module.exports = { login, getWords, getWordTranslation, addCardToAnki }
