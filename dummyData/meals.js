const { default: Meal } = require("../models/Meal");

const MEALS = [
    new Meal(
        'm1', 
        'Spaghetti and Turkey',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8YbEiYxnJBOvfzqr5-cvkAlgg9NCQIOn3nb13wR9dBxUS1gYK7tpF7OGgSyb8-xQg6xVpZkaCLeAdhoINxyQDLVwSAaoBjAJbOHrHgj6ypTQuxAEPwAfnTb3tGQxQOkAjUaZ0pR3iw9p-55E3XNWmqXzwHO8sB8SB3ZiUd2Pz6r0BU4njuBWmaD3l4LYnBOzyjqhj1lzisdL-cRzdicQ6e0bIDVi_EouH2m5ntQy312zHhcxwy9iTQIBwcbXPYhcRX-N-PEHgah6aMQCgYfOEY0DkMSB4FpbNc-Hv9poM9b6SBjZLMOrxWYf0jU054n0TUwFyQwPXtNW_BPDghXGoDn-9Jyh9jCLir1wTxFlY825EnNDfGVuBwz_E4eO0oVes9PFCaSSUwCEq5a0BHrC7gu2nykyZDOSanUcGjpekpQXBxNcrQ2HBygpPaPyd271Wrb11Ng&usqp=CAU',
        1200,
        "Nice spagetti with turkey. Spagetti prepared personally by oshioke so you know it's great. Turkey by Ifeoluwa so you know it's divine",
        ['full meals'],
        '15 minutes 55 seconds'
    ),
    new Meal(
        'm2', 
        'Jollof rice and Beef',
        'https://elleyajoku.com/wp-content/uploads/2017/10/jollof-rice-cooking-500x490.jpg',
        1200,
        "Delicious jollof rice (naija) with Fish. Jollof prepared personally by oshioke so you know it's great. Beef by Ifeoluwa so you know it's divine",
        ['full meals'],
        '35 minutes 55 seconds'
    ),
    new Meal(
        'm3', 
        'Yam porridge with Fish',
        'https://www.africanahome.ae/store/wp-content/uploads/2017/12/2-2000x1324.jpg',
        1200,
        "Yam porridge mad die. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['full meals'],
        '15 minutes 55 seconds'
    ),
    new Meal(
        'm4', 
        'Chicken and Chips',
        "https://i.pinimg.com/736x/75/14/d2/7514d211c99873ebdff41a1d9dd8f8ed.jpg",
        1200,
        "Chicken and chips. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Snacks', 'Breakfast'],
        '5 minutes 25 seconds'
    ),
    new Meal(
        'm5', 
        'Beef Shawarma',
        "https://media-cdn.tripadvisor.com/media/photo-s/0e/04/16/1c/1754-beef-shawarma.jpg",
        1500,
        "Beef Shawarma. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Snacks'],
        '6 minutes 5 seconds'
    ),
    new Meal(
        'm6', 
        'Chief Burger',
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5ZUuOdRiD-rF6C6gRvhLlvr0ZfLl51nEdNrrYJ4lUJ-FRez2T&usqp=CAU",
        1200,
        "Burger. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Snacks'],
        '15 minutes 55 seconds'
    ),
    new Meal(
        'm7', 
        'Coke',
        'https://zdnet4.cbsistatic.com/hub/i/2020/06/09/2eacd230-d144-4224-9e64-aa012e900877/coca-cola-coke-coca-cola.jpg',
        150,
        "Coke. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Beverages'],
        '1 seconds'
    ),
    new Meal(
        'm8', 
        'Chi Exotic',
        'https://i1.wp.com/christystores.com/wp-content/uploads/2018/05/cr-chi-exotic-pineapple-juice-1l-1.jpg?fit=1200%2C1200&ssl=1',
        1000,
        "Chi-exotic. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Beverages'],
        '15 minutes 55 seconds'
    ),
    new Meal(
        'm9', 
        '5 Alive Berry Blast Fruit Drink',
        "https://kadunasolutions.com/wp-content/uploads/2020/03/5-Alive-Berry-Blast-Fruit-Drink-78cl-x-12.jpg",
        800,
        "Berry blast. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Beverages'],
        '15 minutes 55 seconds'
    ),
    new Meal(
        'm10', 
        'Akara balls and pap.',
        "https://travel.jumia.com/blog/ng/wp-content/uploads/2016/06/Akara-bean-cake.jpg",
        800,
        "Akara's balls. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Breakfast'],
        '10 minutes 55 seconds'
    ),
    new Meal(
        'm11', 
        'Fried Plantain Frittata',
        "https://guardian.ng/wp-content/uploads/2017/11/Fried-Plantain-Frittata-2-e1510306800913.jpg",
        1000,
        "Fried Plantain. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Breakfast'],
        '12 minutes 55 seconds'
    ),
    new Meal(
        'm12', 
        'Salad Sandwich and Coffee',
        "https://3.bp.blogspot.com/-9WmC4LbMs8U/VemdJRgN0-I/AAAAAAAAESo/ZwpBFxgXiEk/s1600/Nigerian%2Bsandwich%2Bsalad%2Bsandwich%2B2.jpg",
        1000,
        "Sandwich. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Breakfast'],
        '6 minutes 55 seconds'
    ),
    new Meal(
        'm13', 
        'Cupcakes',
        "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        500,
        "Cupcakes. Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Snacks'],
        '1 minutes 55 seconds'
    ),
    new Meal(
        'm14', 
        'Noodles with Boiled Egg and Beef',
        "https://lh3.googleusercontent.com/proxy/0gTd8aTE2PUlBAW3vljwf6rgxukvLfh0qFpWmLxJLqvlaEu0uD5qfwWKNDW_XR3TpPuBG8z7augBPHeRVOnfnAUHV2ynKzJEMWKeo9pGdlcv0S8dE5khRL6FJ8PN",
        950,
        ". Random stuff here to fill in the space cause the alternative is to fill the space with my tears cause I'm personally preparing this dummy data and I hate it",
        ['Breakfast', 'full meals'],
        '1 minutes 55 seconds'
    ),
    
]

export default MEALS;