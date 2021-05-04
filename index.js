function randomDateOfBirth(min, max) {
  var now = new Date().getFullYear();
  let low = now - max;
  var high = max - min;
  var year = Math.floor(low + Math.random() * high);
  var month = Math.floor(Math.random() * 11);
  var day = Math.floor(1 + Math.random() * 30);
  return new Date(year, month, day);
}

function formatDate(date) {
  let day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let year = date
    .getFullYear()
    .toString()
    .slice(2);

  return "" + day + month + year;
}

function getCheckSum(dob, inr) {
  let ds = formatDate(dob);
  let inrs = inr.toString().padStart(3, "0");
  let d1 = new Number(ds[0]);
  let d2 = new Number(ds[1]);
  let m1 = new Number(ds[2]);
  let m2 = new Number(ds[3]);
  let a1 = new Number(ds[4]);
  let a2 = new Number(ds[5]);
  let i1 = new Number(inrs[0]);
  let i2 = new Number(inrs[1]);
  let i3 = new Number(inrs[2]);

  let c1 =
    11 -
    ((3 * d1 +
      7 * d2 +
      6 * m1 +
      1 * m2 +
      8 * a1 +
      9 * a2 +
      4 * i1 +
      5 * i2 +
      2 * i3) %
      11);
  let c2 =
    11 -
    ((5 * d1 +
      4 * d2 +
      3 * m1 +
      2 * m2 +
      7 * a1 +
      6 * a2 +
      5 * i1 +
      4 * i2 +
      3 * i3 +
      2 * c1) %
      11);

  return "" + c1 + c2;
}

function generate(min = 20, max = 40, gender = 0) {
  let dob = randomDateOfBirth(min, max);
  let yob = dob.getFullYear();

  // nnin is dob + inr + c1c2
  // ddmmyyiiicc

  let inr = gender;
  if (yob > 1999) {
    inr += 500;
  }
  inr += Math.floor((Math.random() * 499) / 2) * 2;

  let cc = getCheckSum(dob, inr);

  if (cc.length !== 2) {
    console.log("failed. run again");
    return generate(min, max, gender);
  }

  return formatDate(dob) + inr.toString().padStart(3, "0") + cc;
}

function isValid(nnin) {
  if (!nnin) {
    return false;
  }
  nnin = nnin.toString();
  if (nnin.length !== 11) {
    return false;
  }

  const dayOfMonth = parseInt(nnin.substr(0, 2), 10);
  if (dayOfMonth > 31) {
    return false;
  }

  const sum = function(number, factors) {
    let sum = 0;
    for (let i = 0, l = factors.length; i < l; ++i) {
      sum += parseInt(number.charAt(i), 10) * factors[i];
    }
    return sum;
  };

  let checksum1 = 11 - (sum(nnin, [3, 7, 6, 1, 8, 9, 4, 5, 2]) % 11);
  if (checksum1 === 11) checksum1 = 0;
  let checksum2 = 11 - (sum(nnin, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]) % 11);
  if (checksum2 === 11) checksum2 = 0;
  return (
    checksum1 === parseInt(nnin.charAt(9), 10) &&
    checksum2 === parseInt(nnin.charAt(10), 10)
  );
}

module.exports = {
  randomDateOfBirth: randomDateOfBirth,
  isValid: isValid,
  generate: generate
};
