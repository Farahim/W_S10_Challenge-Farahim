import axios from 'axios';
import React, {useState} from 'react'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

let postUrl = 'http://localhost:9009/api/pizza/order'

export default function PizzaForm() {
  const [fullName, setFullName] = useState(initialFormState.fullName);
  const [size, setSize] = useState(initialFormState.size);
  const [toppings, setToppings] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState('');

  function handleChangeFullName (event) {
    setFullName(event.target.value);
  }

  function handleChangeSize(event) {
    setSize(event.target.value);
  }

  function handleChangeToppings() {
    let newToppingsList = [];
    const toppingsInput = document.getElementById('toppingsInput').querySelectorAll('label');
    for(let i = 0; i < toppingsInput.length; i++) {
      let t = toppingsInput[i].querySelector('input');
      if(t.checked) {
        newToppingsList.push(t.name);
      }
    }

    setToppings(newToppingsList);
  }

  function submitOrder(event) {
    event.preventDefault();
    setSuccess(true);
    setMessage('Order in progress...');
    let orderObj = {
      fullName: fullName,
      size: size,
      toppings: toppings
    };
    axios
        .post(postUrl, orderObj)
        .then((res) => {
          setSuccess(true);
          setFailure(false);
          setMessage(res.data.message);
        })
        .catch((err) => {
          setSuccess(false);
          setFailure(true);
          setMessage(err.response.data.message)
        });
    setFullName('');
    document.getElementById('fullName').value='';
    setToppings([]);
    const toppingsInput = document.getElementById('toppingsInput').querySelectorAll('label');
    for(let i = 0; i < toppingsInput.length; i++) {
      let t = toppingsInput[i].querySelector('input');
      t.checked = false;
    }
    setSize('');
    document.getElementById('size').value = '';

  }

  return (
      <form>
        <h2>Pizza Form</h2>
        {success && <div className='pending'>{message}</div>}
        {failure && <div className='failure'>Order failed: {message}</div>}

        <div className="input-group">
          <div>
            <label htmlFor="fullName">Full Name</label><br />
            <input
                data-testid="fullNameInput"
                id="fullName"
                name="fullName"
                placeholder="Type full name"
                type="text"
                onChange={handleChangeFullName}
            />
          </div>
        </div>

        <div className="input-group">
          <div>
