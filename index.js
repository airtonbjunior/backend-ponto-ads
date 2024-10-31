let express = require('express');
let app = express();

const port = 3000;


//app.METHOD(path, callback [, callback ...])
app.get("/teste", (req, res) => {
    res.send("Resposta da rota /teste");
});


app.listen(port, () => {
    console.log(`servidor escutando a porta ${port}`);
});