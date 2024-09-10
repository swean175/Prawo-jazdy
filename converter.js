var baza


console.log('something running')

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
    }
  }

async function selectB(){
    let newData = await fetchData()
    newData.pytania.forEach(element => {
        let checkForB = element['Kategorie'].split(',')
     if (checkForB.filter((word) => word === 'B')){
        newBaza.push(element)
     }
    })
    console.log('selectB done')
    return true
}

export async function converter(){
    console.log('conversion running')
    let sorted = await selectB()
    if (sorted){
        console.log('sorted done')
        return newBaza
        
    }
    
   
}