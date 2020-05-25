export default (path: string) => {
  return path
    .split('/')
    .filter((x) => x && x !== '.')
    .join('/')
}
