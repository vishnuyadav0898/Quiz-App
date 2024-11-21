// export const data = [
//     {
//       question: "Which device is required for the Internet connection?",
//       option1: "Modem",
//       option2: "Router",
//       option3: "LAN Cable",
//       option4: "Pen Drive",
//       ans: 1,
//     },
//     {
//       question: "Which continent has the highest number of countries?",
//       option1: "Asia",
//       option2: "Europe",
//       option3: "North America",
//       option4: "Africa",
//       ans: 4,
//     },
//     {
//       question: "Junk e-mail is also called?",
//       option1: "Spam",
//       option2: "Fake",
//       option3: "Archived",
//       option4: "Bin",
//       ans: 1,
//     },
//     {
//       question: "A computer cannot BOOT if it does not have the?",
//       option1: "Application Software",
//       option2: "Internet",
//       option3: "Operating System",
//       option4: "Mouse",
//       ans: 3,
//     },
//     {
//       question: "First page of Website is termed as?",
//       option1: "Index Page",
//       option2: "Homepage",
//       option3: "Sitemap",
//       option4: "Pen Drive",
//       ans: 2,
//     },
//     {
//       question: "The numbering system with a radix of 16 is more commonly referred to as ",
//       option1: "Binary",
//       option2: "Duodecimal",
//       option3: "Hexidecimal",
//       option4: "Octal",
//       ans: 3
//     },
//     {
//       question: "How long is an IPv6 address?",
//       option1: "128 bits",
//       option2: "32 bits",
//       option3: "64 bits",
//       option4: "128 bytes",
//       ans: 1
//     }
//   ];
// const URL = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';

// let data = [];
// const fetchQuizData = async () => {
//   try {
//     const response = await fetch(URL);
//     const result = await response.json();
    

    
//     data = result.results.map((element) => {
//       const options = [...element.incorrect_answers];
//       const correctIndex = Math.floor(Math.random() * (options.length + 1));
//       options.splice(correctIndex, 0, element.correct_answer);
//       return {
//         question: element.question,
//         option1: options[0],
//         option2: options[1],
//         option3: options[2],
//         option4: options[3],
//         ans: correctIndex + 1,
//       };
//     });
//   } catch (error) {
//     console.error('Error fetching or processing quiz data:', error);
//   }
// };

// fetchQuizData();

//  export { data };
