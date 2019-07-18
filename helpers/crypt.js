const crc = require('node-crc');
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

exports.decrypt = (text, jump) => {
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
  let itemChar = (item.charCodeAt(0));
  if (itemChar >= minLimit) {
    if ((itemChar + jump) > maxLimit) {
      const newChar = minLimit + (itemChar - maxLimit) + jump - 1;
      return String.fromCharCode(newChar);
    } else {
      return String.fromCharCode(itemChar + jump);
    }
  }
}

const cesarDecrypt = (item, jump) => {
  let itemChar = (item.charCodeAt(0));
  if (itemChar <= minLimit) {
    if ((itemChar + jump) < minLimit) {
      itemChar = minLimit + (itemChar - maxLimit) + jump - 1;
      return String.fromCharCode(itemChar);
    } else {
      return String.fromCharCode(itemChar + jump);
    }
  }

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
exports.getJump = (history) => {
  if (history.length > 0) {
    let total = 0;
    history.forEach(({ crc }) => {
      total = total + crc;
    });
    //Get jump
    let lastRound = 0;
    if (total > 26) {
      const completeRounds = Math.trunc(total / 26);
      lastRound = 26 * completeRounds;
      total = total - lastRound;
    }
    return total;
  } else {
    return 0;
  }
}

exports.crcToDec = text => {
  const hex = crc.crc8(Buffer.from(text, 'ascii')).toString('hex');
  const dec = hexToDec(hex)
  return dec;
}

