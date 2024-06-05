import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
const MyTask = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const axiosCommon = useAxiosCommon();

  axiosCommon(`/tasks/${user?.email}`).then((result) => setTasks(result.data));

  const handleUpdate = () => {
    console.log("update");
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <section className="container px-4 mx-auto pt-24">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">My Task&rsquo;s</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {tasks?.length} Task&rsquo;s
        </span>
      </div>

      <div className="flex flex-col mt-6 min-h-[80vh]">
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
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Quantity</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Amount</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Update
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Delete
                    </th>

                    {/* <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Actions
                    </th> */}
                  </tr>
                </thead>
                {tasks.map((task) => (
                  <tbody
                    key={task._id}
                    className="bg-white divide-y divide-gray-200 "
                  >
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {task?.task_title}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {task?.task_quantity}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {task?.payable_amount}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <p
                          onClick={handleUpdate}
                          className="text-xl text-[#0077cc] cursor-pointer hover:text-[#005fa3]"
                        >
                          <GrDocumentUpdate />
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-00 whitespace-nowrap">
                        <p
                          onClick={handleDelete}
                          className="text-2xl text-[#e74c3c] cursor-pointer hover:text-[#c0392b]"
                        >
                          <RiDeleteBin6Fill />
                        </p>
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

export default MyTask;
