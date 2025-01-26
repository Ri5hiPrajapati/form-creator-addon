function createFormFromSheet() {
  // Open the Google Sheet
  const sheetName = "Google word to sheet";
  const sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1q2Nh8CmiZiVSvYXl_t_SW7xpY3WitchvFy__4879bz8/edit#gid=0").getSheetByName("Sheet1");
  
  // Get all data from the sheet
  const data = sheet.getDataRange().getValues();
  
  // Create a new Google Form
  const form = FormApp.create(sheetName);
  
  // Enable "Make this a quiz"
  form.setIsQuiz(true); // Enable quiz mode
  
  // Loop through the data and create questions
  for (let i = 0; i < 50; i++) {
    try {
      // Calculate the row indices for each question and options
      const questionRow = i * 6;
      const optionARow = questionRow + 1;
      const optionBRow = questionRow + 2;
      const optionCRow = questionRow + 3;
      const optionDRow = questionRow + 4;
      
      // Get the question and options
      const question = data[questionRow][0];
      const optionA = data[optionARow][0];
      const optionB = data[optionBRow][0];
      const optionC = data[optionCRow][0];
      const optionD = data[optionDRow][0];
      
      // Add the question to the form
      const item = form.addMultipleChoiceItem();
      item.setTitle(question);
      
      // Add options to the question
      const choices = [];
      let correctAnswer = null;
      
      // Check each option for the correct answer (marked with *)
      [optionA, optionB, optionC, optionD].forEach((option, index) => {
        if (option.includes("*")) {
          // Remove the * and mark as correct
          const cleanedOption = option.replace(/\*/g, "");
          choices.push(item.createChoice(cleanedOption, true));
          correctAnswer = cleanedOption;
        } else {
          choices.push(item.createChoice(option));
        }
      });
      
      // Set the choices for the question
      item.setChoices(choices);
      
      // Assign 1 point to the question
      item.setPoints(1); // Each question is worth 1 point
      
      // Log progress
      console.log(`Processed question ${i + 1}: ${question}`);
    } catch (error) {
      console.error(`Error processing question ${i + 1}: ${error.toString()}`);
    }
  }
  
  console.log("Form creation completed!");
}