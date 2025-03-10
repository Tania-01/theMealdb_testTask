import React, { useState } from 'react';

interface Ingredient {
    name: string;
    measure: string;
}

interface Recipe {
    id: string;
    title: string;
    ingredients: Ingredient[];
}

const recipes: Recipe[] = [
    {
        id: '1',
        title: 'Spaghetti',
        ingredients: [
            { name: 'Spaghetti', measure: '200g' },
            { name: 'Tomato', measure: '1 piece' },
            { name: 'Garlic', measure: '2 cloves' },
        ],
    },
    {
        id: '2',
        title: 'Pizza',
        ingredients: [
            { name: 'Tomato', measure: '2 pieces' },
            { name: 'Cheese', measure: '100g' },
            { name: 'Olives', measure: '50g' },
        ],
    },
    // Додаткові рецепти...
];

const RecipeSelectionPage = () => {
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);


    const addToSelectedRecipes = (recipe: Recipe) => {
        setSelectedRecipes((prev) => {
            const updatedRecipes = [...prev, recipe];
            updateIngredientsList(updatedRecipes);
            return updatedRecipes;
        });
    };

    // Оновлюємо список інгредієнтів
    const updateIngredientsList = (recipes: Recipe[]) => {
        const allIngredients: Ingredient[] = recipes.flatMap((recipe) => recipe.ingredients);

        // Підраховуємо кількість інгредієнтів
        const ingredientCount = allIngredients.reduce((acc: { [key: string]: Ingredient }, ingredient) => {
            const existing = acc[ingredient.name];
            if (existing) {
                existing.measure = `${parseInt(existing.measure) + parseInt(ingredient.measure)}g`; // або інший механізм підрахунку
            } else {
                acc[ingredient.name] = { ...ingredient };
            }
            return acc;
        }, {});

        // Оновлюємо список інгредієнтів
        setIngredientsList(Object.values(ingredientCount));
    };

    return (
        <div>
            <h1>Choose Recipes</h1>
            <div>
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <button onClick={() => addToSelectedRecipes(recipe)}>Add to Selection</button>
                    </div>
                ))}
            </div>

            <h2>Selected Recipes</h2>
            <ul>
                {selectedRecipes.map((recipe) => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>

            <h2>Ingredients</h2>
            <ul>
                {ingredientsList.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name} - {ingredient.measure}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeSelectionPage;
