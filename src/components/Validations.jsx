import { isContainRestrictedKeywords } from "@/utlils/commonFunctions"
import { MIN_USERNAME_LENGTH } from "@/utlils/constant"

export function UsernameValidation({ value }) {
  return (
    <div className="text-error">
      <p>
        {
          value ?
            isContainRestrictedKeywords(value) ?
              'Username contains restricted keywords' :
              value.length < MIN_USERNAME_LENGTH ?
                `Username must be ${MIN_USERNAME_LENGTH} characters long` :
                'Invalid username' : 'Your username is mandatory'
        }
      </p>
    </div>
  )
}

export function NameValidation({ value }) {
  return (
    <div className="text-error">
      {
        value ?
          isContainRestrictedKeywords(value) ?
            'Display name contains restricted keywords' :
            'Invalid display name' : 'Your display name is mandatory'
      }
    </div>
  )
}

export function EmailValidation({ value }) {
  return (
    <div className="text-error">
      {value ? <p>Invalid email</p > : <p>Email is mandatory</p>}
    </div>
  )
}

export function PhoneValidation({ value }) {
  return (
    <div className="text-error">
      {value ? <p>Inalid phone number</p> : <p>Phone number is mandatory</p>}
    </div>
  )
}

export function OTPValidation({ value }) {
  return (
    <div className="text-error">
      {value ? <p>Invalid OTP</p> : <p>OTP is mandatory</p>}
    </div>
  )
}

export function AgeValidation({ value }) {
  return (
    <div className="text-error">
      {value ? (Number(value) < 0 || Number(value) > 120 ? 'Please enter a valid age between 0 and 120.' : 'Invalid age') : 'Age is mandatory'}
    </div>
  )
}