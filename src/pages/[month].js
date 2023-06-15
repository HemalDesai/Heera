import { useState, useEffect } from 'react';
import DateButton from '../components/DateButton';
import { useRouter } from 'next/router';
import styles from './DynamicMonthPage.module.css';
import { getDatabase, ref, onValue,set, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyBu2u70wmf3WLG_T9NqEGMi2Yu4jP75fuo",
  authDomain: "heera-b7f16.firebaseapp.com",
  projectId: "heera-b7f16",
  storageBucket: "heera-b7f16.appspot.com",
  messagingSenderId: "968834525982",
  appId: "1:968834525982:web:3cf0f9696c28e63910f70f",
  measurementId: "G-MMQ9WKKHJP"
};
const app = initializeApp(firebaseConfig);
const DynamicMonthPage = () => {
  const [values, setValues] = useState({
    'row1-item1': '0',
    'row1-item2': '0',
    'row1-total1': '0',
    'row2-item1': '0',
    'row2-item2': '0',
    'row2-total2': '0',
    'row3-item1': '0',
    'row3-item2': '0',
    'row3-total3': '0',
    'row4-item1': '0',
    'row4-item2': '0',
    'row4-total4': '0',
  });
  const router = useRouter();
  const { month } = router.query;
  let monthName = '';
  if (month) {
    monthName = month.charAt(0).toUpperCase() + month.slice(1);
  }

  const dateButtons = [];
  const [selectedDate, setSelectedDate] = useState(null);

  const totalDays = 31;
  let currentDay = 1;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 7; col++) {
      if (currentDay > totalDays) {
        break;
      }
      const button = {
        label: currentDay.toString(),
        link: `/${month}/${currentDay}`,
      };
      dateButtons.push(button);
      currentDay++;
    }
  }

  const [sumOfDay, setSumOfDay] = useState(0);

  const openPopup = async (date) => {
    setSelectedDate(date);
    
    // calculateSumOfDay(values);
    const database = getDatabase();
    const dataPath = `${month}/${date}/data`;
  
    // Fetch data from the Firebase Realtime Database for the selected date
    const dataRef = ref(database, dataPath);
    const snapshot = await get(dataRef);
    const data = snapshot.val();
    
    if (data) {
      setValues(data);
      setSumOfDay(data.sumOfDay);
      // also set the sumofday to the data in the databse 
    }
    
  };
  

  const closePopup = () => {
    setSelectedDate(null);
    setValues({});
    setSumOfDay(0);
    handleSave();
  };

useEffect(() => {
  const database = getDatabase();
  calculateSumOfDay(values);
  // Fetch data from the Firebase Realtime Database
  const dataPath = `${month}/${selectedDate}/data`;
  const dataRef = ref(database, dataPath);
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setValues(data);
      calculateSumOfDay(data);
    }
  });
  
  
}, []);
// console.log(values);
const calculateSumOfDay = (data) => {
  const sum = Object.values(data).reduce((total, value) => {
    if (typeof value === 'parseFloat') {
      return total + value;
    }
    return total;
  }, 0);
  setSumOfDay(sum);
};


const handleSave = () => {
  // Calculate the total values before saving
  // calculateSumOfDay(values);
  const calculatedValues = {
    ...values,
    'row1-total1': calculateTotal('row1'),
    'row2-total2': calculateTotal('row2'),
    'row3-total3': calculateTotal('row3'),
    'row4-total4': calculateTotal('row4'),
    sumOfDay,
  };
  const database = getDatabase();
  const dataPath = `${month}/${selectedDate}/data`;

  // Save data to the Firebase Realtime Database
  set(ref(database, dataPath), calculatedValues)
    .then(() => {
      console.log('Data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
};

const hemalupdate = () => {
  const totalll = parseFloat(values['row1-item1'])*parseFloat(values['row1-item2'])+
  parseFloat(values['row2-item1'])*parseFloat(values['row2-item2'])+
  parseFloat(values['row3-item1'])*parseFloat(values['row3-item2'])+
  parseFloat(values['row4-item1'])*parseFloat(values['row4-item2']);
  setSumOfDay(totalll);
  console.log(sumOfDay);
};





  

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    
    // after the value is changed display the value in console
    
  };
  // console.log(sumOfDay);
  
  const calculateTotal = (row) => {
    const item1 = parseFloat(values[`${row}-item1`]) || 0;
    const item2 = parseFloat(values[`${row}-item2`]) || 0;
    return item1 * item2;
  };

  return (
    <div>
      <h1 style={{ marginLeft:'60px', fontWeight:'lighter', fontSize:'30px'}}> {monthName}</h1>
      <div className={styles.buttonContainer}>
        {dateButtons.map((button, index) => (
          <DateButton
            key={index}
            label={button.label}
            onClick={() => openPopup(button.label)}
            
          />
        ))}
      </div>
      {selectedDate && (
       <div className={styles.popupOverlay}>
      <div className={styles.container}>
      <div className={styles.row}>
  <div className={styles.inputGroup}>
      <input
      className={styles.inputField}
      value="Type"
      readOnly />
      </div>
      <div className={styles.inputGroup}>
      <input
      className={styles.inputField}
      value="Diamonds"
      readOnly />
      </div>
      <div className={styles.inputGroup}>
      <input
      className={styles.inputField}
      value="Price"
      readOnly />
      </div>
      <div className={styles.inputGroup}>
      <input
      className={styles.inputField}
      value="Total"
      readOnly />
      </div>
      </div>





  <div className={styles.row}>
  <div className={styles.inputGroup}>
      <input
      className={styles.inputField}
      value="A"
      readOnly />
      </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row1-item1">row1-item1</label> */}
      <input
className={styles.inputField}
        type="parseFloat"
        id="row1-item1"
        name="row1-item1"
        value={values['row1-item1']}
        onChange={handleChange}
      />
    </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row1-item2">row1-item2</label> */}
      <input
className={styles.inputField}
        type="parseFloat"
        id="row1-item2"
        name="row1-item2"
        value={values['row1-item2']}
        onChange={handleChange}
      />
    </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row1-total1">row1-total1</label> */}
      <input
className={`${styles.inputField} ${styles.readOnlyField}`}
        type="text"
        id="row1-total1"
        name="row1-total1"
        value={calculateTotal('row1')}
        readOnly
      />
    </div>
  </div>

  <div className={styles.row}>
  <div className={styles.inputGroup}>
      <input
      className={styles.inputField}
      value="B"
      readOnly />
      </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row2-item1">row2-item1</label> */}
      <input
className={styles.inputField}
        type="parseFloat"
        id="row2-item1"
        name="row2-item1"
        value={values['row2-item1']}
        onChange={handleChange}
      />
    </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row2-item2">row2-item2</label> */}
      <input
className={styles.inputField}
        type="parseFloat"
        id="row2-item2"
        name="row2-item2"
        value={values['row2-item2']}
        onChange={handleChange}
      />
    </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row2-total2">row2-total2</label> */}
      <input
className={`${styles.inputField} ${styles.readOnlyField}`}
        type="text"
        id="row2-total2"
        name="row2-total2"
        value={calculateTotal('row2')}
        readOnly
      />
    </div>
  </div>

  <div className={styles.row}>
  <div className={styles.inputGroup}>
      <input
      className={styles.inputField}
      value="C"
      readOnly />
      </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row3-item1">row3-item1</label> */}
      <input
className={styles.inputField}
        type="parseFloat"
        id="row3-item1"
        name="row3-item1"
        value={values['row3-item1']}
        onChange={handleChange}
      />
    </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row3-item2">row3-item2</label> */}
      <input
className={styles.inputField}
        type="parseFloat"
        id="row3-item2"
        name="row3-item2"
        value={values['row3-item2']}
        onChange={handleChange}
      />
    </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row3-total3">row3-total3</label> */}
      <input
className={`${styles.inputField} ${styles.readOnlyField}`}
        type="text"
        id="row3-total3"
        name="row3-total3"
        value={calculateTotal('row3')}
        readOnly
      />
    </div>
  </div>

  <div className={styles.row}>
    <div className={styles.inputGroup}>
      <input
      className={styles.inputField}
      value="D"
      readOnly />
      </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row4-item1">row4-item1</label> */}
      <input
className={styles.inputField}
        type="parseFloat"
        id="row4-item1"
        name="row4-item1"
        value={values['row4-item1']}
        onChange={handleChange}
      />
    </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row4-item2">row4-item2</label> */}
      <input
className={styles.inputField}
        type="parseFloat"
        id="row4-item2"
        name="row4-item2"
        value={values['row4-item2']}
        onChange={handleChange}
      />
    </div>
    <div className={styles.inputGroup}>
      {/* <label htmlFor="row4-total4">row4-total4</label> */}
      <input
className={`${styles.inputField} ${styles.readOnlyField}`}
        type="text"
        id="row4-total4"
        name="row4-total4"
        value={calculateTotal('row4')}
        readOnly
      />
    </div>
  </div>

  <div className={styles.row}>
    <div className={styles.inputGroup}>
      <label htmlFor="total">SumOfDay</label>
      <input
className={styles.inputField}
        type="text"
        id="total"
        name="total"
        value={sumOfDay}
        readOnly
      />
    </div>
    <button className={styles.updateButton} onClick={hemalupdate}>
      Update
    </button>
  </div>

  <button className={styles.closeButton} onClick={closePopup}>
    Close
  </button>
</div>

    </div>
      )}
    </div>
  );
};

export default DynamicMonthPage;

{/* <button className={styles.closeButton} onClick={closePopup}>
                Close
              </button> */}