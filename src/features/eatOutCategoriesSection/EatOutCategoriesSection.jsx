import React, { useContext } from "react";
import "./eat-out-categories-section.scss";
import { CategoryCard } from "components";
import { GlobalContext } from "containers";

export const EatOutCategoriesSection = () => {
  const { restaurants } = useContext(GlobalContext);

  const countOccurrences = (arr, val) => {
    return arr.reduce(
      (total, curr) => (curr.categories.includes(val) ? total + 1 : total),
      0
    );
  };

  const categories = restaurants.categories.map((category) => {
    const placesCount = countOccurrences(restaurants.restaurantList, category);
    const categoryName = category.toLowerCase();

    return {
      id: `eatout-categories-${category}`,
      image: require(`assets/illustrations/${categoryName}.png`),
      title: category,
      link: placesCount ? `/eatout/${categoryName}` : "#",
      reserved: placesCount,
    };
  });

  return (
    <section className="eat-out-categories-section">
      <h3 className="eatout-page-section-title">Categories</h3>
      <div className="eat-out-categories-section__categories">
        {categories.map((category) => (
          <CategoryCard key={category.id} subTitle="Places" data={category} />
        ))}
      </div>
    </section>
  );
};
