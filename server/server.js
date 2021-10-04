const Koa = require('koa');
const path = require('path');
const app = new Koa();


app.use(require('koa-static')(path.resolve(__dirname, '../'), {}));

app.listen(3000);

console.log('Now your server is running at port 3000');

