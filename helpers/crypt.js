const crc = require('node-crc');
const { hexToDec } = require('hex2dec');

// Set charCodes min and max available to encode and the regex rule
const minLimit = 97;
const maxLimit = 122;
const regexRule = /^[a-z]+$/;

// Get the suma of the CRC (Cyclic Redundancy Check) from the decrypted
// messages in the messages array
// The result is the jump for the cesarEncrypt function

exports.getJumpFinal = (history, getJump) => {
  if (history.length > 0) {
    let crcSum = 0;
    history.forEach(({ crc }) => {
      crcSum += crc;
    });
    return getJump(crcSum);
  } else {
    return 0;
  }
}

exports.getJump = (crcSum) => {
  let lastRound = 0;
  if (crcSum > 26) {
    const completeRounds = Math.trunc(crcSum / 26);
    lastRound = 26 * completeRounds;
    crcSum -= lastRound;
  }
  return crcSum;
}

exports.crcToDec = text => {
  const hex = crc.crc8(Buffer.from(text, 'ascii')).toString('hex');
  const dec = hexToDec(hex);
  return dec;
}

// Encrypt and decript calc

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

const isAlpha = (item, ruleToCompare) => {
  return ruleToCompare.test(item) ? true : false;
}

exports.encrypt = (text, jump) => {
  const arrayEncrypted = [];
  const textSplited = text.toLowerCase().split('');
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
