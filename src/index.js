const dogBar =document.querySelector("#dog-bar")
const dogInfo =document.querySelector("#dog-info")

const init = () => {
    getAllDogs()
        .then((dogs) => addAllDogsToDogNavBar(dogs))
}


//fetches  // 2
const url = "http://localhost:3000/pups"

const getAllDogs = () => {
    return fetch(url)
    .then(resp => resp.json())
}
///fetch 3/////////////

const getOneDog = (id) => {
    return fetch(`${url}/${id}`)
    .then(resp => resp.json())
}

//helper fx add all dogs to nav bar
const addAllDogsToDogNavBar= (dogs) => {
    console.log(dogs)

    dogs.forEach(addDogSpanToNav)
}
const addDogSpanToNav = (dog) => {
        // create a span tag
    const dogSpan=document.createElement("span")
        //grab the dog name data
    dogSpan.textContent = dog.name

        //append it
        dogBar.append(dogSpan)

        dogSpan.addEventListener("click", () => {
            displayDogInfo(dog)
        })
    }
// step 3 
    const displayDogInfo = (dog) => {
        getOneDog(dog.id)
            .then(dog => addDogInfoToPage(dog))
    }

    const addDogInfoToPage = (dog) => {
        //console.log(dog)
        dogInfo.innerHTML=""
        // create html node element
        const dogImg=document.createElement("img")
        const dogTitle=document.createElement("h2")
        const dogButton=document.createElement("button")
        //slap the dog data
        dogImg.src=dog.image
        dogTitle.innerText = dog.name
        dogButton.innerText = dog.isGoodDog? "Good Dog!" : "Bad Dog!"
        dogButton.dataset.id=dog.id //add dataset id 
       
        //event listener
        dogButton.addEventListener("click", (event) => 
        onGoodDogButtonClick(event))
        
        //append them
        dogInfo.append(dogImg, dogTitle, dogButton)
    }
/////4
const onGoodDogButtonClick = (event) => {
    let newValue;
    console.log(event)
    if(event.target.innerText.includes("Good")){
            event.target.innerText = "Bad Dog"
            newValue = false
    }
    else {
        event.target.innerText = "Good Dog"
        newValue = true
    }

    toggleGoodDog(event.target.dataset.id, newValue)
        .then(data => console.log(data))
}

// const updateDogBar = () => {
// }


const toggleGoodDog = (id, newValue) => {
    return fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: newValue
        })
    })
    .then(resp => resp.json())
}
   


init()