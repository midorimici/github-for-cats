import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

type ListProps = {
  list: string[];
  deleteItem: (item: string) => void;
};

export const List: React.FC<ListProps> = ({ list, deleteItem }) => {
  return (
    <div className="list">
      {list.map((item: string) => (
        <ListItem item={item} onDelete={() => deleteItem(item)} />
      ))}
    </div>
  );
};

type ListItemProps = {
  item: string;
  onDelete: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ item, onDelete }) => {
  return (
    <span className="item">
      {item}
      <FontAwesomeIcon cursor="pointer" icon={faClose} onClick={onDelete} />
    </span>
  );
};
