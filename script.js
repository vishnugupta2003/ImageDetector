const imageFile = document.getElementById("file")
const rightImage = document.getElementById("right-img")
const magicBtn = document.getElementById("magic-btn")
const loader = document.getElementById("loader")
const myModal = document.getElementById("myModal")
const resultImage = document.getElementById("result-image")
myModal.style.display = "block";

let apiUrl = "https://python-api.techsimplus.com/api/amazon-service/"
let imageBase64 = null;


imageFile.addEventListener("change", () => {
    const oneImage = imageFile.files[0]
    const imageUrl = URL.createObjectURL(oneImage)
    rightImage.src = imageUrl

    const reader = new FileReader()
    reader.readAsDataURL(oneImage)
    reader.onload = () => {
        imageBase64 = reader.result.split(",")[1]
    }

})  
magicBtn.addEventListener("click", () => {
    const service = document.querySelector('input[name = "service"]:checked')?.value
    if(service === undefined){
        alert("Please Select Correct Service")
        return;
    }

    if(imageBase64 === null){
        alert("Please Select Image")
        return;
    }

    const newValues = {
        service_type:service,
        image:imageBase64
    }

    loader.style.display = "flex"

    fetch(apiUrl, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newValues)
    }).then((result) => {
        return result.json()
    }).then((out) => {
        rightImage.src = out.data.image
        resultImage.src = out.data.image
        loader.style.display = "none"
        myModal.style.display = "block";
    })
    
})

myModal.addEventListener('click', () => {
    myModal.style.display = "none";
})
