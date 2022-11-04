const app = document.getElementById('app')
const peoples = document.createElement('ul')

let [previous, next] = ['', '']

window.addEventListener('load', createApp)

function createApp() {
  renderFullView(app)
}

function renderFullView(parent) {
  const full = document.createElement('div')
  
  const nextButton = document.createElement('button')
  const previousButton = document.createElement('button')
  const pagination = document.createElement('div')

  peoples.id = 'peoples'
  full.id = 'full'
  nextButton.id = 'next'
  nextButton.textContent = 'Next'
  previousButton.id = 'previous'
  previousButton.textContent = 'Previous'
  pagination.id = 'pages'


  full.append(peoples, previousButton, pagination, nextButton)
  parent.append(full)
  
  fetchData('https://swapi.dev/api/people/', peoples, previousButton, nextButton)
  
  previousButton.addEventListener('click', () => {
    fetchData(previous, peoples, previousButton, nextButton)
  })
  
  nextButton.addEventListener('click', () => {
    fetchData(next, peoples, previousButton, nextButton)
  })
  
}

function renderSingleView(parent) {

}

function renderPagination(parent) {
  parent.innerHTML = '';
  for(let i = 0; i< count/10; i++) {
    
    const button = document.createElement('button')
    button.textContent = i+1
    button.addEventListener('click', () => {
      const url = 'https://swapi.dev/api/people/?page=' + (i+1)
      fetchData(url, peoples)
    })
    parent.append(button)
  }
}

function fetchData(url, list) {
  list.innerHTML = ''
  fetch(url)
    .then(response => response.json())
    .then(data => {
      count = data.count
      data.results.forEach(person => {
        const li = document.createElement('li')
        li.textContent = person.name

        list.append(li)
      })
      
      if (data.previous) {
        previous = data.previous
      }

      if (data.next) {
        next = data.next
      }  
      
      renderPagination(document.getElementById('pages'))
    }
  )
}