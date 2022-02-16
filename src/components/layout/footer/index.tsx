import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
const { widgets, payment } = footer;

const Footer: React.FC = () => (
  <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500">
    <Widgets widgets={widgets} />
    <Copyright payment={payment} />
  </footer>
);

export default Footer;
