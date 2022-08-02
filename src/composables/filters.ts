import { ref } from 'vue'

export function useFilter() {
  const data = ref('')
  const toNumber = (num: string) => Number(num)
  const toLS = (num: number) => num?.toLocaleString()
  const addDays = (days: number, date = <Date>new Date()) => {
    date.setDate(date.getDate() + days);
    return date;
  }
  const formatDate = (current_datetime: Date) => {
    return current_datetime.toISOString().split('T')[0]
  }
  const formatDateFromString = (current_datetime: string) => {
    return formatDate(new Date(current_datetime)).replaceAll('-','/')
  }

  const getHtmlText = (htmlCode: string) => {
    var element = document.createElement('div')
    element.innerHTML = htmlCode;
    return element.textContent
  }

  const limitText = (text: string, limitCount: number) => {

    if (limitCount <= text.length) { return text.substr(0, limitCount) + ' ...' }
    return text
  }


  return {
    data,
    toNumber,
    toLS,
    addDays,
    formatDate,
    getHtmlText,
    limitText,
    formatDateFromString
  }
}