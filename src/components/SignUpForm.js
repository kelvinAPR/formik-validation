import React from 'react'
import { Formik } from 'formik'
import validate from './validate-yup'
import getValidationSchema from './getValidationSchema-yup'
import './SignUpForm.css'
import { TextField, Grid, FormControl, InputLabel, OutlinedInput, MenuItem, FormHelperText, Select, FilledInput } from '@material-ui/core'

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  consent: false,
  myfield: '',
  age: ''
}

function onSubmit(values, { setSubmitting, setErrors }) {
  setTimeout(() => {
    console.log('User has been sucessfully saved!', values)
    setSubmitting(false)
  }, 2000)
}

export default function SignUpFormContainer() {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate(getValidationSchema)}
      onSubmit={onSubmit}
      render={SignUpForm}
    />
  )
}

function SignUpForm(props) {
  const { isSubmitting, errors, handleChange, handleSubmit, handleBlur, touched } = props

  return (
    <Grid container spacing={16}>
      <Grid item xs={6}>
        <div className="form">
          <label className="form-field" htmlFor="email">
            <span>E-mail:</span>
            <input name="email" type="email" onBlur={handleBlur} onChange={handleChange} />
          </label>
          <div className="form-field-error">{errors.email}</div>

          <TextField
            error={errors.myfield && touched.myfield}
            name="myfield"
            variant="outlined"
            margin="dense"
            label="My Name"
            onChange={handleChange}
            helperText={errors.myfield && touched.myfield && errors.myfield}
            onBlur={handleBlur}
          />
        <pre>{props.values.age}</pre>
          <FormControl>
            <InputLabel shrink htmlFor="age-helper">Age</InputLabel>
            <Select
              value={props.values.age}
              onChange={handleChange}
              input={<FilledInput name="age" id="age-helper" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>

          <label className="form-field" htmlFor="password">
            <span>Password:</span>
            <input name="password" type="password" onChange={handleChange} />
          </label>
          <div className="form-field-error">{errors.password}</div>

          <label className="form-field" htmlFor="passwordConfirmation">
            <span>Confirm password:</span>
            <input name="passwordConfirmation" type="password" onChange={handleChange} />
          </label>
          <div className="form-field-error">{errors.passwordConfirmation}</div>

          <label className="form-field" htmlFor="consent">
            <span>Consent:</span>
            <input name="consent" type="checkbox" onChange={handleChange} />
          </label>
          <div className="form-field-error">{errors.consent}</div>

          <button type="submit" onClick={handleSubmit}>{isSubmitting ? 'Loading' : 'Sign Up'}</button>
        </div>
      </Grid>
      <Grid item xs={6}>
        <pre>{JSON.stringify(props.values, null, 2)}</pre>
      </Grid>
    </Grid>

  )
}

