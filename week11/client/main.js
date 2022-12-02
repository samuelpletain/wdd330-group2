import Auth from "./auth.js";
import makeRequest from "./authHelpers.js";

const auth = new Auth
const form = document.getElementById('login')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  auth.login(getPosts)
}) 

const postForm = document.getElementById('creatPost')

async function getPosts() {
  try {
    const postsDiv = document.getElementById('posts')
    postsDiv.innerHTML = ''
    const posts = await makeRequest('posts', 'GET', null, auth.token)
    console.log(posts)
    for (let post of posts) {
      const postContainer = document.createElement('div')
      postContainer.dataset.id = post.id
      const title = document.createElement('h2')
      title.textContent = post.title
      const content = document.createElement('p')
      const date = document.createElement('p')
      date.textContent = Date(post.date)
      content.textContent = post.content
      postContainer.append(title, content, date)
      postsDiv.append(postContainer)
    }
    postForm.classList.toggle('hidden')
  } catch (error) {
    console.log(error)
  }
}

postForm.addEventListener('click', (e) => {
  postPost()
})


async function postPost() {
  const title = document.getElementById('postTitle')
  const content = document.getElementById('postContent')
  if (title.value !== '' && content.value !== '') {
    const body = {
      title: title.value,
      content: content.value
    }
    try {
      const res = await makeRequest('posts', 'POST', body, auth.token)
      title.value = ''
      content.value = ''
      getPosts()
    }
    catch (error) {
      console.log(error)
    }
  }
}