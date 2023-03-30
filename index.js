import { catsData } from './data.js'
let emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
let memeModalInner = document.getElementById('meme-modal-inner')
let memeModal = document.getElementById('meme-modal')
let memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
let gifsOnlyOption = document.getElementById('gifs-only-option')

memeModalCloseBtn.addEventListener('click', function(){
    memeModal.style.display = 'none'
})

getImageBtn.addEventListener('click', renderCat)

function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
    <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
    >
    `
    memeModal.style.display = 'flex'
}

function getSingleCatObject(){

    if(document.querySelector('input[type="radio"]:checked')){
        const emotion = document.querySelector('input[type="radio"]:checked').value
        const matchingCatsArray = catsData.filter(function(cat){
            if(gifsOnlyOption.checked){
                return cat.emotionTags.includes(emotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(emotion)
            }
        })
            
        if(matchingCatsArray.length === 1){
            return matchingCatsArray[0]
        }
        else if(matchingCatsArray.length > 1){
            const randomNumber = ~~(Math.random() * matchingCatsArray.length)
            return matchingCatsArray[randomNumber]
        }
    
    }
    
}

emotionRadios.addEventListener('click', highlightCheckedOption)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio') 
    for(let radio of radios){
        radio.classList.remove('highlight')
    }
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