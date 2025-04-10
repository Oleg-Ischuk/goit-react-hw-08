"use client";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/selectors";
import styles from "./ContactForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[А-Яа-яЇїІіЄєҐґ' ]+$/,
      "Ім'я може містити тільки українські літери"
    )
    .min(3, "Ім'я повинно містити мінімум 3 символи")
    .max(50, "Ім'я повинно містити максимум 50 символів")
    .required("Обов'язкове поле"),
  number: Yup.string()
    .matches(
      /^\+380\d{9}$/,
      "Номер телефону повинен починатися з +380 і містити 9 цифр"
    )
    .required("Обов'язкове поле"),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${values.name} is already in contacts.`);
      setSubmitting(false);
      return;
    }

    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        alert(`Failed to add contact: ${error}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="number">Number</label>
            <Field type="tel" id="number" name="number" />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};
