import classes from "./Checkout.module.css";

import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";

const isFiveChars = (value) => value.trim().length === 5;
const Checkout = (props) => {
  const [formInputValidity, setformInputVaidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameisValid = !isEmpty(enteredName);
    const enteredCityisValid = !isEmpty(enteredCity);
    const enteredStreetisValid = !isEmpty(enteredStreet);
    const enteredCodeisValid = isFiveChars(enteredCode);
    setformInputVaidity({
      name: enteredNameisValid,
      street: enteredStreetisValid,
      postal: enteredCodeisValid,
      city: enteredCityisValid,
    });

    const formIsValid =
      enteredCityisValid &&
      enteredCodeisValid &&
      enteredNameisValid &&
      enteredStreetisValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postal: enteredCode,
      street: enteredStreet,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Enter a Valid name !</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Enter a Valid Street!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Enter a Valid Postal Code !</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Enter a Valid City !</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
