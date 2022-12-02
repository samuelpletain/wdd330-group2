  // Quake View handler
  export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
      //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
      listElement.innerHTML = ''
      quakeList.features.map(quake => {
        const li = document.createElement('li')
        li.dataset.id = quake.id
        const title = document.createElement('h2')
        title.textContent = quake.properties.title
        const date = document.createElement('p')
        date.textContent = new Date(quake.properties.time)
        li.append(title, date)
        listElement.append(li)
      })
      .join('');
    }
    renderQuake(quake, element) {
      const quakeProperties = Object.entries(quake.properties);
      // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
      element.innerHTML = ''

      quakeProperties.map((property) => {
        const container = document.createElement('div')
        const title = document.createElement('h2')
        title.textContent = property[0]
        const content = document.createElement('p')
        content.textContent = property[1]
        container.append(title, content)
        element.append(container)
      })
    }
  }