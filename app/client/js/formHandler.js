function handleSubmit(event) {
    event.preventDefault()
    console.log("IM HERE")
    // check what text was put into the form field
    let formText = document.getElementById('name').value
 
    // const inputReg = /(https?:\/\/)?([a-z\.-]+)\.(\w{2})([\/\w\.-]*)*\/?/i
    // if(!inputReg.test(formText) || formText.length === 0){
    //     alert("Kindly fill up the input with a correct URL")
    //     return false;
    // }
    Client.checkForName(formText)
    console.log("::: Form Submitted :::")

    fetch('http://localhost:8081/test',{
      method: 'POST', 
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},      
      body: JSON.stringify({text: formText}), 
    })
    .then(res => res.json())
    .then(res => {
        document.querySelector('#results').innerHTML = res.text;
        console.log(res)
    })
    .catch(error => {
      let errorMes = "Something went wrong, check again"
      document.querySelector('#results').innerHTML = errorMes;
      console.log(error)
    })
}
// https://www.cnbc.com/2020/07/08/viacomcbs-reaches-deal-to-stream-uefa-champions-league-matches.html
export { handleSubmit }
/* <script type="text/javascript" src="../../../dist/main.js"></script> */