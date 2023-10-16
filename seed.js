const {Restaurant} = require("./models/index")
const {Menu} = require("./models/index")
const {Item} = require("./models/index")
const { seedRestaurant } = require("./seedData");
const { seedMenu } = require("./seedData");
const { seedItem } = require("./seedData");
const db = require("./db/connection")

const syncSeed = async () => {
    await db.sync({force: true});
    await Restaurant.bulkCreate(seedRestaurant)
    // BONUS: Update with Item and Menu bulkCreate

    await Menu.bulkCreate(seedMenu);
    await Item.bulkCreate(seedItem);


    // seedRestaurant[0].setMenus([seedMenu[0], seedMenu[1]]);
    // seedMenu[0].addItems([seedItem[0], seedItem[1]]);
    // seedItem[0].addMenus([seedMenu[0], seedMenu[1]])
    let restaurant1 = await Restaurant.findByPk(1);
    let menu1 = await Menu.findByPk(1);
    let menu2 = await Menu.findByPk(2);
    let item1 = await Item.findByPk(1);
    let item2 = await Item.findByPk(2);

    await restaurant1.addMenus([menu1, menu2])
    await menu1.addItems([item1, item2]);
    await item1.addMenus([menu1])
}

syncSeed()