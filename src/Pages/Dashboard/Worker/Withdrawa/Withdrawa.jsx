import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import useRole from "../../../../Hooks/useRole";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Withdrawa = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [data, refetch] = useRole();
  const max = data?.coin / 20;
  const [coinToWithDraw, setCoinToWithDraw] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0, "dollar");
  const handleCoinChange = (e) => {
    const coin = parseInt(e.target.value);
    console.log(coin);
    setCoinToWithDraw(coin);
    setWithdrawAmount(coin / 20); // 20 coins = 1 dollar
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // console.log(max);
    if (max < withdrawAmount) {
      return toast.error("Invalid Amount");
    } else {
      const form = e.target;
      const coin_to_withdrow = parseInt(form.coin_to_withdrow.value);
      const withdraw_amount = coin_to_withdrow / 20;
      const payment_method = form.payment_method.value;
      const account_number = form.account_number.value;
      const withdraw_time = new Date().toISOString();

      const withdrawData = {
        coin_to_withdrow,
        withdraw_amount,
        payment_method,
        account_number,
        worker_email: user?.email,
        worker_name: user?.displayName,
        withdraw_time,
      };
      console.log(withdrawData);

      // if (totalAmount < data.coin) {
      //   const task = {
      //     coin_to_withdrow,
      //     task_detail,
      //     task_quantity,
      //     payable_amount,
      //     completion_date,
      //     submission_info,
      //     task_image_url,
      //     task_creator: {
      //       email,
      //       name: user?.displayName,
      //     },
      //     created_at: currentTime,
      //   };
      //   const newCoin = data.coin - totalAmount;
      // console.log(task);
      try {
        const { data } = await axiosSecure.post("/withdraw", withdrawData);
        // console.log(data);
        toast.success("Task Created Successfully!");
        // await axiosSecure.patch(`/user/${user?.email}`, { newCoin });
        // refetch();
        console.log(data);
        // navigate("/mytask");
      } catch (err) {
        console.log(err);
      }
      // } else return toast.error("Not available Coin. Purchase Coin");
    }
  };
  return (
    <div>
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Your maximum withdraw ammount : {max}$
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="coin_to_withdrow">
                Coin To WithDraw
              </label>
              <input
                id="coin_to_withdrow"
                name="coin_to_withdrow"
                type="number"
                onChange={handleCoinChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="withdraw_amount">
                Withdraw Amount
              </label>
              <input
                id="withdraw_amount"
                type="text"
                name="withdraw_amount"
                readOnly
                value={`${withdrawAmount} $`}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="payment_method">
                Select Payment System
              </label>
              <select
                name="payment_method"
                id="payment_method"
                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring select select-bordered join-item text-gray-700"
              >
                <option>Bkash</option>
                <option>Nagad</option>
                <option>Roket</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 " htmlFor="account_number">
                Account Number
              </label>
              <input
                id="account_number"
                name="account_number"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="btn bg-[#007BA7] text-white leading-5 transition-colors duration-300 transhtmlForm ">
              WithDraw
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Withdrawa;
