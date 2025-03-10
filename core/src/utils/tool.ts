/* throttle function
 * @param {Function} fn - the function to throttle
 * @param {number} delay - the delay time
 * @returns {Function} - the throttled function
 */
export function throttle(fn: Function, delay: number) {
  let lastTime = 0
  return function (...args: any[]) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn(...args)
    }
  }
}
