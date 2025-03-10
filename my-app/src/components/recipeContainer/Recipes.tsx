import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./Recipe"; // Ваш компонент для відображення страв

const Recipes = () => {
    const [query, setQuery] = useState<string>(""); // Для пошукового запиту
    const [meals, setMeals] = useState<any[]>([]); // Для результатів пошуку
    const [allMeals, setAllMeals] = useState<any[]>([]); // Для всіх страв
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка
    const [itemsPerPage] = useState(6); // Кількість елементів на сторінці

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            setError(null); // очищаємо помилки при новому пошуку

            try {
                // Завантажуємо всі страви при першому рендерингу
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
                setAllMeals(response.data.meals); // Зберігаємо всі страви
            } catch (err) {
                console.error("Error fetching meals:", err);
                setError("Failed to fetch meals");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMeals();
    }, []);

    useEffect(() => {
        if (!query) {
            // Якщо поле пошуку порожнє, відображаємо всі страви
            setMeals(allMeals);
        } else {
            // Якщо є текст у полі пошуку, відображаємо лише відповідні страви
            const filteredMeals = allMeals.filter(meal =>
                meal.strMeal.toLowerCase().includes(query.toLowerCase())
            );
            setMeals(filteredMeals);
        }
    }, [query, allMeals]); // Залежність від запиту та всіх страв

    // Розрахунок індексів для пагінації
    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal); // Показуємо страви для поточної сторінки

    // Кількість сторінок
    const pageCount = Math.ceil(meals.length / itemsPerPage);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value); // Оновлюємо значення пошукового запиту
        setCurrentPage(1); // Скидаємо сторінку на першу при новому пошуку
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a meal..."
                value={query}
                onChange={handleSearchChange}
            />
            <div>
                {currentMeals.length > 0 ? (
                    currentMeals.map((meal: any) => (
                        <RecipeCard key={meal.idMeal} meal={meal} />
                    ))
                ) : (
                    <div>No meals found.</div>
                )}
            </div>

            {/* Пагінація */}
            <div className="pagination">
                {Array.from({ length: pageCount }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Recipes;
