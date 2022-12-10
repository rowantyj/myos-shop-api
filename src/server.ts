import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import ProductsRoute from '@routes/products.route';
import GraphqlRoute from '@routes/graphql.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new ProductsRoute(),
  new GraphqlRoute(),
  new AuthRoute(),
]);

app.listen();
