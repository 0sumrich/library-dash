export default function makeID(title) {
  const str = typeof title === "string" ? title : title.text
  return str.replace(/\s+/g, "-").toLowerCase()
}
