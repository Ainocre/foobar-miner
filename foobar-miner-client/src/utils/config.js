export const FPS = 10
export const frameDuration = 1000 / FPS

export const rules = {
  move: {
    label: 'En déplacement (5s)',
    iterations: () => 5000 / frameDuration,
  },
  mineFoo: {
    label: 'Mine du foo',
    iterations: () => 1000 / frameDuration,
    collect: () => ({ foo: 1 }),
  },
  mineBar: {
    label: 'Mine du bar',
    iterations: () => {
      const duration = Math.floor(Math.random() * 1500) + 500

      return parseInt(duration / frameDuration)
    },
    collect: () => ({ bar: 1 }),
  },
  craftFooBar: {
    label: 'Fabrique du foobar',
    iterations: () => 2000 / frameDuration,
    collect: () => {
      const randomNb = Math.floor(Math.random() * 101)

      if (randomNb <= 60) {
        return { foo: -1, bar: -1, foobar: 1 }
      } else {
        return { foo: -1 }
      }
    }
  }
}
