/**
 * Global Abatement
 */

var GAMEMAIN = GAMEMAIN || {};

GAMEMAIN.namespace = function (aNamespace)
{
    var parts = aNamespace.split('.'),
        parent = GAMEMAIN,
        i;
    if (parts[0] === "GAMEMAIN") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }

    return parent;
};