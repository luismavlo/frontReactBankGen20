import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../../helpers/getConfig";
import { types } from "../types/types";
import { startChecking } from "./auth";
import { setIsLoading } from "./ui";

export const startTransferTo = (amount, accountNumber, senderUserId) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post("http://localhost:4000/api/v1/transfers", {
        amount,
        accountNumber,
        senderUserId,
      },
      getConfig())
      .then((resp) => {
        console.log(resp)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(startGetHistoryTransfer(senderUserId))
        dispatch(startChecking())
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error has occurred, please contact the administrator",
        });
        console.log(error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const startGetHistoryTransfer = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(`http://localhost:4000/api/v1/users/${id}/history`, getConfig())
      .then((resp) => {
        console.log(resp);
        dispatch(historyTransfer(resp.data.transfer));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error has occurred, please contact the administrator",
        });
        console.log(error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

const historyTransfer = (history) => ({
  type: types.historyTransfer,
  payload: history,
});
