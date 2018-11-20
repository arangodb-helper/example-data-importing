let g = require("@arangodb/smart-graph");
let G = g._create("G_smart",[g._relation("citations_smart",
                                   ["patents_smart"],["patents_smart"])],
                  [], {numberOfShards:3, smartGraphAttribute:"COUNTRY"});

g = require("@arangodb/general-graph");
G = g._create("G_naive",[g._relation("citations_naive",
                               ["patents_naive"],["patents_naive"])],
              [], {numberOfShards:3, smartGraphAttribute:"COUNTRY"});

