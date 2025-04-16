export let quiz = {
  questions: [
    {
      text: "What is your name?",
      options : ["Mitesh","Vishal","Nitin"],
      correctAnswer: ["Mitesh"],
      type: "redio",
      points: 10,
    },
    {
      text: "What is your Interest?",
      options : ["Java","Js","Python"],
      correctAnswer: ["Js","Python"],
      type: "multiselect",
      points: 20,
    },
  ],
  resultType: "percentage",
  passPercentage: 50,
};