export default class Sample
{
  constructor(data)
  {
    this.data = data;
  }

  median()
  {
    let n = this.data.length;
    let half = Math.floor(n / 2);
    let copy = this.data.slice(0);
    let sorted = copy.sort((a, b) => a - b);

    return n % 2 == 0 ? (sorted[half - 1] + sorted[half]) / 2 : sorted[half];
  }

  mean()
  {
    // мат. ожидание
    let n = this.data.length;
    let sum = this.data.reduce((acc, x) => acc + x);
    return sum / n;
  }

  var()
  {
    // дисперсия
    let n = this.data.length;
    let mean = this.mean();
    let squareSum = this.data.map(x => Math.pow(x - mean, 2))
      .reduce((acc, x) => acc + x);

    return squareSum / n;
  }

  std()
  {
    // стд. отклонение
    return Math.sqrt(this.var());
  }

  histogram()
  {
    let n = this.data.length;
    let k = Math.floor(Math.log2(n)) + 1;
    let max = Math.max.apply(null, this.data);
    let min = Math.min.apply(null, this.data);
    let R = max - min;
    let h = R / k;
    let bins = [];

    for (let i = 0; i < k; i++)
    {
      bins.push({
        start: i * h + min,
        end: (i + 1) * h + min,
        frequency: 0
      })
    }

    for (let bin of bins)
    {
      for (let item of this.data)
      {
        if (bin.start <= item && item < bin.end) { bin.frequency += 1; }
      }
    }

    return bins;
  }

  scatter()
  {
    return this.data.map((value, i) => { return { x: i, y: value }; });
  }
}
