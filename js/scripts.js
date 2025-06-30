const ingredientSelect = document.getElementById('ingredient-select');
const ingredientSearch = document.getElementById('ingredient-search');
const selectedIngredientsDiv = document.getElementById('selected-ingredients');
const recipeForm = document.getElementById('recipe-form');
const recipesList = document.getElementById('recipes-list');
const clearRecipesBtn = document.getElementById('clearRecipes');

let inventario = {};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreProducto').value.trim().toLowerCase();
    const cantidad = parseFloat(document.getElementById('cantidadProducto').value);

    if (!nombre || isNaN(cantidad)) return;

    // Agregar o actualizar producto
    inventario[nombre] = (inventario[nombre] || 0) + cantidad;

    actualizarLista();
    form.reset();
});

function actualizarLista() {
    lista.innerHTML = '';

    Object.keys(inventario).forEach(nombre => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${nombre}</strong>: ${inventario[nombre]} kg/unid</span>
            <button class="boton-eliminar" onclick="eliminarProducto('${nombre}')">Eliminar</button>
        `;
        lista.appendChild(li);
    });
}

function eliminarProducto(nombre) {
    delete inventario[nombre];
    actualizarLista();
}

// Traducción de ingredientes al inglés
const ingredientTranslations = {
    "Aceite": "Oil",
    "Acelga": "Chard",
    "Aguacate": "Avocado",
    "Albahaca": "Basil",
    "Alcachofa": "Artichoke",
    "Almeja": "Clam",
    "Almendras": "Almonds",
    "Anacardos": "Cashews",
    "Apio": "Celery",
    "Arroz": "Rice",
    "Atún": "Tuna",
    "Azafrán": "Saffron",
    "Azúcar": "Sugar",
    "Bacon": "Bacon",
    "Batata": "Sweet Potato",
    "Berenjena": "Eggplant",
    "Bicarbonato": "Baking Soda",
    "Brócoli": "Broccoli",
    "Cacahuetes": "Peanuts",
    "Calabacín": "Zucchini",
    "Calamares": "Squid",
    "Camarones": "Shrimp",
    "Canela": "Cinnamon",
    "Cardamomo": "Cardamom",
    "Carne de Cerdo": "Pork",
    "Carne de Cordero": "Lamb",
    "Carne de Ternera": "Veal",
    "Cebada": "Barley",
    "Cebolla": "Onion",
    "Cereza": "Cherry",
    "Cerdo": "Pork",
    "Champiñones": "Mushrooms",
    "Chayote": "Chayote",
    "Chocolate": "Chocolate",
    "Cilantro": "Cilantro",
    "Ciruela": "Plum",
    "Clavo": "Clove",
    "Coles de Bruselas": "Brussels Sprouts",
    "Coliflor": "Cauliflower",
    "Coco": "Coconut",
    "Codorniz": "Quail",
    "Comino": "Cumin",
    "Conejo": "Rabbit",
    "Cordero": "Lamb",
    "Corn Flour": "Harina de Maíz",
    "Crema": "Cream",
    "Durazno": "Peach",
    "Espárragos": "Asparagus",
    "Espinaca": "Spinach",
    "Fresa": "Strawberry",
    "Frijoles": "Beans",
    "Garbanzos": "Chickpeas",
    "Granada": "Pomegranate",
    "Guisantes": "Peas",
    "Harina": "Flour",
    "Harina de Avena": "Oat Flour",
    "Harina de Maíz": "Corn Flour",
    "Harina Integral": "Whole Wheat Flour",
    "Habas": "Broad Beans",
    "Hinojo": "Fennel",
    "Hinojo (semillas)": "Fennel Seeds",
    "Huevo": "Egg",
    "Jamón": "Ham",
    "Jengibre": "Ginger",
    "Kale": "Kale",
    "Kiwi": "Kiwi",
    "Langosta": "Lobster",
    "Lechuga": "Lettuce",
    "Leche": "Milk",
    "Levadura": "Yeast",
    "Limón": "Lemon",
    "Lentejas": "Lentils",
    "Maíz": "Corn",
    "Mango": "Mango",
    "Manteca": "Butter",
    "Manzana": "Apple",
    "Maracuyá": "Passion Fruit",
    "Mascarpone": "Mascarpone",
    "Mejillón": "Mussel",
    "Melón": "Melon",
    "Miel": "Honey",
    "Mijo": "Millet",
    "Mostaza": "Mustard",
    "Naranja": "Orange",
    "Nata": "Heavy Cream",
    "Nuez Moscada": "Nutmeg",
    "Nueces": "Walnuts",
    "Okra": "Okra",
    "Orégano": "Oregano",
    "Ostra": "Oyster",
    "Pan": "Bread",
    "Papa": "Potato",
    "Papaya": "Papaya",
    "Paprika": "Paprika",
    "Pasta": "Pasta",
    "Pavo": "Turkey",
    "Pepino": "Cucumber",
    "Pera": "Pear",
    "Perejil": "Parsley",
    "Pescado": "Fish",
    "Pimiento": "Pepper",
    "Pimienta": "Pepper",
    "Pimienta de Cayena": "Cayenne Pepper",
    "Piña": "Pineapple",
    "Pistachos": "Pistachios",
    "Plátano": "Banana",
    "Pollo": "Chicken",
    "Polvo de Hornear": "Baking Powder",
    "Quinoa": "Quinoa",
    "Rábano": "Radish",
    "Requesón": "Cottage Cheese",
    "Ricotta": "Ricotta",
    "Romero": "Rosemary",
    "Rúcula": "Arugula",
    "Sal": "Salt",
    "Salmón": "Salmon",
    "Salchicha": "Sausage",
    "Sandía": "Watermelon",
    "Salsa de Soja": "Soy Sauce",
    "Semillas de Calabaza": "Pumpkin Seeds",
    "Semillas de Chía": "Chia Seeds",
    "Semillas de Girasol": "Sunflower Seeds",
    "Semillas de Sésamo": "Sesame Seeds",
    "Sorgo": "Sorghum",
    "Suero de leche": "Buttermilk",
    "Tapioca": "Tapioca",
    "Tocino": "Bacon",
    "Tomate": "Tomato",
    "Tomillo": "Thyme",
    "Tortilla": "Tortilla",
    "Trigo": "Wheat",
    "Trucha": "Trout",
    "Uva": "Grape",
    "Vainilla": "Vanilla",
    "Vinagre": "Vinegar",
    "Yogur": "Yogurt",
    "Zanahoria": "Carrot"
};

let ingredients = Object.keys(ingredientTranslations);
let selectedIngredients = [];
let recipes = [];

// Obtener imagen del ingrediente
function getIngredientImage(ingredient) {
    let translated = ingredientTranslations[ingredient] || ingredient;
    return `https://www.themealdb.com/images/ingredients/${translated}.png`;
}

// Cargar lista de ingredientes al iniciar
function loadIngredients() {
    updateIngredientSelect(ingredients);
}

// Actualizar el select con los ingredientes filtrados
function updateIngredientSelect(ingredientsToShow) {
    ingredientSelect.innerHTML = '';
    ingredientsToShow.forEach(ingredient => {
        const option = document.createElement('option');
        option.value = ingredient;
        option.textContent = ingredient;
        ingredientSelect.appendChild(option);
    });
}

// Filtrar ingredientes en tiempo real
ingredientSearch.addEventListener('input', () => {
    const searchValue = ingredientSearch.value.toLowerCase();
    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.toLowerCase().includes(searchValue)
    );
    updateIngredientSelect(filteredIngredients);
});

// Función para agregar ingredientes con cantidad usando prompt
document.getElementById('add-ingredients-btn').addEventListener('click', () => {
    const selectedOptions = Array.from(ingredientSelect.selectedOptions);
    selectedOptions.forEach(option => {
        const ingredient = option.value;
        const quantity = prompt(`¿Cuántos ${ingredient} necesitas?`);
        if (quantity) {
            selectedIngredients.push({ ingredient, quantity });
        }
    });
    updateSelectedIngredients();
});

// Función para eliminar un ingrediente seleccionado
function removeIngredient(ingredientName) {
    selectedIngredients = selectedIngredients.filter(({ ingredient }) => ingredient !== ingredientName);
    updateSelectedIngredients();
}

// Función para actualizar la lista de ingredientes seleccionados con botón de eliminación
function updateSelectedIngredients() {
    selectedIngredientsDiv.innerHTML = selectedIngredients
        .map(({ ingredient, quantity }) => `
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <img src="${getIngredientImage(ingredient)}" 
                     alt="${ingredient}" 
                     style="width:30px; height:30px; margin-right:10px;"
                     onerror="this.src='https://via.placeholder.com/30?text=${ingredient}';">
                <span>${ingredient} (${quantity})</span>
                <button class="remove-ingredient" data-ingredient="${ingredient}" 
                        style="margin-left:10px; background-color:#d9534f; color:white; border:none; 
                               padding:2px 5px; font-size:12px; width: 20px; height: 20px; cursor:pointer; 
                               display:flex; align-items:center; justify-content:center; border-radius:50%;">
                    ❌
                </button>
            </div>
        `)
        .join('');

    // Agregar event listener a los botones de eliminación
    document.querySelectorAll('.remove-ingredient').forEach(button => {
        button.addEventListener('click', () => {
            removeIngredient(button.getAttribute('data-ingredient'));
        });
    });
}

// Cargar recetas guardadas desde localStorage
function loadRecipesFromStorage() {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
        recipesList.innerHTML = '';
        recipes.forEach((recipe, index) => displayRecipe(recipe, index));
    }
}

// Mostrar recetas guardadas con botón de imprimir
function displayRecipe(recipe, index) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.setAttribute('data-index', index);
    const stepsArray = recipe.steps.split('\n').filter(step => step.trim() !== '');
    recipeCard.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredientes:</strong></p>
        <div>
            ${recipe.ingredients.map(({ ingredient, quantity }, idx) => `
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <img src="${recipe.images[idx]}" alt="${ingredient}" style="width:50px; height:50px; margin-right:10px;"
                         onerror="this.src='https://via.placeholder.com/50?text=${ingredient}';">
                    <span>${ingredient} (${quantity})</span>
                </div>
            `).join('')}
        </div>
        <p><strong>Pasos:</strong></p>
        <ul>
            ${stepsArray.map(step => `<li>${step.trim()}</li>`).join('')}
        </ul>
        <button class="edit-recipe-btn" data-index="${index}">Editar</button>
        <button class="delete-recipe-btn" data-index="${index}">Eliminar</button>
        <button class="print-recipe-btn" data-index="${index}">Imprimir</button>
    `;
    recipesList.appendChild(recipeCard);
}

// Guardar y manejar el formulario
recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const recipeName = document.getElementById('recipe-name').value;
    const steps = document.getElementById('steps').value;
    const images = selectedIngredients.map(ingredient => getIngredientImage(ingredient.ingredient));

    const recipe = { name: recipeName, ingredients: selectedIngredients, steps, images };
    const editingIndex = recipeForm.dataset.editingIndex;

    if (editingIndex !== undefined && editingIndex !== '') {
        recipes[editingIndex] = recipe;
        delete recipeForm.dataset.editingIndex;
    } else {
        recipes.push(recipe);
    }

    localStorage.setItem('recipes', JSON.stringify(recipes));
    recipesList.innerHTML = '';
    recipes.forEach((recipe, index) => displayRecipe(recipe, index));

    recipeForm.reset();
    selectedIngredients = [];
    updateSelectedIngredients();
});

// Editar receta
function editRecipe(index) {
    const recipe = recipes[index];
    document.getElementById('recipe-name').value = recipe.name;
    document.getElementById('steps').value = recipe.steps;
    selectedIngredients = [...recipe.ingredients];
    updateSelectedIngredients();
    recipeForm.dataset.editingIndex = index;
}

// Eliminar receta
function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    recipesList.innerHTML = '';
    recipes.forEach((recipe, idx) => displayRecipe(recipe, idx));
}

// Función imprimir receta
function printRecipe(index) {
    const recipe = recipes[index];
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>${recipe.name}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { font-size: 24px; }
                h2 { font-size: 18px; margin-top: 20px; }
                .ingredient { display: flex; align-items: center; margin-bottom: 10px; }
                img { width: 50px; height: 50px; margin-right: 10px; }
            </style>
        </head>
        <body>
            <h1>${recipe.name}</h1>
            <h2>Ingredientes</h2>
            <div>
                ${recipe.ingredients.map(({ ingredient, quantity }, idx) => `
                    <div class="ingredient">
                        <img src="${recipe.images[idx]}" alt="${ingredient}" 
                             onerror="this.src='https://via.placeholder.com/50?text=${ingredient}';">
                        <span>${ingredient} (${quantity})</span>
                    </div>
                `).join('')}
            </div>
            <h2>Pasos</h2>
            <ul>
                ${recipe.steps.split('\n').filter(step => step.trim() !== '').map(step => `<li>${step.trim()}</li>`).join('')}
            </ul>
            <script>window.print(); window.close();<\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Editar, eliminar e imprimir recetas
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-recipe-btn')) {
        editRecipe(e.target.getAttribute('data-index'));
    } else if (e.target.classList.contains('delete-recipe-btn')) {
        deleteRecipe(e.target.getAttribute('data-index'));
    } else if (e.target.classList.contains('print-recipe-btn')) {
        printRecipe(e.target.getAttribute('data-index'));
    }
});

// Borrar todas las recetas
clearRecipesBtn.addEventListener('click', () => {
    recipesList.innerHTML = '';
    recipes = [];
    localStorage.removeItem('recipes');
});

// Inicialización
document.addEventListener("DOMContentLoaded", function () {
    loadIngredients();
    loadRecipesFromStorage();
});

// Código para EmailJS
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("q5GaGBca1N9M-RrbL");

    const commentForm = document.getElementById("comment-form");
    if (commentForm) {
        commentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const comment = document.getElementById("comment").value.trim();

            if (!name || !email || !comment) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            const formData = { name, email, comment };

            emailjs.send("service_3a04o94", "template_3lb7au9", formData)
                .then(function (response) {
                    console.log("Comentario enviado con éxito:", response);
                    alert("Comentario enviado con éxito.");
                    commentForm.reset();
                })
                .catch(function (error) {
                    console.error("Error al enviar el comentario:", error);
                    alert("Ocurrió un error al enviar el comentario.");
                });
        });
    } else {
        console.error("El formulario de comentarios no se encuentra en el DOM.");
    }
});
