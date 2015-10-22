export default class RunsTest
{
  static median(sample)
  {
    // kriterii serii

    let median = sample.median();
    let n = sample.data.length;

    let series = sample.data
      .filter(x => x != median)
      .map(x => x < median ? "-" : "+");
    let plusSeries = series.split("-");
    let minusSeries = series.split("+");
    let longestPlus = plusSeries.map(x => x.length).max();
    let longestMinus = minusSeries.map(x => x.length).max();

    let vn = plusSeries.length + minusSeries.length;
    let tn = Math.max(longestPlus, longestMinus);
    let v = (n + 1 - 1.96 * Math.sqrt(n - 1)) / 2;
    let t = 3.3 * Math.log10(n + 1);
    let isRandom = vn > v && tn < t;
    let condString = vn + " > " + v + " && " + tn + " < " + t;

    return {
      vn: vn,
      tn: tn,
      v: v,
      t: t,
      isRandom: isRandom,
      condString: condString
    };
  }

  static ascDesc(sample)
  {
    let n = sample.data.length;
    let series = [];
    for (let i = 0; i < n - 1; i++)
    {
      let diff = sample.data[i + 1] - sample.data[i];
      if (Math.abs(diff) < 0.0001) { continue; }
      series.push(diff < 0 ? "-" : "+");
    }

    let plusSeries = series.split("-");
    let minusSeries = series.split("+");
    let longestPlus = plusSeries.map(x => x.length).max();
    let longestMinus = minusSeries.map(x => x.length).max();

    let vn = plusSeries.length + minusSeries.length;
    let tn = Math.max(longestPlus, longestMinus);
    let v = (2 * n - 1 - 1.96 * Math.sqrt((16 * n - 29) / 90)) / 3;
    let t = (N) => {
      if (N <= 26) return 5;
      else if (N <= 153) return 6;
      else if (N <= 1170) return 7;
      else return 0;
    } (n);
    let isRandom = vn > v && tn < t;
    let condString = vn + " > " + v + " && " + tn + " < " + t;

    return {
      vn: vn,
      tn: tn,
      v: v,
      t: t,
      isRandom: isRandom,
      condString: condString
    }
  }
}
