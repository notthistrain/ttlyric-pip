export * from './runtime'
export async function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}