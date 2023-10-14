export const processQuiz = (quizInput) => {
    const lines = quizInput.split('\n');
    
    if (lines.length < 5) {
      throw new Error("Formato de entrada inválido");
    }
  
    const question = lines[0];
    const options = lines.slice(1, 5);
  
    const quizJSON = {
      question,
      options: options.map((option, index) => {
        const match = option.match(/^([a-d])\) (.+)$/);
        if (!match) {
          throw new Error(`Formato de opção inválido na linha ${index + 2}`);
        }
        
        const [_, label, text] = match;
        const isCorrect = text.includes('(Correta)');
        
        return { label, text: text.replace('(Correta)', '').trim(), correct: isCorrect };
      })
    };
  
    return quizJSON;
  };
  