import UniformDistribution from "./uniform_distribution";
import Sample from "./sample";


export default class ExponentialDistribution
{
  constructor(lambda)
  {
    this.lambda = lambda;
    this.uniform = new UniformDistribution(0, 1);
  }

  next()
  {
    let p = this.uniform.next();
    return -Math.log(1 - p) / this.lambda;
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
