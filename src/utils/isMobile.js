export default function isMobile() {
  // Comprobar tipo de dispositivo
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}