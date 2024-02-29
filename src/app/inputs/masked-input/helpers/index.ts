export function escapeSpecialCharacters (string: string) {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
