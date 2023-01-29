const encryptBtn = document.getElementById("btnEncrypt")
const decryptBtn = document.getElementById("btnDecrypt")
const text = document.getElementById("changedTxt")
const cipherChoice = document.getElementById("ciphers")
const textBox = document.getElementById("text")
const keyBox = document.getElementById("key")
const keyLabel = document.getElementById("keyLabel")
const rot13Info = document.getElementById("rot13Info")
const atbashInfo = document.getElementById("atbashInfo")
const vigenereInfo = document.getElementById("vigenereInfo")

keyBox.hidden = true
keyLabel.hidden = true
rot13Info.hidden = true
atbashInfo.hidden = true
vigenereInfo.hidden = true

cipherChoice.addEventListener("click", () => {

    if(cipherChoice.value == "vigenere"){
        keyBox.hidden = false
        keyLabel.hidden = false
        vigenereInfo.hidden = false
        rot13Info.hidden = true
        atbashInfo.hidden = true
    } 
    if(cipherChoice.value == "rot13") {
        keyBox.hidden = true
        keyLabel.hidden = true
        rot13Info.hidden = false
        atbashInfo.hidden = true
        vigenereInfo.hidden = true
    } 
    if(cipherChoice.value == "atbash") {
        keyBox.hidden = true
        keyLabel.hidden = true
        rot13Info.hidden = true
        atbashInfo.hidden = false
        vigenereInfo.hidden = true
  }
})


encryptBtn.addEventListener("click", () => {

    if(cipherChoice.value == "rot13"){
        text.textContent = cipherRot13(textBox.value)
    }

    if(cipherChoice.value == "atbash"){
        text.textContent = enAtbash(textBox.value)
    }

    if(cipherChoice.value == "vigenere"){
        if (keyBox.value === ""){
          text.textContent = "Input a key for encryption to work."
        } else {
          text.textContent = encrypt(textBox.value, keyBox.value)
        }
    }

})

decryptBtn.addEventListener("click", () => {

    if(cipherChoice.value == "rot13"){
        text.textContent = cipherRot13(textBox.value)
    }

    if(cipherChoice.value == "atbash"){
        text.textContent = enAtbash(textBox.value)
    }

    if(cipherChoice.value == "vigenere"){
      if (keyBox.value === ""){
        text.textContent = "Input a key for decryption to work."
      } else {
        text.textContent = decrypt(textBox.value, keyBox.value)
      }
    }
})


function cipherRot13(str) {
    str = str.toUpperCase();
    return str.replace(/[A-Z]/g, rot13);
  
    function rot13(correspondance) {
      const charCode = correspondance.charCodeAt();
      return String.fromCharCode(
              ((charCode + 13) <= 90) ? charCode + 13
                                      : (charCode + 13) % 90 + 64
             );
      
    }
  }

  function enAtbash(mensage) {    

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var tebahpla = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
    var alphabet1 = "abcdefghijklmnopqrstuvwxyz";
    var tebahpla1 = "zyxwvutsrqponmlkjihgfedcba";
    var decoded_string = "";

    for (var i = 0; i < mensage.length; i++) {
        var coded_letra = mensage.charAt(i);
        
	if (/[^a-zA-Z]/.test(mensage[i])) {
		decoded_string = decoded_string+mensage[i];	
	}
	else if (mensage[i] === mensage[i].toUpperCase()) {
	    	var letraPosMayus = alphabet.indexOf(coded_letra);
	    	var tebLetraPosMayus = tebahpla.charAt(letraPosMayus);
	    	decoded_string = decoded_string+tebLetraPosMayus;
        } else {
	    	var letraPosMinus1 = alphabet1.indexOf(coded_letra);
	    	var tebLetraPosMinus1 = tebahpla1.charAt(letraPosMinus1);
	    	decoded_string = decoded_string + tebLetraPosMinus1;
        }

    }
    return decoded_string;
}

function isLetter (str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i)
  }
   
  function isUpperCase (character) {
    if (character === character.toUpperCase()) {
      return true
    }
    if (character === character.toLowerCase()) {
      return false
    }
  }
   
  function encrypt (message, key) {
    let result = ''
   
    for (let i = 0, j = 0; i < message.length; i++) {
      const c = message.charAt(i)
      if (isLetter(c)) {
        if (isUpperCase(c)) {
          result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
        } else {
          result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
        }
      } else {
        result += c
      }
      j = ++j % key.length
    }
    return result
  }

  function decrypt (message, key) {
    let result = ''
   
    for (let i = 0, j = 0; i < message.length; i++) {
      const c = message.charAt(i)
      if (isLetter(c)) {
        if (isUpperCase(c)) {
          result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
        } else {
          result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
        }
      } else {
        result += c
      }
      j = ++j % key.length
    }
    return result
  }
