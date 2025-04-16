const inputText = document.querySelector('#text');
const charCountD = document.querySelector('#char');
const wordsCountD = document.querySelector('#words');
const linesCountD = document.querySelector('#lines');
const charSelect = document.querySelector('#displyChar')

inputText.addEventListener('input',(inputText)=>{
  updateCounts(inputText);
  
})

function updateCounts(input) {
  const text = input.target.value;

  const charCount = text.length;
  charCountD.textContent = charCount ;
  if (charCount>20) {
    charCountD.style.backgroundColor = 'red';
    wordsCountD.style.backgroundColor = 'red';
    linesCountD.style.backgroundColor = 'red';
  }else{
    charCountD.style.backgroundColor ='rgb(55, 196, 172)';
    wordsCountD.style.backgroundColor = 'rgb(55, 196, 172)';
    linesCountD.style.backgroundColor = 'rgb(55, 196, 172)';
  }

  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordsCount = words.length ;
  wordsCountD.textContent = wordsCount;

  const lines = text.split('\n');
  const lineCount = lines.length;
  linesCountD.textContent = lineCount;
}

function updateLetterDensity() {
  const text = inputText.value.toUpperCase(); //for consistency
  const charMap = new Map();

  
  for (let char of text) {
      if (/[A-Z]/.test(char)) {
          charMap.set(char, (charMap.get(char) || 0) + 1);
      }
  }

  // Calculate total letter count
  const totalLetters = Array.from(charMap.values()).reduce((sum, count) => sum + count, 0);

 
  charSelect.innerHTML = '';

  const sortedChars = Array.from(charMap.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  sortedChars.forEach(([char, count]) => {
      const percentage = ((count / totalLetters) * 100).toFixed(1);
      const option = document.createElement('option');
      option.textContent = `${char}: ${count} (${percentage}%)`;
      charSelect.appendChild(option);
  });


  if (totalLetters === 0) {
      const option = document.createElement('option');
      option.textContent = "No letters detected";
      charSelect.appendChild(option);
  }
}

inputText.addEventListener('input', updateLetterDensity);

updateLetterDensity();

