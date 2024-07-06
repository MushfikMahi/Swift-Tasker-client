import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const WithdrawRequest = () => {
  const [withdraws, setwithdraws] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [control, setControl] = useState(false);
  useEffect(() => {
    async function withdrawData() {
      const { data } = await axiosSecure("/withdrawrequest");
      setwithdraws(data);
    }
    withdrawData();
  }, [control]);
  const handlePayment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Complete the payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/delete-withdraw/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(async (data) => {
            // console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Succeded!", "The payment succeded.", "success");
              setControl(!control);
            }
          });
      }
    });
  };

  return (
    <section className="container px-4 mx-auto pt-24 min-h-[80vh]">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">
          Withdrawal withdraws
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {withdraws?.length} withdraws
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Coin</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Amount</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Pay Number</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Pay System</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Pay Time</span>
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Payment
                    </th>
                  </tr>
                </thead>
                {withdraws.map((withdraw) => (
                  <tbody
                    key={withdraw._id}
                    className="bg-white divide-y divide-gray-200 "
                  >
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {withdraw?.worker_name}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {withdraw?.coin_to_withdrow}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {withdraw?.withdraw_amount}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {withdraw?.account_number}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {withdraw?.payment_method}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {new Date(withdraw?.withdraw_time).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        <button
                          onClick={() => handlePayment(withdraw._id)}
                          className="btn bg-[#008080] text-white"
                        >
                          Success
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WithdrawRequest;
