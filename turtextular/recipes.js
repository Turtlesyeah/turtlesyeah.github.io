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
    smelting: function(input, output, chancer) {
        var chance2 = 100 - chancer;
        console.log("Smelting", input, "into", output);
    },
    melting: function(input, output) {
        console.log("Melting", input, "into", output);
    },
    electrosis: function(input, output) {
        
        console.log("Electrosis", input, "into", output);
    },
    vaporize: function(input, output, chance) {
         var chance2 = 100 - chance;
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
item.mainCreate('quartzite');

// Creating the fluids
item.fluidCreate('virite');
item.fluidCreate('bauxenite_fluid');
item.fluidCreate('liquidovite');
item.fluidCreate('fuel');

// Now, the smelting recipes
recipe.melting(item.main['idivite'], item.fluid['liquidovite']);
recipe.melting(item.main['bauxenite'], item.fluid['bauxanite_fluid']);

recipe.smelting(item.main['metal_scrap'], item.main['icrium'], 100);
recipe.smelting(item.fluid['liquidovite'], [item.main['idivium'], item.main['metal_scrap']], 90);
recipe.smelting(item.fluid['bauxanite_fluid'], [item.main['bauxanium'], item.main['metal_scrap']], 95);
recipe.electrosis(item.fluid['bauxanite_fluid'], [item.fluid["virite"], item.main['aluminite']]);
recipe.electrosis(item.fluid['liquidovite'], [item.fluid["fuel"], item.main['quartzite']]);
recipe.smelting(item.fluid['virite'], [item.main['virium'], item.main['gregite']], 80);
recipe.vaporize(item.fluid['virite'], [item.main['pilium'], item.main['rust']], 1);


