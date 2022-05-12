export default function checkNotKey(navigate) {
  if (!sessionStorage.getItem('key')) {
    return navigate()
  }
  return true
}
