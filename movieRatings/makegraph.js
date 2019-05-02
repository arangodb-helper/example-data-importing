let g = require("@arangodb/general-graph");
let G = g._create("G",[g._relation("ratings", ["users"],["movies"])], [],
                  {numberOfShards:3});
