/**
 * Generates random string at given length and returns
 *
 * @param {number} len length of string
 */
 export function keygen(len) {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_#,=+;";
  let res = "";
  for (let i = 0; i < len; i++)
    res += chars.charAt(Math.floor(Math.random() * chars.length));

  return res;
}

/**
 * Calculations for updating seek progress bar
 *
 * @param {object} e event object
 * @param {*} video videoRef
 */
export function calcSeek(e, video = null) {
  const bar = e.target.getBoundingClientRect();
  const perc = ((e.clientX - bar.left) / e.target.offsetWidth) * 100;
  const time = (perc / 100) * video?.duration;

  return { perc, time };
}
