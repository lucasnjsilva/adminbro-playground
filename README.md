#### AdminBro
------------

**Instalação:**

1.  Instalar as dependências:
```
yarn add admin-bro admin-bro-expressjs admin-bro-mongoose express express-formidable mongoose
```
```
yarn add -D nodemon
```
2. No package.json, criar uma nova script
```
"scripts": {
		"start": "nodemon"
}
```
3. Criar uma pasta src e um arquivo server.js. No server.js importe o express, mongoose, o admin-bro, crie uma arrow function de nome "run", e já exporte seu módulo. Dentro de "run", adicione:
```
const express = require('express');
const { default: AdminBro } = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');
/*
*Definindo as configurações de opções e rotas para o adminBro.
*/
const app = express();
const port = 3333;
const run = async () => {
		const admin = new AdminBro(options);
		const router = buildAdminRouter(admin);

		app.use(admin.options.rootPath, router);
		app.listen(port, () => {
  		console.log(`AdminBro disponível em http://localhost:${port}/admin`);
		});
};
```
4. Fora de src, crie um arquivo chamado index.js, importe e apenas chame a função run.

5. Dentro de src, crie um arquivo chamado admin.router.js. Vamos definir as configurações para rota.
```
const express = require('express');
const { default: AdminBro } = require('admin-bro');
const { buildRouter } = require('admin-bro-expressjs');
/**
 *
 *@param {AdminBro} admin
 *@returns {express.Router} router
 */
const buildAdminRouter = (admin) => {
		const router = buildRouter(admin);
		return router;
};
module.exports = buildAdminRouter;
```

6. Dentro de src, crie o arquivo admin.options.js e adicione:
```
const { default: AdminBro } = require('admin-bro');
/**
 *@type {AdminBro.AdminBroOptions}
 */
const options = {
		resources: [],
};
module.exports = options;
```

Com isso, caso você inicie com *yarn start*, já será possível ver o adminBro rodando, mas claro, sem funcionalidades pois não configuramos nenhum banco de dados. Vamos fazer isso agora.

1. Vamos criar uma pasta chamada companies dentro da pasta src. Dentro da pasta companies, crie um arquivo chamado company.entity.js e crie o schema.
```
const mongoose = require('mongoose');
const CompanySchema = new mongoose.Schema({
		companyName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
});
const Company = mongoose.model('Company', CompanySchema);
module.exports = { CompanySchema, Company };
```

2. Vá no arquivo admin.options.js, vamos configurar o mongoose e passar o model (entidade company.entity.js). O código ficará assim:
```
const { default: AdminBro } = require('admin-bro');
const { Company } = require('./companies/company.entity');
AdminBro.registerAdapter(AdminBroMongoose);
/**
 *@type {AdminBro.AdminBroOptions}
 */
const options = {
		resources: [Company],
};
module.exports = options;
```
3. Agora volte em server.js para fazer a conexão do mongoose. O código ficará assim:
```
const express = require('express');
const mongoose = require('mongoose');
const { default: AdminBro } = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');
/*
*Definindo as configurações de opções e rotas para o adminBro.
*/
const app = express();
const port = 3333;
const run = async () => {
		await mongoose.connect('mongodb://localhost:27017/adminbro', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const admin = new AdminBro(options);
		const router = buildAdminRouter(admin);

		app.use(admin.options.rootPath, router);
		app.listen(port, () => {
  		console.log(`AdminBro disponível em http://localhost:${port}/admin`);
		});
};
```
