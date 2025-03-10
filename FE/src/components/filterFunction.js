//funkcija za dodajanje izbranih filtrov a array za filtriranje podatkov oziroma odstranjevanje iz njega
const setFilters = (e, filter) => {
  let _filter = filter
  if (_filter.find(v => v.type === e.type)) {
    if (_filter.find(v => v.type === e.type) && e.value) {
      const removeIndex = _filter.map(v => v.type).indexOf(e.type);
      _filter.splice(removeIndex, 1);
      _filter.push(e)
    } else {
      const removeIndex = _filter.map(v => v.type).indexOf(e.type);
      _filter.splice(removeIndex, 1);
    }
  } else {
    _filter.push(e)
  }
  return _filter
}

//filtriranje podatkov glede na izbrane filtre
const filterData = (_filter, _dataTable) => {
  if (_filter && _filter.length > 0) {
    let tempDataTable = _dataTable
    _filter.forEach((el, i) => {
      tempDataTable = tempDataTable?.filter((f, i) => {
        if (el.type === "cena") {
          return f[el.type] >= el.value.min && f[el.type] <= el.value.max;
        } else {
          return f[el.type] === el.value.value;
        }
      })
    });
    return tempDataTable
  } else {
    return _dataTable
  }
}

//sortiranje podatkov naraščujoče
const sortingAsc = (data, type) => {
  let copyData = [...data]
  let arr = copyData.sort((a, b) => {
    var textA = a[type];
    var textB = b[type];
    let textAC = typeof textA === "number" ? textA : (textA === null ? 0 : textA.toLowerCase())
    let textBC = typeof textB === "number" ? textB : (textB === null ? 0 : textB.toLowerCase())
    return (textAC < textBC) ? -1 : (textAC > textBC) ? 1 : 0;
  })
  return arr
}

//sortiranje podatkov padajoče
const sortingDesc = (data, type) => {
  let copyData = [...data]
  let arr = copyData.sort((a, b) => {
    var textA = b[type];
    var textB = a[type];
    let textAC = typeof textA === "number" ? textA : (textA === null ? 0 : textA.toLowerCase())
    let textBC = typeof textB === "number" ? textB : (textB === null ? 0 : textB.toLowerCase())
    return (textAC < textBC) ? -1 : (textAC > textBC) ? 1 : 0;
  })
  return arr
}

export { setFilters, filterData, sortingAsc, sortingDesc }