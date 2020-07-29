function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value

    // Client.checkForName(formText)
    Client.urlChecker(formText)
    fetch('http://localhost:8081/test',{
      method: 'POST', 
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},      
      body: JSON.stringify({text: formText}), 
    })
    .then(res => res.json())
    .then(res => {
      document.querySelector('#formResult').innerHTML = "Form Results";
      document.querySelector('#polarity').innerHTML = `Polarity: ${res.polarity}`;
      document.querySelector('#polarity_confidence').innerHTML = `Polarity Confidence: ${res.polarity_confidence}`;
      document.querySelector('#subjectivity').innerHTML = `Subjectivity: ${res.subjectivity}`;
      document.querySelector('#subjectivity_confidence').innerHTML = `Subjectivity Confidence: ${res.subjectivity_confidence}`;
      document.querySelector('#text').innerHTML = `Text: ${res.text}`;
    })
    .catch(error => {
      document.querySelector('#error').innerHTML = "Something went wrong, check again";
    })
}
export { handleSubmit }
