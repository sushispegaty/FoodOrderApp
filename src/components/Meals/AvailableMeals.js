import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeal] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [httpError, sethttpError] = useState(null);
  useEffect(() => {
    const FetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-post-111d0-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong !!");
      }
      const responseData = await response.json();

      const LoadedMeals = [];
      for (const key in responseData) {
        LoadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeal(LoadedMeals);
      setIsLoading(false);
    };

    FetchMeals().catch((error) => {
      setIsLoading(false);
      sethttpError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {!isLoading && (
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
