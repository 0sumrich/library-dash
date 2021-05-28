function writeFigures(o) {
  const keys = Object.keys(o)
  const res = []
  for (const key of keys) {
    const { data, layout } = o[key]
    layout.title.text = key
    res.push({ data, layout })
  }
  return res
}

export { writeFigures }
