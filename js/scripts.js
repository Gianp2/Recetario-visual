const ingredientSelect = document.getElementById('ingredient-select');
const ingredientSearch = document.getElementById('ingredient-search');
const selectedIngredientsDiv = document.getElementById('selected-ingredients');
const recipeForm = document.getElementById('recipe-form');
const recipesList = document.getElementById('recipes-list');
const clearRecipesBtn = document.getElementById('clearRecipes');
const form = document.getElementById('form-inventario');
const lista = document.getElementById('lista-inventario');

let inventario = {};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreProducto').value.trim().toLowerCase();
    const cantidad = parseFloat(document.getElementById('cantidadProducto').value);

    if (!nombre || isNaN(cantidad)) return;

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

// Traducción de ingredientes al inglés (ingredientTranslations)
// ... (todo el objeto que ya colocaste)...

let ingredients = Object.keys(ingredientTranslations);
let selectedIngredients = [];
let recipes = [];

function getIngredientImage(ingredient) {
    let translated = ingredientTranslations[ingredient] || ingredient;
    return `https://www.themealdb.com/images/ingredients/${translated}.png`;
}

function loadIngredients() {
    updateIngredientSelect(ingredients);
}

function updateIngredientSelect(ingredientsToShow) {
    ingredientSelect.innerHTML = '';
    ingredientsToShow.forEach(ingredient => {
        const option = document.createElement('option');
        option.value = ingredient;
        option.textContent = ingredient;
        ingredientSelect.appendChild(option);
    });
}

ingredientSearch.addEventListener('input', () => {
    const searchValue = ingredientSearch.value.toLowerCase();
    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.toLowerCase().includes(searchValue)
    );
    updateIngredientSelect(filteredIngredients);
});

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

function removeIngredient(ingredientName) {
    selectedIngredients = selectedIngredients.filter(({ ingredient }) => ingredient !== ingredientName);
    updateSelectedIngredients();
}

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

    document.querySelectorAll('.remove-ingredient').forEach(button => {
        button.addEventListener('click', () => {
            removeIngredient(button.getAttribute('data-ingredient'));
        });
    });
}

function loadRecipesFromStorage() {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
        recipesList.innerHTML = '';
        recipes.forEach((recipe, index) => displayRecipe(recipe, index));
    }
}

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

    recipeCard.querySelector('.edit-recipe-btn').addEventListener('click', () => editRecipe(index));
    recipeCard.querySelector('.delete-recipe-btn').addEventListener('click', () => deleteRecipe(index));
    recipeCard.querySelector('.print-recipe-btn').addEventListener('click', () => printRecipe(index));
}

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

function editRecipe(index) {
    const recipe = recipes[index];
    document.getElementById('recipe-name').value = recipe.name;
    document.getElementById('steps').value = recipe.steps;
    selectedIngredients = [...recipe.ingredients];
    updateSelectedIngredients();
    recipeForm.dataset.editingIndex = index;
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    recipesList.innerHTML = '';
    recipes.forEach((recipe, i) => displayRecipe(recipe, i));
}

// Limpiar todas las recetas
clearRecipesBtn.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que deseas eliminar todas las recetas?")) {
        recipes = [];
        localStorage.removeItem('recipes');
        recipesList.innerHTML = '';
    }
});

// Imprimir receta individual
function printRecipe(index) {
    const recipe = recipes[index];
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
            <head><title>Imprimir Receta</title></head>
            <body>
                <h2>${recipe.name}</h2>
                <h3>Ingredientes:</h3>
                <ul>
                    ${recipe.ingredients.map(({ ingredient, quantity }) => `<li>${ingredient} (${quantity})</li>`).join('')}
                </ul>
                <h3>Pasos:</h3>
                <ol>
                    ${recipe.steps.split('\n').filter(s => s.trim() !== '').map(step => `<li>${step.trim()}</li>`).join('')}
                </ol>
                <script>window.print();</script>
            </body>
        </html>
    `);
    newWindow.document.close();
}

// Inicializar
window.addEventListener('DOMContentLoaded', () => {
    loadIngredients();
    loadRecipesFromStorage();
});
