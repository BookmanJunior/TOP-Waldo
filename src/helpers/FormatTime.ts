export default function FormatTime(time: number) {
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const ms = Math.floor((time % 1000) / 10);

  return `${padNums(minutes)}:${padNums(seconds)}:${padNums(ms)}`;
}

function padNums(num: number) {
  return num < 10 ? '0' + num : num;
}
