import { useSelector } from "react-redux";
import {
  selectFilteredContacts,
  selectLoading,
} from "../../redux/contacts/selectors";
import { Contact } from "../Contact/Contact";
import styles from "./ContactList.module.css";

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);

  if (filteredContacts.length === 0 && !isLoading) {
    return <p className={styles.emptyMessage}>No contacts found</p>;
  }

  return (
    <ul className={styles.list}>
      {filteredContacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};
