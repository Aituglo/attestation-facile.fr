import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/main.css'

import formData from '../form-data.json'

import { $, appendTo, createElement } from './dom-utils'

// createElement('div', { className: 'form-group' })

const getCurrentTime = () => {
  const date = new Date()
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const createFormGroup = ({
  autocomplete = false,
  autofocus = false,
  inputmode,
  label,
  max,
  min,
  maxlength,
  minlength,
  name,
  pattern,
  placeholder = '',
  type = 'text',
  value,
}) => {
  const formGroup = createElement('div', { className: 'form-group' })
  const labelAttrs = {
    for: `field-${name}`,
    id: `field-${name}-label`,
    innerHTML: label,
  }
  const labelEl = createElement('label', labelAttrs)

  const inputGroup = createElement('div', { className: 'input-group align-items-center' })
  const inputAttrs = {
    autocomplete,
    autofocus,
    className: 'form-control',
    id: `field-${name}`,
    inputmode,
    min,
    max,
    minlength,
    maxlength,
    name,
    pattern,
    placeholder,
    required: true,
    type,
    value,
  }

  const input = createElement('input', inputAttrs)

  if (name === 'heuresortie') {
    input.value = getCurrentTime()
  }

  const validityAttrs = {
    className: 'validity',
  }
  const validity = createElement('span', validityAttrs)

  const appendToFormGroup = appendTo(formGroup)
  appendToFormGroup(labelEl)
  appendToFormGroup(inputGroup)

  const appendToInputGroup = appendTo(inputGroup)
  appendToInputGroup(input)
  appendToInputGroup(validity)

  return formGroup
}

const createReasonField = (reasonData) => {
  const formReasonAttrs = { className: 'form-checkbox align-items-center' }
  const formReason = createElement('div', formReasonAttrs)
  const appendToReason = appendTo(formReason)

  const id = `checkbox-${reasonData.code}`
  const inputReasonAttrs = {
    className: 'form-check-input',
    type: 'checkbox',
    id,
    name: 'field-reason',
    value: reasonData.code,
  }
  const inputReason = createElement('input', inputReasonAttrs)

  const labelAttrs = { innerHTML: reasonData.label, className: 'form-checkbox-label', for: id }
  const label = createElement('label', labelAttrs)

  appendToReason([inputReason, label])
  return formReason
}

const createReasonFieldset = (reasonsData) => {
  const fieldsetAttrs = {
    id: 'reason-fieldset',
    className: 'fieldset',
  }

  const fieldset = createElement('fieldset', fieldsetAttrs)
  const appendToFieldset = appendTo(fieldset)

  const legendAttrs = {
    className: 'legend titre-3',
    innerHTML: 'Choisissez un motif de déplacement',
  }
  const legend = createElement('legend', legendAttrs)

  const textAlertAttrs = { className: 'msg-alert hidden', innerHTML: 'Veuillez choisir un motif' }
  const textAlert = createElement('p', textAlertAttrs)

  const reasonsFields = reasonsData.items.map(createReasonField)

  appendToFieldset([legend, textAlert, ...reasonsFields])
  // Créer un form-checkbox par motif
  return fieldset
}

export function createForm () {
  const form = $('#form-profile')
  // Évite de recréer le formulaire s'il est déjà créé par react-snap (ou un autre outil de prerender)
  if (form.innerHTML !== '') {
    return
  }

  const appendToForm = appendTo(form)

  const formFirstPart = formData
    .flat(1)
    .filter(field => field.key !== 'reason')
    .filter(field => !field.isHidden)
    .map((field,
      index) => {

      if(field.value && field.value == 1){

        const formGroup = createFormGroup({
          autofocus: index === 0,
          ...field,
          name: field.key,
          value: localStorage.getItem(field.key)
        })
  
        return formGroup
      }else{
        const formGroup = createFormGroup({
          autofocus: index === 0,
          ...field,
          name: field.key,
          value: ""
        })
  
        return formGroup
      }
      
    })

  const reasonsData = formData
    .flat(1)
    .find(field => field.key === 'reason')

  const reasonFieldset = createReasonFieldset(reasonsData)
  appendToForm([...formFirstPart, reasonFieldset])
}
