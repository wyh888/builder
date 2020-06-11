export function helloworld(name = 'hhh') {
  class Bar {
    doStuff() {
      console.log('stuff')
    }
  }

  let b = new Bar()
  b.doStuff() // "stuff"

  return `${name}hello world`
}
