var item = {
    mainCreate: function(itemid) {
        this.main[itemid] = itemid;
    },
    fluidCreate: function(fluidCreateid) {
        this.fluid[fluidCreateid] = fluidCreateid;
    },
    fluid: {},
    main: {},
};

var recipe = {
    smelting: function(input, output) {
        console.log("Smelting", input, "into", output);
    },
    melting: function(input, output) {
        console.log("Melting", input, "into", output);
    },
    electrosis: function(input, output) {
        console.log("Electrosis", input, "into", output);
    },
    vaporize: function(input, output) {
        console.log("Vaporizing", input, "into", output);
    },
}

// Creating the items
item.mainCreate('icrium');
item.mainCreate('bauxanium');
item.mainCreate('idivium');
item.mainCreate('virium');
item.mainCreate('gregite');
item.mainCreate('aluminite');
item.mainCreate('pilium');
item.mainCreate('idivite');
item.mainCreate('bauxenite');
item.mainCreate('metal_scrap');
item.mainCreate('icrite');
item.mainCreate('rust');

// Creating the fluids
item.fluidCreate('virite');
item.fluidCreate('bauxenite_fluidCreate');
item.fluidCreate('liquidovite');

// Now, the smelting recipes
recipe.melting(item.main['idivite'], item.fluid['liquidovite']);
recipe.melting(item.main['idivite'], item.fluid['liquidovite']);

recipe.smelting(item.main['metal_scrap'], item.main['icrium']);
recipe.smelting(item.fluid['liquidovite'], item.main['idivium']);