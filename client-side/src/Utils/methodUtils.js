

export const sort = () => {
    let mapNumber = new Map();
    mapNumber.set('Zero','0');
    mapNumber.set('Un','1');
    mapNumber.set('Deux','2');
    mapNumber.set('Trois','3');
    mapNumber.set('Quatre','4');
    mapNumber.set('Cinq','5');
    mapNumber.set('Six','6');
    mapNumber.set('Sept','7');
    mapNumber.set('Huit','8');
    mapNumber.set('Neuf','9');
    return mapNumber ;
}

export const numberTab = ['Zero','Un','Deux','Trois','Quatre','Cinq','Six','Sept','Huit','Neuf'];


export const wait = (s) => new Promise((rs) => setTimeout(rs, s));


