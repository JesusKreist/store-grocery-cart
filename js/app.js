// filterButton start

(function () {
    // vscode commit test

    const el = document.getElementsByClassName("store-item");
    const inputBar = document.getElementById("search-item");
    const filterButtons = document.getElementsByClassName("filter-btn");

    const setBlock = (event) => {
        if (event) {
            event.preventDefault();
        }
        for (let i = 0; i < 12; i++) {
            el[i].style.display = "block";
        }
    };


    const filtering = (inputValue) => {
        setBlock();
        for (let i = 0; i < 12; i++) {
            let storeItem = el[i].dataset.item;
            if ((!storeItem.includes(inputValue))) {
                el[i].style.display = "none";
            }
        }
    };

    const displayValue = (event) => {
        if (event.keyCode === 13) {
            setBlock();
            let myInput = inputBar.value.toLowerCase();
            event.preventDefault();
            filtering(myInput);
        }

    };

    const makeHandler = (param) => {
        return function (event) {
            event.preventDefault();
            filtering(param);
        };
    };



    for (let i = 1; i < filterButtons.length; i++) {
        // gets all the items i.e cakes, doughnuts... and sets them to handlerParam per loop
        let handlerParam = filterButtons[i].dataset.filter;
        filterButtons[i].addEventListener("click", makeHandler(handlerParam));
    };

    filterButtons[0].addEventListener("click", setBlock);
    inputBar.addEventListener("keyup", displayValue);

})();

// filterButton end

// Get all the images on the page and add them to an array.
const pics = document.getElementsByClassName("card-img-top");
let imageList = [];
for (let i = 0; i < pics.length; i++) {
    const itemPicture = pics[i].src;
    imageList.push(itemPicture);
};


// for (let i = 0; i < pics.length; i++) {
//   pics[i].onclick = () => {
//     const toShow = document.querySelector(".lightbox-container");
//     const showItem = document.querySelector(".lightbox-item");
//     const closeButton = document.querySelector(".lightbox-close");
//     const previousButton = document.querySelector(".btnLeft")
//     const nextButton = document.querySelector(".btnRight")
//     toShow.classList.add("show");

//     let currentItem = pics[i]; // get the img element of the current iteration
//     // console.log(currentItem)
//     //gets the index of the currrent background image from the imageList array.
//     let currentIndex = imageList.indexOf(currentItem.src);
//     showItem.style.backgroundImage = `url(${currentItem.src})`;

//     const previousImage = () => {
//       if (currentIndex > 0) {
//         currentIndex--;
//       } else {
//         currentIndex = 0;
//       }
//       let imageInImageList = imageList[currentIndex];
//       console.log(imageInImageList);
//       showItem.style.backgroundImage = `url(${imageInImageList})`
//     };

//     const nextImage = () => {
//       if (currentIndex < imageList.length - 1) {
//         currentIndex++;
//       } else {
//         currentIndex = imageList.length - 1;
//       }
//       let imageInImageList = imageList[currentIndex];
//       console.log(imageInImageList);
//       showItem.style.backgroundImage = `url(${imageInImageList})`
//     };

//     const closeModal = () => {
//       toShow.classList.remove("show");
//     };

//     previousButton.addEventListener("click", previousImage);
//     nextButton.addEventListener("click", nextImage);
//     closeButton.addEventListener("click", closeModal);
//   }
// }

(function () {
    const myModal = (event) => {
        const toShow = document.querySelector(".lightbox-container");
        const showItem = document.querySelector(".lightbox-item");
        const closeButton = document.querySelector(".lightbox-close");
        const previousButton = document.querySelector(".btnLeft")
        const nextButton = document.querySelector(".btnRight")
        toShow.classList.add("show");

        let currentItem = event.target;// get the img element of the current iteration
        //gets the index of the currrent background image from the imageList array.
        let currentIndex = imageList.indexOf(currentItem.src);
        showItem.style.backgroundImage = `url(${currentItem.src})`;


        const previousImage = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = 0;
            }
            let imageInImageList = imageList[currentIndex];
            showItem.style.backgroundImage = `url(${imageInImageList})`
        };

        const nextImage = () => {
            if (currentIndex < imageList.length - 1) {
                currentIndex++;
            } else {
                currentIndex = imageList.length - 1;
            }
            let imageInImageList = imageList[currentIndex];
            showItem.style.backgroundImage = `url(${imageInImageList})`
        };

        const closeModal = () => {
            toShow.classList.remove("show");
        };

        previousButton.addEventListener("click", previousImage);
        nextButton.addEventListener("click", nextImage);
        closeButton.addEventListener("click", closeModal);

    };

    for (let i = 0; i < pics.length; i++) {
        pics[i].addEventListener("click", myModal);
    };
})();


//IIFE for cart functionality.

(function() {

    let cartTotal = 21.98;
    let cartTotalDisplay = document.querySelector(".item-total");
    let hiddenTotal = document.getElementById("cart-total");
    hiddenTotal.innerText = cartTotal.toFixed(2);
    cartTotalDisplay.innerText = cartTotal.toFixed(2);

    const cart = document.getElementById("cart");
    const totalContainer = document.querySelector(".cart-total-container")

    const cartBtn = document.getElementById("cart-info");
    cartBtn.onclick = () => {
        cart.classList.toggle("show-cart");
    };

    const storeItems = document.getElementsByClassName("store-item-icon");
    for (let elem of storeItems) {
        // console.log(elem);
        let itemSrc = elem.previousElementSibling.src;
        let srcArray = itemSrc.split(".");
        let lastSourceImg = srcArray[srcArray.length - 2];
        let actualImage = lastSourceImg.split("/");
        let realActualImage = actualImage[actualImage.length - 1];
        // console.log(realActualImage);
        let flowDoc = elem.parentNode.parentNode;
        let flowDocCont = flowDoc.lastElementChild.children[0].children;
        let itemName = flowDocCont[0].innerText;
        let itemPrice = flowDocCont[1].innerText;
        let itempriceNumber = Number(itemPrice.replace("$ ", ""));
        let cartItem = `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
            <img src="img-cart/${realActualImage}.jpeg" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="cart-item-text">
          
              <p id="cart-item-title" class="font-weight-bold mb-0">${itemName}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${itempriceNumber}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
          </div>`

        const addToCart = () => {
            totalContainer.insertAdjacentHTML("beforebegin", cartItem);
            cartTotal += itempriceNumber;
            hiddenTotal.innerText = cartTotal.toFixed(2);
            cartTotalDisplay.innerText = cartTotal.toFixed(2);
            alert("Item add to cart");

        };
        elem.onclick = addToCart;
    };
})()