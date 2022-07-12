// Список курсов
let courses = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] }
]
// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200]
let requiredRange2 = [100, 350]
let requiredRange3 = [200, null]

// подготовка данных
const prepareData = (courses) => {
  let data = courses
  data.map((el) => {
    if (el.prices[0] === null && el.prices[1] === null) {
      el.prices[0] = Number.NEGATIVE_INFINITY
      el.prices[1] = Number.POSITIVE_INFINITY
    } else if (el.prices[0] === null) {
      el.prices[0] = Number.NEGATIVE_INFINITY
    } else if (el.prices[1] === null) {
      el.prices[1] = Number.POSITIVE_INFINITY
    }
  })
  console.log("Исходные данные")
  console.log(data)
  return data
};

// подготовка интервала
const prepareRange = (range) => {
  let localRange = range
  let type = null
  if (localRange[0] === null) {
    localRange[0] = Number.NEGATIVE_INFINITY;
    type = "topLimit"
  } else if (localRange[1] === null) {
    localRange[1] = Number.POSITIVE_INFINITY;
    type = "botLimit"
  } else if (localRange[1] != null && localRange[0] != null) {
    type = "interval"
  }
  return [localRange, type]
}

//непосредственно фильтр
const hustle = (data, range) => {
  const [from, to] = range[0]
  let localData = data
  const type = range[1]
  console.log(`\n`)
  console.log(`Отфильтруем от ${from}, и до ${to} `)
  console.log(`\n`)
  let resultArr = []

  switch (type) {
    case "topLimit":
      let resultTop = localData.filter((node) => node.prices[0] <= to)
      resultTop.map((node) => {
        if (node.prices[1] > to) {
          node.prices[1] = to
        }
      })
      resultArr = resultTop
      console.log("Отфильтрованные данные")
      console.log(resultArr)
      break

    case "botLimit":
      let resultBot = localData.filter(
        (node) =>
          node.prices[0] >= from ||
          (node.prices[1] <= to && node.prices[1] >= from)
      )
      resultBot.map((node) => {
        if (node.prices[0] < from) {
          node.prices[0] = from
        }
      });
      resultArr = resultBot
      console.log("Отфильтрованные данные")
      console.log(resultArr)
      break

    case "interval":
      let overLimitedButOk = localData.filter((node) => (node.prices[0] < from && node.prices[1] > to))
      let mostCases = localData
        .filter((node) => node.prices[0] >= from || node.prices[1] <= to)
        .filter((node) => node.prices[0] <= to)
      let resultInterval = overLimitedButOk.concat(mostCases)
      resultInterval.map((node) => {
        if (node.prices[0] < from) {
          node.prices[0] = from
        }
        if (node.prices[1] > to) {
          node.prices[1] = to
        }
      })
      resultArr = resultInterval
      console.log("Отфильтрованные данные")
      console.log(resultArr)
      break
    default:
      break
  }
}

const preparedData = prepareData(courses)
const preparedRange = prepareRange(requiredRange3)

hustle(preparedData, preparedRange)
