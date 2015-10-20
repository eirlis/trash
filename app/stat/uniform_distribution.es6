import Sample from "./sample";


export default class UniformDistribution
{
  constructor(a, b)
  {
    this.a = a;
    this.b = b;
  }

  next()
  {
    let t = Math.random();
    return t * (this.b - this.a) + this.a;
  }

  generate(size)
  {
    let result = [];

    for (let i = 0; i < size; i++)
    {
      let tmp = this.next();
      result.push(tmp);
    }

    return new Sample(result);
  }
}
