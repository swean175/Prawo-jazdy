
var baza
const btn = document.getElementById('generateButton')
const next = document.getElementById('next')
const answer = document.getElementById('answer')
const complete = document.getElementById('complete')
const dataCompleted = `<h1>Data Succesfully Loaded<h1>`
const converted = document.getElementById('converted')
const lang = document.getElementById('lang')
let newBaza = []
let displayedQuestions = []
let displayed = 0
let text = ""
let language = "pl"
console.log(language)

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


  lang.addEventListener('change', ()=> {
    language = lang.value
  })
  
  next.addEventListener('click', ()=> {
    singleQuestion()
  })
  
  
  btn.addEventListener('click', ()=> {
     singleQuestion()
  })

  window.document.addEventListener('click', (e)=>{
    if (e.target) {
        console.log('choosen = '+e.target.data-choice.value)
    } else {
      console.log('not choice')
    }
  })

  function randomQuestions(num) {
    const uniqueNumbers = [];
    while (uniqueNumbers.length < num) {
      const randomNumber = Math.floor(Math.random() * 2052);
      if (!uniqueNumbers.includes(randomNumber)) {
        uniqueNumbers.push(randomNumber);
      }
    }
    return uniqueNumbers;
  }

function showAnswer(ids){
    const idArray = ids
    let translationQ = ""
    let translationA = ""
    let translationB = ""
    let translationC = ""


    switch (language) {
      case 'pl':
        translationQ = ` Pytanie :<p> ${baza["q"+idArray[displayed]]['Pytanie']}</p> `;
        translationA = ` A :<button class='answer' id='choosen' data-choice='A'> ${baza["q"+idArray[displayed]]['Odpowiedź A']}</button> `;
        translationB = ` B :<button class='answer' id='choosen' data-choice='B'> ${baza["q"+idArray[displayed]]['Odpowiedź B']}</button> `;
        translationC = ` C :<button class='answer' id='choosen' data-choice='C'> ${baza["q"+idArray[displayed]]['Odpowiedź C']}</button> `;
      break;
      case 'en':
        translationQ = ` Questtion :<p> ${baza["q"+idArray[displayed]]['Pytanie [ENG]']}</p> `;
        translationA = ` A :<button class='answer' id='choosen' data-choice='A'> ${baza["q"+idArray[displayed]]['Odpowiedź A [ENG]']}</button> `;
        translationB = ` B :<button class='answer' id='choosen' data-choice='B'> ${baza["q"+idArray[displayed]]['Odpowiedź B [ENG]']}</button> `;
        translationC = ` C :<button class='answer' id='choosen' data-choice='C'> ${baza["q"+idArray[displayed]]['Odpowiedź C [ENG]']}</button> `;
      break;
      case 'de':
        translationQ = ` Frage : <p>${baza["q"+idArray[displayed]]['Pytanie [DE]']}</p> `;
        translationA = ` A :<button class='answer' id='choosen' data-choice='A'> ${baza["q"+idArray[displayed]]['Odpowiedź A [DE]']}</button> `;
        translationB = ` B :<button class='answer' id='choosen' data-choice='B'> ${baza["q"+idArray[displayed]]['Odpowiedź B [DE]']}</button> `;
        translationC = ` C :<button class='answer' id='choosen' data-choice='C'> ${baza["q"+idArray[displayed]]['Odpowiedź C [DE]']}</button> `;
        break;
        case 'ua':
        translationQ = ` запитання :<p> ${baza["q"+idArray[displayed]]['Pytanie [UA]']}</p>  `;
        translationA = ` A :<button class='answer' id='choosen' data-choice='A'> ${baza["q"+idArray[displayed]]['Odpowiedź A [UA]']}</button> `;
        translationB = ` B :<button class='answer' id='choosen' data-choice='B'> ${baza["q"+idArray[displayed]]['Odpowiedź B [UA]']}</button> `;
        translationC = ` C :<button class='answer' id='choosen' data-choice='C'> ${baza["q"+idArray[displayed]]['Odpowiedź C [UA]']}</button> `;
        break;
      default:
        translationQ = ` Pytanie :<p> ${baza["q"+idArray[displayed]]['Pytanie']}</p> `;
    }
  
    text = `<div id='pytanko'> 
            <p> Numer Pyania = ${baza["q"+ids[displayed]]['Numer pytania']}</p> 
            ${translationQ}
            <p> Media = ${baza["q"+ids[displayed]]['Media']}</p> 
            <div class = 'media'><img class='img' src = './media/exmp.jpg'></div>
            ${translationA+translationB+translationC}</div>`
    console.log(baza["q"+ids[displayed]])
    displayedQuestions.push(baza["q"+ids[displayed]])
    render()
    }


function singleQuestion(){
  btn.style = "display: none"
  next.className = "next"
  let ids = []
  displayed += 1
  ids = randomQuestions(32)
  showAnswer(ids)
}


  function results(){
    //<p> Poprawna Odpowiedz = ${baza["q"+ids[displayed]]['Poprawna odp']}</p> 
    //      <p> Kategorie = ${baza["q"+ids[displayed]]['Kategorie']}</p> 
    btn.innerText = 'Rozpocznij następny'
  }

function render(){
  if (displayed < 33){
    answer.innerHTML = text
} else {
  results()
  answer.innerHTML = text
}
}