const { default: Category } = require('../models/Category');

const CATEGORIES = [
    new Category(
        'c1',
        'Snacks',
        require('./images/junk-food.jpg'),
        'Nice and cool snacks both local and international'
    ),
    new Category(
        'c2',
        'Beverages',
        require('./images/Beverage.jpg'),
        'We have a variety of soft drinks, fruit juices, hard drinks, etc. Anyway you like it.'
    ),
    new Category(
        'c3',
        'Breakfast',
        require('./images/breakfasts.jpg'),
        "Any meal made with the famous haseolus vulgaris. You're search has to end here cause akara is here."
    ),
    new Category(
        'c4',
        'Full Meals',
        require('./images/Meals.jpg'),
        "Meals that will leave you full las las"
    )

]

export default CATEGORIES;