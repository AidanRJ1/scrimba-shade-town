import { sunglassesOptions, sunglasses } from "./data.js";

const productDetailsEl = document.getElementById("productDetails")
const productImage = document.getElementById("productImage")
const productFrames = document.getElementsByClassName("product-image_frame")[0]
const productLenses = document.getElementsByClassName("product-image_lenses")[0]

let sunglassesNew = ''

function setSunglasses(sunglassesNew = sunglasses) {
    return sunglassesNew
}

function render(sunglassesNew) {
    const { model, lenses, frame } = sunglassesNew;

    const price = "$" + (model.price + lenses.price + frame.price)
    
  
    productDetailsEl.innerHTML = `
    <h1>${model.name}</h1>
    <p>Custom: ${lenses.color} lenses, ${frame.color} frames</p>
    <p>${price}</p>
    `;
    
    const currClass = productImage.classList[1]
    productImage.classList.replace(currClass, model.cssClass)
    
    const currFramesClass = productFrames.classList[1]
    productFrames.classList.replace(currFramesClass, frame.cssClass)
    
    const currLensesClass = productLenses.classList[1]
    productLenses.classList.replace(currLensesClass, lenses.cssClass)
    
}

//Highlight current selection
function addHighlight(clickedItem) {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb"))
            .forEach((thumb) => thumb.classList.remove("selected"));

    } else if (clickedItem.classList.contains("product-color-swatch")) {
        const siblings = clickedItem.closest("ul").querySelectorAll("button")
        Array.from(siblings)
            .forEach((swatch) => swatch.classList.remove("selected"));
    }
    clickedItem.classList.add("selected") 
}


document.body.addEventListener("click", (event) => {
    const clickedItem = event.target
    //if sunglassesNew defined take variable from updates 
        //else use original sunglasses object
    if (!sunglassesNew) {
        sunglassesNew = sunglasses
    }
    
    // update model
    if (clickedItem.classList.contains("product-thumb")) {

        const currName = clickedItem.dataset.name

        const modelOptions = sunglassesOptions.models
        .filter((item) => item.name === currName)[0] 
        
        const name = modelOptions.name
        const price = modelOptions.price
        const thumbImg = modelOptions.thumbImg
        const cssClass = modelOptions.cssClass

        sunglassesNew = {
            ...sunglassesNew,
            model: {
                name: name,
                price: price,
                thumbImg: thumbImg,
                cssClass: cssClass,
            }
        }
       
        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
    
    // update colors for frames / lenses
    if (clickedItem.classList.contains("product-color-swatch")) {
        const currColor = clickedItem.dataset.color
        
        // check nearest parent div
            //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            const colorOptions = sunglassesOptions.lenses
            .filter((item) => item.color === currColor)[0];
            
            const color = colorOptions.color
            const price = colorOptions.price
            const cssClass = colorOptions.cssClass
        
            sunglassesNew = {
                ...sunglassesNew,
                lenses: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                },
            }
        } 
        
        //frames
        else {
            const colorOptions = sunglassesOptions.frames
            .filter((item) => item.color === currColor)[0];
            
            const color = colorOptions.color
            const price = colorOptions.price
            const cssClass = colorOptions.cssClass
            
            sunglassesNew = {
                ...sunglassesNew,
                frame: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                }     
            }
        }

        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
})

render(sunglasses)