export function generateRandomDigits() {
  let result = "";
  const characters = "0123456789";
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
