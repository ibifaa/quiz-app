function submitQuiz() {
    const selectedOptions = [];

    // Collect selected options for each question
    for (let i = 0; i < <%= quiz.questions.length %>; i++) {
      const questionSelect = document.getElementsByName(i.toString())[0];
      selectedOptions.push({
        questionIndex: i,
        selectedOption: parseInt(questionSelect.value, 10),
      });
    }

    // Send the data to the server
    fetch('/quiz/<%= quiz._id %>/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedOptions }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle response from the server (if needed)
      console.log(data);
      alert('Quiz submitted successfully!');
      // Redirect or perform any other actions based on your needs
    })
    .catch(error => {
      console.error('Error submitting quiz:', error);
      alert('Error submitting quiz. Please try again.');
    });
  }