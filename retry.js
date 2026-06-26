export async function retry(fn, retries = 3, delay = 2000) {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw lastError;
}
