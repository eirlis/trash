import UniformDistribution from "./uniform_distribution";
import Sample from "./sample";


export default class NormalDistribution
{
  constructor(mean, std)
  {
    this.mean = mean;
    this.std = std;
    this.uniform = new UniformDistribution(0, 1);
    this.z1 = null;
  }

  next()
  {
    let u = 0;
    let v = 0;
    let s = 0;

    if (this.z1 != null)
    {
      let tmp = this.z1;
      this.z1 = null;
      return tmp;
    }

    do {
      u = this.uniform.next() * 2 - 1;
      v = this.uniform.next() * 2 - 1;
      s = u * u + v * v;
    } while (s == 0 || s > 1);

    let tmp = Math.sqrt(-2 * Math.log(s) / s);
    let z0 = u * tmp * this.std + this.mean;
    this.z1 = v * tmp * this.std + this.mean;

    return z0;
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
