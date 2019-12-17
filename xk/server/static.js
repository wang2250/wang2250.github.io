const static = require('koa-static');
module.exports = function(router,options){
    options = options||{};
    options.img = options.img||20;
    options.css = options.css||30;
    options.js = options.js||1;
    options.html = options.html||20;
    options.other = options.other||7;

    router.all(/(\.jpg|\.png|\.jpeg)$/,static('./',{
        
    }));
    router.all(/(\.css)$/,static('./',{
        maxAge:0
    }));
    router.all(/(\.js)$/,static('./',{
        
    }));
    router.all(/(\.html)$/,static('./',{
        
    }));
    router.all('*',static('./static/',{
        
    }));
}