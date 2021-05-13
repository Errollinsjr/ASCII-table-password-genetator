//characterAmountRange
const charAmountRange = document.getElementById('charAmountRange')
//characterAmountNumber
const charAmountNumber = document.getElementById('charAmountNumber')
//
const form = document.getElementById('passGeneratorForm')
//checkboxes
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeLowercaseElement = document.getElementById('includeLowercase')
const includeSymbolsElement = document.getElementById('includeSymbols')
const passwordDisplay = document.getElementById('passwordDisplay')


//calling syncCharacterAmount function
charAmountRange.addEventListener('input', syncCharacterAmount);
charAmountNumber.addEventListener('input', syncCharacterAmount);

//preventDefault stops form from submitting & refreshing page
form.addEventListener('submit', e => {
  e.preventDefault()
  //we get character amount from charAmountNumber
  const charAmount = charAmountNumber.value
  const includeUppercase = includeUppercaseElement.checked
  const includeNumbers = includeNumbersElement.checked
  const includeLowercase = includeLowercaseElement.checked
  const includeSymbols = includeSymbolsElement.checked
  //get password variable which will pass in all values below
  const password = generatePassword(charAmount, includeUppercase, includeLowercase,
     includeSymbols, includeNumbers)
  passwordDisplay.innerText = password   
})

const Lowercase_Char_Codes = arrayLowToHigh(97, 122)
const Number_Char_Codes = arrayLowToHigh(48, 57)
const Uppercase_Char_Codes = arrayLowToHigh(65, 90)
//needed to concact since ASCII table symbols are split-up
const Symbol_Char_Codes = arrayLowToHigh(33, 47).concat(arrayLowToHigh(58, 64)
.concat(arrayLowToHigh(91, 96)).concat(arrayLowToHigh(123, 126)))

//add 1 each time till it gets to high number for ASCII codes
function arrayLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++){
    array.push(i)
  }
  return array
}

//links range input and number input
//lines 33 & 34
function syncCharacterAmount(e) {
  const value = e.target.value
  charAmountNumber.value = value
  charAmountRange.value = value
}

//using ASCII codes
function generatePassword(charAmount, includeUppercase,
  includeSymbols, includeNumbers) {
    let charCodes = Lowercase_Char_Codes
    if (includeUppercase) charCodes = charCodes.concat(Uppercase_Char_Codes)
    if (includeSymbols) charCodes = charCodes.concat(Symbol_Char_Codes)
    if (includeNumbers) charCodes = charCodes.concat(Number_Char_Codes)

    const passwordCharacters = []
    for(let i=0; i < charAmount; i++){
      const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
      passwordCharacters.push(String.fromCharCode(characterCode))
    }
    //will turn our array -> string
    return passwordCharacters.join('')
}
