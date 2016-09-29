const MyFilter = {}

MyFilter.install = function (Vue) {
  Vue.filter('format_date', value => {
    if (typeof value !== 'undefined' && value !== null) {
      value.length > 10 ? value = value.substring(8, 10) : ''
    }
    return value
  })
  Vue.filter('format_year_month', value => {
    if (typeof value !== 'undefined' && value !== null) {
      value.length > 8 ? value = value.substring(0, 7) : ''
    }
    return value
  })
}

export default MyFilter
