class Meal{
    constructor(id, title, imageUri, price, description, categories, readyTime){
        this.id = id;
        this.title = title;
        this.imageUri = imageUri;
        this.price = price;
        this.description = description;
        this.categories = categories;

        this.readyTime = readyTime;
    }
}

export default Meal;