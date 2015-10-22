Array.prototype.split = function (element) {
  let result = [];
  let buffer = [];

  for (let i = 0; i < this.length; i++)
  {
    let item = this[i];

    if (item == element)
    {
      if (buffer.length)
      {
        result.push(buffer);
        buffer = [];
      }
      continue;
    }

    buffer.push(item);
  }

  if (buffer.length)
  {
    result.push(buffer);
  }

  return result;
}


Array.prototype.min = function () {
  return Math.min.apply(null, this);
}


Array.prototype.max = function () {
  return Math.max.apply(null, this);
}
