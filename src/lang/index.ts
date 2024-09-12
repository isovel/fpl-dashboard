import en from './locale/en'

const parseLangCode = (lang: string) => {
  const [language, region] = lang.split('-')

  return {
    language,
    region,
  }
}

export const getLang = () => {
  const lang = navigator.language || navigator.languages[0] || 'en-US'

  return parseLangCode(lang)
}

const langDataFromCode = (langCode: string) => {
  switch (langCode) {
    case 'en':
      return en
    default:
      return en
  }
}

const get = (key: keyof typeof en) => {
  const { language } = getLang()
  const langData = langDataFromCode(language)

  return langData[key]
}

const lang = {
  get,
  ...en,
}

export default lang
