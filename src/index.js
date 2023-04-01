
const toyCollectionDiv = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.add-toy-form')

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let url = 'http://localhost:3000/toys'
fetch(url).then(res => res.json()).then(data => renderToyCard(data))

const renderToyCard = array => {
    array.forEach(toys => {
    let toyDiv = document.createElement('div')
      toyDiv.classList.add('card')

      let h2 = document.createElement('h2')
      h2.textContent = toys.name
      
      let toyImg = document.createElement('img')
      toyImg.src = toys.image
      toyImg.classList.add('toy-avatar')
      
      let p = document.createElement('p')
      p.textContent = toys.likes
      
      let likeBtn = document.createElement('button')
      likeBtn.textContent = "like <3"
      p.classList.add('like-btn') 

      toyCollectionDiv.append(toyDiv)
      toyDiv.append(h2,toyImg,p,likeBtn)

      likeBtn.addEventListener('click', ()=> {
       parseInt(toys.likes++)
        p.textContent = toys.likes
 
        fetch(`http://localhost:3000/toys/${toys.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "Application/json",
        },
        body: JSON.stringify({likes:p.textContent}),
      }).then(res => res.json()).then(data => ([data]))
      })
    })
}

toyForm.addEventListener('submit', (e)=> {
  e.preventDefault()
  let newToy = {  name: e.target.name.value,
                  image: e.target.image.value,
                  likes: 0
  }
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "Application/json",
    },
    body: JSON.stringify(newToy),
  }).then(res => res.json()).then(data => renderToyCard([data]))
  toyForm.rese()
})
