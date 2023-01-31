export default class FormValidator {
    constructor(parameters, formElement) {
        this._formSelector = parameters.formSelector;
        this._inputSelector = parameters.inputSelector;
        this._submitButtonSelector = parameters.submitButtonSelector;
        this._inactiveButtonClass = parameters.inactiveButtonClass;
        this._inputErrorClass = parameters.inputErrorClass;
        this._errorClass = parameters.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
    
    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }
    
    _checkInputValidity (inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _hasInvalidInput () {
        return this._inputList.some((input) => {
          return !input.validity.valid;
        })
    }
    
    _toggleButtonState () {
        if(this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners() {   
        this._toggleButtonState();
    
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
        });
    }

    clearError() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        })
    }
    
    enableValidation() {
        this._setEventListeners();
    }
}