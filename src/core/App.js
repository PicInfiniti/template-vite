import Test from "../test/test";

export default class App {
  constructor(env) {
    this.env = env
    this.coffe = new Test(this)
  }

  init() {
    this.test.init()
  }
}
