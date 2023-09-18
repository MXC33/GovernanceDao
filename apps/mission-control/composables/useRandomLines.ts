export const randomLinesGenerator = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
}
