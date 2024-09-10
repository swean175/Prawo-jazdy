
var baza
const btn = document.getElementById('generateButton')
const btnConvert = document.getElementById('convertButton')
const input = document.getElementById('userInput')
const answer = document.getElementById('answer')
const complete = document.getElementById('complete')
const dataCompleted = `<h1>Data Succesfully Loaded<h1>`
const converted = document.getElementById('converted')
let newBaza = []

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

async function selectB(){
  let newData = await fetchData()
  newData.pytania.forEach(element => {
      let checkForB = element['Kategorie'].split(',')
      // console.log('checkForB ' + checkForB)
   let filteredB = checkForB.filter((word) => word === 'B')
  //  console.log('filteredB ' + filteredB)
  filteredB.length > 0 ? newBaza.push(element) : null
  })
  console.log('selectB done')
  return true
}

async function converter(){
  console.log('conversion running')
  let sorted = await selectB()
  if (sorted){
      console.log('sorted done')
  }
  return true
}

  btn.addEventListener('click', ()=> {
    console.log('input '+input.value)
    let ids 
    if (input.value){
      ids = randomQuestions(input.value)
      showAnswer(ids)
    }
  })


  btnConvert.addEventListener('click',async ()=> {
    const elementy = ["Lp.", "Numer pytania", "Pytanie", "Poprawna odp", "Media", "Nazwa media tłumaczenie migowe (PJM) treść płyt", "Kategorie", "Pytanie [ENG]", "Pytanie [DE]", "Pytanie [UA]"]
    let text
    let show
    let done = await converter()
    if (done){
        show = newBaza
    console.log('should show ' + show[0]['Kategorie'])
    show.forEach(element => {
      let p = ""
      for (let i = 1; i < elementy.length; i++){
         p += `<p>"${elementy[i]}":"${element[elementy[i]]}",</p>`
      }

     text += `<div>"Q${element["Lp."]}":{${p}},<br></div>`
    })
    converted.innerHTML = `{${text}}`
    } else {
      console.log('too short time')
    }
  
  })

