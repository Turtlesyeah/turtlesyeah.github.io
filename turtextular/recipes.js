var item = {
    mainCreate: function(itemid) {
        
    },
    fluidCreate: function(fluidCreateid) {
        
    },
    fluid: [],
    main: [],

    


};
var recipe = {
    smelting: function(input, output) {

    },
    melting: function(input, output) {

    },
    electrosis: function(input, output) {

    },
    vaporize: function(input, output) {

    },
}

//creating the items
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
//creating the fluids
item.fluidCreate('virite');
item.fluidCreate('bauxenite_fluidCreate');
item.fluidCreate('liquidovite');


//now, the smelting recipes
recipe.melting(item.main['idovite'], item.fluid['liquidovite']);
recipe.melting(item.main['idovite'], item.fluid['liquidovite'], );

recipe.smelting(item.main['metal_scrap'], item.main['icrium']);
recipe.smelting(item.fluid["liquidovite"], item.main['idivium']);
