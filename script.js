// Initialize all game data in window object to avoid redeclarations
window.gameState = {
    playerName: '',
    playerEmail: '',
    currentDifficulty: '',
    timeLeft: 60,
    timer: null,
    preTimer: null,
    preTimeLeft: 10,
    currentProduct: null,
    score: 0,
    selectedItems: new Set(),
    players: JSON.parse(localStorage.getItem('players')) || [],
    leaderboard: JSON.parse(localStorage.getItem('leaderboard')) || [],
    attempts: [],
    completedProducts: new Set(),
    TIME_LIMITS: {
        beginner: 30,
        intermediate: 45,
        expert: 60
    },
    PRE_TIMER: 10,
    itemsPool: {
        ingredients: [
            { name: "Milk", img: "https://img.icons8.com/color/96/000000/milk-bottle.png" },
            { name: "Sugar", img: "https://img.icons8.com/color/96/000000/sugar-cubes.png" },
            { name: "Flour", img: "https://img.icons8.com/color/96/000000/flour.png" },
            { name: "Eggs", img: "https://img.icons8.com/color/96/000000/eggs.png" },
            { name: "Butter", img: "https://img.icons8.com/color/96/000000/butter.png" },
            { name: "Yeast", img: "https://img.icons8.com/color/96/000000/yeast.png" },
            { name: "Salt", img: "https://img.icons8.com/color/96/000000/salt.png" },
            { name: "Water", img: "https://img.icons8.com/color/96/000000/water.png" },
            { name: "Chocolate", img: "https://img.icons8.com/color/96/000000/chocolate-bar.png" },
            { name: "Vanilla Extract", img: "https://img.icons8.com/color/96/000000/vanilla.png" }
        ],
        processes: [
            { name: "Mixing", img: "https://img.icons8.com/color/96/000000/mixer.png" },
            { name: "Kneading", img: "https://img.icons8.com/color/96/000000/dough.png" },
            { name: "Proofing", img: "https://img.icons8.com/color/96/000000/bread.png" },
            { name: "Baking", img: "https://img.icons8.com/color/96/000000/oven.png" },
            { name: "Cooling", img: "https://img.icons8.com/color/96/000000/fridge.png" },
            { name: "Packaging", img: "https://img.icons8.com/color/96/000000/box.png" },
            { name: "Fermentation", img: "https://img.icons8.com/color/96/000000/fermentation.png" },
            { name: "Pasteurization", img: "https://img.icons8.com/color/96/000000/thermometer.png" },
            { name: "Cutting", img: "https://img.icons8.com/color/96/000000/knife.png" },
            { name: "Aging", img: "https://img.icons8.com/color/96/000000/cheese.png" }
        ],
        equipment: [
            { name: "Mixer", img: "https://img.icons8.com/color/96/000000/stand-mixer.png" },
            { name: "Oven", img: "https://img.icons8.com/color/96/000000/oven.png" },
            { name: "Proofing Chamber", img: "https://img.icons8.com/color/96/000000/greenhouse.png" },
            { name: "Cooling Tunnel", img: "https://img.icons8.com/color/96/000000/fridge.png" },
            { name: "Packaging Machine", img: "https://img.icons8.com/color/96/000000/box.png" },
            { name: "Fermentation Tank", img: "https://img.icons8.com/color/96/000000/fermentation.png" },
            { name: "Pasteurizer", img: "https://img.icons8.com/color/96/000000/thermometer.png" },
            { name: "Cheese Vat", img: "https://img.icons8.com/color/96/000000/cheese.png" },
            { name: "Curd Knives", img: "https://img.icons8.com/color/96/000000/knife.png" },
            { name: "Aging Room", img: "https://img.icons8.com/color/96/000000/warehouse.png" }
        ]
    },
    instructions: {
        beginner: "Welcome to Build-A-Bite! In this level, you will see a list of ingredients, processes, and equipment needed to make a product. You have 10 seconds to review all items before the timer starts. Click on the correct items to build the product. Take your time and learn as you go!",
        intermediate: "In Advanced Level, you have less time and more challenge. Review the items in 10 seconds, then select the correct ones quickly!",
        expert: "Expert Level: You have the most time, but the challenge is highest. Use the 10-second preview to plan your moves and aim for a high score!"
    }
};

// Helper to update bot instructions interactively
function updateBotInstruction(message) {
    const bot = document.getElementById('instructionBot');
    if (bot) bot.textContent = message;
}

// Bot persona
const BOT_NAME = 'ChefBot';
const BOT_EMOJI = '🤖';

// Initial bot message
document.addEventListener('DOMContentLoaded', function() {
    updateBotInstruction(`${BOT_EMOJI} Hi, I'm ${BOT_NAME}! Enter your name and email to begin your food production journey.`);
});

// Enhance showInstructionBox to update bot message contextually
window.showInstructionBox = function(level) {
    let msg = '';
    if (level === 'beginner') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Beginner Level! You'll only select ingredients. Read the instructions and click Next to continue.`;
    } else if (level === 'intermediate') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Advanced Level! You'll select ingredients and processes. Read the instructions and click Next to continue.`;
    } else if (level === 'expert') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Expert Level! You'll select ingredients, processes, and equipment. Read the instructions and click Next to continue.`;
    }
    updateBotInstruction(msg);
    // ...existing showInstructionBox logic...
}

// When user clicks Next on instructions
document.getElementById('instructionNextBtn').addEventListener('click', function() {
    updateBotInstruction(`${BOT_EMOJI} ${BOT_NAME}: Select a product you want to make.`);
    // ...existing logic to show product selection...
});

// When a product is selected
window.onProductSelected = function(productName) {
    let msg = '';
    if (window.gameState.currentDifficulty === 'beginner') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: You chose ${productName}. Now, select the correct ingredients for this product.`;
    } else if (window.gameState.currentDifficulty === 'intermediate') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: You chose ${productName}. Now, select the correct ingredients and processes for this product.`;
    } else if (window.gameState.currentDifficulty === 'expert') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: You chose ${productName}. Now, select the correct ingredients, processes, and equipment for this product.`;
    }
    updateBotInstruction(msg);
    // ...existing logic to show game board...
}

// When user completes the product
window.onProductCompleted = function(score) {
    updateBotInstruction(`${BOT_EMOJI} ${BOT_NAME}: 🎉 Great job! You completed the product. Your score: ${score}. Play again or try a new product!`);
    // ...existing logic for completion...
}

// Initial bot message
document.addEventListener('DOMContentLoaded', function() {
    updateBotInstruction(`${BOT_EMOJI} Hi, I'm ${BOT_NAME}! Enter your name and email to begin your food production journey.`);
    // If user restarts, reset bot message
    const restartBtn = document.getElementById('restartButton');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            updateBotInstruction(`${BOT_EMOJI} ${BOT_NAME}: Game restarted. Enter your name and email to begin again.`);
        });
    }
});

// Enhance showInstructionBox to update bot message
window.showInstructionBox = function(level) {
    window.gameState.currentDifficulty = level;
    let msg = '';
    if (level === 'beginner') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Welcome to Beginner Level! Only select the correct <b>ingredients</b> for your product. Review all items for 10 seconds, then start building!`;
    } else if (level === 'intermediate') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Advanced Level! Select the correct <b>ingredients</b> and <b>processes</b>. You have less time, so be quick and accurate!`;
    } else if (level === 'expert') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Expert Level! Select <b>ingredients</b>, <b>processes</b>, and <b>equipment</b>. Use your skills to build the product efficiently!`;
    } else {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Choose your level to begin.`;
    }
    updateBotInstruction(msg);
    // ...existing showInstructionBox logic...
}

// When user clicks Next on instructions
document.getElementById('instructionNextBtn').addEventListener('click', function() {
    updateBotInstruction(`${BOT_EMOJI} ${BOT_NAME}: Select a product you want to make.`);
    // ...existing logic to show product selection...
});

// Example: When a product is selected (add this in your product selection handler)
window.onProductSelected = function(productName) {
    let msg = '';
    if (window.gameState.currentDifficulty === 'beginner') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Now, select the correct <b>ingredients</b> for ${productName}.`;
    } else if (window.gameState.currentDifficulty === 'intermediate') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Select the correct <b>ingredients</b> and <b>processes</b> for ${productName}.`;
    } else if (window.gameState.currentDifficulty === 'expert') {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Select <b>ingredients</b>, <b>processes</b>, and <b>equipment</b> for ${productName}.`;
    } else {
        msg = `${BOT_EMOJI} ${BOT_NAME}: Select items for your product.`;
    }
    updateBotInstruction(msg);
    // ...existing logic to show game board...
}

// Example: When user completes the product (add this in your completion handler)
window.onProductCompleted = function(score) {
    updateBotInstruction(`${BOT_EMOJI} ${BOT_NAME}: 🎉 Great job! You completed the product. Your score: ${score}. Play again or try a new product!`);
    // ...existing logic for completion...
}

// Replace gameContent with window.gameContent
window.gameContent = {
    products: [
        { name: "Breakfast Cereals", image: "corn with milk.png" },
        { name: "Cheese Slices", image: "cheese slice.png" },
        { name: "Bread", image: "whole grain bread.png" },
        { name: "Milkshake", image: "choco milkshake.png" },
        { name: "Ice Cream", image: "icecream.png" },
        { name: "Milk Chocolate Bars", image: "chocolate.png" },
        { name: "Instant Noodles", image: "noodle.png" },
        { name: "Canned Soup", image: "soup.png" },
        { name: "Instant Coffee Powder", image: "instant coffee.png" },
        { name: "Energy Drinks", image: "energydrink.png" },
        { name: "Caramel Popcorn", image: "popcorn.png" },
        { name: "Canned Beans", image: "cannedbeans.png" },
        { name: "Non-Veg Sandwiches", image: "bread toast with fillings.png" },
        { name: "Salad", image: "salad.png" },
        { name: "Kulfi", image: "kulfi.png" },
        { name: "Idli", image: "idli.png" },
    ],
    beginner: {
        "Breakfast Cereals": {
            availableIngredients: ["Corn", "Oats", "Sugar", "Juice", "Cream", "Nuts", "Cake", "Salt"],
            correctOrder: ["Corn", "Oats", "Sugar", "Salt", "Nuts"]
        },
        "Cheese Slices": {
            availableIngredients: ["Milk", "Salt", "Starter Culture", "Cream", "Preservatives", "Ice-Cream", "Emulsifiers", "Cocoa powder"],
            correctOrder: ["Milk", "Salt", "Starter Culture", "Emulsifiers", "Preservatives"]
        },
        "Bread": {
            availableIngredients: ["Flour", "Yeast", "Water", "Salt", "Sugar", "Oil", "Plastic", "Butter"],
            correctOrder: ["Flour", "Yeast", "Water", "Sugar", "Salt", "Butter"]
        },
        "Milkshake": {
            availableIngredients: ["Fruits", "Sugar", "Milk", "Water", "Ice", "Plastic", "Chilli Powder", "Ice-Cream"],
            correctOrder: ["Milk", "Sugar", "Fruits", "Ice-Cream", "Ice"]
        },
        "Ice Cream": {
            availableIngredients: ["Milk", "Cream", "Sugar", "Fruits", "Nuts", "Glass", "Egg Yolks", "Peppercorns"],
            correctOrder: ["Cream", "Milk", "Sugar", "Fruits", "Nuts"]
        },
        "Milk Chocolate Bars": {
            availableIngredients: ["Cocoa Solids", "Sugar", "Cocoa Butter", "Milk Powder", "Vanilla", "Dried Fruits", "Salt", "Turmeric"],
            correctOrder: ["Cocoa Solids", "Milk Powder", "Cocoa Butter", "Sugar", "Dried Fruits"]
        },
        "Instant Noodles": {
            availableIngredients: ["Wheat Flour", "Salt", "Flavor Enhancers (MSG)", "Water", "Milk Solids", "Spices", "Lead", "Proteins"],
            correctOrder: ["Wheat Flour", "Flavor Enhancers (MSG)", "Water", "Spices", "Salt"]
        },
        "Canned Soup": {
            availableIngredients: ["Vegetables", "Meat/Chicken", "Salt", "Spices", "Starches", "Sugar", "Water"],
            correctOrder: ["Meat/Chicken", "Salt", "Vegetables", "Water", "Spices"]
        },
        "Instant Coffee Powder": {
            availableIngredients: ["Roasted Coffee", "Anti-Caking agents", "Vinegar", "Water", "Spices", "Garlic", "Dill", "Turmeric"],
            correctOrder: ["Roasted Coffee", "Anti-Caking agents", "Water"]
        },
        "Energy Drinks": {
            availableIngredients: ["Caffeine", "Water", "Salt", "Sugar", "Semolina", "Gluten", "Protein", "Colorants"],
            correctOrder: ["Water", "Sugar", "Caffeine", "Salt", "Colorants"]
        },
        "Caramel Popcorn": {
            availableIngredients: ["Corn Kernels", "Butter", "Salt", "Wheat", "Cream", "Spices", "Plastic", "Caramel"],
            correctOrder: ["Corn Kernels", "Butter", "Salt", "Caramel"]
        },
        "Canned Beans": {
            availableIngredients: ["Water", "Beans", "Carrot", "Salt", "Cornstarch", "Glass", "Spices", "Boost"],
            correctOrder: ["Water", "Salt", "Beans", "Cornstarch", "Spices"]
        },
        "Non-Veg Sandwiches": {
            availableIngredients: ["Bread", "Water", "Meat/Chicken", "Vegetables", "Gluten", "Spices", "Enzymes", "Salt"],
            correctOrder: ["Bread", "Meat/Chicken", "Vegetables", "Salt", "Spices"]
        },
        "Salad": {
            availableIngredients: ["Lettuce", "Tomato", "Cucumbers", "Oil", "Vinegar", "Salt", "Glass", "Fruit Concentrate"],
            correctOrder: ["Lettuce", "Tomato", "Cucumbers", "Oil", "Vinegar", "Salt"]
        },
        "Kulfi": {
            availableIngredients: ["Milk", "Condensed Milk", "Sugar", "Cardamom", "Potato", "Curd", "Onion", "Cream"],
            correctOrder: ["Milk", "Cream", "Sugar", "Condensed Milk", "Cardamom"]
        },
        "Idli": {
            availableIngredients: ["Idli Rice", "Urad Dal", "Curd", "Water", "Salt", "Nuts", "Paneer", "Fenugreek"],
            correctOrder: ["Idli Rice", "Urad Dal", "Water", "Salt", "Fenugreek"]
        },
    },   
    intermediate: {
        "Breakfast Cereals": {
            availableIngredients: ["Corn", "Oats", "Sugar", "Juice", "Cream", "Nuts", "Cake", "Salt"],
            availableProcesses: ["Pasteurization", "Standardization", "Curdling", "Extrusion", "Drying", "Mixing", "Coating", "Packaging"],
            correctOrder: ["Corn", "Oats", "Salt", "Mixing", "Extrusion", "Drying", "Sugar", "Coating", "Nuts", "Packaging"]
        },
        "Cheese Slices": {
            availableIngredients: ["Milk", "Salt", "Starter Culture", "Cream", "Preservatives", "Ice-Cream", "Emulsifiers", "Cocoa powder"],
            availableProcesses: ["Pasteurization", "Standardization", "Coagulation", "Cutting of Curd", "Draining", "Pressing", "Maturation", "Coating"],
            correctOrder: ["Milk", "Pasteurization", "Standardization", "Emulsifiers", "Salt", "Starter Culture", "Coagulation", "Cutting of Curd", "Preservatives", "Pressing"]
        },
        "Bread": {
            availableIngredients: ["Flour", "Active Dry Yeast", "Water", "Salt", "Sugar", "Oil", "Plastic", "Butter"],
            availableProcesses: ["Mixing", "Kneading", "Fermentation", "Proofing", "Baking", "Cooling", "Slicing", "Pasteurization"],
            correctOrder: ["Flour", "Active Dry Yeast", "Water", "Sugar", "Salt", "Butter", "Mixing", "Kneading", "Fermentation", "Proofing", "Baking", "Cooling", "Slicing"]
        },
        "Milkshake": {
            availableIngredients: ["Fruits", "Sugar", "Milk", "Water", "Preservative", "Plastic", "Chilli Powder", "Emulsifiers"],
            availableProcesses: ["Homogenization", "Sorting", "Pasteurization", "Standardization", "Filtering", "Sterilizing", "Cooling", "Packaging"],
            correctOrder: ["Milk", "Pasteurization", "Standardization", "Homogenization", "Cooling", "Sugar", "Fruits", "Emulsifiers", "Preservative", "Packaging"]
        },
        "Ice Cream": {
            availableIngredients: ["Milk", "Cream", "Sugar", "Stabilizers", "Emulsifiers", "Glass", "Egg Yolks", "Peppercorns"],
            availableProcesses: ["Mixing", "Pasteurization", "Homogenization", "Ageing", "Freezing", "Melting", "Rippling", "Standardization"],
            correctOrder: ["Milk", "Pasteurization", "Cream", "Standardization", "Homogenization", "Sugar", "Stabilizers", "Emulsifiers", "Freezing", "Ageing"]
        },
        "Milk Chocolate Bars": {
            availableIngredients: ["Cocoa Solids", "Sugar", "Cocoa Butter", "Milk Powder", "Vanilla", "Lecithin", "Salt", "Turmeric"],
            availableProcesses: ["Grinding", "Mixing", "Conching", "Tempering", "Molding", "Cooling", "Packaging", "Refining"],
            correctOrder: ["Cocoa Solids", "Milk Powder", "Cocoa Butter", "Sugar", "Lecithin", "Mixing", "Refining", "Conching", "Tempering", "Molding", "Cooling", "Packaging"]
        },
        "Instant Noodles": {
            availableIngredients: ["Wheat Flour", "Salt", "Water", "Milk Solids", "Spice Mix", "Lead", "Proteins"],
            availableProcesses: ["Mixing", "Shaping", "Extruding", "Steaming", "Drying", "Cooling", "Frying", "Packaging"],
            correctOrder: ["Wheat Flour", "Water", "Salt", "Mixing", "Shaping", "Steaming", "Frying", "Cooling", "Spice Mix", "Packaging"]
        },
        "Canned Soup": {
            availableIngredients: ["Vegetables", "Meat/Chicken", "Preservatives", "Spices", "Starches", "Sugar", "Water"],
            availableProcesses: ["Filling", "Mixing", "Exhausting", "Sealing", "Smoking", "Cooking", "Cooling", "Sterilizing"],
            correctOrder: ["Meat/Chicken", "Vegetables", "Water", "Spices", "Mixing", "Cooking", "Preservatives", "Filling", "Exhausting", "Sealing", "Sterilizing"]
        },
        "Instant Coffee Powder": {
            availableIngredients: ["Roasted Coffee", "Anti-Caking agents", "Vinegar", "Water", "Spices", "Garlic", "Dill", "Turmeric"],
            availableProcesses: ["Grinding", "Mixing", "Stuffing", "Smoking", "Spray Drying", "Cooling", "Packaging", "Quality Control"],
            correctOrder: ["Roasted Coffee", "Grinding", "Water", "Spray Drying", "Anti-Caking agents", "Mixing", "Packaging", "Quality Control"]
        },
        "Energy Drinks": {
            availableIngredients: ["Caffeine", "Water", "Taurine", "Sugar", "Semolina", "Gluten", "Protein", "Colorants"],
            availableProcesses: ["Carbonation", "Mixing", "Stuffing", "Cooking", "Cooling", "Exhausting", "Sterilization", "Sealing"],
            correctOrder: ["Water", "Sugar", "Caffeine", "Taurine", "Colorants", "Mixing", "Carbonation", "Filling", "Exhausting", "Sealing", "Sterilization"]
        },
        "Caramel Popcorn": {
            availableIngredients: ["Corn Kernels", "Butter", "Salt", "Wheat", "Cream", "Spices", "Plastic", "Caramel"],
            availableProcesses: ["Grinding", "Mixing", "Stuffing", "Coating", "Smoking", "Popping", "Cooling", "Packaging"],
            correctOrder: ["Corn Kernels", "Butter", "Salt", "Mixing", "Popping", "Caramel", "Coating", "Packaging"]
        },
        "Canned Beans": {
            availableIngredients: ["Water", "Beans", "Carrot", "Salt", "Cornstarch", "Glass", "Spices", "Boost"],
            availableProcesses: ["Draining", "Sealing", "Filling", "Cooking", "Cooling", "Exhausting", "Mixing", "Sterilizing"],
            correctOrder: ["Water", "Beans", "Soaking", "Draining", "Salt", "Spices", "Cornstarch", "Mixing", "Cooking", "Filling", "Exhausting", "Sealing", "Sterilizing"]
        },
        "Non-Veg Sandwiches": {
            availableIngredients: ["Bread", "Water", "Meat/Chicken", "Vegetables", "Gluten", "Spices", "Enzymes", "Salt"],
            availableProcesses: ["Cutting", "Assembling", "Stuffing", "Canning", "Smoking", "Slicing", "Cooking", "Packaging"],
            correctOrder: ["Bread", "Slicing", "Meat/Chicken", "Salt", "Spices", "Cooking", "Vegetables", "Cutting", "Assembling", "Packaging"]
        },
        "Salad": {
            availableIngredients: ["Lettuce", "Tomato", "Cucumbers", "Oil", "Vinegar", "Salt", "Glass", "Fruit Concentrate"],
            availableProcesses: ["Grinding", "Mixing", "Stuffing", "Washing", "Cooking", "Cooling", "Cutting", "Packaging"],
            correctOrder: ["Lettuce", "Tomato", "Cucumbers", "Washing", "Cutting", "Oil", "Vinegar", "Salt", "Mixing", "Packaging"]
        },
        "Kulfi": {
            availableIngredients: ["Milk", "Condensed Milk", "Sugar", "Cardamom", "Potato", "Curd", "Onion", "Cream"],
            availableProcesses: ["Grinding", "Mixing", "Stuffing", "Freezing", "Moulding", "Cooling", "Packaging", "Pasteurization"],
            correctOrder: ["Milk", "Pasteurization", "Cream", "Sugar", "Condensed Milk", "Cardamom", "Mixing", "Cooling", "Moulding", "Freezing", "Packaging"]
        },
        "Idli": {
            availableIngredients: ["Idli Rice", "Urad Dal", "Curd", "Water", "Salt", "Nuts", "Paneer", "Fenugreek"],
            availableProcesses: ["Grinding", "Mixing", "Smoking", "Steaming", "Cooling", "Soaking", "Packaging", "Fermentation"],
            correctOrder: ["Idli Rice", "Urad Dal", "Fenugreek", "Washing", "Water", "Soaking", "Grinding", "Mixing", "Fermentation", "Salt", "Steaming"]
        },
    },
    expert: {
        "Breakfast Cereals": {
            availableIngredients: ["Corn Grits", "Sugar", "Salt", "Malt Extract", "Milk Powder", "Vitamins", "Minerals", "Flavors"],
            availableProcesses:  ["Mixing", "Cooking", "Extrusion", "Drying", "Flaking", "Toasting", "Cooling", "Packaging"],
            availableEquipment: ["Mixer", "Cooking Kettle", "Extruder", "Dryer", "Flaking Roller", "Toaster", "Cooling Conveyor", "Packaging Line"],
            correctOrder: [ "Corn Grits", "Sugar", "Salt", "Malt Extract", "Mixing", "Mixer", "Cooking", "Cooking Kettle", "Extrusion", "Extruder", "Drying", "Dryer", "Flaking", "Flaking Roller", "Toasting", "Toaster", "Vitamins", "Minerals", "Flavors", "Cooling", "Cooling Conveyor", "Packaging", "Packaging Line" ]
        },
        "Cheese Slices": {
            availableIngredients: ["Milk", "Starter Culture", "Rennet", "Salt", "Butter", "Emulsifier", "Color", "Water"], 
            availableProcesses: ["Pasteurization", "Coagulation", "Cutting", "Cooking", "Pressing", "Slicing", "Cooling", "Packaging"], 
            availableEquipments: ["Pasteurizer", "Cheese Vat", "Curd Cutter", "Cooking Kettle", "Cheese Press", "Slicer", "Cooling Tunnel", "Packaging Machine"], 
            correctOrder: [ "Milk", "Pasteurization", "Pasteurizer", "Starter Culture", "Rennet", "Coagulation", "Cheese Vat", "Cutting", "Curd Cutter", "Cooking", "Cooking Kettle", "Pressing", "Cheese Press", "Salt", "Emulsifier", "Color", "Slicing", "Slicer", "Cooling", "Cooling Tunnel", "Packaging", "Packaging Machine" ] 
        },
        "Bread": {
            availableIngredients: ["Wheat Flour", "Yeast", "Sugar", "Salt", "Milk", "Butter", "Corn Flour", "Baking Powder"], 
            availableProcesses: ["Mixing", "Kneading", "Proofing", "Baking", "Cooling", "Slicing", "Packaging", "Roasting"], 
            availableEquipments: ["Dough Mixer", "Dough Kneader", "Proofer", "Baking Oven", "Cooling Conveyor", "Bread Slicer", "Packaging Line", "Extruder"], 
            correctOrder: [ "Wheat Flour", "Yeast", "Sugar", "Salt", "Butter", "Mixing", "Dough Mixer", "Kneading", "Dough Kneader", "Proofing", "Proofer", "Baking", "Baking Oven", "Cooling", "Cooling Conveyor", "Packaging", "Packaging Line" ]

        },
        "Milkshake": {
            availableIngredients: ["Milk", "Sugar", "Flavor Syrup", "Ice Cream", "Fruit Pulp", "Chocolate", "Stabilizer", "Color"], 
            availableProcesses: ["Mixing", "Blending", "Homogenization", "Cooling", "Filling", "Sealing", "Pasteurization", "Packaging"], 
            availableEquipments: ["Mixing Tank", "Blender", "Homogenizer", "Cooler", "Filler", "Cap Sealer", "Pasteurizer", "Packaging Line"], 
            correctOrder: [ "Milk", "Sugar", "Flavor Syrup", "Mixing", "Mixing Tank", "Blending", "Blender", "Homogenization", "Homogenizer", "Ice Cream", "Fruit Pulp", "Chocolate", "Cooling", "Cooler", "Filling", "Filler", "Sealing", "Cap Sealer", "Packaging", "Packaging Line" ] 
        },
        "Ice Cream": {
            availableIngredients: ["Milk", "Sugar", "Cream", "Stabilizer", "Emulsifier", "Flavor", "Color", "Air"], 
            availableProcesses: ["Mixing", "Pasteurization", "Homogenization", "Aging", "Freezing", "Extrusion", "Hardening", "Packaging"], 
            availableEquipments: ["Mixing Tank", "Pasteurizer", "Homogenizer", "Aging Tank", "Continuous Freezer", "Extruder", "Hardening Tunnel", "Packaging Machine"], 
            correctOrder: [ "Milk", "Sugar", "Cream", "Mixing", "Mixing Tank", "Pasteurization", "Pasteurizer", "Homogenization", "Homogenizer", "Stabilizer", "Emulsifier", "Aging", "Aging Tank", "Freezing", "Continuous Freezer", "Flavor", "Color", "Extrusion", "Extruder", "Hardening", "Hardening Tunnel", "Packaging", "Packaging Machine" ] 

        },
        "Milk Chocolate Bars": {
            availableIngredients: ["Cocoa Mass", "Cocoa Butter", "Sugar", "Milk Powder", "Lecithin", "Vanilla", "Emulsifier", "Salt"], 
            availableProcesses: ["Mixing", "Refining", "Conching", "Tempering", "Molding", "Cooling", "Demolding", "Packaging"], 
            availableEquipments: ["Mixer", "Refiner", "Conche", "Tempering Unit", "Molding Line", "Cooling Tunnel", "Demolder", "Packaging Machine"], 
            correctOrder: [ "Cocoa Mass", "Cocoa Butter", "Sugar", "Milk Powder", "Mixing", "Mixer", "Refining", "Refiner", "Conching", "Conche", "Lecithin", "Vanilla", "Emulsifier", "Tempering", "Tempering Unit", "Molding", "Molding Line", "Cooling", "Cooling Tunnel", "Packaging", "Packaging Machine" ] 
        },
        "Instant Noodles": {
            availableIngredients: ["Wheat Flour", "Water", "Salt", "Oil", "Seasoning Powder", "Vegetables", "Starch"], 
            availableProcesses: ["Mixing", "Sheeting", "Cutting", "Steaming", "Frying", "Cooling", "Seasoning", "Packaging"], 
            availableEquipments: ["Dough Mixer", "Sheeter", "Noodle Cutter", "Steamer", "Deep Fryer", "Cooling Conveyor", "Seasoning Mixer", "Packaging Line"], 
            correctOrder: [ "Wheat Flour", "Water", "Salt", "Mixing", "Dough Mixer", "Sheeting", "Sheeter", "Cutting", "Noodle Cutter", "Steaming", "Steamer", "Frying", "Deep Fryer", "Cooling", "Cooling Conveyor", "Seasoning", "Seasoning Mixer", "Packaging", "Packaging Line" ] 
        },
        "Canned Soup": {
            availableIngredients: ["Vegetables", "Onion", "Carrot", "Tomato", "Salt", "Spices", "Oil", "Water"], 
            availableProcesses: ["Washing", "Chopping", "Blanching", "Cooking", "Mixing", "Filling", "Sealing", "Exhausting", "Sterilization"], 
            availableEquipments: ["Washing Tank", "Vegetable Cutter", "Blancher", "Cooking Kettle", "Mixer", "Can Filler", "Can Seamer", "Retort"], 
            correctOrder: ["Vegetables", "Onion", "Carrot", "Tomato", "Washing", "Washing Tank", "Chopping", "Vegetable Cutter", "Blanching", "Blancher", "Cooking", "Cooking Kettle", "Salt", "Spices", "Oil", "Water", "Filling", "Can Filler","Exhausting", "Sealing", "Can Seamer", "Sterilization", "Retort" ] 
        },
        "Instant Coffee Powder": {
            availableIngredients: ["Coffee Beans", "Water", "Flavor Retainers", "Sugar", "Milk Solids", "Maltodextrin", "Coffee Extract", "Creamer"], 
            availableProcesses: ["Roasting", "Grinding", "Extraction", "Concentration", "Spray Drying", "Agglomeration", "Cooling", "Packaging"], 
            availableEquipments: ["Roaster", "Grinder", "Extractor", "Evaporator", "Spray Dryer", "Agglomerator", "Cooling Conveyor", "Packaging Line"], 
            correctOrder: [ "Coffee Beans", "Roasting", "Roaster", "Grinding", "Grinder", "Extraction", "Extractor", "Concentration", "Evaporator", "Spray Drying", "Spray Dryer", "Agglomeration", "Agglomerator", "Cooling", "Cooling Conveyor", "Packaging", "Packaging Line" ] 
        },
        "Energy Drinks": {
            availableIngredients: ["Water", "Sugar", "Caffeine", "Vitamins", "Minerals", "Flavor", "Color", "Acidulant"], 
            availableProcesses: ["Mixing", "Pasteurization", "Homogenization", "Carbonation", "Filling", "Sealing", "Cooling", "Packaging"], 
            availableEquipments: ["Mixing Tank", "Pasteurizer", "Homogenizer", "Carbonator", "Bottle Filler", "Cap Sealer", "Cooling Tunnel", "Packaging Line"], 
            correctOrder: [ "Water", "Sugar", "Caffeine", "Vitamins", "Minerals", "Mixing", "Mixing Tank", "Pasteurization", "Pasteurizer", "Homogenization", "Homogenizer", "Flavor", "Color", "Acidulant", "Carbonation", "Carbonator", "Filling", "Bottle Filler", "Sealing", "Cap Sealer", "Packaging", "Packaging Line" ] 
        },
        "Caramel Popcorn": {
            availableIngredients: ["Popcorn Kernels", "Butter", "Sugar", "Salt", "Corn Syrup", "Oil", "Vanilla", "Baking Soda"], 
            availableProcesses: ["Popping", "Melting", "Caramelization", "Mixing", "Coating", "Cooling", "Packaging", "Roasting"], 
            availableEquipments: ["Popcorn Popper", "Caramel Kettle", "Stirrer", "Coating Drum", "Cooling Tray", "Packaging Machine", "Mixer", "Extruder"], 
            correctOrder: [ "Popcorn Kernels", "Oil", "Popping", "Popcorn Popper", "Butter", "Sugar", "Corn Syrup", "Melting", "Caramel Kettle", "Caramelization", "Stirrer", "Mixing", "Coating Drum", "Cooling", "Cooling Tray", "Packaging", "Packaging Machine" ] 
        },
        "Canned Beans": {
            availableIngredients: ["Beans", "Salt", "Water", "Tomato Paste", "Onion", "Garlic", "Spices", "Oil"], 
            availableProcesses: ["Washing", "Soaking", "Cooking", "Mixing", "Filling", "Sealing", "Sterilization", "Exhausting", "Cooling"], 
            availableEquipments: ["Washing Tank", "Soaking Tank", "Cooking Vessel", "Mixer", "Can Filler", "Can Seamer", "Retort", "Cooling Tank"], 
            correctOrder: [ "Beans", "Washing", "Washing Tank", "Soaking", "Soaking Tank", "Cooking", "Cooking Vessel", "Salt", "Tomato Paste", "Onion", "Garlic", "Spices", "Oil", "Mixing", "Mixer", "Filling", "Can Filler", "Exhausting", "Sealing", "Can Seamer", "Sterilization", "Retort" ] 
        },
        "Non-Veg Sandwiches": {
            availableIngredients: ["Bread Slice", "Cooked Chicken", "Mayonnaise", "Lettuce", "Cheese Slice", "Tomato", "Salt", "Pepper"], 
            availableProcesses: ["Slicing", "Toasting", "Spreading", "Layering", "Assembling", "Cutting", "Packing", "Cooling"],
            availableEquipments: ["Bread Toaster", "Slicer", "Spreader", "Assembly Table", "Sandwich Cutter", "Chiller", "Packaging Machine", "Knife"], 
            correctOrder: [ "Bread Slice", "Toasting", "Bread Toaster", "Cooked Chicken", "Cheese Slice", "Lettuce", "Tomato", "Slicing", "Slicer", "Spreading", "Spreader", "Layering", "Assembly Table", "Assembling", "Cutting", "Sandwich Cutter", "Packing", "Packaging Machine" ] 
        },
        "Salad": {
            availableIngredients: ["Lettuce", "Tomato", "Cucumber", "Carrot", "Onion", "Olive Oil", "Salt", "Vinegar"], 
            availableProcesses: ["Washing", "Peeling", "Chopping", "Mixing", "Seasoning", "Tossing", "Packaging", "Cooling"], 
            availableEquipments: ["Washing Tank", "Peeler", "Vegetable Cutter", "Mixing Bowl", "Seasoning Dispenser", "Tossing Drum", "Packaging Machine", "Chiller"], 
            correctOrder: [ "Lettuce", "Tomato", "Cucumber", "Carrot", "Onion", "Washing", "Washing Tank", "Peeling", "Peeler", "Chopping", "Vegetable Cutter", "Mixing", "Mixing Bowl", "Olive Oil", "Salt", "Vinegar", "Seasoning", "Seasoning Dispenser", "Tossing", "Tossing Drum", "Packaging", "Packaging Machine" ] 
        },
        "Kulfi": {
            availableIngredients: ["Milk", "Sugar", "Cardamom", "Saffron", "Pistachio", "Cream", "Corn Flour", "Water"], 
            availableProcesses: ["Boiling", "Concentrating", "Mixing", "Flavoring", "Filling", "Freezing", "Demolding", "Packaging"], 
            availableEquipments: ["Boiling Kettle", "Scraped Surface Evaporator", "Mixer", "Flavor Tank", "Filling Machine", "Blast Freezer", "Demolder", "Packaging Line"], 
            correctOrder: [ "Milk", "Boiling", "Boiling Kettle", "Concentrating", "Scraped Surface Evaporator", "Sugar", "Cream", "Mixing", "Mixer", "Cardamom", "Saffron", "Flavoring", "Flavor Tank", "Filling", "Filling Machine", "Freezing", "Blast Freezer", "Packaging", "Packaging Line" ] 
        },
        "Idli": {
            availableIngredients: ["Idli Rice", "Urad Dal", "Fenugreek Seeds", "Curd", "Salt", "Paneer", "Nuts", "Water"], 
            availableProcesses: ["Washing", "Soaking", "Grinding", "Mixing", "Fermentation", "Steaming", "Cooling", "Packaging"], 
            availableEquipments: ["Washing Tank", "Wet Grinder", "Mixing Bowl", "Fermentation Chamber", "Idli Steamer", "Cooling Rack", "Packaging Machine", "Conveyor"], 
            correctOrder: [ "Idli Rice", "Urad Dal", "Fenugreek Seeds", "Washing", "Washing Tank", "Soaking", "Grinding", "Wet Grinder", "Mixing", "Mixing Bowl", "Fermentation", "Fermentation Chamber", "Salt", "Steaming", "Idli Steamer", "Packaging", "Packaging Machine" ] 
        },
    },
};

// Utility to render game items as images
function renderGameItem(item) {
    return `<div class="game-item" tabindex="0" data-name="${item.name}">
        <img src="${item.img}" alt="${item.name}" />
        <span>${item.name}</span>
    </div>`;
}

// Show instructions based on difficulty
function showInstructions(difficulty) {
    const bot = document.getElementById('instructionBot');
    if (window.gameState.instructions[difficulty]) {
        bot.textContent = window.gameState.instructions[difficulty];
    }
}

// Pre-timer logic
function startPreTimer(callback) {
    window.gameState.preTimeLeft = window.gameState.PRE_TIMER;
    const timerBox = document.getElementById('timerBox');
    timerBox.style.display = 'block';
    timerBox.textContent = `Preview: ${window.gameState.preTimeLeft}s`;
    window.gameState.preTimer = setInterval(() => {
        window.gameState.preTimeLeft--;
        timerBox.textContent = `Preview: ${window.gameState.preTimeLeft}s`;
        if (window.gameState.preTimeLeft <= 0) {
            clearInterval(window.gameState.preTimer);
            timerBox.textContent = '';
            if (callback) callback();
        }
    }, 1000);
}

// Patch selectDifficulty to show instructions and start pre-timer
window.selectDifficulty = function(difficulty) {
    window.gameState.currentDifficulty = difficulty;
    showInstructions(difficulty);
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('gameContent').style.display = 'block';
    // Show product selection, then pre-timer before game starts
    startPreTimer(() => {
        // ...existing logic to start the game timer and show items...
    });
};

// Patch rendering of items to use images
function renderItemsGrid(category, items) {
    // Render all 10 items in a single column, add arrows for process/equipment
    const grid = document.createElement('div');
    grid.className = 'items-grid';
    items.forEach((item, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'game-item';
        itemDiv.setAttribute('data-category', category);
        itemDiv.setAttribute('tabindex', '0');
        if (typeof item === 'string') {
            itemDiv.textContent = item;
        } else {
            itemDiv.innerHTML = `<img src="${item.img}" alt="${item.name}" /><span>${item.name}</span>`;
        }
        // Add arrow for process/equipment except last item
        if ((category === 'processes' || category === 'equipment') && idx < items.length - 1) {
            const arrow = document.createElement('span');
            arrow.className = 'arrow';
            arrow.innerHTML = '&#8595;'; // Down arrow
            itemDiv.appendChild(arrow);
        }
        grid.appendChild(itemDiv);
    });
    return grid.outerHTML;
}

// Function to handle difficulty selection
function selectDifficulty(level) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (!nameInput || !emailInput) {
        console.error('Input elements not found');
        return;
    }

    // Get player info
    gameState.playerName = nameInput.value.trim();
    gameState.playerEmail = emailInput.value.trim();

    // Validate inputs (required)
    if (!gameState.playerName) {
        alert('Name is required to start the game.');
        nameInput.focus();
        return;
    }
    if (!gameState.playerEmail) {
        alert('Email is required to start the game.');
        emailInput.focus();
        return;
    }

    // Set difficulty and start game
    gameState.currentDifficulty = level;
    startGame();

    updateBotMessage(`Ready to rock! Let's make some amazing products! 🚀`);
}

// Function to start the game
function startGame() {
    const inputSection = document.getElementById('inputSection');
    const gameContent = document.getElementById('gameContent');
    const instructionBot = document.getElementById('instructionBot');

    if (!inputSection || !gameContent || !instructionBot) {
        console.error('Required elements not found');
        return;
    }

    // Hide input section and show game content
    inputSection.style.display = 'none';
    gameContent.style.display = 'block';

    // Update bot message based on difficulty
    const botMessage = `Get ready ${gameState.playerName}! You've selected ${gameState.currentDifficulty} level. Choose a product to begin!`;
    instructionBot.textContent = botMessage;

    // Display product selection
    displayProducts();
}

// Function to shuffle arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to check if product is completed
function isProductCompleted(productName) {
    return gameState.completedProducts.has(productName);
}

// Function to display available products
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    // Shuffle only available products
    const availableProducts = gameContent.products.filter(p => !isProductCompleted(p.name));
    const shuffledProducts = shuffleArray([...availableProducts]);
    if (shuffledProducts.length === 0) {
        productGrid.innerHTML = '<p style="font-size:1.2em;color:#e74c3c;">All products completed! Restart to play again.</p>';
        return;
    }
    shuffledProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        let imgHtml = '';
        if (product.image) {
            imgHtml = `<img class="product-image" src="images/${product.image}" alt="${product.name}" style="height:80px;object-fit:contain;margin-bottom:10px;" />`;
        } else {
            imgHtml = `<div class="product-image">${getProductEmoji(product.name)}</div>`;
        }
        card.innerHTML = `
            ${imgHtml}
            <h3>${product.name}</h3>
        `;
        card.onclick = () => {
            selectProduct(product.name);
            updateBotMessage(`You selected <b>${product.name}</b>! Now pick the correct steps to make it.`);
        };
        card.onmouseenter = () => updateBotMessage(`Click to make <b>${product.name}</b>!`);
        card.onmouseleave = () => updateBotMessage('Select a product to begin.');
        productGrid.appendChild(card);
    });
    updateBotMessage('Select a product to begin.');
}

function updateBotMessage(msg) {
    const bot = document.getElementById('instructionBot');
    if (bot) bot.innerHTML = msg;
}

// Helper function to get emoji for products
function getProductEmoji(productName) {
    const emojis = {
        "Yogurt": "🥛",
        "Cheese": "🧀",
        "Bread": "🍞",
        "Jam": "🍯",
        "Ice Cream": "🍦",
        "Chocolate": "🍫",
        "Butter": "🧈",
        "Sausage": "🌭",
        "Pickles": "🥒",
        "Pasta": "🍝"
    };
    return emojis[productName] || "🍴";
}

// Modify selectProduct function to prevent reselection
function selectProduct(productName) {
    if (isProductCompleted(productName)) {
        alert('You have already completed this product!');
        return;
    }
    gameState.currentProduct = productName;
    gameState.selectedItems.clear();
    document.getElementById('productSelection').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'grid';

    // Show the items for preview (but do not start timer yet)
    previewGameItems();


    // Adjust item size for expert/intermediate mode
    document.body.classList.remove('expert-mode', 'intermediate-mode');
    if (gameState.currentDifficulty === 'expert') {
        document.body.classList.add('expert-mode');
    } else if (gameState.currentDifficulty === 'intermediate') {
        document.body.classList.add('intermediate-mode');
    }

    // Show pre-timer while items are visible
    let preTime = 10;
    if (gameState.currentDifficulty === 'intermediate' || gameState.currentDifficulty === 'expert') {
        preTime = 20;
    }
    showPreTimer(preTime, () => {
        // Flash 'Game Starts!' message
        flashGameStart(() => {
            setupGame();
            // Always clear any previous timer before starting a new one
            if (gameState.timer) {
                clearInterval(gameState.timer);
                gameState.timer = null;
            }
            startFreshTimer();
        });
    });
// Always start a fresh timer after pre-timer ends
// Start or resume timer from current timeLeft (do not reset after each product)
function startFreshTimer() {
    // Defensive: clear any previous timer
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
    // Only set timeLeft if undefined (i.e., first product)
    if (typeof gameState.timeLeft !== 'number' || isNaN(gameState.timeLeft)) {
        gameState.timeLeft = gameState.TIME_LIMITS[gameState.currentDifficulty];
    }
    var timerBox = document.getElementById('timerBox');
    var timeCount = document.getElementById('timeCount');
    if (timerBox) {
        timerBox.style.display = 'block';
        timerBox.textContent = `Time Left: ${gameState.timeLeft}s`;
    }
    if (timeCount) timeCount.textContent = gameState.timeLeft;
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        if (timerBox) timerBox.textContent = `Time Left: ${gameState.timeLeft}s`;
        if (timeCount) timeCount.textContent = gameState.timeLeft;
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            gameState.timer = null;
            endGame(false);
        }
    }, 1000);
}
    // Update instruction bot
    var botElem = document.getElementById('instructionBot');
    if (botElem) {
        botElem.textContent = `Select the correct items needed for ${productName} production in the right order!`;
    }
}

function showPreTimer(seconds, callback) {
    const timerBox = document.getElementById('timerBox');
    timerBox.style.display = 'block';
    timerBox.textContent = `Preview: ${seconds}s`;
    let timeLeft = seconds;
    const interval = setInterval(() => {
        timeLeft--;
        timerBox.textContent = `Preview: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerBox.textContent = '';
            if (callback) callback();
        }
    }, 1000);
}

// Show the items for preview (ingredients/process/equipment) but do not start timer or allow selection
function previewGameItems() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `
        <div class="game-status">
            <h2 id="productTitle">${gameState.currentProduct} Production</h2>
            <div id="selectionStatus"></div>
        </div>
        <div class="categories-container"></div>
    `;

    const productData = gameContent[gameState.currentDifficulty][gameState.currentProduct];
    const categoriesContainer = gameBoard.querySelector('.categories-container');
    if (!categoriesContainer) return;
    // Let CSS control width and centering
    categoriesContainer.innerHTML = '';

    if (gameState.currentDifficulty === 'beginner') {
        createCategorySectionPreview('Ingredients', [...productData.availableIngredients], categoriesContainer);
    } else if (gameState.currentDifficulty === 'intermediate') {
        // Intermediate: show only Ingredients and Processes, limit to 10,20
        createCategorySectionPreview('Ingredients', [...productData.availableIngredients].slice(0, 20), categoriesContainer, true);
        createCategorySectionPreview('Processes', [...(productData.availableProcesses || [])].slice(0, 10), categoriesContainer, true);
        // Improved alignment: stack vertically, full width
        categoriesContainer.style.display = 'flex';
        categoriesContainer.style.flexDirection = 'column';
        categoriesContainer.style.alignItems = 'stretch';
        categoriesContainer.style.gap = '18px';
    } else if (gameState.currentDifficulty === 'expert') {
        // Expert: show Ingredients, Processes, and Equipment, limit to 10,20
        createCategorySectionPreview('Ingredients', [...productData.availableIngredients].slice(0, 20), categoriesContainer, true);
        createCategorySectionPreview('Processes', [...(productData.availableProcesses || [])].slice(0, 10), categoriesContainer, true);
        createCategorySectionPreview('Equipment', [...(productData.availableEquipment || [])].slice(0, 10), categoriesContainer, true);
        // Improved alignment: stack vertically, full width
        categoriesContainer.style.display = 'flex';
        categoriesContainer.style.flexDirection = 'column';
        categoriesContainer.style.alignItems = 'stretch';
        categoriesContainer.style.gap = '18px';
    }
    // Show preview status
    const statusElement = document.getElementById('selectionStatus');
    if (statusElement) statusElement.textContent = `Preview: Review all items before the game starts!`;
}

// Helper to create category section for preview (no selection)
function createCategorySectionPreview(category, items, container) {
    if (!container) return;
    const section = document.createElement('div');
    section.className = `category-section ${category.toLowerCase()}`;
    section.style.marginBottom = '0';
    section.style.width = '100%';
    section.style.boxSizing = 'border-box';
    section.innerHTML = `
        <h3 style="margin-bottom:8px;">${category}</h3>
        <div class="items-grid"></div>
    `;
    const itemsGrid = section.querySelector('.items-grid');
    if (!itemsGrid) return;
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'game-item';
        itemElement.textContent = item;
        // Make each item fill its grid cell and align content
        itemElement.style.width = '100%';
        itemElement.style.boxSizing = 'border-box';
        itemElement.style.minHeight = '44px';
        itemElement.style.display = 'flex';
        itemElement.style.alignItems = 'center';
        itemElement.style.justifyContent = 'center';
        itemElement.style.fontSize = '1em';
        itemsGrid.appendChild(itemElement);
    });
    // For preview, show as grid with up to 5 columns, full width
    itemsGrid.style.display = 'grid';
    itemsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
    itemsGrid.style.gap = '10px';
    itemsGrid.style.width = '100%';
    section.style.alignSelf = 'stretch';
    container.appendChild(section);
}

// Flash a 'Game Starts!' message for 1 second, then call callback
function flashGameStart(callback) {
    const gameBoard = document.getElementById('gameBoard');
    const flashDiv = document.createElement('div');
    flashDiv.className = 'flash-message';
    flashDiv.textContent = 'Game Starts!';
    flashDiv.style.position = 'absolute';
    flashDiv.style.top = '50%';
    flashDiv.style.left = '50%';
    flashDiv.style.transform = 'translate(-50%, -50%)';
    flashDiv.style.background = 'rgba(255,255,0,0.95)';
    flashDiv.style.color = '#222';
    flashDiv.style.fontSize = '2.5em';
    flashDiv.style.fontWeight = 'bold';
    flashDiv.style.padding = '32px 64px';
    flashDiv.style.borderRadius = '24px';
    flashDiv.style.zIndex = '9999';
    flashDiv.style.boxShadow = '0 0 32px #ff0';
    gameBoard.appendChild(flashDiv);
    setTimeout(() => {
        flashDiv.remove();
        if (callback) callback();
    }, 1000);
}

// Modify startTimer function to maintain timer across products in beginner mode
function startTimer() {
    // Only reset timeLeft if it's not already running in beginner mode
    if (!gameState.timer || gameState.currentDifficulty !== 'beginner') {
        gameState.timeLeft = gameState.TIME_LIMITS[gameState.currentDifficulty];
    }
    
    const timerBox = document.getElementById('timerBox');
    const timeCount = document.getElementById('timeCount');
    if (timerBox) {
        timerBox.style.display = 'block';
        timerBox.textContent = `Time Left: ${gameState.timeLeft}s`;
    }
    if (timeCount) timeCount.textContent = gameState.timeLeft;

    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        if (timerBox) timerBox.textContent = `Time Left: ${gameState.timeLeft}s`;
        if (timeCount) timeCount.textContent = gameState.timeLeft;
        if (gameState.timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Function to calculate score based on time
function calculateScore(timeLeft, difficulty) {
    let baseScore = 1000;
    let timeMultiplier;
    const maxTime = gameState.TIME_LIMITS[difficulty];
    
    switch(difficulty) {
        case 'beginner':
            timeMultiplier = timeLeft >= (maxTime * 0.7) ? 1.5 : timeLeft >= (maxTime * 0.4) ? 1.2 : 1;
            break;
        case 'intermediate':
            timeMultiplier = timeLeft >= (maxTime * 0.7) ? 2 : timeLeft >= (maxTime * 0.4) ? 1.5 : 1.2;
            break;
        case 'expert':
            timeMultiplier = timeLeft >= (maxTime * 0.7) ? 3 : timeLeft >= (maxTime * 0.4) ? 2 : 1.5;
            break;
    }
    
    return Math.round(baseScore * timeMultiplier);
}

// Function to setup game based on difficulty
function setupGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `
        <div class="game-status">
            <h2 id="productTitle">${gameState.currentProduct} Production</h2>
            <div id="selectionStatus"></div>
        </div>
        <div id="flowBarContainer"></div>
        <div class="categories-container"></div>
    `;

    const productData = gameContent[gameState.currentDifficulty][gameState.currentProduct];
    const categoriesContainer = gameBoard.querySelector('.categories-container');
    if (!categoriesContainer) {
        console.error('Categories container not found');
        return;
    }
    categoriesContainer.innerHTML = '';

    if (gameState.currentDifficulty === 'beginner') {
        createCategorySection('Ingredients', shuffleArray([...productData.availableIngredients]), categoriesContainer);
    } else if (gameState.currentDifficulty === 'intermediate') {
        // Intermediate: show only Ingredients and Processes, limit to 10,20
        createCategorySection('Ingredients', shuffleArray([...productData.availableIngredients]).slice(0, 20), categoriesContainer, true);
        createCategorySection('Processes', shuffleArray([...(productData.availableProcesses || [])]).slice(0, 10), categoriesContainer, true);
        // Improved alignment: stack vertically, full width
        categoriesContainer.style.display = 'flex';
        categoriesContainer.style.flexDirection = 'column';
        categoriesContainer.style.alignItems = 'stretch';
        categoriesContainer.style.gap = '18px';
    } else if (gameState.currentDifficulty === 'expert') {
        // Expert: show Ingredients, Processes, and Equipment, limit to 10,20
        createCategorySection('Ingredients', shuffleArray([...productData.availableIngredients]).slice(0, 20), categoriesContainer, true);
        createCategorySection('Processes', shuffleArray([...(productData.availableProcesses || [])]).slice(0, 10), categoriesContainer, true);
        createCategorySection('Equipment', shuffleArray([...(productData.availableEquipment || [])]).slice(0, 10), categoriesContainer, true);
        // Improved alignment: stack vertically, full width
        categoriesContainer.style.display = 'flex';
        categoriesContainer.style.flexDirection = 'column';
        categoriesContainer.style.alignItems = 'stretch';
        categoriesContainer.style.gap = '18px';
    }
    // Do NOT start timer here; timer is started after setupGame in selectProduct
    updateSelectionStatus();
    updateFlowBar();
}

// Function to create category sections
function createCategorySection(category, items, container) {
    if (!container) {
        console.error('Container is undefined');
        return;
    }

    const section = document.createElement('div');
    section.className = `category-section ${category.toLowerCase()}`;
    section.style.marginBottom = '0';
    section.style.width = '100%';
    section.style.boxSizing = 'border-box';
    section.innerHTML = `
        <h3 style="margin-bottom:8px;">${category}</h3>
        <div class="items-grid"></div>
    `;

    const itemsGrid = section.querySelector('.items-grid');
    if (!itemsGrid) {
        console.error('Items grid not found');
        return;
    }
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'game-item';
        itemElement.textContent = item;
        itemElement.onclick = () => selectItem(item, itemElement);
        // Make each item fill its grid cell and align content
        itemElement.style.width = '100%';
        itemElement.style.boxSizing = 'border-box';
        itemElement.style.minHeight = '44px';
        itemElement.style.display = 'flex';
        itemElement.style.alignItems = 'center';
        itemElement.style.justifyContent = 'center';
        itemElement.style.fontSize = '1em';
        itemsGrid.appendChild(itemElement);
    });
    // For play, show as grid with up to 5 columns, full width
    itemsGrid.style.display = 'grid';
    itemsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
    itemsGrid.style.gap = '10px';
    itemsGrid.style.width = '100%';
    section.style.alignSelf = 'stretch';
    container.appendChild(section);
}

// Add missing updateSelectionStatus function
function updateSelectionStatus() {
    const productData = gameContent[gameState.currentDifficulty][gameState.currentProduct];
    const correctOrder = productData.correctOrder;
    const selectedArray = Array.from(gameState.selectedItems);
    
    const statusElement = document.getElementById('selectionStatus');
    statusElement.textContent = `Production Line: ${selectedArray.length}/${correctOrder.length} steps selected`;
}

// Function to select an item
function selectItem(item, element) {
    if (gameState.selectedItems.has(item)) {
        gameState.selectedItems.delete(item);
        element.classList.remove('selected');
    } else {
        gameState.selectedItems.add(item);
        element.classList.add('selected');
    }
    updateFlowBar();
    checkProgress();
}

// Show a flow bar of selected items in order (as a flowchart)
function updateFlowBar() {
    const flowBar = document.getElementById('flowBarContainer');
    if (!flowBar) return;
    const selectedArray = Array.from(gameState.selectedItems);
    if (selectedArray.length === 0) {
        flowBar.innerHTML = '';
        return;
    }
    // Drag-and-drop logic for reordering (only for intermediate/expert)
    if (gameState.currentDifficulty === 'intermediate' || gameState.currentDifficulty === 'expert') {
        const flowBarHtml = selectedArray.map((item, idx) =>
            `<span class="flow-item" data-idx="${idx}" draggable="true">${item}</span>${idx < selectedArray.length-1 ? '<span class="flow-arrow">→</span>' : ''}`
        ).join('');
        flowBar.innerHTML = `<div class="flow-bar">${flowBarHtml}</div>`;

        const flowItems = flowBar.querySelectorAll('.flow-item');
        let dragSrcIdx = null;
        flowItems.forEach((el, idx) => {
            el.addEventListener('dragstart', function(e) {
                dragSrcIdx = idx;
                el.classList.add('active-highlight');
                e.dataTransfer.effectAllowed = 'move';
            });
            el.addEventListener('dragend', function() {
                dragSrcIdx = null;
                flowItems.forEach(f => f.classList.remove('active-highlight'));
            });
            el.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                el.classList.add('active-highlight');
            });
            el.addEventListener('dragleave', function() {
                el.classList.remove('active-highlight');
            });
            el.addEventListener('drop', function(e) {
                e.preventDefault();
                if (dragSrcIdx === null || dragSrcIdx === idx) return;
                const arr = Array.from(gameState.selectedItems);
                const [moved] = arr.splice(dragSrcIdx, 1);
                arr.splice(idx, 0, moved);
                gameState.selectedItems = new Set(arr);
                updateFlowBar();
                checkProgress();
            });
        });
    } else {
        // Beginner mode: no drag-and-drop, not draggable
        const flowBarHtml = selectedArray.map((item, idx) =>
            `<span class="flow-item" data-idx="${idx}">${item}</span>${idx < selectedArray.length-1 ? '<span class="flow-arrow">→</span>' : ''}`
        ).join('');
        flowBar.innerHTML = `<div class="flow-bar">${flowBarHtml}</div>`;
    }
}

// Function to check progress
function checkProgress() {
    const productData = gameContent[gameState.currentDifficulty][gameState.currentProduct];
    const correctOrder = productData.correctOrder;
    const selectedArray = Array.from(gameState.selectedItems);
    
    // Count correct items (regardless of order)
    let correctItemsCount = 0;
    selectedArray.forEach(item => {
        if (correctOrder.includes(item)) correctItemsCount++;
    });

    // Count correct order (must be correct item and in correct position)
    let correctOrderCount = 0;
    for (let i = 0; i < selectedArray.length; i++) {
        if (correctOrder[i] === selectedArray[i]) correctOrderCount++;
    }

    // Update status: in beginner mode, do not show correct order
    const statusElement = document.getElementById('selectionStatus');
    if (gameState.currentDifficulty === 'beginner') {
        statusElement.textContent = `Correct items: ${correctItemsCount}/${correctOrder.length}`;
    } else {
        statusElement.textContent = `Correct items: ${correctItemsCount}/${correctOrder.length} | Correct order: ${correctOrderCount}/${correctOrder.length}`;
    }

    // End game logic
    if (gameState.currentDifficulty === 'beginner') {
        // In beginner mode, end game when all correct ingredients are selected (order doesn't matter)
        if (
            correctItemsCount === correctOrder.length &&
            selectedArray.length === correctOrder.length
        ) {
            endGame(true);
        }
    } else {
        // In other modes, require correct order
        if (
            correctItemsCount === correctOrder.length &&
            correctOrderCount === correctOrder.length &&
            selectedArray.length === correctOrder.length
        ) {
            endGame(true);
        }
    }
}

// Function to handle the timer
function startTimer() {
    // Only reset timeLeft if it's not already running in beginner mode
    if (!gameState.timer || gameState.currentDifficulty !== 'beginner') {
        gameState.timeLeft = gameState.TIME_LIMITS[gameState.currentDifficulty];
    }
    
    document.getElementById('timerBox').style.display = 'block';
    document.getElementById('timeCount').textContent = gameState.timeLeft;
    
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timeCount').textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Function to save player data
function savePlayerData(name, email, finalScore) {
    const playerData = {
        name,
        email,
        score: finalScore,
        date: new Date().toISOString(),
        difficulty: gameState.currentDifficulty
    };
    
    gameState.players.push(playerData);
    updateLeaderboard(playerData);
    
    localStorage.setItem('players', JSON.stringify(gameState.players));
    localStorage.setItem('leaderboard', JSON.stringify(gameState.leaderboard));
}

// Modify updateLeaderboard function - remove the top 5 limit
function updateLeaderboard(playerData) {
    gameState.leaderboard.push(playerData);
    gameState.leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(gameState.leaderboard));
}

// Modify downloadPlayerData function to include leaderboard download
function downloadPlayerData() {
    // Player scores data
    const scoreData = gameState.players.map(p => 
        `${p.name},${p.email},${p.score},${p.difficulty},${p.date}`
    ).join('\n');
    
    // Detailed attempts data
    const attemptsData = gameState.attempts.map(a => 
        `${a.playerName},${a.playerEmail},${a.difficulty},${a.product},${a.timeSpent},${a.success},${a.score},${a.date}`
    ).join('\n');
    
    // Add leaderboard data
    const leaderboardData = gameState.leaderboard.map(p => 
        `${p.name},${p.email},${p.score},${p.difficulty},${p.date}`
    ).join('\n');
    
    const scoreBlob = new Blob([`Name,Email,Score,Difficulty,Date\n${scoreData}`], 
        { type: 'text/csv' });
    const attemptsBlob = new Blob([`Name,Email,Difficulty,Product,TimeSpent,Success,Score,Date\n${attemptsData}`], 
        { type: 'text/csv' });
    const leaderboardBlob = new Blob([`Name,Email,Score,Difficulty,Date\n${leaderboardData}`], 
        { type: 'text/csv' });
    
    // Download all files
    downloadFile(scoreBlob, 'player_scores.csv');
    downloadFile(attemptsBlob, 'player_attempts.csv');
    downloadFile(leaderboardBlob, 'leaderboard.csv');
}

// Helper function for file download
function downloadFile(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

// Function to save attempt data
function saveAttempt(success) {
    const attemptData = {
        playerName: gameState.playerName,
        playerEmail: gameState.playerEmail,
        difficulty: gameState.currentDifficulty,
        product: gameState.currentProduct,
        timeSpent: gameState.TIME_LIMITS[gameState.currentDifficulty] - gameState.timeLeft,
        itemsSelected: Array.from(gameState.selectedItems),
        success: success,
        score: success ? calculateScore(gameState.timeLeft, gameState.currentDifficulty) : 0,
        date: new Date().toISOString()
    };
    
    if (!gameState.attempts) {
        gameState.attempts = [];
    }
    
    gameState.attempts.push(attemptData);
    localStorage.setItem('attempts', JSON.stringify(gameState.attempts));
}

// Function to end the game
function endGame(completed) {
    clearInterval(gameState.timer);
    
    saveAttempt(completed);
    
    if (completed) {
        const finalScore = calculateScore(gameState.TIME_LIMITS[gameState.currentDifficulty] - gameState.timeLeft, gameState.currentDifficulty);
        gameState.score += finalScore;
        savePlayerData(gameState.playerName, gameState.playerEmail, gameState.score);
        
        gameState.completedProducts.add(gameState.currentProduct);
        
        const remainingProducts = gameContent.products.filter(p => p.name !== gameState.currentProduct);
        if (remainingProducts.length > 0) {
            showGameStatus(finalScore);
        } else {
            showFinalResults();
        }
    } else {
        showTimeout();
    }
    
    document.getElementById('timerBox').style.display = 'none';

    updateBotMessage(completed ? 
        `Fantastic job! You're a food production master! 🎉` : 
        `Time's up! But don't worry, practice makes perfect! 💪`);
}

// Update timeout page to show leaderboard
function showTimeout() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `
        <div class="timeout-message">
            <h2>Time's Up!</h2>
            <p>Current Score: ${gameState.score}</p>
            <div class="leaderboard">
                <h3>Leaderboard</h3>
                ${generateLeaderboardHTML()}
            </div>
            <button onclick="restartGame()" class="secondary-btn" id="tryAgainBtn">Try Again</button>
        </div>
    `;
}

// Function to show game status (pause timer, resume for next product)
function showGameStatus(finalScore) {
    // Pause timer (do not reset timeLeft)
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
    const message = `Great job! Moving to next product in 3 seconds...`;
    document.getElementById('instructionBot').textContent = message;
    setTimeout(() => {
        document.getElementById('productSelection').style.display = 'block';
        document.getElementById('gameBoard').style.display = 'none';
    }, 3000);
}

// Function to show final results (reset timer for new game)
function showFinalResults() {
    // Stop timer
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `
        <div class="final-results">
            <h2>Game Complete!</h2>
            <div class="score-section">
                <h3>Your Final Score: ${gameState.score}</h3>
                <p class="time-bonus">Time Bonus: ${calculateTimeBonus()}</p>
                <p class="total-score">Total Score: ${gameState.score + calculateTimeBonus()}</p>
            </div>
            <div class="leaderboard">
                <h3>Leaderboard</h3>
                ${generateLeaderboardHTML()}
            </div>
            <button onclick="restartGame()" class="secondary-btn" id="playAgainBtn">Play Again</button>
            ${playerIsAdmin() ? '<button onclick="downloadPlayerData()" class="level-btn" id="downloadAllDataBtn">Download All Data</button>' : ''}
        </div>
    `;
    // Reset timeLeft for next new game
    gameState.timeLeft = undefined;
}

// Add function to calculate time bonus
function calculateTimeBonus() {
    return Math.round(gameState.timeLeft * 10); // 10 points per second remaining
}

// Modify generateLeaderboardHTML to show only top 5
function generateLeaderboardHTML() {
    if (!gameState.leaderboard || gameState.leaderboard.length === 0) {
        return '<p>No scores yet!</p>';
    }

    const top5 = [...gameState.leaderboard]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    return `
        <div class="leaderboard-table">
            <div class="leaderboard-header">
                <span>Rank</span>
                <span>Name</span>
                <span>Score</span>
                <span>Difficulty</span>
            </div>
            ${top5.map((player, index) => `
                <div class="leaderboard-entry">
                    <span>${index + 1}</span>
                    <span>${player.name}</span>
                    <span>${player.score}</span>
                    <span>${player.difficulty}</span>
                </div>
            `).join('')}
        </div>
        <button onclick="downloadLeaderboard()" class="level-btn" id="downloadLeaderboardBtn">Download Full Leaderboard</button>
    `;
}

// Add new function to download just the leaderboard
function downloadLeaderboard() {
    const leaderboardData = gameState.leaderboard.map(p => 
        `${p.name},${p.email},${p.score},${p.difficulty},${p.date}`
    ).join('\n');
    
    const leaderboardBlob = new Blob([`Name,Email,Score,Difficulty,Date\n${leaderboardData}`], 
        { type: 'text/csv' });
    
    downloadFile(leaderboardBlob, 'leaderboard.csv');
}

// Function to check if player is admin (customize as needed)
function playerIsAdmin() {
    const adminEmails = ['skadakash@gmail.com']; // Add admin emails
    if (!gameState.playerEmail) return false;
    const normalized = gameState.playerEmail.trim().toLowerCase();
    return adminEmails.some(e => e.toLowerCase() === normalized);
}

// Function to restart game
function restartGame() {
    // Reset game state
    gameState = {
        playerName: '',
        playerEmail: '',
        currentDifficulty: '',
        timeLeft: 60,
        timer: null,
        currentProduct: null,
        score: 0,
        selectedItems: new Set(),
        players: gameState.players, // Preserve players data
        leaderboard: gameState.leaderboard, // Preserve leaderboard data
        attempts: gameState.attempts, // Preserve attempts data
        TIME_LIMITS: gameState.TIME_LIMITS, // Preserve time limits
        completedProducts: new Set()
    };

    // Reset UI
    const elements = {
        inputSection: document.getElementById('inputSection'),
        gameContent: document.getElementById('gameContent'),
        gameBoard: document.getElementById('gameBoard'),
        productSelection: document.getElementById('productSelection'),
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        timerBox: document.getElementById('timerBox'),
        instructionBot: document.getElementById('instructionBot')
    };

    // Check if all elements exist
    if (Object.values(elements).some(el => !el)) {
        console.error('Some UI elements not found');
        return;
    }

    // Reset display states
    elements.inputSection.style.display = 'block';
    elements.gameContent.style.display = 'none';
    elements.gameBoard.style.display = 'none';
    elements.productSelection.style.display = 'block';
    elements.timerBox.style.display = 'none';
    
    // Clear inputs
    elements.name.value = '';
    elements.email.value = '';
    
    // Reset instruction
    elements.instructionBot.textContent = 'Welcome to Build-A-Bite!';
    
    // Clear any existing timers
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
}

// Show instruction box for selected difficulty
window.showInstructionBox = function(difficulty) {
    const inputSection = document.getElementById('inputSection');
    const instructionSection = document.getElementById('instructionSection');
    const instructionBox = document.getElementById('instructionBox');
    const nextBtn = document.getElementById('instructionNextBtn');
    window.gameState.currentDifficulty = difficulty;
    // Only allow moving to instructions if name and email are filled
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    if (!nameInput.value.trim()) {
        alert('Name is required to continue.');
        nameInput.focus();
        return;
    }
    if (!emailInput.value.trim()) {
        alert('Email is required to continue.');
        emailInput.focus();
        return;
    }
    inputSection.style.display = 'none';
    instructionSection.style.display = 'block';
    // Clear and set instruction content
    instructionBox.innerHTML = getInstructionHTML(difficulty);
    nextBtn.onclick = function() {
        // Validate name and email before proceeding (redundant, but safe)
        if (!nameInput.value.trim()) {
            alert('Name is required to start the game.');
            nameInput.focus();
            return;
        }
        if (!emailInput.value.trim()) {
            alert('Email is required to start the game.');
            emailInput.focus();
            return;
        }
        instructionSection.style.display = 'none';
        // Show product selection and game content
        const gameContent = document.getElementById('gameContent');
        const productSelection = document.getElementById('productSelection');
        const gameBoard = document.getElementById('gameBoard');
        if (gameContent) gameContent.style.display = 'block';
        if (productSelection) productSelection.style.display = 'block';
        if (gameBoard) gameBoard.style.display = 'none';
        // Display products immediately
        if (typeof displayProducts === 'function') displayProducts();
        updateBotMessage('Select a product to begin.');
    };
};

// Generate clear, highlighted instructions for each level
function getInstructionHTML(difficulty) {
    if (difficulty === 'beginner') {
        return `<h2>How to Play: Basic Level</h2>
        <ul>
            <li><b>Goal:</b> Build a food product by selecting the correct <b>ingredients</b>.</li>
            <li>You will see a list of all possible items for the product. <b>Carefully review</b> them during a <b>10-second preview</b> before the timer starts.</li>
            <li> After the preview, the timer will start. <b>Click</b> on the correct ingredients in the any order to build the product. You can select and deselect items as needed.</li>
            <li><b>Scoring:</b> You earn points for each correct step and bonus points for finishing quickly. Accuracy and speed both matter!</li>
            <li><b>Progress:</b> Your progress is shown at the top. Complete all steps to finish the product and move to the next one.</li>
            <li><b>Leaderboard:</b> Try to get the highest score and see your name on the leaderboard!</li>
        </ul>
        <p style="margin-top:18px;"><b>Tip:</b> Take your time to learn the process. This level is designed for beginners and is the best place to start!</p>`;
    } else if (difficulty === 'intermediate') {
        return `<h2>How to Play: Advanced Level</h2>
        <ul>
            <li><b>Goal:</b> Build the product by selecting the correct items in the right order, but with less time and no hints.</li>
            <li><b>Preview:</b> You have <b>10 seconds</b> to review all items before the round starts.</li>
            <li><b>Challenge:</b> The timer is shorter and you must be quick and accurate. No hints are provided.</li>
            <li><b>Scoring:</b> Points are awarded for correct selections and speed. Mistakes reduce your score.</li>
            <li><b>Progress:</b> Complete all steps to finish the product and move to the next one. Try to beat your previous score!</li>
        </ul>
        <p style="margin-top:18px;"><b>Tip:</b> Focus and plan your moves during the preview. This level is for players who want a real challenge!</p>`;
    } else if (difficulty === 'expert') {
        return `<h2>How to Play: Expert Level</h2>
        <ul>
            <li><b>Goal:</b> Build the product perfectly by selecting all correct items in the exact order, as fast as possible.</li>
            <li><b>Preview:</b> You have <b>10 seconds</b> to analyze all items. Use this time to memorize the correct sequence.</li>
            <li><b>Challenge:</b> The timer is the shortest, there are more items, and <b>no hints</b> are given. Every mistake costs you time and points.</li>
            <li><b>Scoring:</b> Only perfect accuracy and the fastest time will get you to the top of the leaderboard.</li>
            <li><b>Progress:</b> Complete all steps in order to finish the product. Only the best can master this level!</li>
        </ul>
        <p style="margin-top:18px;"><b>Tip:</b> Plan your selections during the preview. This level is for experts who want to test their memory and speed!</p>`;
    }
    return '';
}