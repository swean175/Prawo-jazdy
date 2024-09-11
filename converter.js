var baza
const btnConvert = document.getElementById('convertButton')
const answer = document.getElementById('answer')
const converted = document.getElementById('converted')
let newBaza = []
    
async function fetchData() {
    try {
      const response = await fetch('./original-baza.json');
      baza = await response.json();
      return baza;
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      return null;
    } finally {
      console.log('Finished fetching data');
    }
  }

  fetchData()

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




btnConvert.addEventListener('click',async ()=> {
    btnConvert.style="display: none"
    const elementy = ["Lp.", "Numer pytania", "Pytanie", "Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Poprawna odp", "Media", "Kategorie", "Nazwa media tłumaczenie migowe (PJM) treść płyt", "Pytanie [ENG]", "Odpowiedź A [ENG]", "Odpowiedź B [ENG]", "Odpowiedź C [ENG]", "Pytanie [DE]", "Odpowiedź A [DE]", "Odpowiedź B [DE]", "Odpowiedź C [DE]", "Pytanie [UA]", "Odpowiedź A [UA]", "Odpowiedź B [UA]", "Odpowiedź C [UA]"]
    let text
    let show
    let original
    let modified
    let numberOfQuaestions = 0
    let done = await converter()
    if (done){
        show = newBaza
        console.log('should show ' + show[0]['Kategorie'])
        show.forEach(element => {
        numberOfQuaestions += 1
        let p = ""
            for (let i = 1; i < elementy.length; i++){
                original = element[elementy[i]]
                if (original != undefined){
                if (original.includes('"')) {
                    console.log('should replace')
                    modified = original.replace(/"/g, "'")
                    } else {
                    modified = original
                }
                }
                p += `<p>"${elementy[i]}":"${modified}"${i === (elementy.length-1) ? "" : ','}</p>`
            }
            text += `<div>"q${numberOfQuaestions}":{${p}},</div>`
        })
        converted.innerHTML = `{${text}}`
    } else {
        console.log('too short time')
    }
})