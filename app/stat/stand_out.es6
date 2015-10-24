function criticalValue(n) {
  if (n >= 40) { return 3.0; }
  return 2.4 + n / 57 - 4 / n;
}


function criteria(xi, sample)
{
  let mean = sample.mean();
  let std = sample.std();
  let n = sample.data.length;
  let t = Math.abs(xi - mean) / std;
  let tCritical = criticalValue(n);

  if (t > tCritical)
  {
    return {
      xi: xi,
      t: t,
      t_critical: tCritical
    };
  }
}


export default function getStandOutElement(sample)
{
  let min = sample.data.min();
  let max = sample.data.max();

  let element = criteria(min, sample) || criteria(max, sample);

  if (element)
  {
    let index = sample.data.indexOf(element.xi);
    element.index = index;
    return element;
  }
}
