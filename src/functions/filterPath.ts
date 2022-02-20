export default function filterPath(obj: Object, path: string) {
  const keys: string[] = path.split('.');
  var result: any = obj;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] in result) {
      result = result[keys[i]];
    } else {
      result = undefined;
      break;
    }
  }
  return result;
}
