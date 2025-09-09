/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {(res: T) => boolean} checkFn
 * @param {number} intervalMs
 * @param {AbortSignal} [signal]
 * @returns {Promise<T>} 
 */

async function pollForCondition(fn, checkFn, intervalMs = 1000, signal) {

  let result = await fn()
  
  while (!checkFn(result)) {
    if (signal?.aborted) throw new Error("Polling aborted")
      await new Promise((r) => setTimeout(r, intervalMs))
    result = await fn()
  }
  return result
}

export default pollForCondition