import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { startConsign } from "../../../redux/actions/trasnfer";

export const Consign = () => {

  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch()

  const defaultValues = { amount: 0 }

  const submit = (data) => {
    dispatch(startConsign(data))
    reset(defaultValues)
  }

  return (
    <div className="card card-consign">
      <h4>Request loan</h4>
      <form className="space" onSubmit={handleSubmit(submit)}>
        <div className="input-group">
          <input type="number" name="amount" {...register('amount')} />
          <span>Amount</span>
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
