export default function getUrl() {
  return import.meta.env.PROD ? 'https://top-waldo-api.fly.dev' : 'http://localhost:3000';
}
