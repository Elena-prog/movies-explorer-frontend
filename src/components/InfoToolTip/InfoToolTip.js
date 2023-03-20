import React from "react";
import './InfoToolTip.css';

export default function InfoTooltip({ onClose, infoRegister }) {
  return (
    <div onClick={onClose} className={`popup ${infoRegister.status && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
          aria-label="кнопка закрыть."
        ></button>
        <div
          className={`popup__icon popup__icon_type_${infoRegister.icon}`}
        ></div>
        <p className="popup__caption">{infoRegister.message}</p>
      </div>
    </div>
  );
}
