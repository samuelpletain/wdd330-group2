const app = document.getElementById('app')
let selected = 0

window.addEventListener('load', () => {
  buildListView(app)
  buildSingleView(app)
  const [nextButton, prevButton, ships, pages] = [document.getElementById('next'), document.getElementById('prev'), document.getElementById('ships')]
  fetchData('https://swapi.dev/api/starships/', prevButton, nextButton, ships)
  if (next !== '') {
    nextButton.addEventListener('click', () => fetchData(next, prevButton, nextButton, ships))
  } 
  if (prev !== '') {
    prevButton.addEventListener('click', () => fetchData(prev, prevButton, nextButton, ships))
  }
})

function buildListView(parent) {
  let [prev, next] = ['', '']
  
  const listView = document.createElement('div')
  const ships = document.createElement('ul')
  const nextButton = document.createElement('button')
  const prevButton = document.createElement('button')
  const pages = document.createElement('div')
  
  listView.id = 'all'
  pages.id = 'pages'
  ships.id = 'ships'
  nextButton.id = 'next'
  nextButton.textContent = 'Next'
  prevButton.id = 'prev'
  prevButton.textContent = 'Previous'
  
  listView.append(prevButton, pages, nextButton, ships)
  parent.append(listView)
}

function buildSingleView(parent) {
  const singleView = document.createElement('div')
  const returnButton = document.createElement('button')
  const content = document.createElement('div')
  
  singleView.id = 'single'
  returnButton.id = 'return'
  returnButton.textContent = 'Back'
  content.id = 'content'
  
  returnButton.addEventListener('click', toggleView)

  singleView.append(returnButton, content)
  singleView.classList.toggle('hidden')
  parent.append(singleView)
}

function updateSingleView(ship) {
  const parent = document.getElementById('content')
  parent.innerHTML = ''
  for (const [key, value] of Object.entries(ship)) {
    const p = document.createElement('p')
    p.textContent = `${key}: ${value}`
    parent.append(p)
  }
}

function toggleView() {
  const listView = document.getElementById('all')
  const singleView = document.getElementById('single')
  listView.classList.toggle('hidden')
  singleView.classList.toggle('hidden')
}

function fetchData(url, prevButton, nextButton, list) {
  list.innerHTML = 'Loading...'
  fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
    list.innerHTML = ''
    data.results.forEach(ship => {
      const li = document.createElement('li')
      li.textContent = ship.name
      li.addEventListener('click', () => {
        updateSingleView(ship)
        toggleView()
      })
      list.append(li)
    })
    if (data.previous) {
      prev = data.previous
      prevButton.disabled = false
    } else {
      prevButton.disabled = true
    }
    if (data.next) {
      next = data.next
      nextButton.disabled = false
    } else {
      nextButton.disabled = true
    }
    buildPages(document.getElementById('pages'), data.count, prevButton, nextButton)
  })  
  
}

function buildPages(parent, count, prevButton, nextButton) {
  parent.innerHTML = ''
  for(let i = 0; i < count/10; i++) {
    const button = document.createElement('button')
    button.textContent = i + 1
    if (selected === i) {
      button.classList.toggle('selected')
    }
    const url = 'https://swapi.dev/api/starships/?page=' + (i + 1)
    button.addEventListener('click', (e) => {
      fetchData(url, prevButton, nextButton, ships)
      selected = i
    })
    parent.append(button)
  }
}