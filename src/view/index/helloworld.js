export function helloworld(name = 'hhh') {
  class Bar {
    static doStuff() {
      document.write('stuff')
    }
  }

  const b = new Bar()
  b.doStuff() // "stuff"

  return `${name}hello world`
}
