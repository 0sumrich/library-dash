export default function camelToSpace(str) {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}