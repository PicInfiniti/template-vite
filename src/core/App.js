import Test from "../test/test";

export default class App {
  constructor(env) {
    this.env = env
    this.test = new Test(this)
  }

  init() {
    this.test.init()
  }
}
