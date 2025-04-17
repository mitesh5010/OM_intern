import { quiz } from "./Data/quizData.js";

const quizContainer = document.getElementById('quiz-container');

if (!quiz || typeof quiz !== 'object') {
  quizContainer.textContent = 'Invalid Quiz Data...!';
}

//que-section..
const queSection = document.getElementById('que-container');

function renderQuiz() {
  
queSection.innerHTML = '<h3>Questions</h3>';

if (!quiz.questions || quiz.questions.length === 0) {
  queSection.innerHTML += '<p>No questions available</p>';
} else {
  quiz.questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    const isRequired = question.isRequired === 'yes';
    const requiredMark = isRequired? '<span class="required">*</span>' : '';

    questionDiv.innerHTML = `<strong>Question ${index + 1}${requiredMark}: ${question.text}</strong><strong id="points">(${question.points})</strong>`;

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    if (question.type === 'shortAnswer') {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `question-${index}`;
      input.className = 'short-answer-input';
      input.placeholder = 'Enter your answer';
      input.addEventListener('input', updateSubmitButtonState);
      optionsDiv.appendChild(input);
    } else {

    const inputType  = question.type === 'multiselect' ? 'checkbox' : 'radio';
    const inputName =  `question-${index}` ;

    if (question.options && Array.isArray(question.options)) {
      question.options.forEach((option, optIndex)=>{
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';

        const input = document.createElement('input');
        input.type = inputType;
        input.name = inputName;
        input.id = `q${index}-opt${optIndex}`;
        input.value = optIndex;
        input.addEventListener('change', updateSubmitButtonState);

        const label = document.createElement('label');
        label.htmlFor = `q${index}-opt${optIndex}`;
        label.textContent = option;

        optionDiv.appendChild(input);
        optionDiv.appendChild(label);
        optionsDiv.appendChild(optionDiv);
      });
    } else{
      optionsDiv.innerHTML ='<p>No options available</p>' ;
    }
  }
    questionDiv.appendChild(optionsDiv);
    queSection.appendChild(questionDiv);

  });

  const submitBtn = document.getElementById('submitBtn');

  const resultDiv = document.createElement('div');
  resultDiv.id = 'result';
  
  queSection.appendChild(resultDiv);

  submitBtn.disabled = true;

  // Initial check for button state
  updateSubmitButtonState();

  //handle it.
  submitBtn.addEventListener('click',()=>{
    let totalPoints = 0;
    let earnedPoints = 0;

    
    quiz.questions.forEach((question,index)=>{

      
      totalPoints += question.points || 0;

      let selectedAnswers = [];
      const inputName = `question-${index}`;
      if (question.type === 'shortAnswer') {
        const input = document.getElementsByName(inputName)[0];
        selectedAnswers = input && input.value.trim() ? [input.value.trim()] : [];
      } else {
      const inputs = document.getElementsByName(inputName);
      const selectedIndices = Array.from(inputs)
        .filter(input => input.checked)
        .map(input => parseInt(input.value)); 
        
      selectedAnswers = selectedIndices.map(idx => question.options[idx]).filter(ans => ans !== undefined); 
      }

    

    const correctAnswers = question.correctAnswer || [];
    let isCorrect;

    if (question.type === 'shortAnswer') {
      isCorrect = selectedAnswers.length === 1 && 
                  selectedAnswers[0].toLowerCase() === correctAnswers[0]?.toLowerCase();
    } else if (question.type === 'multiselect') {
      
      isCorrect = selectedAnswers.length === correctAnswers.length &&
                 selectedAnswers.every(ans => correctAnswers.includes(ans)) &&
                 correctAnswers.every(ans => selectedAnswers.includes(ans));
    } else {
      
      isCorrect = selectedAnswers.length === 1 && selectedAnswers[0] === correctAnswers[0];
    }

    // Add points if correct
    if (isCorrect) {
      earnedPoints += question.points || 0;
    }

    resultDiv.style.display = 'flex';
  });
  
  
  const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
  const passStatus = percentage >= quiz.passPercentage  ? 'Passed' : 'Failed';



  //result area create..
  

  resultDiv.innerHTML = `
      <div id="result-details"><h3>Quiz Results</h3>
      <p>Score: ${earnedPoints} / ${totalPoints} points</p>
      <p>Percentage: ${percentage.toFixed(2)}%</p>
      <p>Status: ${passStatus}</p></div>
    `;
  
  });  

  //Add New Questions...
  const addQue = document.getElementById('addQueBtn');

  addQue.addEventListener('click',showAddQueForm)

}

//Update submit button state
function updateSubmitButtonState() {
  
  const allRequiredAnswered = quiz.questions.every((question, index) => {
    if (question.isRequired !== 'yes') return true;
    const inputName = `question-${index}`;
    if (question.type === 'shortAnswer') {
      const input = document.getElementsByName(inputName)[0];
      return input && input.value.trim() !== '';
    }
    const inputs = document.getElementsByName(inputName);
    return Array.from(inputs).some(input => input.checked);
  });

  submitBtn.disabled = !allRequiredAnswered;
}

}

function showAddQueForm() {

  const existingForm = document.getElementById('addQueForm');
  if (existingForm) existingForm.remove();


  const backdrop = document.createElement('div');
  backdrop.id = 'modalBackdrop';
  backdrop.className = 'modal-backdrop';


  const formDiv = document.createElement('div');
  formDiv.id = 'addQueForm';
  formDiv.className = 'result-like modal-content';
  formDiv.innerHTML = `
    <div class="form-details">
    <h3>Add New Question</h3>
    <label>Question Text: <input type="text" id="questionText" required></label><br>
    <div class="checkbox-container">
      <input type="checkbox" id="requiredCheckbox" required>
      <label for="requiredCheckbox">Required to Submit</label>
    </div>
    <label>Type: 
      <select id="questionType">
        <option value="radio">Radio (Single Select)</option>
        <option value="multiselect">Multiselect</option>
        <option value="shortAnswer">Short Answer</option>
      </select>
    </label><br>
    <div id="multipleChoiceFields">
      <label>Option 1*: <input type="text" id="option1" required></label><br>
      <label>Option 2: <input type="text" id="option2"></label><br>
      <label>Option 3: <input type="text" id="option3"></label><br>
      <label>Option 4: <input type="text" id="option4"></label><br>
      <label>Correct Answer(s) (comma-separated): <input type="text" id="correctAnswers" required></label><br>
    </div>
    <div id="shortAnswerFields" style="display: none;">
      <label>Correct Answer: <input type="text" id="shortAnswerCorrect" required></label>
    </div>
    <label>Points: <input type="number" id="points-add"  required></label><br>
    <button id="submitQuestionBtn">Submit Question</button>
    <button id="cancelQuestionBtn">Cancel</button>
    </div>  
  `;

  document.body.appendChild(backdrop);
  queSection.appendChild(formDiv);

  const questionTypeSelect = document.getElementById('questionType');
  const multipleChoiceFields = document.getElementById('multipleChoiceFields');
  const shortAnswerFields = document.getElementById('shortAnswerFields');

  questionTypeSelect.addEventListener('change', () => {
    if (questionTypeSelect.value === 'shortAnswer') {
      multipleChoiceFields.style.display = 'none';
      shortAnswerFields.style.display = 'block';
      document.getElementById('option1').removeAttribute('required');
      document.getElementById('correctAnswers').removeAttribute('required');
      document.getElementById('shortAnswerCorrect').setAttribute('required', 'true');
    } else {
      multipleChoiceFields.style.display = 'block';
      shortAnswerFields.style.display = 'none';
      document.getElementById('option1').setAttribute('required', 'true');
      document.getElementById('correctAnswers').setAttribute('required', 'true');
      document.getElementById('shortAnswerCorrect').removeAttribute('required');
    }
  });


  document.getElementById('submitQuestionBtn').addEventListener('click', () => {
    const questionText = document.getElementById('questionText').value.trim();
    const requiredCheckbox = document.getElementById('requiredCheckbox').checked? 'yes':'no';
    const option1 = document.getElementById('option1').value.trim();
    const option2 = document.getElementById('option2').value.trim();
    const option3 = document.getElementById('option3').value.trim();
    const option4 = document.getElementById('option4').value.trim();

    const questionType = document.getElementById('questionType').value;
    const pointsInput = document.getElementById('points-add').value.trim();
    


    // Validate points
    const points = parseInt(pointsInput, 10);
    if (pointsInput === '' || isNaN(points) || points < 0 || !Number.isInteger(Number(pointsInput))) {
      alert('Please enter a valid positive integer for points (e.g., 10).');
      return;
    }
    
    

    

    let options = [];
    let correctAnswers = [];
    if (questionType === 'shortAnswer') {
      const shortAnswerCorrect = document.getElementById('shortAnswerCorrect').value.trim();
      if (!shortAnswerCorrect) {
        alert('Please provide a correct answer for short answer questions.');
        return;
      }
      correctAnswers = [shortAnswerCorrect];
    } else {

     options = [option1];
    if (option2) options.push(option2);
    if (option3) options.push(option3);
    if (option4) options.push(option4);

    correctAnswers = document.getElementById('correctAnswers').value.split(',')
        .map(ans => ans.trim())
        .filter(ans => ans);

    const invalidAnswers = correctAnswers.filter(ans => !options.includes(ans));
    if (invalidAnswers.length > 0) {
      alert('Correct answers must match provided options.');
      return;
    }
    if (!questionText || !option1 || !correctAnswers.length || isNaN(points) || points < 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    if (questionType === 'radio' && correctAnswers.length > 1) {
      alert('Radio questions can have only one correct answer.');
      return;
    }
  }
    

    //new que. object
    const newQuestion = {
      text: questionText,
      isRequired:requiredCheckbox,
      options:questionType === 'shortAnswer' ? [] : options,
      correctAnswer: correctAnswers,
      type: questionType,
      points
    };

    quiz.questions.push(newQuestion);

    renderQuiz();
    console.log(JSON.stringify(quiz));

    backdrop.remove();
    formDiv.remove();
  
  });

  // Handle cancel button
  document.getElementById('cancelQuestionBtn').addEventListener('click', () => {
    formDiv.remove();
    backdrop.remove();
  });

  backdrop.addEventListener('click', closeModal);

  // Close modal function
  function closeModal() {
    // Restore page scroll
    const scrollY = parseInt(document.body.style.top || '0', 10);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, -scrollY);
    // Remove modal elements
    backdrop.remove();
    formDiv.remove();
  }

  document.getElementById('points-add').addEventListener('wheel', function(event) {
    event.preventDefault();
  });
  
}

renderQuiz();

