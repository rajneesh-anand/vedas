import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Link from '@components/ui/link';

interface Props {
  className?: string;
  data: {
    widgetTitle?: string;
    lists: {
      id: string;
      path?: string;
      title: string;
      icon?: any;
    }[];
  };
}

const WidgetLink: React.FC<Props> = ({ className, data }) => {
  const { widgetTitle, lists } = data;
  const { t } = useTranslation('footer');
  return (
    <div className={`${className}`}>
      <Heading
        variant="mediumHeading"
        className="mb-4 sm:mb-5 lg:mb-6 pb-0.5 text-white"
      >
        {t(`${widgetTitle}`)}
      </Heading>
      <ul className="text-sm lg:text-15px flex flex-col space-y-4">
        {lists.map((list) => (
          <li
            key={`widget-list--key${list.id}`}
            className="flex items-baseline"
          >
            {list.icon && (
              <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                {list.icon}
              </span>
            )}

            <Link
              href={list.path ? list.path : '/'}
              className="transition-colors duration-200 text-gray-200 hover:text-yellow-400"
            >
              {t(`${list.title}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetLink;
