class User{
    constructor(id, name, email, phoneNo, bonusPercentage,  address, cityState, favoriteMeals, orders ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
        this.bonusPercentage = bonusPercentage,
        this.address = address;
        this.cityState = cityState;
        this.favoriteMeals = favoriteMeals;
        this.orders = orders;
    }
}

export default User;