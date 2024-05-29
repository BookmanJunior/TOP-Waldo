export default function getUrl() {
  return import.meta.env.PROD ? 'futureprodlink' : 'http://localhost:3000';
}
