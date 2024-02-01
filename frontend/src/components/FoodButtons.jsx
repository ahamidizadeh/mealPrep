import React, { useState } from "react";
import "./styles/FoodButtons.css";
const cultures = [
  "Mexican",
  "Chinese",
  "Korean",
  "Jamaican",
  "Italian",
  "French",
  "Caribbean",
  "Spanish",
  "Indian",
  "Persian",
];
const foods = {
  Mexican: {
    Tacos: [
      "Beef Tacos",
      "Chicken Tacos",
      "Fish Tacos",
      "Carnitas Tacos",
      "Al Pastor Tacos",
    ],
    Enchiladas: [
      "Cheese Enchiladas",
      "Chicken Enchiladas",
      "Beef Enchiladas",
      "Enchiladas Verdes",
      "Enchiladas Rojas",
    ],
    Guacamole: [
      "Classic Guacamole",
      "Spicy Guacamole",
      "Guacamole with Mango",
      "Guacamole with Corn",
    ],
    Tamales: [
      "Red Chili Pork Tamales",
      "Chicken Tamales",
      "Cheese and Jalapeño Tamales",
      "Sweet Tamales",
    ],
    Pozole: ["Pozole Rojo", "Pozole Verde", "Pozole Blanco"],
    Mole: ["Mole Poblano", "Mole Negro", "Mole Verde"],
    Churros: [
      "Classic Churros",
      "Chocolate-filled Churros",
      "Caramel-filled Churros",
    ],
    Elote: ["Classic Elote", "Elote with Mayo and Parmesan", "Spicy Elote"],
    Ceviche: [
      "Classic Fish Ceviche",
      "Shrimp Ceviche",
      "Mixed Seafood Ceviche",
    ],
  },

  Italian: {
    Pizza: [
      "Margherita Pizza",
      "Pepperoni Pizza",
      "Neapolitan Pizza",
      "Quattro Formaggi Pizza",
      "Capricciosa Pizza",
      "Hawaiian Pizza",
      "Veggie Pizza",
    ],
    Pasta: [
      "Spaghetti Carbonara",
      "Fettuccine Alfredo",
      "Penne all'Arrabbiata",
      "Lasagna",
      "Ravioli",
      "Pesto Pasta",
      "Aglio e Olio",
    ],
    Risotto: [
      "Risotto alla Milanese",
      "Mushroom Risotto",
      "Seafood Risotto",
      "Risotto al Nero di Seppia",
      "Asparagus Risotto",
      "Pumpkin Risotto",
    ],
    Tiramisu: [
      "Classic Tiramisu",
      "Strawberry Tiramisu",
      "Tiramisu with Hazelnuts",
      "Chocolate Tiramisu",
      "Limoncello Tiramisu",
    ],
    Gelato: [
      "Vanilla Gelato",
      "Chocolate Gelato",
      "Pistachio Gelato",
      "Stracciatella Gelato",
      "Lemon Gelato",
      "Salted Caramel Gelato",
    ],
    Lasagna: [
      "Traditional Meat Lasagna",
      "Vegetarian Lasagna",
      "White Lasagna with Chicken",
      "Seafood Lasagna",
      "Spinach and Ricotta Lasagna",
    ],
    "Osso Buco": [
      "Classic Osso Buco",
      "Osso Buco with Gremolata",
      "Osso Buco with Tomato Sauce",
      "Osso Buco in White Wine Sauce",
    ],
    Carbonara: [
      "Classic Carbonara",
      "Carbonara with Pancetta",
      "Carbonara with Mushrooms",
      "Seafood Carbonara",
    ],
    Minestrone: [
      "Classic Minestrone",
      "Winter Minestrone",
      "Minestrone with Pesto",
      "Summer Minestrone",
      "Minestrone with Beans and Pasta",
    ],
    "Caprese Salad": [
      "Classic Caprese Salad",
      "Caprese Salad with Balsamic Glaze",
      "Caprese Salad Skewers",
      "Caprese Salad with Avocado",
    ],
  },

  Chinese: {
    "Dim Sum": [
      "Har Gow (Shrimp Dumplings)",
      "Siu Mai (Pork Dumplings)",
      "Char Siu Bao (BBQ Pork Buns)",
      "Egg Custard Tarts",
      "Rice Noodle Rolls",
      "Fried Taro Dumplings",
      "Chicken Feet",
    ],
    "Peking Duck": [
      "Traditional Peking Duck",
      "Peking Duck with Hoisin Sauce",
      "Crispy Skin Peking Duck",
      "Peking Duck Wraps",
    ],
    "Hot Pot": [
      "Sichuan Spicy Hot Pot",
      "Beef Hot Pot",
      "Seafood Hot Pot",
      "Mushroom Hot Pot",
      "Tomato Hot Pot",
    ],
    "Kung Pao Chicken": [
      "Classic Kung Pao Chicken",
      "Kung Pao Chicken with Peanuts",
      "Kung Pao Chicken with Vegetables",
      "Spicy Kung Pao Chicken",
    ],
    "Mapo Tofu": [
      "Classic Mapo Tofu",
      "Vegetarian Mapo Tofu",
      "Mapo Tofu with Beef",
      "Mild Mapo Tofu",
    ],
    "Chow Mein": [
      "Chicken Chow Mein",
      "Beef Chow Mein",
      "Vegetable Chow Mein",
      "Shrimp Chow Mein",
      "Pork Chow Mein",
    ],
    "Spring Rolls": [
      "Vegetable Spring Rolls",
      "Pork Spring Rolls",
      "Shrimp Spring Rolls",
      "Egg Spring Rolls",
      "Sweet Spring Rolls",
    ],
    "Sweet And Sour Pork": [
      "Classic Sweet and Sour Pork",
      "Sweet and Sour Pork with Pineapple",
      "Sweet and Sour Pork with Bell Peppers",
      "Crispy Sweet and Sour Pork",
    ],
    Dumplings: [
      "Pork Dumplings",
      "Vegetable Dumplings",
      "Shrimp Dumplings",
      "Chicken Dumplings",
      "Soup Dumplings (Xiao Long Bao)",
    ],
    "Egg Fried Rice": [
      "Classic Egg Fried Rice",
      "Vegetable Egg Fried Rice",
      "Chicken Egg Fried Rice",
      "Shrimp Egg Fried Rice",
      "Kimchi Egg Fried Rice",
    ],
  },
  French: {
    "Coq au Vin": [
      "Classic Coq au Vin",
      "Coq au Vin with White Wine",
      "Coq au Vin with Mushrooms",
      "Slow Cooker Coq au Vin",
    ],
    Bouilabaisse: [
      "Classic Bouillabaisse",
      "Mediterranean Bouillabaisse",
      "Bouillabaisse with Saffron",
      "Vegetarian Bouillabaisse",
    ],
    Ratatouille: [
      "Traditional Ratatouille",
      "Ratatouille Tian (Baked Ratatouille)",
      "Ratatouille with Quinoa",
      "Ratatouille Pasta",
    ],
    "Quiche Lorraine": [
      "Classic Quiche Lorraine",
      "Quiche Lorraine with Ham",
      "Crustless Quiche Lorraine",
      "Quiche Lorraine with Leeks",
    ],
    "Beuf Bourguignon": [
      "Classic Quiche Lorraine",
      "Quiche Lorraine with Ham",
      "Crustless Quiche Lorraine",
      "Quiche Lorraine with Leeks",
    ],
    "Foi Gras": [
      "Classic Foie Gras",
      "Foie Gras with Fig Jam",
      "Pan-Seared Foie Gras",
      "Foie Gras Terrine",
    ],
    Croissants: [
      "Classic Butter Croissants",
      "Almond Croissants",
      "Chocolate Croissants",
      "Ham and Cheese Croissants",
    ],
    "Tarte Tatin": [
      "Classic Apple Tarte Tatin",
      "Pear Tarte Tatin",
      "Tomato Tarte Tatin",
      "Peach Tarte Tatin",
    ],
    "Nicoise Salad": [
      "Classic Niçoise Salad",
      "Niçoise Salad with Fresh Tuna",
      "Niçoise Salad with Grilled Vegetables",
      "Niçoise Salad with Seared Salmon",
    ],
    "Crème Brûlée": [
      "Classic Crème Brûlée",
      "Vanilla Bean Crème Brûlée",
      "Chocolate Crème Brûlée",
      "Lavender Crème Brûlée",
    ],
  },
  Korean: {
    Kimchi: [
      "Baechu Kimchi (Napa Cabbage Kimchi)",
      "Kkakdugi (Cubed Radish Kimchi)",
      "Oi Sobagi (Cucumber Kimchi)",
      "Baek Kimchi (White Kimchi)",
    ],
    Bulgogi: [
      "Classic Beef Bulgogi",
      "Chicken Bulgogi",
      "Pork Bulgogi",
      "Bulgogi Stew",
    ],
    Bibimbap: [
      "Classic Bibimbap",
      "Dolsot Bibimbap (Hot Stone Pot Bibimbap)",
      "Seafood Bibimbap",
      "Vegetarian Bibimbap",
    ],
    Japchae: [
      "Classic Japchae (Stir-Fried Glass Noodles)",
      "Japchae with Beef",
      "Japchae with Mixed Vegetables",
      "Spicy Japchae",
    ],
    Samgyeopsal: [
      "Classic Samgyeopsal (Grilled Pork Belly)",
      "Spicy Samgyeopsal",
      "Samgyeopsal with Kimchi",
      "Samgyeopsal Lettuce Wraps",
    ],
    Tteokbokki: [
      "Classic Tteokbokki (Spicy Rice Cakes)",
      "Cheese Tteokbokki",
      "Rabokki (Tteokbokki with Ramen Noodles)",
      "Seafood Tteokbokki",
    ],
    Kimbap: [
      "Classic Kimbap",
      "Tuna Kimbap",
      "Cheese Kimbap",
      "Vegetarian Kimbap",
    ],
    HaemulPajeon: [
      "Classic Haemul Pajeon (Seafood Pancake)",
      "Kimchi Haemul Pajeon",
      "Green Onion Pajeon",
      "Squid Pajeon",
    ],
    SundubuJigae: [
      "Classic Sundubu Jigae (Soft Tofu Stew)",
      "Seafood Sundubu Jigae",
      "Kimchi Sundubu Jigae",
      "Beef Sundubu Jigae",
    ],
    Galbi: [
      "Classic Galbi (Marinated Grilled Ribs)",
      "Galbi Jjim (Braised Short Ribs)",
      "Spicy Pork Galbi",
      "Galbi Tang (Short Rib Soup)",
    ],
  },
  Caribbean: {
    "Jerk Chicken": [
      "Classic Jerk Chicken",
      "Grilled Jerk Chicken",
      "Jerk Chicken with Pineapple Salsa",
      "Jerk Chicken Skewers",
    ],
    Roti: ["Chicken Roti", "Beef Roti", "Vegetable Roti", "Curry Goat Roti"],
    "Curry Goat": [
      "Classic Curry Goat",
      "Spicy Curry Goat",
      "Curry Goat with Potatoes",
      "Slow-Cooked Curry Goat",
    ],
    "Cou-Cou and Flying Fish": [
      "Traditional Cou-Cou and Flying Fish",
      "Cou-Cou with Okra and Flying Fish",
      "Spicy Flying Fish with Cou-Cou",
    ],
    Pepperpot: [
      "Guyanese Pepperpot",
      "Spicy Pepperpot",
      "Pepperpot with Beef",
      "Pepperpot with Dumplings",
    ],
    "Conch Fritters": [
      "Classic Conch Fritters",
      "Spicy Conch Fritters",
      "Conch Fritters with Dipping Sauce",
      "Herb-Infused Conch Fritters",
    ],
    Callaloo: [
      "Classic Callaloo",
      "Callaloo with Crab",
      "Callaloo with Coconut Milk",
      "Spicy Callaloo",
    ],
    "Rice and Peas": [
      "Classic Rice and Peas",
      "Rice and Peas with Coconut",
      "Rice and Peas with Beans",
      "Spicy Rice and Peas",
    ],
    "Ackee and Saltfish": [
      "Classic Ackee and Saltfish",
      "Ackee and Saltfish with Bell Peppers",
      "Spicy Ackee and Saltfish",
      "Ackee and Saltfish with Dumplings",
    ],
    "Johhny Cakes": [
      "Classic Johnny Cakes",
      "Sweet Johnny Cakes",
      "Johnny Cakes with Cornmeal",
      "Fried Johnny Cakes",
    ],
  },
  Persian: {
    "Ghormeh Sabzi": [
      "Classic Ghormeh Sabzi",
      "Ghormeh Sabzi with Red Kidney Beans",
      "Ghormeh Sabzi with Lamb",
      "Vegetarian Ghormeh Sabzi",
    ],
    Fesenjan: [
      "Classic Fesenjan with Chicken",
      "Fesenjan with Duck",
      "Fesenjan with Meatballs",
      "Vegetarian Fesenjan with Pumpkin",
    ],
    Tahdig: [
      "Classic Crispy Tahdig",
      "Tahdig with Saffron",
      "Tahdig with Potato Slices",
      "Tahdig with Lavash Bread",
    ],
    "Zereshk Polo": [
      "Classic Zereshk Polo",
      "Zereshk Polo with Chicken",
      "Zereshk Polo with Saffron",
      "Zereshk Polo with Almonds and Pistachios",
    ],
    "Baghali Polo": [
      "Classic Baghali Polo with Lamb Shank",
      "Baghali Polo with Chicken",
      "Baghali Polo with Dill and Broad Beans",
      "Baghali Polo with Saffron",
    ],
    Kebab: [
      "Koobideh Kebab (Ground Meat Kebab)",
      "Joojeh Kebab (Chicken Kebab)",
      "Barg Kebab (Lamb Kebab)",
      "Vegetable Kebab",
    ],
    "Ash Reshteh": [
      "Classic Ash Reshteh",
      "Ash Reshteh with Kashk (Whey)",
      "Ash Reshteh with Spinach",
      "Ash Reshteh with Lentils and Chickpeas",
    ],
    Tahchin: [
      "Classic Tahchin (Saffron Rice Cake)",
      "Tahchin with Chicken",
      "Tahchin with Eggplant",
      "Vegetarian Tahchin with Spinach and Barberries",
    ],
    "Khoresh Bademjan": [
      "Classic Khoresh Bademjan (Eggplant Stew)",
      "Khoresh Bademjan with Lamb",
      "Khoresh Bademjan with Beef",
      "Vegetarian Khoresh Bademjan",
    ],
    Dizi: [
      "Classic Dizi (Abgoosht)",
      "Dizi with Lamb",
      "Dizi with Chickpeas and Beans",
      "Dizi with Beef",
    ],
  },
  Jamaican: {
    "Jerk Chicken": [
      "Classic Jerk Chicken",
      "Grilled Jerk Chicken",
      "Jerk Chicken Skewers",
      "Jerk Chicken with Pineapple Salsa",
    ],
    "Ackee and Saltfish": [
      "Classic Ackee and Saltfish",
      "Ackee and Saltfish with Bell Peppers",
      "Spicy Ackee and Saltfish",
      "Ackee and Saltfish with Dumplings",
    ],
    "Curry Goat": [
      "Classic Curry Goat",
      "Spicy Curry Goat",
      "Curry Goat with Potatoes",
      "Curry Goat with Coconut Milk",
    ],
    "Jamaican Patty": [
      "Beef Patty",
      "Chicken Patty",
      "Vegetable Patty",
      "Cheese Patty",
    ],
    Oxtail: [
      "Braised Oxtail Stew",
      "Oxtail with Butter Beans",
      "Spicy Oxtail",
      "Oxtail with Broad Beans",
    ],
    "Rice and Peas": [
      "Classic Rice and Peas",
      "Rice and Peas with Coconut",
      "Rice and Peas with Kidney Beans",
      "Rice and Peas with Scotch Bonnet Pepper",
    ],
    Callaloo: [
      "Steamed Callaloo",
      "Callaloo with Saltfish",
      "Callaloo with Coconut Milk",
      "Callaloo with Garlic and Tomatoes",
    ],
    "Escovitch Fish": [
      "Classic Escovitch Fish",
      "Spicy Escovitch Fish",
      "Escovitch Fish with Pickled Vegetables",
      "Escovitch Fish with Carrots and Onions",
    ],
    Bammy: [
      "Fried Bammy",
      "Steamed Bammy",
      "Bammy with Honey",
      "Bammy with Cheese",
    ],
    Festival: [
      "Classic Festival",
      "Sweet Festival",
      "Festival with Cornmeal",
      "Festival with Coconut Milk",
    ],
  },
  Indian: {
    "Butter Chicken": [
      "Classic Butter Chicken",
      "Butter Chicken with Boneless Chicken",
      "Spicy Butter Chicken",
      "Butter Chicken with Almonds",
    ],
    Biryani: [
      "Chicken Biryani",
      "Lamb Biryani",
      "Vegetable Biryani",
      "Hyderabadi Biryani",
      "Fish Biryani",
    ],
    Dosa: [
      "Plain Dosa",
      "Masala Dosa",
      "Rava Dosa",
      "Onion Dosa",
      "Cheese Dosa",
    ],
    "Palak Paneer": [
      "Classic Palak Paneer",
      "Palak Paneer with Cream",
      "Palak Paneer with Tofu (Vegan)",
      "Palak Paneer with Cashews",
    ],
    "Chole (Chickpea Curry)": [
      "Classic Chole",
      "Punjabi Chole",
      "Chole with Coconut Milk",
      "Spicy Chole Masala",
    ],
    "Rogan Josh": [
      "Classic Rogan Josh",
      "Rogan Josh with Lamb",
      "Rogan Josh with Beef",
      "Kashmiri Rogan Josh",
    ],
    "Masala Chai": [
      "Classic Masala Chai",
      "Masala Chai with Ginger",
      "Masala Chai with Cardamom",
      "Masala Chai with Almond Milk (Vegan)",
    ],
    Samosas: [
      "Potato Samosas",
      "Meat Samosas",
      "Vegetable Samosas",
      "Sweet Samosas with Coconut Filling",
    ],
    Naan: [
      "Plain Naan",
      "Garlic Naan",
      "Butter Naan",
      "Cheese Naan",
      "Peshwari Naan (Sweet Naan with Nuts and Raisins)",
    ],
    Rasgulla: [
      "Classic Rasgulla",
      "Rasgulla in Rose Syrup",
      "Kesar Rasgulla (Saffron Rasgulla)",
      "Rasgulla with Pistachio",
    ],
  },
  Spanish: {
    Paella: [
      "Seafood Paella",
      "Vegetarian Paella",
      "Paella Valenciana (Meat Paella)",
      "Mixed Paella (Seafood and Meat)",
      "Paella Negra (Black Paella with Squid Ink)",
    ],
    Gazpacho: [
      "Classic Gazpacho",
      "Green Gazpacho",
      "Gazpacho with Watermelon",
      "Gazpacho Andaluz",
      "White Gazpacho (Ajo Blanco)",
    ],
    "Tortilla Española": [
      "Classic Tortilla Española (Spanish Omelette)",
      "Tortilla with Onions",
      "Tortilla with Chorizo",
      "Tortilla with Peppers",
      "Mini Tortilla Tapas",
    ],
    Pisto: [
      "Classic Pisto Manchego",
      "Pisto with Egg",
      "Pisto with Chorizo",
      "Pisto with Zucchini",
      "Pisto as a Tapas with Bread",
    ],
    Croquetas: [
      "Ham Croquetas",
      "Chicken Croquetas",
      "Cheese Croquetas",
      "Mushroom Croquetas",
      "Spinach and Pine Nut Croquetas",
    ],
    "Gambas al ajillo": [
      "Classic Gambas al ajillo",
      "Gambas al ajillo with Chili",
      "Gambas al ajillo with White Wine",
      "Gambas al ajillo with Parsley",
    ],
    "Patatas Bravas": [
      "Classic Patatas Bravas",
      "Patatas Bravas with Aioli",
      "Spicy Patatas Bravas",
      "Patatas Bravas with Cheese",
    ],
    Churros: [
      "Classic Churros",
      "Chocolate-filled Churros",
      "Churros with Caramel Sauce",
      "Churros with Cinnamon Sugar",
    ],
    "Fabada Asturiana": [
      "Classic Fabada Asturiana",
      "Fabada with Chorizo",
      "Fabada with Morcilla (Blood Sausage)",
      "Vegetarian Fabada",
    ],
    "Jamón ibérico": [
      "Jamón ibérico de Bellota",
      "Jamón ibérico Served with Melon",
      "Jamón ibérico on Toast",
      "Jamón ibérico with Almonds",
    ],
  },
};

export default function FoodButtons() {
  const [buttonsState, setButtonsState] = useState(cultures);
  const [culturePicked, setCulturePicked] = useState("");
  const [stage, setStage] = useState(0);

  const handleCultureClick = (e) => {
    const selectedButton = e.target.value;
    //const countries = Object.keys(foods);
    if (foods[selectedButton]) {
      setStage(1);
      setButtonsState(Object.keys(foods[selectedButton]));
      setCulturePicked(selectedButton);
    } else {
      setStage(2);
      const food = foods[culturePicked][selectedButton];
      setButtonsState(food);
    }
  };
  const handleGoBack = (e) => {
    if (stage === 1) {
      setButtonsState(cultures);
      setStage(0);
    } else {
      setButtonsState(Object.keys(foods[culturePicked]));
      setStage(1);
    }
  };
  return (
    <div className="food-container">
      <h2>Menu</h2>
      <div className="food-buttons">
        {buttonsState.map((culture, i) => (
          <button onClick={handleCultureClick} value={culture} key={i}>
            {culture}
          </button>
        ))}
      </div>
      {buttonsState[0] === "Mexican" ? null : (
        <button className="back-button" onClick={handleGoBack}>
          go back
        </button>
      )}
      <div className="recipe-information">
        <div className="text-area">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quis
          impedit nisi perspiciatis quos eos consequatur voluptate, similique
          aspernatur. Veniam esse autem neque magni possimus totam deserunt
          asperiores quis maxime! Odio eum unde nostrum quae libero excepturi
          aliquid non, quibusdam eius commodi iusto qui saepe iste? Illum quos
          itaque sapiente mollitia maxime, animi accusamus earum? Sapiente,
          aperiam, inventore commodi fugit eligendi officia esse sunt ut non
          rerum libero repudiandae culpa natus ipsa blanditiis aut beatae at
          sint quae, cumque dicta. Rem provident optio corporis! Commodi,
          suscipit! Dolores sint enim quod fugiat sapiente quia officiis facilis
          sequi excepturi, voluptatum voluptate pariatur ducimus ad dolorem
          ratione in optio molestiae tempore quo. Optio ut accusantium beatae,
          laudantium amet hic itaque temporibus asperiores delectus tenetur
          quasi explicabo voluptas. Ut, pariatur eos doloribus distinctio
          aspernatur temporibus nulla veniam! Voluptatum quae hic porro, animi
          neque suscipit architecto aut in vero, temporibus necessitatibus natus
          atque numquam sed quam libero, consequatur deserunt iste sapiente. A,
          fuga obcaecati? Quasi iure quidem ipsa, eaque soluta eius nesciunt
          quibusdam dicta nemo exercitationem molestias cupiditate omnis
          corrupti temporibus doloribus quis excepturi odio architecto
          dignissimos sapiente facilis commodi libero perspiciatis eligendi.
          Consequuntur ratione sapiente placeat, aspernatur, expedita labore ad
          nostrum odio modi vel velit nam nobis eum rerum obcaecati, sequi
          tempora voluptatem laudantium deleniti id aliquid dignissimos cum?
          Minima, reiciendis inventore debitis consequatur maiores fugiat eos
          corporis quam ullam necessitatibus officiis culpa magnam nesciunt eum
          animi eveniet quidem repudiandae nemo molestiae? Qui pariatur fugit
          blanditiis assumenda dicta nobis. Asperiores natus ipsa similique
          exercitationem, perferendis explicabo in facere cumque! Architecto
          deleniti neque sit aliquam illum enim totam molestias nulla nobis
          veniam officia minima esse hic quo similique eum cum illo, velit
          optio. Molestias deleniti labore nulla tempora quisquam maiores alias!
          Laborum ad, itaque esse vel, quia fugit accusamus molestias enim
          facere quae alias architecto. Rem dolor minima obcaecati possimus
          explicabo facilis neque libero laboriosam modi veniam debitis vel
          blanditiis, sequi quam nemo ducimus. Ratione reprehenderit consequatur
          error quia in, ducimus distinctio eaque vero aut animi voluptatibus
          tempora! Nesciunt aspernatur temporibus rem sequi recusandae ab totam,
          magni deleniti quasi culpa, sunt odit reiciendis ipsam provident!
          Expedita enim temporibus quibusdam ex necessitatibus nesciunt
          consequuntur eius commodi, perferendis, neque iure ullam illum
          aspernatur aut doloremque ducimus iusto tenetur deserunt quis quasi
          incidunt sequi sapiente! Molestiae, tempore. Mollitia autem non ex
          illo dicta. Culpa illum natus repellendus quisquam facilis tenetur
          eveniet minus temporibus quas? A voluptas minima perspiciatis unde
          qui, debitis fuga eveniet earum quae culpa eum magnam quis quas
          suscipit veniam nostrum laborum adipisci. Eligendi maxime delectus
          exercitationem, deleniti ab nam voluptatum reprehenderit accusantium
          rerum nulla beatae molestiae veniam provident dolores perspiciatis
          quis sint nostrum voluptas dignissimos aspernatur culpa eaque tempora
          odit consequuntur. Neque itaque vitae amet rem exercitationem ipsa ex
          perferendis corrupti ab delectus dolor eius illum unde animi, repellat
          iure eaque nostrum laudantium inventore placeat minima quasi
          voluptatum recusandae assumenda? Nisi culpa tenetur temporibus
          doloribus iste ullam, iusto facere! Facere recusandae dicta culpa
          laborum consequuntur fugit repudiandae officia placeat earum
          architecto, blanditiis nemo saepe. Ullam.
        </div>
      </div>
    </div>
  );
}
