const { crc8 } = require('crc');
const { hexToDec } = require('hex2dec');

const minLimit = 97;
const maxLimit = 122;
const regexRule = /^[a-z]+$/;

exports.encrypt = (text, jump) => {
  const arrayEncrypted = [];
  text = text.toLowerCase()
  const textSplited = text.split('');
  textSplited.forEach((item) => {
    if (isAlpha(item, regexRule)) {
      arrayEncrypted.push(cesarEncrypt(item, jump));
    } else {
      arrayEncrypted.push(item);
    }
  })
  return (arrayEncrypted.join(''))
}

const decrypt = (text, jump) => {
  const arrayDecrypted = [];
  const textSplited = text.split('');
  textSplited.forEach((item) => {
    if (isAlpha(item, regexRule)) {
      arrayDecrypted.push(cesarDecrypt(item, jump));
    } else {
      arrayDecrypted.push(item);
    }
  })
  return (arrayDecrypted.join(''))
}

const isAlpha = (item, ruleToCompare) => {
  return ruleToCompare.test(item) ? true : false;
}

const cesarEncrypt = (item, jump) => {
  let character = (item.charCodeAt(0) + jump);
  if (character >= minLimit) {
    if (character > maxLimit) {
      const resto = character - maxLimit;
      character = minLimit + resto;
    }
    return String.fromCharCode(character);
  }
}

const cesarDecrypt = (item, jump) => {
  let character = (item.charCodeAt(0) - jump);
  if (character <= maxLimit) {
    if (character < minLimit) {
      const resto = minLimit - character;
      character = maxLimit - resto;
    }
    return String.fromCharCode(character);
  }
}

// Get sum of the crc from the decrypted messages of the history array
// The result is the jump for the cesarEncrypt
exports.getJump = history => {
  const arrayCrcs = history.map(({ message }) => {
    return Number(crcToDec(decrypt(message)));
  });
  let total = arrayCrcs.reduce((a, b) => a + b);
  //Round
  if (total > 26) {
    const decimal = total / 26;
    const minified = decimal - Math.floor(decimal)
    total = Math.round(minified * 10);
  }
  return total;
}

const crcToDec = text => {
  const hex = crc8(text).toString(16);
  const dec = hexToDec(hex)
  return dec;
}

