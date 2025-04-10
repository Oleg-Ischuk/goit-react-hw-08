"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchContacts } from "../redux/contacts/operations";
import { selectLoading } from "../redux/contacts/selectors";
import { ContactForm } from "../components/ContactForm/ContactForm";
import { ContactList } from "../components/ContactList/ContactList";
import { SearchBox } from "../components/SearchBox/SearchBox";
import styles from "./Contacts.module.css";

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      <h1 className={styles.title}>Phonebook</h1>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <ContactForm />
          <div className={styles.searchBoxContainer}>
            <SearchBox />
          </div>
        </div>

        <div className={styles.rightColumn}>
          {isLoading && <p className={styles.loading}>Loading contacts...</p>}
          <div className={styles.contactsContainer}>
            <ContactList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
