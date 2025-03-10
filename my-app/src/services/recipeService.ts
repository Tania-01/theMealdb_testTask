import { IMealEntries, IMeal } from "../type/mealTypes";
import { axiosServices } from "./axiosService";
import { urls } from "../constant/urls";
import axios from "axios";



  const mealServices = {
        getMealsByQuery: async (query: string) => {
            try {
                const response = await axios.get(`/api/recipes/search`, {
                    params: { query },
                });
                return response.data; // Повертаємо знайдені страви
            } catch (error) {
                console.error("Error fetching meals by query:", error);
                throw new Error("Failed to fetch meals");
            }
        },


    getById: async (id: number): Promise<IMealEntries> => {
        try {
            const response = await axiosServices.get(urls.mealById.getById(id));
            return response.data;
        } catch (error) {
            throw new Error("Error fetching meal by ID");
        }
    },
    getByCategory: async (category: string): Promise<IMealEntries> => {
        try {
            const response = await axiosServices.get(urls.categories.byName(category));
            return response.data;
        } catch (error) {
            console.error('Error fetching meals by category:', error);
            throw new Error("Error fetching meals by category");
        }
    },
    // mealServices.ts
     getAll : async () => {
        try {
            const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s="); // Отримуємо всі страви
            return {meals: response.data.meals}; // Повертаємо результат
        } catch (error) {
            console.error("Error fetching meals:", error);
            return {meals: []}; // Якщо сталася помилка, повертаємо порожній масив
        }
    }
};

export { mealServices };
