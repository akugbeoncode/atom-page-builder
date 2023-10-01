export const capitalizeText = (text="test") => {
    return (text[0].toUpperCase() + text.slice(1));
}

export const capitalizeEachWord = (phrase="test text test") => {
    const wordList = phrase.split(" ")
    let capitalizedPhrase = ""

    wordList.forEach((word) => {
        capitalizedPhrase = `${capitalizedPhrase} ${capitalizeText(word)}`
    })

    return capitalizedPhrase.trim();
}

export const slugify =  (text) => {
    return String(text)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}

export const emptyObject = (obj) => {
    for(let key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key))
            return false;
    }
    return true;
}

export const processObjectKeyValue = (keyValue) => {
    const keyValueArray = keyValue.split("-");

    if (keyValueArray.length > 1) {
        return keyValueArray.join(" ");
    } else {
        return keyValue
    }
}

export const abbreviatePhrase = (phrase="") => {
    const words = phrase.split(" ");
    try {
      if (words.length > 1) {
        if (words[0].length > 0 && words[1].length > 0) {
          return `${words[0][0].toUpperCase()}${words[1][0].toUpperCase()}`
        } else {
          return "UN"
        }
      } else {
        if (words[0].length > 1) {
          return `${words[0][0].toUpperCase()}${words[0][1].toUpperCase()}`
        } else {
          return "UN"
        }
      }
    } catch(ex) {
      return "UN"
    }
  
  }

export const validEditStatus = (editData, userData) => {
    if (!editData || !userData) {
        return false;
    } else {
        if (editData.user === userData.reference) {
            return true;
        } else {
            return false;
        }
    }
}
