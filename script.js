var baza
const btn = document.getElementById('generateButton')
const input = document.getElementById('userInput')
const answer = document.getElementById('answer')
const complete = document.getElementById('complete')
const dataCompleted = `<h1>Data Succesfully Loaded<h1>`


async function fetchData() {
    try {
      const response = await fetch('./data-baza.json');
      baza = await response.json();
      return baza;
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      return null;
    } finally {
      console.log('Finished fetching data');
     complete.innerHTML = dataCompleted
    }
  }

  fetchData()

  function randomQuestions(num) {
    const uniqueNumbers = [];
    while (uniqueNumbers.length < num) {
      const randomNumber = Math.floor(Math.random() * 2001);
      if (!uniqueNumbers.includes(randomNumber)) {
        uniqueNumbers.push(randomNumber);
      }
    }
    return uniqueNumbers;
  }

function showAnswer(ids){
    const idArray = ids
    let style
    let text = ""
    for (let i = 0; i < idArray.length; i++){
        if (i % 2 === 0) {
            style =  "class='even'";
          } else {
            style =  "class='odd'";
          }
        text += `<div id='pytanko' ${style}> 
        <p> Lp = ${baza.pytania[idArray[i]]['Lp.']}</p> 
         <p> Numer Pyania = ${baza.pytania[idArray[i]]['Numer pytania']}</p> 
          <p> Pytanie = ${baza.pytania[idArray[i]]['Pytanie']}</p> 
           <p> Poprawna Odpowiedz = ${baza.pytania[idArray[i]]['Poprawna odp']}</p> 
            <p> Media = ${baza.pytania[idArray[i]]['Media']}</p> 
             <p> Kategorie = ${baza.pytania[idArray[i]]['Kategorie']}</p> 
              <p> Pytanie [ENG] = ${baza.pytania[idArray[i]]['Pytanie [ENG]']}</p> 
               <p> Pytanie [DE] = ${baza.pytania[idArray[i]]['Pytanie [DE]']}</p> 
                <p> Pytanie [UA] = ${baza.pytania[idArray[i]]['Pytanie [UA]']}</p> 
        </div>`
        console.log(baza.pytania[idArray[i]])
    }
 answer.innerHTML = text
}


  btn.addEventListener('click', ()=> {
    console.log('input '+input.value)
    let ids 
    if (input.value){
      ids = randomQuestions(input.value)
      showAnswer(ids)
    }
  })
