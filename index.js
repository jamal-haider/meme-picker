import { catsData } from './data.js'
let emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')


getImageBtn.addEventListener('click', renderCat)

function renderCat(){
    const catObject = getSingleCatObject()
    console.log(catObject)
}

function getSingleCatObject(){
    const emotion = document.querySelector('input[type="radio"]:checked').value
    const catArray = []
    for(let cat of catsData)
        if(cat.emotionTags.includes(emotion))
            catArray.push(cat)
    const randomNumber = ~~(Math.random() * catArray.length)
    return catArray[randomNumber]
}

emotionRadios.addEventListener('click', highlightCheckedOption)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio') 
    for(let radio of radios)
        radio.classList.remove('highlight')
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function getEmotionsArray(cats){
    const emotionsArray = []
    for(let cat of cats)
        for(let emotion of cat.emotionTags)
            if(!emotionsArray.includes(emotion))
                emotionsArray.push(emotion)
    return emotionsArray
}

function render(cats){
    let radioItems = ''
    const emotions = getEmotionsArray(cats)
    for(let emotion of emotions){
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                    value="${emotion}"
                    id="${emotion}"
                    name="emotions"
                    type="radio"
                >
            </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

render(catsData)