import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CstoreMain.module.css";

const CStore = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.containerc}>
        <div className={styles.imagewrapperc}>
          <img
            src="gg.jpg"
            style={{ height: "180px", width: "180px", fontFamily: "initial" }}
            alt="Logo"
          />
        </div>
        <div className={styles.buttonwrapperc}>
          <button className={styles.buttonc} onClick={()=>navigate(`/type` ,{state:"teens"})}>
            Teens
          </button>
          <button className={styles.buttonc} onClick={()=>navigate(`/type` ,{state:"comic"})}>
            Comic
          </button>
          <button className={styles.buttonc} onClick={()=>navigate(`/type` ,{state:"kids"})}>
            Kids
          </button>
          <button className={styles.buttonc} onClick={()=>navigate(`/type` ,{state:"kodesh"})}>
            Kodesh
          </button>
        </div>
      </div>
    </div>
  
  );
};

export default CStore;

