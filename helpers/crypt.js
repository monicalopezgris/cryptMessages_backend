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
  const { message: { message } } = text;
  const arrayDecrypted = [];
  const textSplited = message.split('');
  textSplited.forEach((item) => {
    if (isAlpha(item, regexRule)) {
      const itemDecrypted = cesarDecrypt(item, jump)
      arrayDecrypted.push(itemDecrypted);
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
  if (itemChar >= minLimit && itemChar <= maxLimit) {
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
  if (itemChar >= minLimit && itemChar <= maxLimit) {
    if ((itemChar - jump) < minLimit) {
      const newChar = maxLimit + ((itemChar - (jump - 1) - minLimit))
      return String.fromCharCode(newChar);
    } else {
      return String.fromCharCode(itemChar - jump);
    }
  }
}

// Get sum of the crc from the decrypted messages of the history array
// The result is the jump for the cesarEncrypt
exports.getJumpFinal = (history, getJump) => {
  if (history.length > 0) {
    let total = 0;
    history.forEach(({ crc }) => {
      total = total + crc;
    });
    return getJump(total)
  } else {
    return 0;
  }
}
exports.getJump = (crc) => {
  let lastRound = 0;
  if (crc > 26) {
    const completeRounds = Math.trunc(crc / 26);
    lastRound = 26 * completeRounds;
    crc = crc - lastRound;
  }
  return crc;
}

exports.crcToDec = text => {
  const hex = crc.crc8(Buffer.from(text, 'ascii')).toString('hex');
  const dec = hexToDec(hex)
  return dec;
}

