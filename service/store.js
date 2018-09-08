let gpsAuthState = false;

export function setGPSAuth(status) {
  gpsAuthState = status;
}

export function getGPSAuth() {
  return gpsAuthState;
}