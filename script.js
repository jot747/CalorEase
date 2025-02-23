// ===== Data =====

// Array for holding the user's cart
let cart = [];

// Define the merchant data
const merchantData = [
    {
        id: "subway",
        displayName: "SUBWAY",
        items: [
            {
                name: "Pizza Sub Melt",
                calories: 220,
                price: 8.49,
            },
            {
                name: "BLT",
                calories: 220,
                price: 8.49,
            },
            {
                name: "Tuna",
                calories: 400,
                price: 8.49,
            },
            {
                name: "Pepsi",
                calories: 300,
                price: 4.49,
            },
            {
                name: "Cookies",
                calories: 350,
                price: 4.99,
            },
            {
                name: "Item X",
                calories: 500,
                price: 9.99,
            },
            {
                name: "Item Y",
                calories: 500,
                price: 9.99,
            },
        ],
    },
    {
        id: "nuburger",
        displayName: "NUBURGER",
        items: [
            {
                name: "Item A",
                calories: 400,
                price: 8.99,
            },
            {
                name: "Item B",
                calories: 500,
                price: 8.99,
            },
            {
                name: "Item C",
                calories: 300,
                price: 7.99,
            },
            {
                name: "Item D",
                calories: 600,
                price: 9.99,
            },
            {
                name: "Item E",
                calories: 400,
                price: 5.99,
            },
            {
                name: "Item F",
                calories: 200,
                price: 4.99,
            },
            {
                name: "Item G",
                calories: 250,
                price: 4.99,
            },
        ],
    },
    {
        id: "booster-juice",
        displayName: "BOOSTER JUICE",
        items: [
            {
                name: "Item A",
                calories: 200,
                price: 5.99,
            },
            {
                name: "Item B",
                calories: 200,
                price: 5.99,
            },
            {
                name: "Item C",
                calories: 300,
                price: 8.99,
            },
            {
                name: "Item D",
                calories: 500,
                price: 15.99,
            },
            {
                name: "Item E",
                calories: 500,
                price: 15.99,
            },
            {
                name: "Item F",
                calories: 400,
                price: 9.99,
            },
            {
                name: "Item G",
                calories: 500,
                price: 9.99,
            },
        ],
    },
    {
        id: "freshii",
        displayName: "FRESHII",
        items: [
            {
                name: "Item A",
                calories: 300,
                price: 5.99,
            },
            {
                name: "Item B",
                calories: 200,
                price: 4.99,
            },
            {
                name: "Item C",
                calories: 500,
                price: 5.99,
            },
            {
                name: "Item D",
                calories: 400,
                price: 6.99,
            },
            {
                name: "Item E",
                calories: 500,
                price: 7.99,
            },
            {
                name: "Item F",
                calories: 700,
                price: 12.99,
            },
            {
                name: "Item G",
                calories: 500,
                price: 7.99,
            },
        ],
    },
];

// Define the cuisine data
const cuisineData = [
    {
        name: "Pizza",
    },
    {
        name: "Mexican",
    },
    {
        name: "Chinese",
    },
    {
        name: "Indian",
    },
    {
        name: "Cuisine X",
    },
    {
        name: "Cuisine Y",
    },
    {
        name: "Cuisine Z",
    },
];

// Given a merchant id, return the merchant data object
function getMerchant(merchantId) {
    let merchantObject = { displayName: "Test" };

    merchantData.forEach((merchant) => {
        if (merchant.id === merchantId) {
            merchantObject = merchant;
        }
    });

    return merchantObject;
}

// ===== Top Bar =====

const calorieInput = document.getElementById("calorie-input");
const step = parseInt(calorieInput.step);

function incrementCalorieInput() {
    calorieInput.value = parseInt(calorieInput.value) + step;

    updateCalorieProgressBar();
}

function decrementCalorieInput() {
    calorieInput.value = parseInt(calorieInput.value) - step;

    updateCalorieProgressBar();
}

function onCalorieInputChange() {
    updateCalorieProgressBar();
}

const searchBar = document.getElementById("search-bar");
const calorieProgressBar = document.getElementById("calorie-progress-bar");
const calorieProgressFill = document.getElementById("calorie-progress-fill");

// Turn on the search bar and turn off the calorie bar
function enableSearchBar() {
    searchBar.style.display = "flex";
    calorieProgressBar.style.display = "none";
}

// Turn on the calorie bar, update its values, and turn off the search bar
function enableCalorieProgressBar() {
    searchBar.style.display = "none";
    calorieProgressBar.style.display = "flex";

    updateCalorieProgressBar();
}

// Update the calorie progress bar based on the items in the user's cart and the calorie limit
function updateCalorieProgressBar() {
    let caloriesInCart = 0;
    cart.forEach((item) => {
        caloriesInCart += item.calories;
    });

    const percentage = (caloriesInCart / calorieInput.value) * 100;

    calorieProgressFill.style.width = `${percentage}%`;
}

function openProfile() {
    console.log("open profile");
}

// ===== Popups =====

const overlay = document.getElementById("popup-overlay");
const popupDailyPick = document.getElementById("popup-daily-pick");
const popupPreferences = document.getElementById("popup-preferences");
const popupOrder = document.getElementById("popup-order");

// Open the pick of the day popup and make the overlay close the popup when clicked
function openDailyPick() {
    overlay.style.display = "block";
    popupDailyPick.style.display = "flex";

    overlay.onclick = closeDailyPick;
}

function closeDailyPick() {
    overlay.style.display = "none";
    popupDailyPick.style.display = "none";
}

const calorieItemInput = document.getElementById("calorie-item-input");

// Open the preferences popup and make the overlay close the popup when clicked
function openPreferences() {
    overlay.style.display = "block";
    popupPreferences.style.display = "flex";

    overlay.onclick = closePreferences;
}

function closePreferences() {
    overlay.style.display = "none";
    popupPreferences.style.display = "none";
}

// Open the order confirmation popup and make the overlay close the popup when clicked
function openOrder() {
    overlay.style.display = "block";
    popupOrder.style.display = "flex";

    overlay.onclick = closeOrder;

    // Calculate the price of the cart and display that to the user
    const costText = document.getElementById("text-cost-order");
    let totalCost = 0;
    cart.forEach((item) => {
        totalCost += item.price;
    });
    costText.textContent = `TOTAL: \$${totalCost.toFixed(2)}`;
}

function closeOrder() {
    overlay.style.display = "none";
    popupOrder.style.display = "none";
}

// ===== Page Management =====

// Get all the pages and start the site on the home page
const pages = document.querySelectorAll("[id*='page']");
const backButton = document.getElementById("back-button");
let currentMerchantPage = "";
openHomePage(true);

// ===== Home Page =====

// Open the home page
function openHomePage(firstTime) {
    // Not on a merchant page, so reset the stored value
    currentMerchantPage = "";

    // Turn off all pages
    pages.forEach((page) => {
        page.style.display = "none";
    });

    // Turn on the home page
    const homePage = document.getElementById("page-home");
    homePage.style.display = "block";

    // Turn off the back button
    backButton.style.display = "none";

    // Turn on the search bar
    enableSearchBar();

    // Get the parent element for the list, create a div for each cuisine, and add the divs as children of the parent
    const cuisineList = document.getElementById("list-cuisine");
    cuisineData.forEach((cuisine) => {
        const cuisineDiv = document.createElement("div");
        cuisineDiv.textContent = cuisine.name;
        cuisineDiv.className = "item-cuisine";
        cuisineList.appendChild(cuisineDiv);
    });

    // If the user should see the pick of the day popup, show it to them
    if (firstTime) {
        openDailyPick();
    }
}

// ===== Merchant Page =====

let addedCalorieInputFunctions = false;

// Open the merchant page and set it up for the passed merchant id
function openMerchantPage(merchantId) {
    // Store the current merchant page
    currentMerchantPage = merchantId;

    // Turn off all pages
    pages.forEach((page) => {
        page.style.display = "none";
    });

    // Turn on the calorie progress bar
    enableCalorieProgressBar();

    // Get the data for this merchant
    const merchant = getMerchant(merchantId);

    // Turn on the merchant page
    const merchantPage = document.getElementById("page-merchant");
    merchantPage.style.display = "block";

    // Set the header text for the merchant
    const merchantHeader = document.getElementById("header-merchant");
    merchantHeader.textContent = merchant.displayName;

    // Add listeners to the calorie limit controls so the item list can refresh if the limit changes
    if (!addedCalorieInputFunctions) {
        const calorieInputIncrement = document.getElementById(
            "calorie-input-increment"
        );
        const calorieInputDecrement = document.getElementById(
            "calorie-input-decrement"
        );

        // Add the listeners
        calorieInputIncrement.addEventListener("click", () => {
            if (currentMerchantPage !== "") {
                setupMerchantItems(merchant);
            }
        });
        calorieInputDecrement.addEventListener("click", () => {
            if (currentMerchantPage !== "") {
                setupMerchantItems(merchant);
            }
        });
        calorieInput.addEventListener("change", () => {
            if (currentMerchantPage !== "") {
                setupMerchantItems(merchant);
            }
        });

        // Ensure this only happens once
        addedCalorieInputFunctions = true;
    }

    // Setup the items the merchant offers
    setupMerchantItems(merchant);

    // Setup the items in the user's cart
    setupCartItems();
}

// Create new children for the item list using the merchant data
function setupMerchantItems(merchant) {
    // Get the element that holds the list of items that this merchant sells
    const merchantItemList = document.getElementById("list-items");

    // Remove all children from the list element
    while (merchantItemList.firstChild) {
        merchantItemList.removeChild(merchantItemList.firstChild);
    }

    // Create the items
    merchant.items.forEach((item) => {
        // Create the item and show its name
        const itemDiv = document.createElement("div");
        itemDiv.textContent = item.name;
        itemDiv.className = "item-merchant";
        merchantItemList.appendChild(itemDiv);

        // Show the item's calorie count
        const calorieText = document.createElement("p");
        calorieText.textContent = `${item.calories} Calories`;
        itemDiv.appendChild(calorieText);

        // Show the item's cost
        const priceText = document.createElement("p");
        priceText.textContent = `\$${item.price}`;
        itemDiv.appendChild(priceText);

        // Determine if any items are over the user's item or total limits, and don't allow the user to order those items

        const calorieLimitPerItem = calorieItemInput.value;

        let caloriesInCart = 0;
        cart.forEach((item) => {
            caloriesInCart += item.calories;
        });

        const overItemLimit =
            calorieLimitPerItem !== "" && item.calories > calorieLimitPerItem;
        const overTotalLimit =
            item.calories + caloriesInCart > calorieInput.value;

        if (overItemLimit) {
            // Show the user that this item is over their per-item calorie limit
            const overLimitText = document.createElement("p");
            overLimitText.textContent = "OVER ITEM LIMIT";
            itemDiv.appendChild(overLimitText);
        } else if (overTotalLimit) {
            // Show the item would put the user over their total calorie limit
            const overLimitText = document.createElement("p");
            overLimitText.textContent = "OVER TOTAL LIMIT";
            itemDiv.appendChild(overLimitText);
        }

        // Create the add cart button for the item
        const addCartButton = document.createElement("button");
        addCartButton.textContent = "Add to Cart";
        addCartButton.onclick = function () {
            addToCart(item);
        };
        itemDiv.appendChild(addCartButton);
    });
}

// Create new children for the user's cart using their cart data
function setupCartItems() {
    // Get the element that holds the list of items in the user's cart
    const cartItemList = document.getElementById("scroll-list-merchant-cart");

    // Remove all children from the cart list element
    while (cartItemList.firstChild) {
        cartItemList.removeChild(cartItemList.firstChild);
    }

    // Create the items in the cart
    cart.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.textContent = item.name;
        itemDiv.className = "item-cart";
        cartItemList.appendChild(itemDiv);
    });

    // Calculate the price of the cart and display that to the user
    const costText = document.getElementById("text-cost-merchant");
    let totalCost = 0;
    cart.forEach((item) => {
        totalCost += item.price;
    });
    costText.textContent = `TOTAL: \$${totalCost.toFixed(2)}`;

    // Turn on the back button so users can go back to the home page
    backButton.style.display = "block";
    backButton.onclick = function () {
        openHomePage(false);
    };
}

// Add the passed item to the user's cart
function addToCart(item) {
    // Add the item to the user's cart
    cart.push(item);

    // Update the calorie bar
    updateCalorieProgressBar();

    // Refresh the merchant page to update the cart UI
    openMerchantPage(currentMerchantPage);
}

// ===== Cart Page =====

// Open the cart page and set it up based on the items in the user's cart
function openCartPage() {
    // Turn off all pages
    pages.forEach((page) => {
        page.style.display = "none";
    });

    // Turn on the cart page
    const cartPage = document.getElementById("page-cart");
    cartPage.style.display = "block";

    // Turn on the calorie progress bar
    enableCalorieProgressBar();

    // Get the element that holds the list of items in the user's cart
    const cartItemList = document.getElementById("scroll-list-cart");

    // Remove all children from the cart list element
    while (cartItemList.firstChild) {
        cartItemList.removeChild(cartItemList.firstChild);
    }

    // Create new children for the user's cart using their cart data
    cart.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.textContent = item.name;
        itemDiv.className = "item-cart";
        cartItemList.appendChild(itemDiv);
    });

    // Calculate the price of the cart and display that to the user
    const costText = document.getElementById("text-cost-cart");
    let totalCost = 0;
    cart.forEach((item) => {
        totalCost += item.price;
    });
    costText.textContent = `TOTAL: \$${totalCost.toFixed(2)}`;

    // Turn on the back button so users can go back to the home page or to the merchant page they came from
    backButton.style.display = "block";
    backButton.onclick = function () {
        if (currentMerchantPage === "") {
            openHomePage(false);
        } else {
            openMerchantPage(currentMerchantPage);
        }
    };
}

// Empty the cart and return to the homepage with a popup confirming the order
function payNow() {
    // Only let the user pay if they have items in their cart
    if (cart.length === 0) {
        return;
    }

    // Return to the homepage now that the cart has been ordered
    openHomePage(false);

    // Open a popup so the user can confirm their cart was ordered
    openOrder();

    // Clear the cart now that the user has ordered it
    cart.length = 0;
}
