function urlChecker(formText){
    formText.toLowerCase()
    const inputReg = /(https?:\/\/)?([a-z\.-]+)\.(\w{2})([\/\w\.-]*)*\/?/i
    if(!inputReg.test(formText) || formText.length === 0) {
        document.querySelector('#error').innerHTML = "Kindly fill up the input with a correct URL";
        return false;
    }
}
export { urlChecker }