const testObj = {
    a : 2,
    b: 'Str',
    c : {
        d : 1,
        e : function () {}
    }
}


const test = (obj,padding) => {

    for (const [key,value] of Object.entries(obj))
    {
        

        if (value instanceof Object && typeof value !== 'function')
        {
            console.log('Key : ' + key);
            test(value,padding+'    ')
        }
        else
        {
            console.log(padding + 'Key: ' + key + ' : ' + value);
        }

        
    }
    
}

test(testObj,'');
