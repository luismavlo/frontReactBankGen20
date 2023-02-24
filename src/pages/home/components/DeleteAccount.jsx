import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { startDeleteAccount } from "../../../redux/actions/trasnfer";

export const DeleteAccount = () => {

  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch()

  const defaultValues = { accountNumber: '', password: '' }

  const submit = (data) => {
    dispatch(startDeleteAccount(data))
    reset(defaultValues)
  }

  return (
    <div className="card card-delete">
      <h4>Close account</h4>
      <form onSubmit={handleSubmit(submit)}>
        <div className="input-group">
          <input type="text" {...register('accountNumber')} />
          <span>Confirm Account Number</span>
        </div>
        <div className="input-group">
          <input type="number" {...register('password')}/>
          <span>Confirm password</span>
        </div>
        <div className="input-group">
          <button type="submit">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <span>Send</span>
        </div>
      </form>
    </div>
  );
};
